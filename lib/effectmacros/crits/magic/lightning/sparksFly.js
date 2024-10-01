import {workflowCache} from "../../../../utils/workflowCache.js";
import {mainScriptUtils} from "../../../../utils/mainScriptUtils.js";

export async function sparksFly (effect) {
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
    const result = await chrisPremades.utils.crosshairUtils.aimCrosshair({
        token: token._object,
        maxRange: 15,
        drawBoundries: true,
        trackDistance: true,
        crosshairsConfig: {
            size: canvas.grid.distance,
            icon: 'icons/svg/lightning.svg',
            label: 'Select Sparks Fly Target',
            drawIcon: true,
            drawOutline: true,
            fillColor: 0x00FFFF,
            fillAlpha: 0.1
        }
    });
    if (!result || result.cancelled || !result.valid) {
        mainScriptUtils.debug("No valid target selected.");
        effect.delete();
        return;
    }
    mainScriptUtils.debug("Target selected:", result)
    const targetToken = canvas.tokens.placeables.reduce((closest, token) => {
        const dx = token.x - result.x;
        const dy = token.y - result.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        return (distance < closest.distance) ? {token, distance} : closest;
    }, {token: null, distance: Infinity}).token;
    if (!targetToken) {
        mainScriptUtils.debug("No token found at selected location.");
        effect.delete();
        return;
    }
    const targetActor = targetToken.actor;
    mainScriptUtils.debug("Target selected:", targetActor);
    const dc = 14;
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
