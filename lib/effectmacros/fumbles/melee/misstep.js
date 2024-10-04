// Your target dodges and immediately makes an opportunity attack against you.

import {mainScriptUtils} from "../../../utils/mainScriptUtils.js";
import {workflowCache} from "../../../utils/workflowCache.js";

export async function misstep(effect, fumbleToken) {
    const workflow = await workflowCache.getWorkflow();
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
        const attackerPlayer = await MidiQOL.playerForActor(attackerActor);
        attackerPlayer.updateTokenTargets([fumbleToken.id]);
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
            actorUuid: attackerActor.uuid,
            targetUuids: [fumbleToken.document.uuid],
            checkGMStatus: false,
            workflowOptions: {
                attackerId: attackerToken.id,
                targetId: fumbleToken.id
            }
        };
        await MidiQOL.completeItemUse(attackerWeapon, {}, options);
    } else {
        ui.notifications.warn(`${attackerToken.name} has no equipped melee weapon for the opportunity attack.`);
    }
    effect.delete();
}