// Description: This file contains helper functions that are used in the main scripts.
// prepareEffects - This function prepares the effects to be applied to the target.
export const helperFunctions = {
    prepareEffects: async function (effects, target) {
        // check if the effects are an array, if not convert it to an array
        effects = Array.isArray(effects) ? effects : [effects];
        // call the checkImmunity function for each effect and apply the effect if the target is not immune
        await Promise.all(effects.map(async effect => {
            const isImmune = await this.checkImmunity(effect, target);
            if (!isImmune) {
                await this.applyEffect(effect, target);
            }
        }));
    },
    // applyEffect - This function applies the effect to the target.
    applyEffect: async function (effect, uuid) {
        // check if the effect is already applied
        let hasEffectApplied = await game.dfreds.effectInterface.hasEffectApplied(effect, uuid);
        if (!hasEffectApplied) {
            // apply the effect
            game.dfreds.effectInterface.addEffect({effectName: effect, uuid});
        }
    },
    // search and delete unnecessary chat messages
    deleteChatMessages: async function (messageText) {
        const messagesToDelete = game.messages.contents.filter(message =>
            message.flavor.includes(messageText) || message.content.includes(messageText)
        );
        for (let message of messagesToDelete) {
            message.delete();
        }
    },
    // checkImmunity - This function checks if the target has immunity to the effect or damage type.
    checkImmunity: async function (effect, target) {
        const isImmune = target.system.traits.ci.value.some(entry => entry === effect);
        const hasDamageImmunity = target.system.traits.di.value.includes(effect);

        if (isImmune || hasDamageImmunity) {
            await helperFunctions.createChatMessage(target, `<div class="result-text"><b>${effect}</b> - ${target.name} is immune!</div>`);
            return;
        }

        await helperFunctions.createChatMessage(target, `<div class="result-text"><b>${effect}</b> - ${target.name} is not immune.</div>`);
    },
    createChatMessage: async function (speaker, msgContent) {
        let chatData = {
            user: speaker._id,
            content: msgContent,
            speaker: ChatMessage.getSpeaker(),
        };
        ChatMessage.create(chatData);
    }
}