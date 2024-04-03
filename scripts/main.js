async function rollForCriticalHits(workflowObject) {
    // get last attack damage type
    let lastAttack = workflowObject.damageItem;
    let attackdamageType;
    let damageAmount = 0;

    // set the damageType to the one that delivered the highest damage amount
    for (let i = 0; i < workflowObject.damageDetail.length; i++) {
        if(workflowObject.damageDetail[i].damage >= damageAmount) {
            attackdamageType = workflowObject.damageDetail[i].type;
        }
    }

    console.log(attackdamageType);

    // exclude certain damage types because there are no rolltables
    if (!(["none", "no type", "no damage", "temphp", ""].includes(attackdamageType))) {
        // get damageType and customize
        let tableName = attackdamageType.charAt(0).toUpperCase() + attackdamageType.slice(1);
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

        deleteChatMessages('Critical Fumbles Table!');

    } else {
        deleteChatMessages('Critical Fumbles Table!');
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

        if(!(linkedEffects['Fumble'][rollRange] === undefined)) {
            let appliedEffect = linkedEffects['Fumble'][rollRange];
            // apply Effect
            if(typeof appliedEffect === 'string') {
                applyEffect(appliedEffect, target);
            } else {
                for (let i = 0; i < appliedEffect.length; i++) {
                    applyEffect(appliedEffect[i], target);
                }
            }
        }

        deleteChatMessages('Critical Fumbles Table!');

    } else {
        deleteChatMessages('Critical Hits Table!');

    }
}