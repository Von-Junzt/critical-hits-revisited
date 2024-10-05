// Your misstep and a random enemy makes an opportunity attack against you.

import {mainScriptUtils} from "../../../utils/mainScriptUtils.js";

export async function misstep(effect, fumbleToken) {
    const targetList = MidiQOL.findNearby(-1, fumbleToken, 5, {isSeen: true})
    if (targetList.length === 0) {
        ui.notifications.warn("No target found.");
        mainScriptUtils.debug("No token found at selected location.");
        effect.delete();
        return;
    }
    const attackerToken = targetList[Math.floor(Math.random() * targetList.length)];
    const attackerActor = attackerToken.actor;
    const attackerWeapon = attackerActor.items.find(i => i.system.actionType === 'mwak' && i.system.equipped === true);
    const attackerPlayer = await MidiQOL.playerForActor(attackerActor);
    await attackerPlayer.updateTokenTargets([]);
    await new Promise(r=>setTimeout(r,1000));
    let debugObject = {
        attackerToken: attackerToken,
        attackerTokenName: attackerToken.name,
        attackerActor: attackerActor,
        attackerWeapon: attackerWeapon,
        fumbleToken: fumbleToken,
        effect: effect
    };
    mainScriptUtils.debug("Debug Token:", debugObject);
    if (attackerWeapon) {
        ChatMessage.create({ content: `${fumbleToken.name} makes a misstep, allowing ${attackerToken.name} to make an opportunity attack!`});
        let debugObject = {
            attackerPlayer: attackerPlayer,
            attackerPlayerName: attackerPlayer.name,
            attackerTargets: attackerPlayer.targets
        };
        mainScriptUtils.debug("Debug Token:", debugObject);
        const options = {
            advantage: false,
            disadvantage: false,
            versatile: false,
            fastForward: true,
            lateTargeting: true,
            targetUuids: [fumbleToken.document.uuid],
            targetConfirmation: 'always'
        };
        await MidiQOL.completeItemUse(attackerWeapon, {}, options);
    } else {
        ui.notifications.warn(`${attackerToken.name} has no equipped melee weapon for the opportunity attack.`);
    }
    effect.delete();
}