// Your target dodges and immediately makes an opportunity attack against you.

import {mainScriptUtils} from "../../../utils/mainScriptUtils.js";

export async function misstep(effect, token) {
    const targetList = MidiQOL.findNearby(-1, token, 5, {isSeen: true})
    if (!targetList) {
        mainScriptUtils.debug("No token found at selected location.");
        effect.delete();
        return;
    }
    const target = targetList[Math.floor(Math.random() * targetList.length)];
    const targetPlayer = await MidiQOL.playerForActor(target.actor);
    const targetActor = target.actor;
    const weapon = targetActor.items.find(i => i.system.actionType === 'mwak' && i.system.equipped === true);
    const debugObject = {
        target: target,
        targetActor: targetActor,
        targetPlayer: targetPlayer,
        weapon: weapon,
        token: token,
        effect: effect,
    };
    mainScriptUtils.debug("Debug Object:", debugObject);
    targetPlayer.targets.clear();
    targetPlayer.updateTokenTargets([token.id]);
    weapon.rollAttack();
    targetPlayer.targets.clear();
    effect.delete();
}