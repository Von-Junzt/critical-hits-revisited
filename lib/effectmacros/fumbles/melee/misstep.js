import {mainScriptUtils} from "../../../utils/mainScriptUtils.js";

/**
 * Your misstep and a random enemy makes an opportunity attack against you.
 * @param effect {effect} The effect object, passed by the effect macro
 * @param fumbleToken {token} The token object, passed by the effect macro. This token will be attacked.
 * @returns {Promise<void>}
 */
export async function misstep(effect, fumbleToken) {
    const targetList = MidiQOL.findNearby(-1, fumbleToken, 5, {isSeen: true}) // get all tokens of opposite disposition
    if (targetList.length === 0) {
        ui.notifications.warn("misstep - No target found.");
        mainScriptUtils.debug("misstep - No enemy token in 5ft radius.");
        effect.delete();
        return;
    }
    const attackerToken = targetList[Math.floor(Math.random() * targetList.length)];
    const attackerActor = attackerToken.actor;
    // check if the actor allready has had an opportunity attack this turn
    if (MidiQOL.hasUsedReaction(attackerActor)) {
        mainScriptUtils.debug('misstep - Actor has used reaction, aborting', attackerActor);
        return;
    }
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
    mainScriptUtils.debug("misstep - Debug Token:", debugObject);
    let popUpDialog = await foundry.applications.api.DialogV2.wait({
        window: {
            title: "Confirm Opportunity Attack",
            minimizable: true
        },
        content: `<p>${attackerToken.name} can make an attack of opportunity on your token.</p>`,
        buttons: [{
            action: "confirm",
            label: "Confirm Attack",
            default: true,
            callback: () => true
        }]
    });
    ChatMessage.create({ content: `${fumbleToken.name} missteps, allowing ${attackerToken.name} to make an opportunity attack!`});
    debugObject = {
        attackerPlayer: attackerPlayer,
        attackerPlayerName: attackerPlayer.name,
        attackerTargets: attackerPlayer.targets
    };
    mainScriptUtils.debug("misstep - Debug Token:", debugObject);
    const options = {
        advantage: false,
        checkGMStatus: true,
        disadvantage: false,
        versatile: false,
        fastForward: true,
        lateTargeting: true,
        targetUuids: [fumbleToken.document.uuid],
        targetConfirmation: 'always'
    };
    await MidiQOL.completeItemUse(attackerWeapon, {}, options);
    const appliedEffect = chrisPremades.utils.effectUtils.getSidebarEffectData('Reaction used');
    await chrisPremades.utils.effectUtils.createEffect(attackerActor, appliedEffect);
    effect.delete();
}