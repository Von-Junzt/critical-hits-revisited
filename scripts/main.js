// Description: This script contains the main functions for the module.
async function rollOnTable(tableName, target, rollTableID) {
    let rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
    rollTablePack.getIndex();
    let rollResult = await rollTablePack.getDocument(rollTableID).then(table => table.draw({rollMode: "gmroll"}));
    for (let result of rollResult.results) {
        let rollRange = result.range.toString();
        tableName = result.parent.name === "Minor Injuries" ? 'MinorInjuries' : result.parent.name === "Major Injuries" ? 'MajorInjuries' : tableName;
        let appliedEffect = linkedEffects[tableName][rollRange];
        if (appliedEffect) {
            await prepareEffects(appliedEffect, target);
        }
    }
}

async function rollForCriticalHits(workflowObject) {
    let attackDamageType = getAttackDamageType(workflowObject);
    if (!["none", "no type", "no damage", "temphp", ""].includes(attackDamageType)) {
        let tableName = attackDamageType.charAt(0).toUpperCase() + attackDamageType.slice(1);
        let target = workflowObject.damageItem.actorUuid;
        let rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
        rollTablePack.getIndex();
        let rollTableID = rollTablePack.index.find(t => t.name === tableName)._id;
        await rollOnTable(tableName, target, rollTableID);
    }
}

async function rollForCriticalFumbles(workflowObject){
    let attackDamageType = workflowObject.item.labels.damageType;
    if (!["none", "no type", "no damage", "temphp", ""].includes(attackDamageType)) {
        let target = workflowObject.tokenUuid;
        let rollTableID = "TIJizkcNCKbq2qWD";
        await rollOnTable('Fumble', target, rollTableID);
    }
}

// getAttackDamageType - This function gets the attack damage type from the workflowObject.
function getAttackDamageType(workflowObject) {
    let attackDamageType;
    // check has multiple damage types
    if(workflowObject.damageDetail.length > 0) {
        // if there are multiple damageTypes, push them into an array and sort them by damage value
        let sortArray = workflowObject.damageDetail.map(detail => [detail.type, detail.damage]);
        sortArray.sort(([,a],[,b]) => b-a);
        let maxDamageValue = sortArray[0][1];
        // get the damageTypes with the highest damage value
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