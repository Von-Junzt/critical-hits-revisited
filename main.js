// Description: This script contains the main functions for the module.
import {mainScriptUtils} from "./lib/utils/mainScriptUtils.js";
import {effectMacros} from "./lib/effectmacros/effectMacros.js";
import {effectData} from "./lib/data/effectData.js";
import {registerSettings} from './settings.js';
import {
    ACTIONS_LIST,
    critCheckWorkflow,
    memoize,
    OPTIONS,
    UNDESIRED_ACTIONS_LIST,
    UNDESIRED_TYPES
} from "./lib/logic/critCheckWorkflow.js";

// Add the helperFunctions and itemMacros to critCheckWorkflow
critCheckWorkflow.mainScriptUtils = mainScriptUtils;
critCheckWorkflow.effectMacros = effectMacros;
critCheckWorkflow.effectData = effectData;

// Register the settings and set the initial value for CRITS_ON_OTHER_ENABLED
Hooks.once('init', () => {
    registerSettings();
    OPTIONS.CRITS_ON_OTHER_ENABLED = game.settings.get('critical-hits-revisited', "critsOnOtherEnabled");
});


// Attach critCheckWorkflow to the game object once Foundry is fully loaded
Hooks.once('ready', () => {
    game.critsRevisited = critCheckWorkflow;
});

Hooks.on('midi-qol.preItemRoll', async (workflow) => {
    if (!OPTIONS.CRITS_ON_OTHER_ENABLED) {
        workflow.continueCritCheck = true;
        return;
    }
    mainScriptUtils.debug('Hooked into midi-qol.preCheckHits, checking for critical hits...');
    if (workflow.item.type !== "spell" || ACTIONS_LIST.has(workflow.item.system.actionType) || UNDESIRED_ACTIONS_LIST.has(workflow.item.system.actionType)) {
        workflow.continueCritCheck = true;
        return;
    }
    mainScriptUtils.debug('This is a spell attack, with no attack action. Checking for critical hits or fumbles...');
    mainScriptUtils.debug(workflow);
    const attackDamageType = workflow.item.labels.damageTypes.toLowerCase();
    if (UNDESIRED_TYPES.has(attackDamageType)) {
        console.warn('No critical hit or fumble for this damage type. Workflow aborted.');
        workflow.aborted = true;
        return false;
    }
    const roll = await new Roll("1d20").evaluate();
    await roll.toMessage({
        flavor: 'Rolling for critical hit',
        content: 'Rolling for critical hit',
        speaker: ChatMessage.getSpeaker(workflow.actor),
    });
    const critState = roll.result === '20' ? 'isOtherSpellCritical' : roll.result === '1' ? 'isFumble' : null;
    workflow.critState = critState;
    if (critState === 'isFumble') {
        mainScriptUtils.debug('Fumble for spell with other action detected, rolling on the spell fumble table and aborting workflow.');
        await critCheckWorkflow.rollOnTable(workflow.actor.uuid, 'Spell Critical Fumbles');
        workflow.aborted = true;
        return false;
    }
    if (critState === 'isOtherSpellCritical') {
        mainScriptUtils.debug('Critical hit for spell with other action detected, rolling on the spell critical hit table.');
        workflow.continueCritCheck = false;
        return true;
    }
    mainScriptUtils.debug('No critical hits or fumbles for spells with other action detected. Continuing workflow...');
    workflow.continueCritCheck = true;
});

Hooks.on('midi-qol.postActiveEffects', async (workflow) => {
    if(workflow.continueCritCheck) {
        mainScriptUtils.debug('Hooked into midi-qol.postActiveEffects.');
        mainScriptUtils.debug('Workflow:', workflow);
        await critCheckWorkflow.checkForCriticalHit(workflow);
    } else if(OPTIONS.CRITS_ON_OTHER_ENABLED && workflow.critState === 'isOtherSpellCritical') {
        const attackDamageType = await critCheckWorkflow.getAttackDamageType(workflow.damageDetail, workflow.damageItem);
        await critCheckWorkflow.handleCritEvents(workflow.damageList, attackDamageType)
        return false;
    } else {
        console.warn('Workflow was previously aborted. Aborting script.');
        return false;
    }
});