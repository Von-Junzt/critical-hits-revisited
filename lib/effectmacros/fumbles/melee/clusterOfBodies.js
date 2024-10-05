// The cluster of bodies in the fight causes you to accidentally hit the nearest other target within range.

import {mainScriptUtils} from "../../../utils/mainScriptUtils.js";
import {workflowCache} from "../../../utils/workflowCache.js";

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
    targetList = targetList.filter(token => token.id !== originalTargetUuid);
    const targetToken = targetList[Math.floor(Math.random() * targetList.length)];
    const targetUuid = targetToken?.document?.uuid || effect?.parent?.token?.uuid;
    const fumbleWeapon = fumbleActor.items.find(i => i.system.actionType === 'mwak' && i.system.equipped === true);
    const fumblePlayer = await MidiQOL.playerForActor(fumbleActor);
    let debugObject = {
        targetList: targetList,
        targetToken: targetToken,
        targetUuid: targetUuid,
        targetTokenName: targetToken.name,
        fumbleToken: fumbleToken,
        fumbleTokenName: fumbleToken.name,
        attackerActor: fumbleActor,
        attackerWeapon: fumbleWeapon,
        effect: effect
    };
    mainScriptUtils.debug("clusterofbodies - Debug Object", debugObject);
    await fumblePlayer.updateTokenTargets([]);
    await new Promise(r=>setTimeout(r,1000));
    ChatMessage.create({ content: `${fumbleActor.name} misses his target and hits ${targetToken.name} in the heat of the fight!`});
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