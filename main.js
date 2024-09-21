// Description: This script contains the main functions for the module.
import {utils} from "./lib/utils/utils.js";
import {effectMacros} from "./lib/effectmacros/effectMacros.js";
import {effectTables} from "./lib/data/effectTables.js";
import {effectData} from "./lib/data/effectData.js";
import { registerSettings } from './settings.js';

const UNDESIRED_TYPES = new Set(["none", "no type", "no damage", "temphp", ""]);
const NON_PREFERRED_TYPES = new Set(['bludgeoning', 'slashing', 'piercing']);
const ACTIONS_LIST = new Set(["rsak", "rwak", "mwak"]);
const UNDESIRED_ACTIONS_LIST = new Set(["heal", "save"]);
const OPTIONS = {};

Hooks.once('init', () => {
  registerSettings();
  OPTIONS.CRITS_ON_OTHER_ENABLED = game.settings.get("critical-hits-revisited", "critsOnOtherEnabled");
});

export const critsRevisited = {
    rollForCriticalEvents: async function (workflow, critState) {
        utils.debug("Critical Hits Revisited: Rolling for critical event...");
        let actionType = workflow.item.system.actionType;
        let attackDamageType = critState !== "isFumble"
            ? await this.getAttackDamageType(workflow.damageDetail, workflow.damageItem)
            : actionType === "rsak"
                ? "Spell Critical Fumbles"
                : actionType === "rwak"
                    ? "Ranged Critical Fumbles"
                    : "Melee Critical Fumbles";
        if (!attackDamageType || UNDESIRED_TYPES.has(attackDamageType)) {
            utils.debug("Critical Hits Revisited: No critical hit or fumble for this damage type. Aborting script.");
            return;
        }
        const critEventHandler = {
            isCritical: () => this.handleCritEvents(workflow.damageList, attackDamageType),
            isFumble: () => this.rollOnTable(workflow.actor.uuid, attackDamageType),
            isFumbledSave: () => this.handleCritEvents(workflow.fumbleSaves, attackDamageType)
        };
        await critEventHandler[critState]();
        utils.debug("Critical Hits Revisited: Critical Event successfully rolled!");
        return true;
    },    handleCritEvents: async function (targets, attackDamageType) {
        const rollPromises = targets.map(token => {
            const uuid = token.actorUuid ?? token.document?.actor.uuid;
            return uuid ? this.rollOnTable(uuid, attackDamageType) : null;
        });
        await Promise.all(rollPromises.filter(Boolean));
    },
    rollOnTable: async function (targetUuid, attackDamageType) {
        let tableName = attackDamageType.capitalize();
        if (!game.tables.getName(tableName)) {
            console.warn(`Critical Hits Revisited: No table found for ${tableName}. Aborting script.`);
            return;
        }
        let rollResult = await game.tables.getName(tableName).draw({displayChat: true, rollMode: "publicroll"});
        for (let result of rollResult.results) {
            let rollRange = result.range.toString();
            tableName = result.parent.name.replace(/\s+/g, '');
            let effects = effectTables[tableName][rollRange];
            if (effects) {
                await utils.applyEffects(effects, targetUuid, tableName);
            }
        }
    },
    getAttackDamageType: async function (damageDetail, damageItem) {
        if (damageDetail.length === 0) {
            console.warn("Critical Hits Revisited: No damage detail found. Aborting script.");
            return;
        }
        const targetUuid = damageItem.actorUuid;
        const filteredDetails = [];
        for (const detail of damageDetail) {
            const isImmune = await utils.checkImmunity(detail.type, targetUuid, detail.type, detail.type.capitalize());
            if (!isImmune) {
                filteredDetails.push([detail.type, detail.damage]);
            }
        }
        if (filteredDetails.length === 0) {
            console.warn("Critical Hits Revisited: No valid damage types found. Aborting script.");
            return null;
        }
        const maxDamageValue = Math.max(...filteredDetails.map(([_, damage]) => damage));
        const maxDamageTypes = filteredDetails.filter(([_, damage]) => damage === maxDamageValue);
        if (maxDamageTypes.length > 1) {
            const preferredType = maxDamageTypes.find(([type]) => !NON_PREFERRED_TYPES.has(type));
            return preferredType ? preferredType[0] : maxDamageTypes[0][0];
        } else {
            return maxDamageTypes[0][0];
        }
    }
}

// Add a memoization function
const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
};

// Memoize the getAttackDamageType function
critsRevisited.getAttackDamageType = memoize(critsRevisited.getAttackDamageType);

critsRevisited.checkForCriticalHit = async function (workflow) {
    const {isCritical, isFumble, fumbleSaves, item: {system: {actionType}}, damageList, damageDetail} = workflow;
    if (isCritical) {
        return await critsRevisited.rollForCriticalEvents(workflow, "isCritical");
    } else if (isFumble) {
        return await critsRevisited.rollForCriticalEvents(workflow, "isFumble");
    } else if (fumbleSaves.size > 0) {
        return await this.rollForCriticalEvents(workflow, "isFumbledSave");
    } else {
        console.warn("Critical Hits Revisited: No critical hit recognized.");
        return false;
    }
}

// Add the helperFunctions and itemMacros to critsRevisited
critsRevisited.utils = utils;
critsRevisited.effectMacros = effectMacros;
critsRevisited.effectData = effectData;

// Attach critsRevisited to the game object once Foundry is fully loaded
Hooks.once('ready', () => {
    game.critsRevisited = critsRevisited;
});

Hooks.on('midi-qol.preItemRoll', async (workflow) => {
    utils.debug('Critical Hits Revisited: Hooked into midi-qol.preCheckHits, checking for critical hits...');
    if(OPTIONS.CRITS_ON_OTHER_ENABLED && workflow.item.type === "spell" && !ACTIONS_LIST.has(workflow.item.system.actionType) && !UNDESIRED_ACTIONS_LIST.has(workflow.item.system.actionType)) {
        utils.debug("Critical Hits Revisited: This is a spell attack, with no attack action. Checking for critical hits or fumbles...");
        utils.debug(workflow);
        const attackDamageType = workflow.item.labels.damageTypes.toLowerCase();
        if (UNDESIRED_TYPES.has(attackDamageType)) {
            console.warn("Critical Hits Revisited: No critical hit or fumble for this damage type. Workflow aborted.");
            workflow.aborted = true;
            return false;
        } else {
            const roll = await new Roll("1d20").evaluate();
            await roll.toMessage({
                flavor: "Rolling for critical hit",
                content: "Rolling for critical hit",
                speaker: ChatMessage.getSpeaker(workflow.actor),
            });
            const critState = roll.result === "20" ? "isOtherSpellCritical" : roll.result === "1" ? "isFumble" : null;
            workflow.critState = critState;
            if (critState === "isFumble") {
                utils.debug("Critical Hits Revisited: Fumble for spell with other action detected, rolling on the spell fumble table and aborting workflow.");
                await critsRevisited.rollOnTable(workflow.actor.uuid, "Spell Critical Fumbles");
                workflow.aborted = true;
                return false;
            } else if (critState === "isOtherSpellCritical") {
                utils.debug("Critical Hits Revisited: Critical hit for spell with other action detected, rolling on the spell critical hit table.");
                workflow.continueCritCheck = false;
                return true;
            }
        }
    } else {
        utils.debug("Critical Hits Revisited: No critical hits or fumbles for spells with other action detected. Continuing workflow...");
        workflow.continueCritCheck = true;
    }
});
Hooks.on('midi-qol.postActiveEffects', async (workflow) => {
    if(workflow.continueCritCheck) {
        utils.debug("Critical Hits Revisited: Hooked into midi-qol.postActiveEffects.");
        utils.debug(workflow);
        await critsRevisited.checkForCriticalHit(workflow);
    } else if(OPTIONS.CRITS_ON_OTHER_ENABLED && workflow.critState === "isOtherSpellCritical") {
        const attackDamageType = await critsRevisited.getAttackDamageType(workflow.damageDetail, workflow.damageItem);
        await critsRevisited.handleCritEvents(workflow.damageList, attackDamageType)
        return false;
    } else {
        console.warn("Critical Hits Revisited: Workflow was previously aborted. Aborting script.");
    }
});


// Lazy load effect tables
const getEffectTable = (tableName) => {
    if (!critsRevisited.loadedTables) {
        critsRevisited.loadedTables = {};
    }
    if (!critsRevisited.loadedTables[tableName]) {
        critsRevisited.loadedTables[tableName] = effectTables[tableName];
    }
    return critsRevisited.loadedTables[tableName];
};

critsRevisited.OPTIONS = OPTIONS;

