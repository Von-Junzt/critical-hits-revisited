// Description: This file contains helper functions that are used in the main scripts.
// prepareEffects - This function prepares the effects to be applied to the target.
export const helperFunctions = {
    prepareEffects: async function (effects, target) {
        // check if the effects are an array, if not convert it to an array
        effects = Array.isArray(effects) ? effects : [effects];
        // call the applyEffects function with the effects and target
        await Promise.all(effects.map(effect => this.applyEffect(effect, target)));
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
    createChatMessage: async function (speaker, msgContent) {
        let chatData = {
            user: speaker._id,
            content: msgContent,
            speaker: ChatMessage.getSpeaker(),
        };
        ChatMessage.create(chatData);
    }
}