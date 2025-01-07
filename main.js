/**
 * Critical Hits Revisited
 * @author: VonJunzt
 * @version: 1.0.0
 * @description: Critical Hits Revisited is a module that allows you to add automated critical hit effects to your game.
 * @license: MIT
 * @copyright: 2023 VonJunzt
 * @see: https://github.com/VonJunzt/critical-hits-revisited
 *
 * This file contains registration logic for the module, does the first setup and determines the workflow for the module.
 */

import {critCheckWorkflow} from "./lib/logic/critCheckWorkflow.js";
import {mainScriptUtils} from "./lib/utils/mainScriptUtils.js";
import {effectMacros} from "./lib/effectmacros/effectMacros.js";
import {effectData} from "./lib/data/effectData.js";
import {registerSettings} from './settings.js';
import {OPTIONS, updateOptions} from "./options.js";
import {workflowCache} from "./lib/utils/workflowCache.js";
import {animationUtils} from "./lib/utils/animationUtils.js";

export let socket;

// Register the socket event to get the workflow by target UUID
Hooks.once('socketlib.ready', async function() {
    socket = socketlib.registerModule('critical-hits-revisited');
    socket.register("saveWorkflow", workflowCache.saveWorkflow);
    socket.register("deleteAllWorkflows", workflowCache.deleteWorkflow);
});

// register game settings
Hooks.once('init', () => {
    registerSettings();
});

// Attach objects to the game object once Foundry is fully loaded
Hooks.once('ready', () => {
    updateOptions();
    game.critsRevisited = {
        animationUtils,
        critCheckWorkflow,
        effectMacros,
        effectData,
        workflowCache,
        socket,
        mainScriptUtils
    };
});

Hooks.on('midi-qol.RollComplete', async ({activity, token, config, dialog, message}) => {
    mainScriptUtils.debug('main - Hooked into midi-qol.RollComplete.');

    // Early return if neither critical nor fumble
    if (!activity.workflow.isCritical && !activity.workflow.isFumble) {
        mainScriptUtils.debug('main - No critical or fumble detected. Skipping processing.');
        return;
    }

    // Continue with existing critical/fumble conflict check
    if (activity.workflow.isCritical && activity.workflow.isFumble) {
        mainScriptUtils.debug('main - isCritical and isFumble conditions detected. Aborting script.');
        console.warn('main - isCritical and isFumble conditions detected. Aborting script.');
        return;
    }

    await workflowCache.deleteWorkflow();
    mainScriptUtils.debug('main - Workflow:', activity.workflow);
    await game.critsRevisited.socket.executeAsUser("saveWorkflow", game.user.id, {workflow: activity.workflow});
    await critCheckWorkflow.checkForCriticalHit(activity.workflow);

});