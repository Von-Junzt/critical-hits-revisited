// Description: This script contains the main functions for the module.
console.log("Critical Hits Revisited is starting to load!");

import {helperFunctions} from './helperFunctions.js';
import {itemMacros} from "./itemMacros.js";
import {effectTables} from "./effectTables.js";

console.log(helperFunctions);
console.log(itemMacros);

export const critsRevisited = {
    rollOnTable: async function (tableName, targetUuid, rollTableID) {
        // prepare the rollTablePack
        let rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
        rollTablePack.getIndex();
        // roll on the table
        let rollResult = await rollTablePack.getDocument(rollTableID).then(table => table.draw({rollMode: "gmroll"}));
        for (let result of rollResult.results) {
            let rollRange = result.range.toString();
            // check if the effects parent property is Minor Injuries or Major Injuries and set the tableName accordingly
            tableName = result.parent.name === "Minor Injuries" ? 'MinorInjuries' : result.parent.name === "Major Injuries" ? 'MajorInjuries' : tableName;
            // get the linked effects
            let appliedEffect = effectTables[tableName][rollRange];
            if (appliedEffect) {
                await helperFunctions.prepareEffects(appliedEffect, targetUuid, tableName);
            }
        }
    },
    /*
    rollForCriticalHits - This function rolls for critical hits and applies the effects to the target.
    The effects are applied based on the attack damage type.
    The attack damage type is determined by the highest damage value of the attack.
    If there are multiple damage types with the same damage value, the first one that is bludgeoning, slashing, or piercing is chosen.
    If there are multiple damage types with the same damage value and none of them is bludgeoning, slashing, or piercing, the first one is chosen.
    The workflowObject is passed by the ItemMacro on the critical hits feat equipped by the actor.
    */
    rollForCriticalHits: async function (workflowObject) {
        let attackDamageType = this.getAttackDamageType(workflowObject);
        // make shure the attackDamageType is not "none", "no type", "no damage", "temphp", or "", because there are no
        // critical hits for these damage types
        if (!["none", "no type", "no damage", "temphp", ""].includes(attackDamageType)) {
            // capitalize the first letter of the attackDamageType to fit the rollTable name in Foundry compendium
            let tableName = attackDamageType.charAt(0).toUpperCase() + attackDamageType.slice(1);
            // get the target
            let targetUuid = workflowObject.damageItem.actorUuid;
            // get the rollTableID and roll on the table
            let rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
            rollTablePack.getIndex();
            let rollTableID = rollTablePack.index.find(t => t.name === tableName)._id;
            await this.rollOnTable(tableName, targetUuid, rollTableID);
        }
    },
    rollForCriticalFumbles: async function (workflowObject) {
        let attackDamageType = workflowObject.item.labels.damageType;
        // make shure the attackDamageType is not "none", "no type", "no damage", "temphp", or "", because there are no
        // critical fumbles for these damage types
        if (!["none", "no type", "no damage", "temphp", ""].includes(attackDamageType)) {
            // get the attacker
            let targetUuid = workflowObject.tokenUuid;
            // get the rollTableID and roll on the table
            let rollTableID = "TIJizkcNCKbq2qWD";
            await this.rollOnTable('Fumble', targetUuid, rollTableID);
        }
    },
    // getAttackDamageType - This function gets the attack damage type from the workflowObject.
    getAttackDamageType: function (workflowObject) {
        let attackDamageType;
        // check has multiple damage types
        if (workflowObject.damageDetail.length > 0) {
            // if there are multiple damageTypes, push them into an array and sort them by damage value
            let sortArray = workflowObject.damageDetail.map(detail => [detail.type, detail.damage]);
            sortArray.sort(([, a], [, b]) => b - a);
            let maxDamageValue = sortArray[0][1];
            // get the damageTypes with the highest damage value
            sortArray = sortArray.filter(element => (element[1] === maxDamageValue))
            // when there are multiple damage types with the same maximum damage value, try to find a type that is not
            // 'bludgeoning', 'slashing', or 'piercing'. If not, default to the first type in the sorted array.
            if (sortArray.length > 1) {
                let nonPreferredTypes = ['bludgeoning', 'slashing', 'piercing'];
                let preferredType = sortArray.find(([type]) => !nonPreferredTypes.includes(type));
                attackDamageType = preferredType ? preferredType[0] : sortArray[0][0];
            } else {
                attackDamageType = sortArray[0][0];
            }
        } else {
            attackDamageType = workflowObject.damageDetail[0].type;
        }
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