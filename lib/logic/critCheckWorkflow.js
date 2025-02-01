/**
 * @module critCheckWorkflow
 * @description Handles the core logic for critical hit effect determination and application.
 * Processes critical hits, fumbles, and failed saves to apply appropriate effects from tables.
 * Works in conjunction with Midi-QOL workflows to automate critical hit effects.
 *
 * @exports critCheckWorkflow - Main workflow object containing critical hit processing methods
 * @exports UNDESIRED_TYPES - Set of damage types that don't trigger effects
 * @exports ACTIONS_LIST - Set of valid action types for critical processing
 * @exports UNDESIRED_ACTIONS_LIST - Set of action types that don't trigger effects
 */
import {mainScriptUtils} from "../utils/mainScriptUtils.js";
import {effectTables} from "../data/effectTables.js";
import {OPTIONS} from "../../options.js";
import {workflowCache} from "../utils/workflowCache.js";
import { Sequence } from '../utils/sequenceHandler.js';

/**
 * Damage types that should not trigger critical effects
 * @constant {Set<string>}
 */
export const UNDESIRED_TYPES = new Set(["none", "no type", "no damage", "temphp", ""]);

/**
 * Valid action types for critical hit processing
 * @constant {Set<string>}
 */
export const ACTIONS_LIST = new Set(["rsak", "rwak", "mwak", "msak"]);

/**
 * Action types that should not trigger critical effects
 * @constant {Set<string>}
 */
export const UNDESIRED_ACTIONS_LIST = new Set(["heal", "save"]);

/**
 * Physical damage types that have lower priority when determining critical effect type
 * @constant {Set<string>}
 */
const NON_PREFERRED_TYPES = new Set(['bludgeoning', 'slashing', 'piercing']);

/**
 * Maps attack types to their corresponding fumble table names
 * @constant {Map<string, string>}
 */
const FUMBLE_TYPES = new Map([
    ["rsak", "Spell Critical Fumbles"],
    ["msak", "Spell Critical Fumbles"],
    ["rwak", "Ranged Critical Fumbles"],
    ["mwak", "Melee Critical Fumbles"]
]);

const createCritCheckWorkflow = () => {
    const critEffectCache = new Map();

    return {
        cacheCritEffect(workflow) {
            const cacheKey = `crit-${workflow.actor.id}-${workflow.item.id}-${Date.now()}`
            critEffectCache.set(cacheKey, workflow)
            this.cleanEffectCache()
            return cacheKey
        },

        cleanEffectCache() {
            critEffectCache.clear();
        },
        /**
         * Main entry point for the critical hit workflow system. Processes three distinct cases:
         * 1. Critical hits from successful attack rolls
         * 2. Fumbles from natural 1s on attacks
         * 3. Fumbled saves from natural 1s on saving throws
         *
         * The workflow object provides complete state tracking for all roll outcomes,
         * damage calculations, and target information needed for effect application.
         *
         * @param workflow {workflow} The Midi-QOL workflow object containing all roll state and outcomes
         * @returns {Promise<boolean>} Returns true if critical effects were processed, false otherwise
         */
        checkForCriticalHit: async function (workflow) {
            const {isCritical, isFumble, fumbleSaves} = workflow;
            if (isCritical) {
                return await this.rollForCriticalEvents(workflow, 'isCritical');
            }
            if (isFumble) {
                return await this.rollForCriticalEvents(workflow, 'isFumble');
            }
            if (fumbleSaves.size > 0) {
                return await this.rollForCriticalEvents(workflow, 'isFumbledSave');
            }
            mainScriptUtils.debug('checkForCriticalHit - No critical hit recognized.');
            return false;
        },
        /**
         * Maps attack action types to their corresponding fumble table names.
         * @param actionType {string} The action type (rsak/rwak/mwak) from the item.
         * @returns {string} The name of the fumble table to roll on
         */
        determineFumbleType: function (actionType) {
            mainScriptUtils.debug(`determineFumbleType - Action type received: ${actionType}`);
            mainScriptUtils.debug(`determineFumbleType - FUMBLE_TYPES Map:`, FUMBLE_TYPES);
            let fumbleType = FUMBLE_TYPES.get(actionType);
            mainScriptUtils.debug(`determineFumbleType - Fumble type determined: ${fumbleType}`);
            return fumbleType;
        },
        /**
         * Determines the primary damage type for critical effect selection.
         * Filters out damage types the target is immune to and selects the highest damage type,
         * preferring magical/elemental damage over physical damage when tied.
         *
         * @param damageDetail {Array} Array of {type, damage} objects from the attack
         * @param damageItem {Object} The item or attack causing the damage
         * @returns {Promise<string|boolean>} The selected damage type or false if no valid type found
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
         * Processes critical effects for multiple targets.
         * For each valid target, determines damage type and rolls on appropriate effect table.
         * Skips targets without valid UUIDs or immune to all damage types.
         *
         * @param targets {Array} Array of target tokens/actors to apply effects to
         * @param damageDetail {Array} The damage breakdown from the attack
         * @param damageItem {object} The weapon/spell that caused the damage
         * @returns {Promise<void>}
         */
        async handleCritEvents(targets, damageDetail, damageItem) {
            const results = [];

            for (const token of targets) {
                const uuid = token.actorUuid ?? token.document?.actor.uuid;
                if (!uuid) {
                    mainScriptUtils.debug('handleCritEvents - No valid target UUID for target ${token.name}. Skipping effect roll.');
                    continue;
                }
                const attackDamageType = await this.getAttackDamageType(damageDetail, {
                    ...damageItem,
                    actorUuid: uuid
                });
                if (attackDamageType) {
                    const result = await this.rollOnTable(uuid, attackDamageType);
                    results.push(result);
                }
            }
            return results;
        },
        /**
         * Core logic for determining and rolling critical effects.
         * Handles both attacks and spells, checking damage types and action types
         * to select appropriate effect tables.
         *
         * @param workflow {workflow} The complete Midi-QOL workflow object
         * @param critState {string} Type of critical event ("isCritical"|"isFumble"|"isFumbledSave")
         * @returns {Promise<boolean>} Success/failure of critical effect application
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
         * Executes the roll on a critical effect table and applies results.
         * Capitalizes damage type to match table names, validates table exists,
         * and processes all effects from the roll result.
         *
         * @param targetActorUuid {string} UUID of actor receiving the effects
         * @param attackDamageType {string} Damage type determining which table to use
         * @returns {Promise<boolean>} Success/failure of table roll and effect application
         */
        async rollOnTable(targetActorUuid, attackDamageType) {
            const tableName = attackDamageType.capitalize();
            if (!game.tables.getName(tableName)) {
                mainScriptUtils.debug(`rollOnTable - No table found for ${tableName}`);
                return false;
            }
            const rollResult = await game.tables.getName(tableName).draw({
                displayChat: true,
                rollMode: 'publicroll'
            });
            const sequence = new Sequence();
            for (let result of rollResult.results) {
                const rollRange = result.range.toString();
                const tableKey = result.parent.name.replace(/\s+/g, '');
                const effects = effectTables[tableKey][rollRange];

                if (effects) {
                    sequence.add(() => mainScriptUtils.applyEffects(effects, targetActorUuid, tableKey));
                }
            }

            return sequence.play();
        },
        /**
         * Creates a cached version of a function.
         * Uses JSON stringification for complex argument comparison.
         * Improves performance for repeated calls with same parameters.
         *
         * @param fn {Function} Function to cache
         * @returns {Function} Memoized version of the input function
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
}
export const critCheckWorkflow = createCritCheckWorkflow();
// Memoize the getAttackDamageType function
critCheckWorkflow.getAttackDamageType = critCheckWorkflow.memoize(critCheckWorkflow.getAttackDamageType);