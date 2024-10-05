import {effectData} from "../data/effectData.js";
import {animationData} from "../data/animationData.js";
import {animationUtils} from "./animationUtils.js";
import {workflowCache} from "./workflowCache.js";

export const mainScriptUtils = {
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
            const appliedEffect = effectData[normalizedEffect] || chrisPremades.utils.effectUtils.getSidebarEffectData(capitalizedEffect);
            const effectName = appliedEffect.name || capitalizedEffect;
            const isImmune = await this.checkImmunity(effect, targetActorUuid, tableName, effectName);
            if (!isImmune) {
                const effectTarget = await fromUuid(targetActorUuid);
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
        const hasConditionImmunity = target.system.traits.ci.value.some(entry => entry === effect.toLowerCase());
        const hasDamageImmunity = target.system.traits.di.value.some(entry => entry === damageType.toLowerCase());
        if (hasConditionImmunity || hasDamageImmunity) {
            await mainScriptUtils.createMessage(targetUuid, `<div class="result-text"><b>${appliedEffectName}</b> - ` + target.name + ` is immune!</div>`);
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
    // getEffectUuid - Get the normalized and capitalized effect
    prepareEffectNames: async function (effect) {
        const normalizedEffect = await this.normalizeString(effect);
        const capitalizedEffect = effect.capitalize();
        return {normalizedEffect, capitalizedEffect};
    },
    // Searches a CPR effect by string and applies it to the selected target.
    applyCPREffect: async function (effectName) {
        let effectDatabase = game.items.find(i => i.name === "CPR Effect Interface Storage").effects;
        let effectID = effectDatabase.find(e => e.name === effectName)._id;
        await chrisPremades.utils.effectUtils.toggleSidebarEffect(effectID);
    },
    debug: function(message, data) {
        if (!game.settings.get('critical-hits-revisited', 'enableDebug')) return;
        if (data !== undefined) {
            console.log(`Critical Hits Revisited | ${message}`, data);
        } else {
            console.log(`Critical Hits Revisited | ${message}`);
        }
    }
}


