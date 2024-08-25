// Description: helper functions that are used in the main scripts.
// prepareEffects - This function checks if the target is immune to the effect and calls the applyEffect function if not.
export const helperFunctions = {
    prepareEffects: async function (effects, targetUuid, tableName) {
        // check if effects are an array, if not convert
        effects = Array.isArray(effects) ? effects : [effects];
        await Promise.all(effects.map(async effect => {
            const isImmune = await this.checkImmunity(effect, targetUuid, tableName);
            if (!isImmune) {
                let target = await fromUuid(targetUuid);
                let effectData = chrisPremades.utils.effectUtils.getSidebarEffectData(this.capitalizeFirstLetter(effect));
                this.capitalizeFirstLetter(effect);
                await chrisPremades.utils.effectUtils.createEffect(target, effectData);
            }
        }));
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
            effect = this.capitalizeFirstLetter(effect);
            await helperFunctions.createChatMessage(targetUuid, `<div class="result-text"><b>${effect}</b> - ` + target.name + ` is immune!</div>`);
            return true;
        }
        // This ChatMessage is for debug only
        // this.capitalizeFirstLetter(effect);
        // await helperFunctions.createChatMessage(targetUuid, `<div class="result-text"><b>${effect}</b> - ` + target.name + ` is not immune.</div>`);
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
    // capitalizeFirstLetter - This function returns a string with the first letter capitalized.
    capitalizeFirstLetter: function (string) {
        return string.charAt(0) === string.charAt(0).toUpperCase() ? string : string.charAt(0).toUpperCase() + string.slice(1);
    },
    // applyCPREffect - This function searches a CPR effect by string and applies it to the selected target.
    applyCPREffect: async function (effectName) {
        let effectDatabase = game.items.find(i => i.name === "CPR Effect Interface Storage").effects;
        let effectID = effectDatabase.find(e => e.name === effectName)._id;
        await chrisPremades.utils.effectUtils.toggleSidebarEffect(effectID);
    }
}