// Description: This file contains helper functions that are used in the main scripts.
// prepareEffects - This function prepares the effects to be applied to the target.
export const helperFunctions = {
    prepareEffects: async function (effects, targetUuid, tableName) {
        // check if the effects are an array, if not convert it to an array
        effects = Array.isArray(effects) ? effects : [effects];
        // call the checkImmunity function for each effect and apply the effect if the target is not immune
        await Promise.all(effects.map(async effect => {
            const isImmune = await this.checkImmunity(effect, targetUuid, tableName);
            if (!isImmune) {
                await this.applyEffect(effect, targetUuid);
            }
        }));
    },
    // applyEffect - This function applies the effect to the target.
    applyEffect: async function (effect, targetUuid) {
        // check if the effect is already applied
        let hasEffectApplied = await game.dfreds.effectInterface.hasEffectApplied(effect, targetUuid);
        if (!hasEffectApplied) {
            // apply the effect
            game.dfreds.effectInterface.addEffect({effectName: effect, uuid: targetUuid});
        }
    },
    // deleteChatMessages - This function searches and deletes chat messages
    deleteChatMessages: async function (messageText) {
        const messagesToDelete = game.messages.contents.filter(message =>
            message.flavor.includes(messageText) || message.content.includes(messageText)
        );
        for (let message of messagesToDelete) {
            message.delete();
        }
    },
    // checkImmunity - This function checks if the target has immunity to the effect by checking for the object name of the effect in the target's immunity array.
    checkImmunity: async function (effect, targetUuid, tableName) {
        if (effect.toLowerCase().includes('bleeding')) {
            effect = 'Bleeding';
        }
        const target = await fromUuid(targetUuid);
        const isImmune = target.system.traits.ci.value.some(entry => entry === effect.toLowerCase());
        const hasDamageImmunity = target.system.traits.di.value.some(entry => entry === tableName.toLowerCase());
        if (isImmune || hasDamageImmunity) {
            this.capitalizeFirstLetter(effect);
            await helperFunctions.createChatMessage(targetUuid, `<div class="result-text"><b>${effect}</b> - ` + target.name + ` is immune!</div>`);
            return true;
        }
        this.capitalizeFirstLetter(effect);
        await helperFunctions.createChatMessage(targetUuid, `<div class="result-text"><b>${effect}</b> - ` + target.name + ` is not immune.</div>`);
        return false;
    },
    // createChatMessage - This function creates a chat message with the given speaker and message content.
    createChatMessage: async function (speaker, msgContent) {
        let chatData = {
            user: speaker._id,
            content: msgContent,
            speaker: ChatMessage.getSpeaker(),
        };
        ChatMessage.create(chatData);
    },
    // This function returns a string with the first letter capitalized.
    capitalizeFirstLetter: function (string) {
        return string.charAt(0) === string.charAt(0).toUpperCase() ? string : string.charAt(0).toUpperCase() + string.slice(1);
    }
}