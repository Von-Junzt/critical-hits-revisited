// The cluster of bodies in the fight causes you to accidentally hit the nearest other target within range.

import {mainScriptUtils} from "../../../utils/mainScriptUtils.js";

export async function clusterOfBodies(effect, fumbleToken, fumbleActor) {
    const targetList = MidiQOL.findNearby(null, fumbleToken, 5, {isSeen: true}) // get all tokens regardless of their disposition
    if (targetList.length === 0) {
        ui.notifications.warn("clusterofbodies - No target found.");
        mainScriptUtils.debug("clusterofbodies - No token in 5ft radius.");
        effect.delete();
        return;
    }
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
    await fumblePlayer.updateTokenTargets([]);
    await new Promise(r=>setTimeout(r,1000));
    if (fumbleWeapon) {
        ChatMessage.create({ content: `${fumbleActor.name} misses his target and hits ${targetToken.name} in the heat of the fight!`});
        const options = {
            advantage: false,
            disadvantage: false,
            versatile: false,
            fastForward: true,
            lateTargeting: true,
            targetUuids: [targetUuid],
            targetConfirmation: 'always'
        };
        await MidiQOL.completeItemUse(fumbleWeapon, {}, options);
    } else {
        ui.notifications.warn(`${targetToken.name} has no equipped melee weapon for an attack.`);
    }
    effect.delete();
}