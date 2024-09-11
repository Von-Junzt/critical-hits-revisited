// Description: This script contains the main functions for the module.
console.log("Critical Hits Revisited is starting to load!");

import {utils} from './lib/utils/utils.js';
import {effectMacros} from "./lib/effectmacros/effectMacros.js";
import {effectTables} from "./lib/data/effectTables.js";
import {effectData} from "./lib/data/effecData.js";

export const critsRevisited = {
    // damageTypes that have no critical hits or fumbles
    undesiredTypes: ["none", "no type", "no damage", "temphp", ""],
    // damageTypes that are not preferred for critical hits
    nonPreferredTypes: ['bludgeoning', 'slashing', 'piercing'],

    // Called from the itemMacro, when a critical hit is rolled. In the call, the workflowObject of the attack has to be passed.
    rollForCriticalHits: async function (workflowObject) {
        let attackDamageType = await this.getAttackDamageType(workflowObject);
        if (attackDamageType === null || typeof attackDamageType !== 'string' || this.undesiredTypes.includes(attackDamageType)) {
            return;
        }
        let tableName = utils.capitalizeFirstLetter(attackDamageType);
        if(!game.tables.getName(tableName)) {
            ui.notifications.warn(`Critical Hits Revisited: No table found for ${tableName}.`);
            return;
        }
        let targetUuid;
        if(workflowObject.damageList.length > 1) {
            for (const item of workflowObject.damageList) {
                if(item.actorUuid) {
                    targetUuid = item.actorUuid;
                    await this.rollOnTable(tableName, targetUuid);
                }
            }
        } else {
            let targetUuid = workflowObject.damageList[0].actorUuid;
            await this.rollOnTable(tableName, targetUuid);
        }
    },
    // Called from the itemMacro, when a saving throw is fumbled. In the call, the workflowObject of the attack has to be passed.
    rollForFumbledSaves: async function (workflowObject) {
        if(!workflowObject.damageDetail) {
            return;
        }
        let attackDamageType = await this.getAttackDamageType(workflowObject);
        if (attackDamageType === null || typeof attackDamageType !== 'string' || this.undesiredTypes.includes(attackDamageType)) {
            return;
        }
        let tableName = utils.capitalizeFirstLetter(attackDamageType);
        if(!game.tables.getName(tableName)) {
            ui.notifications.warn(`Critical Hits Revisited: No table found for ${tableName}.`);
            return;
        }
        let targetUuid;
        for(const token of workflowObject.fumbleSaves) {
            if(token.document.uuid) {
                targetUuid = token.actor.uuid;
                await this.rollOnTable(tableName, targetUuid);
            }
        }
    },
    // Called from the itemMacro, when a critical fumble is rolled. In the call, the workflowObject of the attack has to be passed.
    rollForCriticalFumbles: async function (workflowObject) {
        let attackDamageType = workflowObject.item.labels.damageType;
        if(this.undesiredTypes.includes(attackDamageType)) {
            return;
        }
        let targetUuid = workflowObject.actor.uuid;
        if (!game.tables.getName('Critical Fumbles')) {
            ui.notifications.warn(`Critical Hits Revisited: No table found for Critical Fumbles.`);
            return;
        }
        await this.rollOnTable('Critical Fumbles', targetUuid);
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
                await utils.prepareEffects(effects, targetUuid, tableName);
            }
        }
    },
    // Gets the attack damageTypes from the workflowObject and returns the most relevant one.
    getAttackDamageType: async function (workflowObject) {
        let attackDamageType;
        // check if there are multiple damage types
        if (workflowObject.damageDetail.length > 0) {
            // Check if the target has immunities to the damage types. If so, remove them from the array.
            let targetUuid = workflowObject.damageItem.actorUuid;
            let damageDetails = await Promise.all(workflowObject.damageDetail.map(async detail => {
                const isImmune = await utils.checkImmunity(detail.type, targetUuid, detail.type);
                if (!isImmune) {
                    return [detail.type, detail.damage];
                }
            }));
            // Filter out null values from the array. If the array is empty after removing immunities, return null. rollForCriticalHits will handle this case.
            damageDetails = damageDetails.filter(detail => detail !== undefined);
            if(damageDetails.length === 0) return null;
            // Sort the array by damage value and push the highest damage types to a new array.
            let maxDamageValue = Math.max(...damageDetails.map(([_, damage]) => damage));
            let maxDamageTypes = damageDetails.filter(([_, damage]) => damage === maxDamageValue);
            //  If there are multiple damage types with the same damage value, choose the first one that is not bludgeoning, slashing, or piercing.
            if (maxDamageTypes.length > 1) {
                let preferredType = maxDamageTypes.find(([type]) => !this.nonPreferredTypes.includes(type));
                attackDamageType = preferredType ? preferredType[0] : maxDamageTypes[0][0];
            } else {
                attackDamageType = maxDamageTypes[0][0];
            }
        } else {
            attackDamageType = workflowObject.damageDetail[0]?.type || null;
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