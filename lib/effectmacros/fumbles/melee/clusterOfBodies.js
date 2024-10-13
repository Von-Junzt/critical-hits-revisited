import {mainScriptUtils} from "../../../utils/mainScriptUtils.js";
import {workflowCache} from "../../../utils/workflowCache.js";

/**
 * The cluster of bodies in the fight causes you to accidentally hit the nearest other target within range.
 * clusterOfBodies is a script that is called in an effect macro. It will create a dialog to select a target and then move the token in that direction.
 * @param effect {effect} The effect object, passed by the effect macro
 * @param fumbleToken {token} The token object, passed by the effect macro. This token will be moved.
 * @param fumbleActor {actor} The actor object, passed by the effect macro. It's used to e.g. determine the attack weapon
 * @returns {Promise<void>}
 */

export async function clusterOfBodies(effect, fumbleToken, fumbleActor) {
    let targetList = MidiQOL.findNearby(null, fumbleToken, 5, {isSeen: true}) // get all tokens regardless of their disposition
    if (targetList.length === 0) {
        ui.notifications.warn("clusterofbodies - No target found.");
        mainScriptUtils.debug("clusterofbodies - No token in 5ft radius.");
        effect.delete();
        return;
    }
    const workflow = await workflowCache.getWorkflow();
    const originalTargetUuid = workflow.options.targetUuids[0];
    targetList = targetList.filter(token => token?.document?.uuid !== originalTargetUuid);
    const targetToken = targetList[Math.floor(Math.random() * targetList.length)];
    const targetUuid = targetToken?.document?.uuid || effect?.parent?.token?.uuid;
    const fumbleWeapon = fumbleActor.items.find(i => i.system.actionType === 'mwak' && i.system.equipped === true);
    const fumblePlayer = await MidiQOL.playerForActor(fumbleActor);
    let debugObject = {
        targetToken: targetToken,
        targetUuid: targetUuid,
        targetTokenName: targetToken.name,
        fumbleToken: fumbleToken,
        fumbleTokenName: fumbleToken.name,
        attackerActor: fumbleActor,
        attackerWeapon: fumbleWeapon,
        effect: effect
    };
    mainScriptUtils.debug("clusterofbodies - Target list: " + debugObject);
    await fumblePlayer.updateTokenTargets([]);
    await new Promise(r=>setTimeout(r,1000));
    let popUpDialog = await new foundry.applications.api.DialogV2({
        window: {
            title: "Confirm Opportunity Attack",
            minimizable: true
        },
        content: `<p>You misstep and attack a random target.</p>`,
        buttons: [{
            action: "confirm",
            label: "Confirm Attack",
            default: true,
            callback: () => true
        }]
    }).render({ force: true });
    ChatMessage.create({content: `${fumbleActor.name} misses his target and hits ${targetToken.name} in the heat of the fight!`});
    const options = {
        advantage: false,
        checkGMStatus: true,
        disadvantage: false,
        versatile: false,
        fastForward: true,
        lateTargeting: true,
        targetUuids: [targetUuid],
        targetConfirmation: 'always'
    };
    await MidiQOL.completeItemUse(fumbleWeapon, {}, options);
    effect.delete();
}

