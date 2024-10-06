// Your target catches you by the wrist and disarms you. Picking up your weapon (bonus action) will expose you to opportunity attacks.
import {workflowCache} from "../../../utils/workflowCache.js";
import {mainScriptUtils} from "../../../utils/mainScriptUtils.js";

// We are assuming, that the weapon is equipped, so we can just get the first item in the actor's items array.
// We have to implement a check for "natural weapons" and "unarmed strikes" here.
export async function disarmed(effect, fumbleToken, fumbleActor) {
    const workflow = await workflowCache.getWorkflow();
    const nonWeaponNames = ["unarmed strike"];
    const weapon = fromUuid(workflow.itemUuid);
    if(!weapon || nonWeaponNames.some(name => weapon.name.toLowerCase().includes(name))) {
        ChatMessage.create({ content: `${fumbleToken.name} is using a natural weapon or unarmed strike, so they cannot be disarmed.`});
        mainScriptUtils.debug('disarmed - Weapon not found or is not a weapon.');
        return;
    }
    let actor = await fromUuid(workflow.actor.uuid);
    let actorToken = await fromUuid(workflow.tokenUuid);
    let debugObject = {
        fumbleActor: fumbleActor,
        fumbleToken: fumbleToken,
        effect: effect,
        workflow: workflow,
        weapon: weapon
    };
    mainScriptUtils.debug('disarmed - debugObject: ', debugObject);
    let dialogTitlePrimary = `Disarmed`;
    let dialogTitleGM = `Waiting for ${actor.name}'s selection`;
    let initialTimeLeft = 30;
    let dialogId = "disarmedMacro";
    let dialogContent = `
        <div class="gps-dialog-container">
            <div class="gps-dialog-section">
                <div class="gps-dialog-content">
                    <div>
                        <div class="gps-dialog-flex">
                            <p class="gps-dialog-paragraph">Do you want to pick up your weapon?</p>
                                </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gps-dialog-button-container">
                <button id="pauseButton_${dialogId}" type="button" class="gps-dialog-button">
                    <i class="fas fa-pause" id="pauseIcon_${dialogId}" style="margin-right: 5px;"></i>Pause
                </button>
            </div>
        </div>
    `;
    let result;
    let browserUser = MidiQOL.playerForActor(actor);
    if (!browserUser.active) {
        browserUser = game.users?.activeGM;
    }
    const isActiveGM = game.user.id === game.users?.activeGM.id;
    mainScriptUtils.debug('disarmed - isActiveGM: ', isActiveGM);
    let gmDialogArgs = {
        dialogTitle: dialogTitleGM,
        dialogContent,
        dialogId,
        initialTimeLeft,
        validTokenPrimaryUuid: actorToken.uuid,
        source: "gm",
        type: "multiDialog"
    };
    let userDialogArgs = {
        dialogTitle: dialogTitlePrimary,
        dialogContent,
        dialogId,
        initialTimeLeft,
        validTokenPrimaryUuid: actorToken.uuid,
        source: "user",
        type: "multiDialog",
        browserUser: browserUser.id
    };
    if(game.users.filter(u => u.active).length > 1 &&  game.users.activeGM.id !== undefined && browserUser.id !== game.users?.activeGM.id) {
        mainScriptUtils.debug('disarmed - At least one user and active GM are both active');
        result = await game.gps.socket.executeAsGM("handleDialogPromises", { userDialogArgs, gmDialogArgs });
    } else if (game.users.activeGM.id !== undefined) {
        mainScriptUtils.debug('disarmed - No other user is not active, but GM is');
        result = await game.gps.socket.executeAsUser("process3rdPartyReactionDialog", browserUser.id, {
            dialogTitle:dialogTitlePrimary,
            dialogContent,
            dialogId,
            initialTimeLeft,
            validTokenPrimaryUuid: actorToken.uuid,
            source:browserUser.isGM ? "gm" : "user",
            type:"singleDialog"
        });
    }
    mainScriptUtils.debug('disarmed - result: ', result);
    const { userDecision, source, type } = result;
    mainScriptUtils.debug('disarmed - userDecision: ', userDecision);
    if (!userDecision) {
        if (source === "user" && type === "multiDialog") await game.gps.socket.executeAsGM("closeDialogById", {dialogId: dialogId}); //These handle Mirror Dialog stuff, leave it!
        if (source === "gm" && type === "multiDialog") await game.gps.socket.executeAsUser("closeDialogById", browserUser.id, {dialogId: dialogId}); //These handle Mirror Dialog stuff, leave it!
        mainScriptUtils.debug("disarmed - No user selection! Aborting script.");
        return; //Return if user selected no or timed out, etc
    } else if (userDecision) {
        // Sweet success, do whatever you want!
        const targetList = MidiQOL.findNearby(-1, fumbleToken, 5, {isSeen: true})
        mainScriptUtils.debug('disarmed - targetList: ', targetList);
        if(targetList.length === 0) {
            mainScriptUtils.debug('disarmed - No targets found');
            console.warn('No targets found');
            return;
        }
        for(const target of targetList) {
            if (MidiQOL.hasUsedReaction(target.actor)) {
                ChatMessage.create({ content: `${fumbleToken.name} is picking up his weapon. ${target.name} can't make an opportunity attack because they have already used their reaction this turn!`});
                mainScriptUtils.debug('disarmed - Actor has used reaction, aborting', target.actor);
                continue;
            }
            let weapon = target.actor.items.find(i => i.system.actionType === 'mwak' && i.system.equipped === true);
            if(!weapon) {
                ChatMessage.create({ content: `${fumbleToken.name} is picking up his weapon. ${target.name} can't make an opportunity attack because they have no weapon equipped!`});
                mainScriptUtils.debug('disarmed - No weapon found for token', target);
                continue;
            }
            const proceed = await foundry.applications.api.DialogV2.confirm({
                window: {
                    title: "Allow Attack of Opportunity?",
                    minimizable: true
                },
                content: `${target.name} can make an attack of opportunity on ${fumbleToken.name}.`,
                rejectClose: false,
                modal: true
            });
            if (proceed) {
                ChatMessage.create({ content: `${fumbleToken.name} is picking up his weapon. ${target.name} is about to make an opportunity attack!`});
                let player = await MidiQOL.playerForActor(target.actor);
                await player.updateTokenTargets([]);
                await new Promise(r=>setTimeout(r,1000));
                await makeOpportunityAttack(fumbleToken, weapon);
                const appliedEffect = chrisPremades.utils.effectUtils.getSidebarEffectData('Reaction used');
                await chrisPremades.utils.effectUtils.createEffect(target.actor, appliedEffect);
            }
        }
        effect.delete();
        return;
    }
}

async function makeOpportunityAttack (target, weapon) {
    const options = {
        advantage: false,
        checkGMStatus: true,
        disadvantage: false,
        versatile: false,
        fastForward: true,
        lateTargeting: true,
        targetUuids: [target.document.uuid],
        targetConfirmation: 'always'
    };
    await MidiQOL.completeItemUse(weapon, {}, options);
}