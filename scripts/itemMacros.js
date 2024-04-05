import { helperFunctions } from './helperFunctions.js';

export const itemMacros = {
    // acidBath - This function applies the acid bath effect to the target. And destroys the equipped armor if it is not magical.
    acidBath: async function (target) {
        // check if the target has an equipped armor. if not, return
        const equippedArmor = target.system.attributes.ac.equippedArmor;
        if (!equippedArmor) {
            await helperFunctions.createChatMessage(target, '<div class="result-text"><b>Acid Bath</b> - ' + target.name + ' has no armor equipped!' + '</div>');
            return;
        }

        // check if the equipped armor is magical, if not delete the armor. if yes, update the armor value and magical bonus
        const isMagical = equippedArmor.labels.properties.some(entry => entry.label === "Magical");
        if (isMagical) {
            target.system.attributes.ac.equippedArmor.system.updateSource({'armor.value': 10});
            target.system.attributes.ac.equippedArmor.system.updateSource({'armor.magicalBonus': 0});
            await helperFunctions.createChatMessage(target, '<div class="result-text"><b>Acid Bath</b> - The acid of the last attack has rendered ' + target.name + 's armor useless! It has magical properties so it can be repaired.' + '</div>');
        } else {
            equippedArmor.delete();
            await helperFunctions.createChatMessage(target, '<div class="result-text"><b>Acid Bath</b> - The acid of the last attack has destroyed ' + target.name + 's armor because it has no magical properties!' + '</div>');
        }
    }
}
