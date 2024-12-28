import {mainScriptUtils} from "../utils/mainScriptUtils.js";
import {effectTables} from "../data/effectTables.js";
import {OPTIONS} from "../../options.js";
import {workflowCache} from "../utils/workflowCache.js";

export const UNDESIRED_TYPES = new Set(["none", "no type", "no damage", "temphp", ""]);
export const ACTIONS_LIST = new Set(["rsak", "rwak", "mwak"]);
export const UNDESIRED_ACTIONS_LIST = new Set(["heal", "save"]);
const NON_PREFERRED_TYPES = new Set(['bludgeoning', 'slashing', 'piercing']);
const FUMBLE_TYPES = new Map([
    ["rsak", "Spell Critical Fumbles"],
    ["rwak", "Ranged Critical Fumbles"],
    ["mwak", "Melee Critical Fumbles"]
]);

export const critCheckWorkflow = {
    /**
     * This is the first step in the critical hit workflow. It checks for critical hits, fumbles, and fumbled saves.
     * This whole function may seem redundant and is a remain of an earlier version. Since we pass the complete workflow
     * object, we would not need this. I will change this in the future. In the current version there might be a problem,
     * when an attack is critical and asks for a save. Will investigate.
     * @param workflow {workflow} The Midi-QOL workflow object of the current item roll.
     * @returns {Promise<boolean>}
     */
    checkForCriticalHit: async function (workflow) {
        const {isCritical, isFumble, fumbleSaves} = workflow;
        if (isCritical) {
            return await critCheckWorkflow.rollForCriticalEvents(workflow, 'isCritical');
        }
        if (isFumble) {
            return await critCheckWorkflow.rollForCriticalEvents(workflow, 'isFumble');
        }
        if (fumbleSaves.size > 0) {
            return await this.rollForCriticalEvents(workflow, 'isFumbledSave');
        }
        mainScriptUtils.debug('checkForCriticalHit - No critical hit recognized.');
        return false;
    },
    /**
     * This function determines the fumble type based on the action type
     * @param actionType {string} The action type from the rolled item.
     * @returns {string}
     */
    determineFumbleType: function (actionType) {
        mainScriptUtils.debug(`determineFumbleType - Action type received: ${actionType}`);
        mainScriptUtils.debug(`determineFumbleType - FUMBLE_TYPES Map:`, FUMBLE_TYPES);
        let fumbleType = FUMBLE_TYPES.get(actionType);
        mainScriptUtils.debug(`determineFumbleType - Fumble type determined: ${fumbleType}`);
        return fumbleType;
    },
    /**
     * This function determines the attack damage type based on the damage detail. It also checks for immunity and
     * removes the damage type from the array if the target is immune. If there are more than one damage type, it will
     * determine the damage type based on the damage detail.
     * @param damageDetail {Array} The damage detail array.
     * @param damageItem {Object} The damage item.
     * @returns {Promise<*|boolean>}
     */
    getAttackDamageType: async function (damageDetail, damageItem) {
        if (damageDetail.length === 0 || !damageDetail) {
            console.warn('getAttackDamageType - No damage detail found. Aborting script.');
            return false;
        }
        const workflow = await workflowCache.getWorkflow();
        const targetUuid = damageItem?.actorUuid || workflow.actor.uuid; // in case of fumble, damageItem will be undefined
        mainScriptUtils.debug(`getAttackDamageType - Target UUID: ${targetUuid}`);
        const filteredDetails = [];
        for (const detail of damageDetail) {
            const isImmune = await mainScriptUtils.checkImmunity(detail.type, targetUuid, detail.type, detail.type.capitalize());
            if (isImmune) {
                mainScriptUtils.debug(`getAttackDamageType - Target is immune to ${detail.type}. Removing from damage type list.`);
                continue;
            }
            filteredDetails.push([detail.type, detail.damage]);
        }
        if (filteredDetails.length === 0) {
            console.warn('getAttackDamageType - No valid damage types found. Aborting script.');
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
    /**
     * Handles the critical hit events for a given array of targets.
     * @param targets {Array} The array of targets to roll for critical hits on.
     * @param damageDetail {string} The damage detail of the attack.
     * @param damageItem {object} The damage item object.
     * @returns {Promise<void>}
     */
    handleCritEvents: async function (targets, damageDetail, damageItem) {
        for (const token of targets) {
            const uuid = token.actorUuid ?? token.document?.actor.uuid;
            if (!uuid) {
                mainScriptUtils.debug('handleCritEvents - No valid target UUID for target ${token.name}. Skipping effect roll.');
                continue;
            }
            const attackDamageType = await this.getAttackDamageType(damageDetail, {...damageItem, actorUuid: uuid});
            if (!attackDamageType) {
                mainScriptUtils.debug('handleCritEvents - No valid damage type for target ${token.name}. Skipping effect roll.');
                continue;
            }
            await this.rollOnTable(uuid, attackDamageType);
        }
    },
    /**
     * Checks if a critical hit should be rolled for a given workflow.
     * @param workflow {workflow} The Midi-QOL workflow object of the current item roll.
     * @param critState {string} The current crit state ("isCritical" or "isFumble").
     * @returns {Promise<boolean>}
     */
    rollForCriticalEvents: async function (workflow, critState) {
        mainScriptUtils.debug('rollForCriticalEvents - Rolling for critical event...');
        let actionType = workflow.item.system.actionType;
        mainScriptUtils.debug(`rollForCriticalEvents - Action type: ${actionType}`);
        let attackDamageType = critState !== "isFumble"
            ? await this.getAttackDamageType(workflow.damageDetail, workflow.damageItem)
            : await this.determineFumbleType(actionType);
        if (!attackDamageType || UNDESIRED_TYPES.has(attackDamageType)) {
            mainScriptUtils.debug('rollForCriticalEvents - No critical hit or fumble for this damage type. Aborting script.');
            return false;
        }
        const critEventHandler = {
            isCritical: () => this.handleCritEvents(workflow.damageList, workflow.damageDetail, workflow.damageItem),
            isFumble: () => {
                mainScriptUtils.debug(`rollForCriticalEvents - Rolling on table for fumble. Actor UUID: ${workflow.actor.uuid}, Attack Damage Type: ${attackDamageType}`);
                return this.rollOnTable(workflow.actor.uuid, attackDamageType);
            },
            isFumbledSave: () => this.handleCritEvents(workflow.fumbleSaves, workflow.damageDetail, workflow.damageItem)
        };
        await critEventHandler[critState]();
        mainScriptUtils.debug('rollForCriticalEvents - Critical Event successfully rolled!');
        return true;
    },
    /**
     * Rolls on the corresponding rolltable, based on the passed damage type argument.
     * @param targetActorUuid {string} The UUID of the target actor.
     * @param attackDamageType {string} The damage type of the attack.
     * @returns {Promise<boolean>}
     */
    rollOnTable: async function (targetActorUuid, attackDamageType) {
        mainScriptUtils.debug(`rollOnTable - Rolling on table. Target UUID: ${targetActorUuid}, Attack Damage Type: ${attackDamageType}`);
        let tableName = attackDamageType.capitalize();
        mainScriptUtils.debug(`rollOnTable - Table name: ${tableName}`);
        if (!game.tables.getName(tableName)) {
            console.warn(`rollOnTable - No table found for ${tableName}. Aborting script.`);
            return false;
        }
        mainScriptUtils.debug(`rollOnTable - Table found. Drawing from ${tableName}`);
        let rollResult = await game.tables.getName(tableName).draw({displayChat: true, rollMode: 'publicroll'});
        mainScriptUtils.debug('rollOnTable - Roll result: ', rollResult);
        for (let result of rollResult.results) {
            let rollRange = result.range.toString();
            tableName = result.parent.name.replace(/\s+/g, '');
            let effects = effectTables[tableName][rollRange];
            if (!effects) {
                mainScriptUtils.debug(`rollOnTable - No effects found for ${tableName} ${rollRange}. Skipping effect application.`);
                continue;
            }
            await mainScriptUtils.applyEffects(effects, targetActorUuid, tableName);
        }
    },
    /**
     * This function memoizes a function using a Map to cache the results.
     * @param fn {function} The function to memoize.
     * @returns {(function(...[*]): (any))|*}
     */
    memoize: function (fn) {
        const cache = new Map();
        return (...args) => {
            const key = JSON.stringify(args);
            if (cache.has(key)) return cache.get(key);
            const result = fn.apply(this, args);
            cache.set(key, result);
            return result;
        };
    }
}

// Memoize the getAttackDamageType function
critCheckWorkflow.getAttackDamageType = critCheckWorkflow.memoize(critCheckWorkflow.getAttackDamageType);