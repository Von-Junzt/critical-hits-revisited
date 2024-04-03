async function rollForCriticalHits(workflowObject) {
    // get last attack damage type
    let lastAttack = workflowObject.damageItem;
    let attackDamageType;

    console.log(workflowObject);

    // set the damageType to the one that delivered the highest damage amount
    if(workflowObject.damageDetail.length > 0) {
        // push keys and values into sorting array
        let sortArray = [];
        for (let i = 0; i < workflowObject.damageDetail.length; i++) {
            sortArray.push([workflowObject.damageDetail[i].type, workflowObject.damageDetail[i].damage]);
        }

        // sort array descending by damage
        sortArray = sortArray.sort(([,a],[,b]) => b-a);
        let maxDamageValue = sortArray[0][1];

        // filter for highest damage
        sortArray = sortArray.filter(element => (element[1] === maxDamageValue))

        // if multiple damage types with same amount of damage, get the base damageType. at this point we assume, that
        // weapons always have a single base damageType.
        // in the future: if multiple damage types with same amount of damage, let user decide the table to roll on
        if(sortArray.length > 1) {
            for (let i = 0; i < workflowObject.damageDetail.length; i++) {
                if(['bludgeoning', 'slashing', 'piercing'].includes(workflowObject.damageDetail[i].type)) {
                    attackDamageType = workflowObject.damageDetail[i].type;
                }
            }
        } else {
            attackDamageType = sortArray[0][0];
        }
    } else {
        attackDamageType = workflowObject.damageDetail[0].type;
    }
    // exclude certain damage types because there are no rolltables
    if (!(["none", "no type", "no damage", "temphp", ""].includes(attackDamageType))) {
        // get damageType and customize
        let tableName = attackDamageType.charAt(0).toUpperCase() + attackDamageType.slice(1);
        // get rolltable
        let rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
        // get target
        let target = workflowObject.damageItem.actorUuid;

        // prepare rolltable
        rollTablePack.getIndex();
        let rollTableID = rollTablePack.index.find(t => t.name === tableName)._id;

        // roll on table and apply effect
        let rollResult = await rollTablePack.getDocument(rollTableID).then(table => table.draw({rollMode: "gmroll"}));

        for (let i = 0; i < rollResult.results.length; i++) {
            let rollRange = rollResult.results[i].range.toString();
            if (rollResult.results[i].parent.name === "Minor Injuries") {
                tableName = 'MinorInjuries';
            } else if (rollResult.results[i].parent.name === "Major Injuries") {
                tableName = 'MajorInjuries';
            }

            if (!(linkedEffects[tableName][rollRange] === undefined)) {
                let appliedEffect = linkedEffects[tableName][rollRange];
                // apply Effect
                if (typeof appliedEffect === 'string') {
                    applyEffect(appliedEffect, target);
                } else {
                    for (let i = 0; i < appliedEffect.length; i++) {
                        applyEffect(appliedEffect[i], target);
                    }
                }
            }
        }
    }
}

async function rollForCriticalFumbles(workflowObject){

    // get last attack damage type
    let attackDamgeType = workflowObject.item.labels.damageType;

    // exclude certain damage types because there are no rolltables
    if (!(["none", "no type", "no damage", "temphp", ""].includes(attackDamgeType))) {

        // get target
        let target = workflowObject.tokenUuid;

        // get rolltable
        let rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
        rollTablePack.getIndex();
        let rollTableID = "TIJizkcNCKbq2qWD";

        // roll on table
        let rollResult = await rollTablePack.getDocument(rollTableID).then(table => table.draw({rollMode: "gmroll"}));
        let rollRange = rollResult.results[0].range.toString();

        if (!(linkedEffects['Fumble'][rollRange] === undefined)) {
            let appliedEffect = linkedEffects['Fumble'][rollRange];
            // apply Effect
            if (typeof appliedEffect === 'string') {
                applyEffect(appliedEffect, target);
            } else {
                for (let i = 0; i < appliedEffect.length; i++) {
                    applyEffect(appliedEffect[i], target);
                }
            }
        }
    }
}