import {effectData} from "../data/effectData.js";
import {animationData} from "../data/animationData.js";
import {animationUtils} from "./animationUtils.js";
import {workflowCache} from "./workflowCache.js";

export const mainScriptUtils = {
    /**
     * Applies the given effects to the target actor and calls the animationUtils.animateEffect function. The script will
     * check first if the effect data is provided in the Chris' Premades module sidebar item. If not, it will use the
     * effect data from the effectData.js file.
     * It also will play the animation if the animationData.js file has the animation data for the effect.
     * @param effects {string/array} Effect names as strings or an array of effect names, retrieved from the effectData.js file.
     * @param targetActorUuid {string} The UUID of the target actor.
     * @param tableName {string} The name of the table of the effect roll to determine effect immunity and animation.
     * @returns {Promise<void>}
     */
    applyEffects: async function (effects, targetActorUuid, tableName) {
        const workflow = await workflowCache.getWorkflow();
        const attackerActor = await fromUuid(workflow.actor.uuid);
        const attackerToken = attackerActor.token || await fromUuid(workflow.tokenUuid);
        const targetActor = await fromUuid(targetActorUuid);
        const targetToken = targetActor.token || await fromUuid(workflow?.damageList?.find(entry => entry.actorUuid === targetActorUuid).tokenUuid);
        (!targetToken) ? await fromUuid(workflow.tokenUuid) : mainScriptUtils.debug(`No token found for target ${targetActorUuid}. Skipping effect roll.`);
        const debugObject = {
            "workflow": workflow,
            "attackerActor": attackerActor,
            "attackerToken": attackerToken,
            "targetActor": targetActor,
            "targetToken": targetToken,
            "effects": effects,
            "tableName": tableName,
            "targetUuid": targetActorUuid
        };
        mainScriptUtils.debug("applyEffects - Applying effects:", debugObject);
        effects = Array.isArray(effects) ? effects : [effects];
        let animationPlayed = false;
        await Promise.all(effects.map(async effect => {
            const {normalizedEffect, capitalizedEffect} = await this.prepareEffectNames(effect);
            if (!animationPlayed) {
                if (animationData[normalizedEffect]) {
                    // we don't want to play the animation because it's provided by the effect script
                    mainScriptUtils.debug("applyEffects - Trying to play animation:", normalizedEffect);
                    animationPlayed = true;
                } else if (animationData[tableName.toLowerCase()]) {
                    mainScriptUtils.debug("applyEffects - Playing animation:", tableName.toLowerCase());
                    await animationUtils.playAnimation(tableName.toLowerCase(), targetToken, attackerToken);
                    animationPlayed = true;
                }
            }
            const appliedEffect = chrisPremades.utils.effectUtils.getSidebarEffectData(capitalizedEffect) || effectData[normalizedEffect];
            const effectName = appliedEffect.name || capitalizedEffect;
            const isImmune = await this.checkImmunity(effect, targetActorUuid, tableName, effectName);
            if (!isImmune) {
                const effectTarget = await fromUuid(targetActorUuid);
                await chrisPremades.utils.effectUtils.createEffect(effectTarget, appliedEffect);
            }
        }));
    },
    /**
     * Checks if the target has immunity to the effect or damage type by checking for name in the target's immunity array.
     * @param effect {string} The name of the effect to check for immunity.
     * @param targetUuid {string} The UUID of the target actor.
     * @param damageType {string} The name of the damage type to check for immunity.
     * @param appliedEffectName {string} The name of the effect to be applied. This may be redundant, but it's used to create a more descriptive message.
     * @returns {Promise<boolean>}
     */
    checkImmunity: async function (effect, targetUuid, damageType, appliedEffectName) {
        if (effect.toLowerCase().includes('bleeding')) {
            effect = 'Bleeding';
        }
        const target = await fromUuid(targetUuid);
        const hasConditionImmunity = target.system.traits.ci.value.some(entry => entry === effect.toLowerCase());
        const hasDamageImmunity = target.system.traits.di.value.some(entry => entry === damageType.toLowerCase());
        if (hasConditionImmunity || hasDamageImmunity) {
            await mainScriptUtils.createMessage(targetUuid, `<div class="result-text"><b>${appliedEffectName}</b> - ` + target.name + ` is immune!</div>`);
            return true;
        }
        return false;
    },
    /**
     * Creates a message in the chat window.
     * @param targetUuiD {string} The UUID of the target actor.
     * @param msgContent {string} The content of the message.
     * @returns {Promise<void>}
     */
    createMessage: async function (targetUuiD, msgContent) {
        const speakerActor = fromUuid(targetUuiD);
        let chatData = {
            content: msgContent,
            speaker: ChatMessage.getSpeaker(speakerActor),
        };
        ChatMessage.create(chatData);
    },
    // normalizeString - Remove all spaces and convert to lowercase
    /**
     * Normalizes a string by removing spaces and converting to lowercase.
     * @param input {string} The input string to normalize.
     * @returns {Promise<string>}
     */
    normalizeString: async function (input) {
        return input.replace(/\s+/g, '').toLowerCase();
    },
    /**
     * Get the normalized and capitalized name of the effect
     * @param effect
     * @returns {Promise<{capitalizedEffect, normalizedEffect: *}>}
     */
    prepareEffectNames: async function (effect) {
        const normalizedEffect = await this.normalizeString(effect);
        const capitalizedEffect = effect.capitalize();
        return {normalizedEffect, capitalizedEffect};
    },
    /**
     * Searches a CPR effect by string and applies it to the selected target. Not used in the current version.
     * @param effectName {string} The name of the effect to apply.
     * */
    applyCPREffect: async function (effectName) {
        let effectDatabase = game.items.find(i => i.name === "CPR Effect Interface Storage").effects;
        let effectID = effectDatabase.find(e => e.name === effectName)._id;
        await chrisPremades.utils.effectUtils.toggleSidebarEffect(effectID);
    },
    /**
     * Logs a debug message to the console.
     * @param message {string} Debug message to log.
     * @param data {any} Data to log.
     */
    debug: function(message, data) {
        if (!game.settings.get('critical-hits-revisited', 'enableDebug')) return;
        if (data !== undefined) {
            console.log(`Critical Hits Revisited | ${message}`, data);
        } else {
            console.log(`Critical Hits Revisited | ${message}`);
        }
    }
}


