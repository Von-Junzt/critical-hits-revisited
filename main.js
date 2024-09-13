// Description: This script contains the main functions for the module.
console.log("Critical Hits Revisited is starting to load!");

import {utils} from './lib/utils/utils.js';
import {effectMacros} from "./lib/effectmacros/effectMacros.js";
import {effectTables} from "./lib/data/effectTables.js";
import {effectData} from "./lib/data/effecData.js";

export const critsRevisited = {
    // damageTypes that have no critical hits or fumbles and will end the function early
    undesiredTypes: ["none", "no type", "no damage", "temphp", ""],
    // damageTypes that are not preferred for critical hits amd will be used as a last resort
    nonPreferredTypes: ['bludgeoning', 'slashing', 'piercing'],

    // Called from the itemMacro, when a critical hit is rolled. In the call, the workflowObject and the critState
    // string have to be passed.
    rollForCriticalEvents: async function (workflowObject, critState) {
        let attackDamageType = "Critical Fumbles";
        if (critState !== "isFumble") {
            ui.notifications.info('isFumble is not set to true. Critical Hits Revisited will run.');
            attackDamageType = await this.getAttackDamageType(workflowObject.damageDetail, workflowObject.damageItem)
        } else if (!attackDamageType || this.undesiredTypes.includes(attackDamageType)) {
            return;
        }

        const critEventHandler = {
            isCritical: async () => this.handleCriticalEvent(workflowObject.damageList, attackDamageType),
            isFumble: async () => this.handleFumbleEvent(workflowObject.actor.uuid),
            isFumbledSave: async () => this.handleFumbledSaveEvent(workflowObject.fumbleSaves, attackDamageType)
        };
        await critEventHandler[critState]();
        console.log("Critical Hits Revisited: Critical Event rolled!");
        return true;
    },
    handleCriticalEvent: async function (damageList, attackDamageType) {
        ui.notifications.info(`Critical Hits Revisited: Critical Hit!`);
        let tableName = utils.capitalizeFirstLetter(attackDamageType);
        if (!game.tables.getName(tableName)) {
            ui.notifications.warn(`Critical Hits Revisited: No table found for ${tableName}.`);
            return;
        }
        for (const token of damageList) {
            if (token.actorUuid) {
                await this.rollOnTable(tableName, token.actorUuid);
            }
        }
    },
    handleFumbleEvent: async function (actorUuid) {
        ui.notifications.info(`Critical Hits Revisited: Critical Fumble!`);
        if (!game.tables.getName('Critical Fumbles')) {
            ui.notifications.warn(`Critical Hits Revisited: No table found for Critical Fumbles.`);
            return;
        }
        await this.rollOnTable('Critical Fumbles', actorUuid);
    },
    handleFumbledSaveEvent: async function (fumbleSaves, attackDamageType) {
        ui.notifications.info(`Critical Hits Revisited: Fumbled Save!`);
        let tableName = utils.capitalizeFirstLetter(attackDamageType);
        if (!game.tables.getName(tableName)) {
            ui.notifications.warn(`Critical Hits Revisited: No table found for ${tableName}.`);
            return;
        }
        for (const token of fumbleSaves) {
            if (token.document.uuid) {
                await this.rollOnTable(tableName, token.actor.uuid);
            }
        }
    },
    // this function gathers the rollTableID from the compendium and rolls on the table
    rollOnTable: async function (tableName, targetUuid) {
        let rollResult = await game.tables.getName(tableName).draw({displayChat: true, rollMode: "publicroll"});
        for (let result of rollResult.results) {
            let rollRange = result.range.toString();
            // clean the tableName from whitespaces
            tableName = result.parent.name.replace(/\s+/g, '');
            // get the linked effects
            let effects = effectTables[tableName][rollRange];
            if (effects) {
                await utils.applyEffects(effects, targetUuid, tableName);
            }
        }
    },
    // Gets the attack damageTypes from the workflowObject and returns the most relevant one.
    getAttackDamageType: async function (damageDetail, damageItem) {
        let attackDamageType;
        // check if there are multiple damage types
        if (damageDetail.length > 0) {
            // Check if the target has immunities to the damage types. If so, remove them from the array.
            let targetUuid = damageItem.actorUuid;
            let filteredDetails = await Promise.all(damageDetail.map(async detail => {
                const isImmune = await utils.checkImmunity(detail.type, targetUuid, detail.type);
                if (!isImmune) {
                    return [detail.type, detail.damage];
                }
            }));
            // Filter out null values from the array. If the array is empty after removing immunities, return null. rollForCriticalHits will handle this case.
            filteredDetails = filteredDetails.filter(detail => detail !== undefined);
            if(filteredDetails.length === 0) return null;
            // Sort the array by damage value and push the highest damage types to a new array.
            let maxDamageValue = Math.max(...filteredDetails.map(([_, damage]) => damage));
            let maxDamageTypes = filteredDetails.filter(([_, damage]) => damage === maxDamageValue);
            //  If there are multiple damage types with the same damage value, choose the first one that is not bludgeoning, slashing, or piercing.
            if (maxDamageTypes.length > 1) {
                let preferredType = maxDamageTypes.find(([type]) => !this.nonPreferredTypes.includes(type));
                attackDamageType = preferredType ? preferredType[0] : maxDamageTypes[0][0];
            } else {
                attackDamageType = maxDamageTypes[0][0];
            }
        } else {
            attackDamageType = damageDetail[0]?.type || null;
        }
        return attackDamageType;
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

console.log("Critical Hits Revisited has finished loading!");