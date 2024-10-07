import {mainScriptUtils} from "../../../utils/mainScriptUtils.js";
import {workflowCache} from "../../../utils/workflowCache.js";

/**
 * This function will move the fumbleToken in a random direction.
 * @param effect {effect} The effect object, passed by the effect macro
 * @param fumbleToken {token} The token object, passed by the effect macro. This token will be moved.
 * @param fumbleActor {actor} The actor object, passed by the effect macro.
 * @returns {Promise<*>}
 */

export async function sidestep(effect, fumbleToken, fumbleActor) {
    const CARDINAL_DIRECTIONS = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    const DIRECTION_OPTIONS = CARDINAL_DIRECTIONS.map(dir => `<option value="${dir}">${dir}</option>`).join('');
    const workflow = await workflowCache.getWorkflow();
    if (workflow.options.targetUuids.length > 1) {
        mainScriptUtils.debug('sidestep - more than one targets detected. Aborting script.');
        return;
    }
    const actorToken = await fromUuid(workflow.options.targetUuids[0]); // we are assuming since it's a melee fumble, that we only targeted one token
    const actor = await MidiQOL.actorFromUuid(actorToken.uuid);
    let debugObject = {
        actor: actor,
        actorToken: actorToken,
        fumbleToken: fumbleToken,
        fumbleActor: fumbleActor,
        effect: effect,
        workflow: workflow
    };
    mainScriptUtils.debug('sidestep - fumbleActor: ', debugObject);
    let dialogTitlePrimary = `Sidestep`;
    let dialogTitleGM = `Waiting for ${actor.name}'s selection`;
    let initialTimeLeft = 30;
    let dialogId = "sidestepMacro";
    let dialogContent = `
        <div class="gps-dialog-container">
            <div class="gps-dialog-section">
                <div class="gps-dialog-content">
                    <div>
                        <div class="gps-dialog-flex">
                            <p class="gps-dialog-paragraph">You sidestepped your opponents attack and can move him 15ft. Choose a direction:</p>
                                <select id="ally-token" name="direction" style="width: 100%; margin-top: 10px;">
                                    <option value="">Select a direction</option>
                                    ${DIRECTION_OPTIONS}
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
    mainScriptUtils.debug('sidestep - isActiveGM: ', isActiveGM);
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
        mainScriptUtils.debug('sentreeling - At least one user and active GM are both active');
        result = await game.gps.socket.executeAsGM("handleDialogPromises", { userDialogArgs, gmDialogArgs });
    } else if (game.users.activeGM.id !== undefined) {
        mainScriptUtils.debug('sentreeling - No other user is not active, but GM is');
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
    mainScriptUtils.debug('sidestep - result: ', result);
    const { userDecision, allyTokenUuid, source, type } = result;
    if (!userDecision) {
        if (source === "user" && type === "multiDialog") await game.gps.socket.executeAsGM("closeDialogById", {dialogId: dialogId}); //These handle Mirror Dialog stuff, leave it!
        if (source === "gm" && type === "multiDialog") await game.gps.socket.executeAsUser("closeDialogById", browserUser.id, {dialogId: dialogId}); //These handle Mirror Dialog stuff, leave it!
        mainScriptUtils.debug('sentreeling - No user selection! Aborting script.');
        effect.delete();
        return; //Return if user selected no or timed out, etc
    } else if (userDecision) {
        // Sweet success, do whatever you want!
        const selectedDirection = allyTokenUuid;
        mainScriptUtils.debug('sentreeling - User selected direction:', selectedDirection);
        const movedDistance = await game.gps.socket.executeAsGM("moveTokenByCardinal", {
            targetUuid: fumbleToken?.document?.uuid,
            distance: 15,
            direction: selectedDirection
        });
        mainScriptUtils.debug('Token moved', movedDistance);
        effect.delete();
        mainScriptUtils.debug('sidestep - effect deleted');
        return movedDistance;
    }
}