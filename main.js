// Description: This script contains the main functions for the module.
import {utils} from "./lib/utils/utils.js";
import {effectMacros} from "./lib/effectmacros/effectMacros.js";
import {effectTables} from "./lib/data/effectTables.js";
import {effectData} from "./lib/data/effectData.js";
import {registerSettings} from './settings.js';

const UNDESIRED_TYPES = new Set(["none", "no type", "no damage", "temphp", ""]);
const NON_PREFERRED_TYPES = new Set(['bludgeoning', 'slashing', 'piercing']);
const ACTIONS_LIST = new Set(["rsak", "rwak", "mwak"]);
const UNDESIRED_ACTIONS_LIST = new Set(["heal", "save"]);
const OPTIONS = {};
const FUMBLE_TYPES = {
    rsak: "Spell Critical Fumbles",
    rwak: "Ranged Critical Fumbles",
    mwak: "Melee Critical Fumbles"
};

export const critsRevisited = {
    rollForCriticalEvents: async function (workflow, critState) {
        utils.debug('Critical Hits Revisited: Rolling for critical event...');
        let actionType = workflow.item.system.actionType;
        utils.debug(`Action type: ${actionType}`);
        let attackDamageType = critState !== "isFumble"
            ? await this.getAttackDamageType(workflow.damageDetail, workflow.damageItem)
            : await this.determineFumbleType(actionType);
        if (!attackDamageType || UNDESIRED_TYPES.has(attackDamageType)) {
            utils.debug('Critical Hits Revisited: No critical hit or fumble for this damage type. Aborting script.');
            return false;
        }
        const critEventHandler = {
            isCritical: () => this.handleCritEvents(workflow.damageList, workflow.damageDetail, workflow.damageItem),
            isFumble: () => {
                utils.debug(`Rolling on table for fumble. Actor UUID: ${workflow.actor.uuid}, Attack Damage Type: ${attackDamageType}`);
                return this.rollOnTable(workflow.actor.uuid, attackDamageType);
            },
            isFumbledSave: () => this.handleCritEvents(workflow.fumbleSaves, workflow.damageDetail, workflow.damageItem)
        };
        await critEventHandler[critState]();
        utils.debug('Critical Hits Revisited: Critical Event successfully rolled!');
        return true;
    },
    handleCritEvents: async function (targets, damageDetail, damageItem) {
        const rollPromises = targets.map(async token => {
            const uuid = token.actorUuid ?? token.document?.actor.uuid;
            if (!uuid) return null;
            const attackDamageType = await this.getAttackDamageType(damageDetail, {...damageItem, actorUuid: uuid});
            if (!attackDamageType) {
                utils.debug(`No valid damage type for target ${uuid}. Skipping critical effect.`);
                return null;
            }
            return this.rollOnTable(uuid, attackDamageType);
        });
        await Promise.all(rollPromises.filter(Boolean));
    },
    // This function
    rollOnTable: async function (targetUuid, attackDamageType) {
        utils.debug(`Rolling on table. Target UUID: ${targetUuid}, Attack Damage Type: ${attackDamageType}`);
        let tableName = attackDamageType.capitalize();
        utils.debug(`Table name: ${tableName}`);
        if (!game.tables.getName(tableName)) {
            console.warn(`Critical Hits Revisited: No table found for ${tableName}. Aborting script.`);
            return false;
        }
        utils.debug(`Table found. Drawing from ${tableName}`);
        let rollResult = await game.tables.getName(tableName).draw({displayChat: true, rollMode: 'publicroll'});
        utils.debug('Roll result:' + rollResult);
        for (let result of rollResult.results) {
            let rollRange = result.range.toString();
            tableName = result.parent.name.replace(/\s+/g, '');
            let effects = effectTables[tableName][rollRange];
            if (effects) {
                await utils.applyEffects(effects, targetUuid, tableName);
            }
        }
    },
    // This function checks for critical hits, fumbles, and fumbled saves
    checkForCriticalHit: async function (workflow) {
        const {isCritical, isFumble, fumbleSaves, item: {system: {actionType}}, damageList, damageDetail} = workflow;
        if (isCritical) {
            return await critsRevisited.rollForCriticalEvents(workflow, 'isCritical');
        } else if (isFumble) {
            return await critsRevisited.rollForCriticalEvents(workflow, 'isFumble');
        } else if (fumbleSaves.size > 0) {
            return await this.rollForCriticalEvents(workflow, 'isFumbledSave');
        } else {
            console.warn('Critical Hits Revisited: No critical hit recognized.');
            return false;
        }
    },
    // This function determines the attack damage type based on the damage detail
    getAttackDamageType: async function (damageDetail, damageItem) {
        if (damageDetail.length === 0) {
            console.warn('Critical Hits Revisited: No damage detail found. Aborting script.');
            return false;
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
            console.warn('Critical Hits Revisited: No valid damage types found. Aborting script.');
            return false;
        }
        const maxDamageValue = Math.max(...filteredDetails.map(([_, damage]) => damage));
        const maxDamageTypes = filteredDetails.filter(([_, damage]) => damage === maxDamageValue);
        if (maxDamageTypes.length > 1) {
            const preferredType = maxDamageTypes.find(([type]) => !NON_PREFERRED_TYPES.has(type));
            return preferredType ? preferredType[0] : maxDamageTypes[0][0];
        } else {
            return maxDamageTypes[0][0];
        }
    },
    // This function determines the fumble type based on the action type
    determineFumbleType: async function(actionType) {
        utils.debug(`Action type received: ${actionType}`);
        utils.debug(`FUMBLE_TYPES object: ${JSON.stringify(FUMBLE_TYPES)}`);
        let fumbletype = FUMBLE_TYPES[actionType];
        utils.debug(`Fumble type determined: ${fumbletype}`);
        return fumbletype;
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


// Add the helperFunctions and itemMacros to critsRevisited
critsRevisited.utils = utils;
critsRevisited.effectMacros = effectMacros;
critsRevisited.effectData = effectData;

// Register the settings and set the initial value for CRITS_ON_OTHER_ENABLED
Hooks.once('init', () => {
    registerSettings();
    OPTIONS.CRITS_ON_OTHER_ENABLED = game.settings.get('critical-hits-revisited', "critsOnOtherEnabled");
});


// Attach critsRevisited to the game object once Foundry is fully loaded
Hooks.once('ready', () => {
    game.critsRevisited = critsRevisited;
});

Hooks.on('midi-qol.preItemRoll', async (workflow) => {
    utils.debug('Critical Hits Revisited: Hooked into midi-qol.preCheckHits, checking for critical hits...');
    // This part of the script will only work for single-target spells.
    if(OPTIONS.CRITS_ON_OTHER_ENABLED && workflow.item.type === "spell" && !ACTIONS_LIST.has(workflow.item.system.actionType) && !UNDESIRED_ACTIONS_LIST.has(workflow.item.system.actionType)) {
        utils.debug('Critical Hits Revisited: This is a spell attack, with no attack action. Checking for critical hits or fumbles...');
        utils.debug(workflow);
        const attackDamageType = workflow.item.labels.damageTypes.toLowerCase();
        if (UNDESIRED_TYPES.has(attackDamageType)) {
            console.warn('Critical Hits Revisited: No critical hit or fumble for this damage type. Workflow aborted.');
            workflow.aborted = true;
            return false;
        } else {
            const roll = await new Roll("1d20").evaluate();
            await roll.toMessage({
                flavor: 'Rolling for critical hit',
                content: 'Rolling for critical hit',
                speaker: ChatMessage.getSpeaker(workflow.actor),
            });
            const critState = roll.result === '20' ? 'isOtherSpellCritical' : roll.result === '1' ? 'isFumble' : null;
            workflow.critState = critState;
            if (critState === 'isFumble') {
                utils.debug('Critical Hits Revisited: Fumble for spell with other action detected, rolling on the spell fumble table and aborting workflow.');
                await critsRevisited.rollOnTable(workflow.actor.uuid, 'Spell Critical Fumbles');
                workflow.aborted = true;
                return false;
            } else if (critState === 'isOtherSpellCritical') {
                utils.debug('Critical Hits Revisited: Critical hit for spell with other action detected, rolling on the spell critical hit table.');
                workflow.continueCritCheck = false;
                return true;
            }
        }
    } else {
        utils.debug('Critical Hits Revisited: No critical hits or fumbles for spells with other action detected. Continuing workflow...');
        workflow.continueCritCheck = true;
    }
});

Hooks.on('midi-qol.postActiveEffects', async (workflow) => {
    if(workflow.continueCritCheck) {
        utils.debug('Critical Hits Revisited: Hooked into midi-qol.postActiveEffects.');
        utils.debug(workflow);
        await critsRevisited.checkForCriticalHit(workflow);
    } else if(OPTIONS.CRITS_ON_OTHER_ENABLED && workflow.critState === 'isOtherSpellCritical') {
        const attackDamageType = await critsRevisited.getAttackDamageType(workflow.damageDetail, workflow.damageItem);
        await critsRevisited.handleCritEvents(workflow.damageList, attackDamageType)
        return false;
    } else {
        console.warn('Critical Hits Revisited: Workflow was previously aborted. Aborting script.');
        return false;
    }
});