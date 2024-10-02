import {mainScriptUtils} from "../../../../utils/mainScriptUtils.js";
import {animationUtils} from "../../../../utils/animationUtils.js";

export async function acidBath(actor, effect) {
    mainScriptUtils.debug("Acid Bath", actor);
    mainScriptUtils.debug("Acid Bath", effect);
    const equippedArmor = actor.system.attributes.ac.equippedArmor;
    const tokenUuid = effect?.parent?.token?.uuid || game.scenes.active?.tokens.find(token => token.actor?.id === effect?.target?.id)?.uuid;
    const token = await fromUuid(tokenUuid);
    animationUtils.playAnimation('acidbath', token);
    if (!equippedArmor) {
        await mainScriptUtils.createMessage(actor.Uuid, '<div class="result-text"><b>Acid Bath</b> - ' + actor.name + ' has no armor equipped!' + '</div>');
        return;
    }
    mainScriptUtils.debug("Debug Token:", token);
    const isMagical = equippedArmor.labels.properties.some(entry => entry.label === "Magical");
    if (isMagical) {
        await actor.system.attributes.ac.equippedArmor.system.updateSource({'armor.value': 10});
        await actor.system.attributes.ac.equippedArmor.system.updateSource({'armor.magicalBonus': 0});
        await mainScriptUtils.createMessage(actor.Uuid, '<div class="result-text"><b>Acid Bath</b> - The acid of the last attack has rendered ' + actor.name + 's armor useless! It has magical properties so it can be repaired.' + '</div>');
    } else {
        equippedArmor.delete();
        await mainScriptUtils.createMessage(actor.Uuid, '<div class="result-text"><b>Acid Bath</b> - The acid of the last attack has destroyed ' + actor.name + 's armor because it had no magical properties!' + '</div>');
    }
}