// Description: This script contains the main functions for the module.
import {mainScriptUtils} from "./lib/utils/mainScriptUtils.js";
import {effectMacros} from "./lib/effectmacros/effectMacros.js";
import {effectData} from "./lib/data/effectData.js";
import {registerSettings} from './settings.js';
import {
    ACTIONS_LIST,
    critCheckWorkflow,
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
    critCheckWorkflow.checkForCritsOnOther(workflow);
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