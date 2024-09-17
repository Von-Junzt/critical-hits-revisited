// Description: helper functions that are used in the main scripts.
// applyEffects - This function checks if the target is immune to the effect and calls the applyEffect function if not.
import {effectData} from "../data/effecData.js";

export const utils = {
    applyEffects: async function (effects, targetUuid, tableName) {
        effects = Array.isArray(effects) ? effects : [effects];
        await Promise.all(effects.map(async effect => {
            const { normalizedEffect, capitalizedEffect } = await this.prepareEffectNames(effect);
            const appliedEffect = effectData[normalizedEffect] || chrisPremades.utils.effectUtils.getSidebarEffectData(capitalizedEffect);
            const isImmune = await this.checkImmunity(effect, targetUuid, tableName, appliedEffect.name);
            if (!isImmune) {
                const effectTarget = await fromUuid(targetUuid);
                await chrisPremades.utils.effectUtils.createEffect(effectTarget, appliedEffect);
            }
        }));
    },
    // Checks if the target has immunity to the effect by checking for the object name of the effect in the target's immunity array.
    checkImmunity: async function (effect, targetUuid, damageType, appliedEffectName) {
        if (effect.toLowerCase().includes('bleeding')) {
            effect = 'Bleeding';
        }
        const target = await fromUuid(targetUuid);
        const isImmune = target.system.traits.ci.value.some(entry => entry === effect.toLowerCase());
        const hasDamageImmunity = target.system.traits.di.value.some(entry => entry === damageType.toLowerCase());
        if (isImmune || hasDamageImmunity) {
            await utils.createMessage(targetUuid, `<div class="result-text"><b>${appliedEffectName}</b> - ` + target.name + ` is immune!</div>`);
            return true;
        }
        return false;
    },
    // Creates a chat message with the given speaker and message content.
    createMessage: async function (targetUuiD, msgContent) {
        const speakerActor = fromUuid(targetUuiD);
        let chatData = {
            content: msgContent,
            speaker: ChatMessage.getSpeaker(speakerActor),
        };
        ChatMessage.create(chatData);
    },
    // normalizeString - Remove all spaces and convert to lowercase
    normalizeString: async function (input) {
        return input.replace(/\s+/g, '').toLowerCase();
    },
    // getEffectData - Get the normalized and capitalized effect
    prepareEffectNames: async function (effect) {
        const normalizedEffect = await this.normalizeString(effect);
        const capitalizedEffect = effect.capitalize();
        return { normalizedEffect, capitalizedEffect };
    },
    // Searches a CPR effect by string and applies it to the selected target.
    applyCPREffect: async function (effectName) {
        let effectDatabase = game.items.find(i => i.name === "CPR Effect Interface Storage").effects;
        let effectID = effectDatabase.find(e => e.name === effectName)._id;
        await chrisPremades.utils.effectUtils.toggleSidebarEffect(effectID);
    }
}