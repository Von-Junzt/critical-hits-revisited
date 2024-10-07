import {workflowCache} from "../../../../utils/workflowCache.js";
import {mainScriptUtils} from "../../../../utils/mainScriptUtils.js";
import {animationUtils} from "../../../../utils/animationUtils.js";

/**
 * Sparks Fly determines possible targets within a 15ft radius and applies damage to each target.
 * @param effect {effect} The effect object, passed in by the effect macro.
 * @param token {token} The token object, passed in by the effect macro.
 * @param dc {number} The difficulty class of the saving throw, passed in by the effect macro.
 * @returns {Promise<void>}
 */

export async function sparksFly (effect, token, dc) {
    const workflow = await workflowCache.getWorkflow();
    if (!workflow) {
        console.warn("sparksfly - No workflow available. Aborting script.");
        return;
    }
    const tokenUuid = token.document.uuid;
    // add debug object and print to console
    const debugObject = {
        tokenUuid: tokenUuid,
        token: token,
        workflow: workflow,
        effect: effect
    }
    mainScriptUtils.debug("sparksfly - Debug Token:", debugObject);
    const targets = await MidiQOL.findNearby(1, token, 15);
    const targetToken = targets[Math.floor(Math.random() * targets.length)];
    if (!targetToken) {
        mainScriptUtils.debug("sparksfly - No token found at selected location.");
        effect.delete();
        return;
    }
    mainScriptUtils.debug("sparksfly - Target selected:", targetToken);
    const targetActor = targetToken.actor;
    mainScriptUtils.debug("sparksfly - Target selected:", targetActor);
    (!dc)? dc = 14 : null;
    const saveRoll = await targetActor.rollAbilitySave('dex', { flavor: `Dexterity Save (DC ${dc}) to avoid Sparks Fly` });
    const saved = saveRoll.total >= dc;
    const lastAttackDamage = workflow.damageList.find(entry => entry.targetUuid === tokenUuid).healingAdjustedTotalDamage;
    mainScriptUtils.debug("sparksfly - Last Attack Damage:", lastAttackDamage);
    const sparksDamage = Math.floor(lastAttackDamage / 2);
    mainScriptUtils.debug("sparksfly - Sparks Fly Damage:", sparksDamage);
    animationUtils.playAnimation("sparksfly", token, targetToken);
    if (!saved) {
        await MidiQOL.applyTokenDamage([{ damage: sparksDamage, type: 'lightning' }], sparksDamage, new Set([targetToken]), null, null, { flavor: "Sparks Fly Damage" });
        ChatMessage.create({ content: `${targetToken.name} fails the save and takes ${sparksDamage} lightning damage from Sparks Fly!` });
    } else {
        ChatMessage.create({ content: `${targetToken.name} succeeds on the save and avoids the Sparks Fly effect!` });
    }
    effect.delete();
    mainScriptUtils.debug("sparksfly - Sparks Fly effect deleted.");
}