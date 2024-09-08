// Description: helper functions that are used in the main scripts.
// prepareEffects - This function checks if the target is immune to the effect and calls the applyEffect function if not.
import {effectData} from "../data/effecData.js";

export const helperFunctions = {
    prepareEffects: async function (effects, targetUuid, tableName) {
        // check if effects are an array, if not convert
        effects = Array.isArray(effects) ? effects : [effects];
        await Promise.all(effects.map(async effect => {
            const isImmune = await this.checkImmunity(effect, targetUuid, tableName);
            if (!isImmune) {
                // check if the effect is in the effectData object, if not apply the sidebar effect
                const normalizedEffectName = await this.normalizeString(effect);
                // TODO: Use MidiQOL socketed method to apply the effect
                if (!effectData[normalizedEffectName]) {
                    const appliedEffect = chrisPremades.utils.effectUtils.getSidebarEffectData(effect);
                    const effectTarget = await fromUuid(targetUuid);
                    await chrisPremades.utils.effectUtils.createEffect(effectTarget, appliedEffect);
                } else {
                    const appliedEffect = effectData[normalizedEffectName];
                    const effectTarget = await fromUuid(targetUuid);
                    await chrisPremades.utils.effectUtils.createEffect(effectTarget, appliedEffect);
                }
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
        if (effect.toLowerCase().includes('bleeding')) {
            effect = 'Bleeding';
        }
        const target = await fromUuid(targetUuid);
        const isImmune = target.system.traits.ci.value.some(entry => entry === effect.toLowerCase());
        const hasDamageImmunity = target.system.traits.di.value.some(entry => entry === tableName.toLowerCase());
        if (isImmune || hasDamageImmunity) {
            effect = this.capitalizeFirstLetter(effect);
            await helperFunctions.createChatMessage(targetUuid, `<div class="result-text"><b>${effect}</b> - ` + target.name + ` is immune!</div>`);
            return true;
        }
        return false;
    },
    // Creates a chat message with the given speaker and message content.
    createChatMessage: async function (targetUuiD, msgContent) {
        let speakerActor = fromUuid(targetUuiD);
        let chatData = {
            content: msgContent,
            speaker: ChatMessage.getSpeaker(speakerActor),
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