import {workflowCache} from "../../../../utils/workflowCache.js";
import {mainScriptUtils} from "../../../../utils/mainScriptUtils.js";


export async function sparksFly (effect, dc) {
    const workflow = await workflowCache.getWorkflow();
    if (!workflow) {
        console.warn("No workflow available. Aborting script.");
        return;
    }
    const actorUuid = workflow.actor.uuid;
    const actor = await fromUuid(workflow.actor.uuid);
    const actorToken = await game.scenes.active.tokens.find(token => token.actor?.id === actor.id);
    const tokenUuid = effect.parent.token.uuid;
    const token = await fromUuid(tokenUuid);
    // add debug object and print to console
    const debugObject = {
        actor: actor,
        actorUuid: actorUuid,
        actorToken: actorToken,
        tokenUuid: tokenUuid,
        token: token,
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
        let animation = 'jb2a.electric_arc.blue.01';
        new Sequence().effect().atLocation(token).stretchTo(targetToken).file(animation).duration(300).play();
        const activeUserIds = game.users.filter(user => user.active).map(user => user.id);
        new Sequence().sound().file("modules/dnd5e-animations/assets/sounds/Damage/Lightning/electric-shock-1.mp3").forUsers(activeUserIds).play();
        await MidiQOL.applyTokenDamage([{ damage: sparksDamage, type: 'lightning' }], sparksDamage, new Set([targetToken]), null, null, { flavor: "Sparks Fly Damage" });
        ChatMessage.create({ content: `${targetToken.name} fails the save and takes ${sparksDamage} lightning damage from Sparks Fly!` });
    } else {
        ChatMessage.create({ content: `${targetToken.name} succeeds on the save and avoids the Sparks Fly effect!` });
    }
    effect.delete();
    mainScriptUtils.debug("Sparks Fly effect deleted.");
}