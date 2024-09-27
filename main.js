// Description: This script contains the main functions for the module.
import {critCheckWorkflow} from "./lib/logic/critCheckWorkflow.js";
import {mainScriptUtils} from "./lib/utils/mainScriptUtils.js";
import {effectMacros} from "./lib/effectmacros/effectMacros.js";
import {effectData} from "./lib/data/effectData.js";
import {registerSettings} from './settings.js';
import {OPTIONS, updateOptions} from "./options.js";
import {workflowCache} from "./lib/utils/workflowCache.js";

export let socket;

// Register the socket event to get the workflow by target UUID
Hooks.once('socketlib.ready', async function() {
    socket = socketlib.registerModule('critical-hits-revisited');
    socket.register("saveWorkflow", workflowCache.saveWorkflow);
    socket.register("deleteAllWorkflows", workflowCache.deleteWorkflow);
    socket.register("saveDialogResult", workflowCache.saveDialogResult);
    socket.register('sentReeling', effectMacros.sentReeling);
});

// Register the settings and set the initial value for CRITS_ON_OTHER_ENABLED
Hooks.once('init', () => {
    registerSettings();
    OPTIONS.CRITS_ON_OTHER_ENABLED = game.settings.get('critical-hits-revisited', "critsOnOtherEnabled");
});

// Attach critCheckWorkflow to the game object once Foundry is fully loaded
Hooks.once('ready', () => {
    updateOptions();
    game.critsRevisited = {
        critCheckWorkflow,
        effectMacros,
        effectData,
        workflowCache,
        socket,
    };
});

Hooks.on('midi-qol.preItemRoll', async (workflow) => {
    await workflowCache.deleteWorkflow();
    await workflowCache.deleteCachedDialogResult();
    await critCheckWorkflow.checkForCritsOnOther(workflow);
});

Hooks.on('midi-qol.postActiveEffects', async (workflow) => {
    if(workflow.continueCritCheck) {
        mainScriptUtils.debug('Hooked into midi-qol.postActiveEffects.');
        mainScriptUtils.debug('Workflow:', workflow);
        await game.critsRevisited.socket.executeAsUser("saveWorkflow", game.user.id, {workflow: workflow});
        await critCheckWorkflow.checkForCriticalHit(workflow);
    } else if(OPTIONS.CRITS_ON_OTHER_ENABLED && workflow.critState === 'isOtherSpellCritical') {
        await game.critsRevisited.socket.executeAsUser("saveWorkflow", game.user.id, {workflow: workflow});
        const attackDamageType = await critCheckWorkflow.getAttackDamageType(workflow.damageDetail, workflow.damageItem);
        await critCheckWorkflow.handleCritEvents(workflow.damageList, workflow.damageDetail, workflow.damageItem);
        return false;
    } else {
        console.warn('Workflow was previously aborted. Aborting script.');
        return false;
    }
});