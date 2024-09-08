// Description: This script contains the main functions for the module.
console.log("Critical Hits Revisited is starting to load!");

import {helperFunctions} from '../lib/helperfunctions/helperFunctions.js';
import {effectMacros} from "../lib/effectmacros/effectMacros.js";
import {effectTables} from "../lib/data/effectTables.js";
import {effectData} from "../lib/data/effecData.js";

export const critsRevisited = {
    // damageTypes that have no critical hits or fumbles
    undesiredTypes: ["none", "no type", "no damage", "temphp", ""],
    // damageTypes that are not preferred for critical hits
    nonPreferredTypes: ['bludgeoning', 'slashing', 'piercing'],
    // this function gathers the rollTableID from the compendium and rolls on the table
    rollOnTable: async function (tableName, targetUuid, rollTableID,) {
        let rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
        let rollTableIndex = await rollTablePack.getIndex();
        let rollResult = await rollTablePack.getDocument(rollTableID).then(table => table.draw({rollMode: "gmroll"}));
        // console.log(rollResult);
        for (let result of rollResult.results) {
            let rollRange = result.range.toString();
            // clean the tableName from whitespaces
            tableName = result.parent.name.replace(/\s+/g, '');
            // console.log(tableName);
            // get the linked effects
            let appliedEffect = effectTables[tableName][rollRange];
            // console.log(appliedEffect)
            if (appliedEffect) {
                await helperFunctions.prepareEffects(appliedEffect, targetUuid, tableName);
            }
        }
    },
    // Called from the itemMacro, when a critical hit is rolled. In the call, the workflowObject of the attack has to be passed.
    rollForCriticalHits: async function (workflowObject) {
        let attackDamageType = await this.getAttackDamageType(workflowObject);
        if (attackDamageType === null || typeof attackDamageType !== 'string') {
            return;
        }
        // make sure the attackDamageType is not in the undesiredTypes array
        if (!this.undesiredTypes.includes(attackDamageType)) {
            // capitalize the first letter of the attackDamageType to fit the rollTable name in Foundry compendium
            let tableName = helperFunctions.capitalizeFirstLetter(attackDamageType);
            let targetUuid = workflowObject.damageItem.actorUuid;
            let rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
            let rollTableIndex = await rollTablePack.getIndex(); // Changed line
            let rollTableID = rollTableIndex.find(t => t.name === tableName)._id; // Changed line
            await this.rollOnTable(tableName, targetUuid, rollTableID); // Changed line
        }
    },
    // Called from the itemMacro, when a critical fumble is rolled. In the call, the workflowObject of the attack has to be passed.
    rollForCriticalFumbles: async function (workflowObject) {
        let attackDamageType = workflowObject.item.labels.damageType;
        if (!this.undesiredTypes.includes(attackDamageType)) {
            // get the attacker
            // console.log(workflowObject)
            let targetUuid = workflowObject.actor.uuid;
            let rollTableID = "TIJizkcNCKbq2qWD";
            await this.rollOnTable('CriticalFumbles', targetUuid, rollTableID);
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
                const isImmune = await helperFunctions.checkImmunity(detail.type, targetUuid, detail.type);
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
critsRevisited.helperFunctions = helperFunctions;
critsRevisited.effectMacros = effectMacros;
critsRevisited.effectData = effectData;

// Attach critsRevisited to the game object once Foundry is fully loaded
Hooks.once('ready', () => {
    game.critsRevisited = critsRevisited;
});

console.log("Critical Hits Revisited has finished loading!");