// Description: This file contains helper functions that are used in the main scripts.

// prepareEffects - This function prepares the effects to be applied to the target.
async function prepareEffects(effects, target) {
    // check if the effects are an array, if not convert it to an array
    effects = Array.isArray(effects) ? effects : [effects];
    // call the applyEffects function with the effects and target
    await Promise.all(effects.map(effect => applyEffect(effect, target)));
}

// applyEffect - This function applies the effect to the target.
async function applyEffect(effect, uuid) {
    // check if the effect is already applied
    let hasEffectApplied = await game.dfreds.effectInterface.hasEffectApplied(effect, uuid);
    if (!hasEffectApplied) {
        // apply the effect
        game.dfreds.effectInterface.addEffect({ effectName: effect, uuid});
    }
}

// search and delete unnecessary chat messages
async function deleteChatMessages (messageText){
    const messagesToDelete = game.messages.contents.filter(message =>
        message.flavor.includes(messageText) || message.content.includes(messageText)
    );
    for (let message of messagesToDelete) {
        message.delete();
    }
}

// acidBath - This function applies the acid bath effect to the target.
async function acidBath(target) {
    // check if the target has an equipped armor. if not, return
    const equippedArmor = target.system.attributes.ac.equippedArmor;
    if(!equippedArmor) return;
    // check if the equipped armor is magical, if not delete the armor. if yes, update the armor value and magical bonus
    const isMagical = equippedArmor.labels.properties.some(entry => entry.label === "Magical");
    if(isMagical) {
        target.system.attributes.ac.equippedArmor.system.updateSource({'armor.value' : 10 });
        target.system.attributes.ac.equippedArmor.system.updateSource({'armor.magicalBonus' :0 });
    } else {
        equippedArmor.delete();
    }
}
