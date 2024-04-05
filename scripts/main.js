// Description: This script contains the main functions for the module.
console.log("Critical Hits Revisited is starting to load!");

import {helperFunctions} from './helperFunctions.js';
import {itemMacros} from "./itemMacros.js";
import {effectTables} from "./effectTables.js";

console.log(helperFunctions);
console.log(itemMacros);

export const critsRevisited = {

    // damageTypes that have no critical hits or fumbles
    undesiredTypes: ["none", "no type", "no damage", "temphp", ""],

    rollOnTable: async function (tableName, targetUuid, rollTableID,) {
        let rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
        let rollTableIdex = await rollTablePack.getIndex();
        let rollResult = await rollTablePack.getDocument(rollTableID).then(table => table.draw({rollMode: "gmroll"}));
        for (let result of rollResult.results) {
            let rollRange = result.range.toString();
            // check if the effects parent property is Minor Injuries or Major Injuries and set the tableName accordingly
            tableName = result.parent.name.replace(/\s+/g, '');
            // get the linked effects
            let appliedEffect = effectTables[tableName][rollRange];
            if (appliedEffect) {
                await helperFunctions.prepareEffects(appliedEffect, targetUuid, tableName);
            }
        }
    },
    rollForCriticalHits: async function (workflowObject) {
        let attackDamageType = await this.getAttackDamageType(workflowObject);
        if (attackDamageType === null || typeof attackDamageType !== 'string') {
            return;
        }
        // make shure the attackDamageType is not "none", "no type", "no damage", "temphp", or "", because there are no
        // critical hits for these damage types
        if (!this.undesiredTypes.includes(attackDamageType)) {
            // capitalize the first letter of the attackDamageType to fit the rollTable name in Foundry compendium
            let tableName = helperFunctions.capitalizeFirstLetter(attackDamageType);
            // get the target
            let targetUuid = workflowObject.damageItem.actorUuid;
            // get the rollTableID and roll on the table
            let rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
            let rollTableIndex = await rollTablePack.getIndex(); // Changed line
            let rollTableID = rollTableIndex.find(t => t.name === tableName)._id; // Changed line
            await this.rollOnTable(tableName, targetUuid, rollTableID); // Changed line
        }
    },
    rollForCriticalFumbles: async function (workflowObject) {
        let attackDamageType = workflowObject.item.labels.damageType;
        // make shure the attackDamageType is not "none", "no type", "no damage", "temphp", or "", because there are no
        // critical fumbles for these damage types
        if (!this.undesiredTypes.includes(attackDamageType)) {
            // get the attacker
            let targetUuid = workflowObject.tokenUuid;
            // get the rollTableID and roll on the table
            let rollTableID = "TIJizkcNCKbq2qWD";
            await this.rollOnTable('Fumble', targetUuid, rollTableID);
        }
    },
    // getAttackDamageType - This function gets the attack damage type from the workflowObject.
    getAttackDamageType: async function (workflowObject) {
        let attackDamageType;
        // check has multiple damage types
        if (workflowObject.damageDetail.length > 0) {
            // Check if the target has immunities to the damage types. If so, remove them from the array.
            let targetUuid = workflowObject.damageItem.actorUuid;
            let damageDetails = await Promise.all(workflowObject.damageDetail.map(async detail => {
                const isImmune = await helperFunctions.checkImmunity(detail.type, targetUuid, detail.type);
                if (!isImmune) {
                    return [detail.type, detail.damage];
                }
            }));
            // Filter out null values from the array if the array is empty after removing immunities, return null
            damageDetails = damageDetails.filter(detail => detail !== undefined);
            if(damageDetails.length === 0) return null;

            // Sort the array by damage value.
            let maxDamageValue = Math.max(...damageDetails.map(([_, damage]) => damage)); // Changed line
            let maxDamageTypes = damageDetails.filter(([_, damage]) => damage === maxDamageValue); // Changed line
            //  If there are multiple damage types with the same damage value, choose the first one that is not
            //  bludgeoning, slashing, or piercing.
            if (maxDamageTypes.length > 1) {
                let nonPreferredTypes = ['bludgeoning', 'slashing', 'piercing'];
                let preferredType = maxDamageTypes.find(([type]) => !nonPreferredTypes.includes(type));
                attackDamageType = preferredType ? preferredType[0] : maxDamageTypes[0][0];
            } else {
                attackDamageType = maxDamageTypes[0][0];
            }
        } else {
            attackDamageType = workflowObject.damageDetail[0]?.type || null;
            console.log(attackDamageType);
            console.log(typeof(attackDamageType));
        }
        console.log(attackDamageType);
        console.log(typeof(attackDamageType));
        return attackDamageType;
    }
}

// Add the helperFunctions and itemMacros to critsRevisited
critsRevisited.helperFunctions = helperFunctions;
critsRevisited.itemMacros = itemMacros;

// Attach critsRevisited to the game object once Foundry is fully loaded
Hooks.once('ready', () => {
    game.critsRevisited = critsRevisited;
});

console.log("Critical Hits Revisited has finished loading!");