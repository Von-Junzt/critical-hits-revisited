import {workflowCache} from "../../../../utils/workflowCache.js";
import {mainScriptUtils} from "../../../../utils/mainScriptUtils.js";
import {animationUtils} from "../../../../utils/animationUtils.js";


export async function sparksFly (effect, dc) {
    mainScriptUtils.debug('sparksFly - effect: ', effect);
    const workflow = await workflowCache.getWorkflow();
    if (!workflow) {
        console.warn("No workflow available. Aborting script.");
        return;
    }
    const tokenUuid = effect?.parent?.token?.uuid || game.scenes.active?.tokens.find(token => token.actor?.id === effect?.target?.id)?.uuid;
    const token = await fromUuid(tokenUuid);
    // add debug object and print to console
    const debugObject = {
        tokenUuid: tokenUuid,
        token: token,
        workflow: workflow,
    }
    mainScriptUtils.debug("Debug Token:", debugObject);
    const targets = await MidiQOL.findNearby(1, token, 15);
    const targetToken = targets[Math.floor(Math.random() * targets.length)];
    if (!targetToken) {
        mainScriptUtils.debug("No token found at selected location.");
        effect.delete();
        return;
    }
    mainScriptUtils.debug("Target selected:", targetToken);
    const targetActor = targetToken.actor;
    mainScriptUtils.debug("Target selected:", targetActor);
    (!dc)? dc = 14 : null;
    const saveRoll = await targetActor.rollAbilitySave('dex', { flavor: `Dexterity Save (DC ${dc}) to avoid Sparks Fly` });
    const saved = saveRoll.total >= dc;
    const lastAttackDamage = workflow.damageList.find(entry => entry.targetUuid === tokenUuid).healingAdjustedTotalDamage;
    mainScriptUtils.debug("Last Attack Damage:", lastAttackDamage);
    const sparksDamage = Math.floor(lastAttackDamage / 2);
    mainScriptUtils.debug("Sparks Fly Damage:", sparksDamage);
    if (!saved) {
        animationUtils.playAnimation("sparksfly", token, targetToken)
        await MidiQOL.applyTokenDamage([{ damage: sparksDamage, type: 'lightning' }], sparksDamage, new Set([targetToken]), null, null, { flavor: "Sparks Fly Damage" });
        ChatMessage.create({ content: `${targetToken.name} fails the save and takes ${sparksDamage} lightning damage from Sparks Fly!` });
    } else {
        ChatMessage.create({ content: `${targetToken.name} succeeds on the save and avoids the Sparks Fly effect!` });
    }
    effect.delete();
    mainScriptUtils.debug("Sparks Fly effect deleted.");
}