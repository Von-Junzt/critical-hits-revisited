// Description: This file contains helper functions that are used in the main scripts.
// applyEffects - This function applies one or multiple effects to the target.
async function applyEffects(effects, target) {
    // check if effects is a string or an array and continue accordingly
    if (typeof effects === 'string') {
        await applyEffect(effects, target);
    } else {
        for (let effect of effects) {
            await applyEffect(effect, target);
        }
    }
}

// rollForCriticalHits - This function gets the damageType of the attack and rolls for critical hits based on the damageType.
async function rollForCriticalHits(workflowObject) {
    // get workflowObject's attack damage type
    let attackDamageType = getAttackDamageType(workflowObject);

    // exclude the attack damage types that do not have critical hit tables
    if (!["none", "no type", "no damage", "temphp", ""].includes(attackDamageType)) {
        // refactor the attackDamageType to match the table name
        let tableName = attackDamageType.charAt(0).toUpperCase() + attackDamageType.slice(1);
        // get the target from the workflowObject
        let target = workflowObject.damageItem.actorUuid;
        // prepare the rollTablePack
        let rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
        rollTablePack.getIndex();
        let rollTableID = rollTablePack.index.find(t => t.name === tableName)._id;
        // roll on the table and apply the effect
        let rollResult = await rollTablePack.getDocument(rollTableID).then(table => table.draw({rollMode: "gmroll"}));
        for (let result of rollResult.results) {
            let rollRange = result.range.toString();
            tableName = result.parent.name === "Minor Injuries" ? 'MinorInjuries' : result.parent.name === "Major Injuries" ? 'MajorInjuries' : tableName;
            let appliedEffect = linkedEffects[tableName][rollRange];
            if (appliedEffect) {
                await applyEffects(appliedEffect, target);
            }
        }
    }
}

// rollForCriticalFumbles - This function rolls on the Critical Fumbles table and applies the effect to the target.
async function rollForCriticalFumbles(workflowObject){
    // get workflowObject's attack damage type
    let attackDamageType = workflowObject.item.labels.damageType;
    // exclude the attack damage types that cannot fumble
    if (!["none", "no type", "no damage", "temphp", ""].includes(attackDamageType)) {
        // get attacker from the workflowObject
        let target = workflowObject.tokenUuid;
        // prepare the rollTablePack
        let rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
        rollTablePack.getIndex();
        let rollTableID = "TIJizkcNCKbq2qWD";
        // roll on the table and apply the effect
        let rollResult = await rollTablePack.getDocument(rollTableID).then(table => table.draw({rollMode: "gmroll"}));
        let rollRange = rollResult.results[0].range.toString();
        let appliedEffect = linkedEffects['Fumble'][rollRange];
        if (appliedEffect) {
            await applyEffects(appliedEffect, target);
        }
    }
}

// getAttackDamageType - This function gets the attack damage type from the workflowObject.
function getAttackDamageType(workflowObject) {
    let attackDamageType;
    // check has multiple damage types if so get the highest damage type
    if(workflowObject.damageDetail.length > 0) {
        let sortArray = workflowObject.damageDetail.map(detail => [detail.type, detail.damage]);
        sortArray.sort(([,a],[,b]) => b-a);
        let maxDamageValue = sortArray[0][1];
        sortArray = sortArray.filter(element => (element[1] === maxDamageValue))
        // if there are multiple damage types with the same damage value, get the first one that is bludgeoning, slashing, or piercing
        // we are assuming that weapons that deal multiple damage types always have bludgeoning, slashing, or piercing
        if(sortArray.length > 1) {
            attackDamageType = workflowObject.damageDetail.find(detail => ['bludgeoning', 'slashing', 'piercing'].includes(detail.type)).type;
        } else {
            attackDamageType = sortArray[0][0];
        }
    } else {
        attackDamageType = workflowObject.damageDetail[0].type;
    }
    return attackDamageType;
}