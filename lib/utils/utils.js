// Description: helper functions that are used in the main scripts.
// applyEffects - This function checks if the target is immune to the effect and calls the applyEffect function if not.
import {effectData} from "../data/effecData.js";

export const utils = {
    applyEffects: async function (effects, targetUuid, tableName) {
        // check if effects are an array, if not convert
        effects = Array.isArray(effects) ? effects : [effects];
        await Promise.all(effects.map(async effect => {
        const isImmune = await this.checkImmunity(effect, targetUuid, tableName);
        if (!isImmune) {
            const normalizedEffect = await this.normalizeString(effect);
            const capitalizedEffect = this.capitalizeFirstLetter(effect);
            const appliedEffect = effectData[normalizedEffect] || chrisPremades.utils.effectUtils.getSidebarEffectData(capitalizedEffect);
            const effectTarget = await fromUuid(targetUuid);
            await chrisPremades.utils.effectUtils.createEffect(effectTarget, appliedEffect);
            }
        }));
    },
    // Searches and deletes chat messages
    deleteChatMessages: async function (messageText) {
        const messagesToDelete = game.messages.contents.filter(message =>
            message.flavor.includes(messageText) || message.content.includes(messageText)
        );
        for (let message of messagesToDelete) {
            message.delete();
        }
    },
    // Checks if the target has immunity to the effect by checking for the object name of the effect in the target's immunity array.
    checkImmunity: async function (effect, targetUuid, tableName) {
        // Bleeding is a special case, as it is a general effect and not a damage type.
        if (effect.toLowerCase().includes('bleeding')) {
            effect = 'Bleeding';
        }
        const target = await fromUuid(targetUuid);
        const isImmune = target.system.traits.ci.value.some(entry => entry === effect.toLowerCase());
        const hasDamageImmunity = target.system.traits.di.value.some(entry => entry === tableName.toLowerCase());
        if (isImmune || hasDamageImmunity) {
            effect = this.capitalizeFirstLetter(effect);
            await utils.createMessage(targetUuid, `<div class="result-text"><b>${effect}</b> - ` + target.name + ` is immune!</div>`);
            return true;
        }
        return false;
    },
    // Creates a chat message with the given speaker and message content.
    createMessage: async function (targetUuiD, msgContent) {
        let speakerActor = fromUuid(targetUuiD);
        let chatData = {
            content: msgContent,
            speaker: ChatMessage.getSpeaker({actor: speakerActor}),
        };
        ChatMessage.create(chatData);
    },
    // Returns a string with the first letter capitalized.
    capitalizeFirstLetter: function (string) {
        return string.charAt(0) === string.charAt(0).toUpperCase() ? string : string.charAt(0).toUpperCase() + string.slice(1);
    },
    // Searches a CPR effect by string and applies it to the selected target.
    applyCPREffect: async function (effectName) {
        let effectDatabase = game.items.find(i => i.name === "CPR Effect Interface Storage").effects;
        let effectID = effectDatabase.find(e => e.name === effectName)._id;
        await chrisPremades.utils.effectUtils.toggleSidebarEffect(effectID);
    },
    // normalizeString - Remove all spaces and convert to lowercase
    normalizeString: async function (input) {
        return input.replace(/\s+/g, '').toLowerCase();
    }
}