// The cluster of bodies in the fight causes you to accidentally hit the nearest other target within range.

import {mainScriptUtils} from "../../../utils/mainScriptUtils.js";

export async function clusterofbodies(effect, fumbleToken, attackerActor) {
    const targetList = MidiQOL.findNearby(null, fumbleToken, 5, {isSeen: true}) // get all tokens regardless of their disposition
    if (targetList.length === 0) {
        ui.notifications.warn("No target found.");
        mainScriptUtils.debug("No token in 5ft radius.");
        effect.delete();
        return;
    }
    const targetToken = targetList[Math.floor(Math.random() * targetList.length)];
    const targetActor = targetToken.actor;
    const targetUuid = targetToken?.document?.uuid || effect?.parent?.token?.uuid;
    const attackerWeapon = attackerActor.items.find(i => i.system.actionType === 'mwak' && i.system.equipped === true);
    const attackerPlayer = await MidiQOL.playerForActor(attackerActor);
    await attackerPlayer.updateTokenTargets([]);
    await new Promise(r=>setTimeout(r,1000));
    if (attackerWeapon) {
        ChatMessage.create({ content: `${fumbleToken.name} hits ${targetToken.name} in the heat of the fight!`});
        const options = {
            advantage: false,
            disadvantage: false,
            versatile: false,
            fastForward: true,
            lateTargeting: true,
            targetUuids: [targetUuid],
            targetConfirmation: 'always'
        };
        await MidiQOL.completeItemUse(attackerWeapon, {}, options);
    } else {
        ui.notifications.warn(`${targetToken.name} has no equipped melee weapon for an attack.`);
    }
    effect.delete();
}