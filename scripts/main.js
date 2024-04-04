// Description: This script contains the main functions for the module.

const critsRevisited = {
    rollOnTable: async function (tableName, target, rollTableID) {
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
            let appliedEffect = linkedEffects[tableName][rollRange];
            if (appliedEffect) {
                await helperFunctions.prepareEffects(appliedEffect, target);
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
        let attackDamageType = critsRevisited.getAttackDamageType(workflowObject);
        // make shure the attackDamageType is not "none", "no type", "no damage", "temphp", or "", because there are no
        // critical hits for these damage types
        if (!["none", "no type", "no damage", "temphp", ""].includes(attackDamageType)) {
            // capitalize the first letter of the attackDamageType to fit the rollTable name in Foundry compendium
            let tableName = attackDamageType.charAt(0).toUpperCase() + attackDamageType.slice(1);
            // get the target
            let target = workflowObject.damageItem.actorUuid;
            // get the rollTableID and roll on the table
            let rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
            rollTablePack.getIndex();
            let rollTableID = rollTablePack.index.find(t => t.name === tableName)._id;
            await critsRevisited.rollOnTable(tableName, target, rollTableID);
        }
    },
    rollForCriticalFumbles: async function (workflowObject) {
        let attackDamageType = workflowObject.item.labels.damageType;
        // make shure the attackDamageType is not "none", "no type", "no damage", "temphp", or "", because there are no
        // critical fumbles for these damage types
        if (!["none", "no type", "no damage", "temphp", ""].includes(attackDamageType)) {
            // get the attacker
            let target = workflowObject.tokenUuid;
            // get the rollTableID and roll on the table
            let rollTableID = "TIJizkcNCKbq2qWD";
            await critsRevisited.rollOnTable('Fumble', target, rollTableID);
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
            // if there are multiple damage types with the same damage value, get the first one that is bludgeoning, slashing, or piercing
            // we are assuming that weapons that deal multiple damage types always have bludgeoning, slashing, or piercing
            if (sortArray.length > 1) {
                attackDamageType = workflowObject.damageDetail.find(detail => ['bludgeoning', 'slashing', 'piercing'].includes(detail.type)).type;
            } else {
                attackDamageType = sortArray[0][0];
            }
        } else {
            attackDamageType = workflowObject.damageDetail[0].type;
        }
        return attackDamageType;
    }
}

critsRevisited.helperFunctions = require('./helperFunctions.js');
critsRevisited.itemMacros = require('./itemMacros.js');