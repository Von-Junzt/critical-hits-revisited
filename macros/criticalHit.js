if (args[0].macroPass == 'postActiveEffects' && workflow.isCritical) {
    // get last attack damage type
    let lastAttack = workflow.damageItem;
    let lastAttackType = lastAttack.damageDetail[0][0].type;

    // exclude certain damage types because there are no rolltables
    if (!(["none", "no type", "no damage", "temphp", ""].includes(lastAttackType))) {

        // get damageType and customize
        let tableName = lastAttackType.charAt(0).toUpperCase() + lastAttackType.slice(1);
        let rollResult;

        // get rolltable
        const rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");

        // get target
        let target = workflow.damageItem.actorUuid;

        // prepare rolltable
        rollTablePack.getIndex();
        rollTableID = rollTablePack.index.find(t => t.name === tableName)._id;

        // roll on table and apply effect
        rollResult = await rollTablePack.getDocument(rollTableID).then(table => table.draw({rollMode: "gmroll"}));

        for (let i = 0; i < rollResult.results.length; i++) {

            let rollRange = rollResult.results[i].range.toString();

            if(rollResult.results[i].parent.name === "Minor Injuries") {

                tableName = 'MinorInjuries';

            } else if(rollResult.results[i].parent.name === "Major Injuries") {

                tableName = 'MajorInjuries';
            }

            if(!(linkedEffects[tableName][rollRange] === undefined)) {

                let appliedEffect = linkedEffects[tableName][rollRange];

                // apply Effect
                if(typeof appliedEffect === 'string') {

                    applyEffect(appliedEffect, target);

                } else {

                    for (let i = 0; i < appliedEffect.length; i++) {

                        applyEffect(appliedEffect[i], target);

                    }
                }
            }

        }

        // search and delete unnecessary chat messages
        for (let message of game.messages.contents) {
            if (message.flavor.search("Critical Hits Table!") > -1 || message.content.search("Critical Hits Table!") > -1) {
                message.delete();
            }
        }

    } else {

        // search and delete unnecessary chat messages
        for (let message of game.messages.contents) {
            if (message.flavor.search("Critical Hits Table!") > -1 || message.content.search("Critical Hits Table!") > -1) {
                message.delete();
            }
        }
    }

} else if (args[0].macroPass == 'postActiveEffects' && workflow.isFumble) {

    // get last attack damage type
    let lastAttackType = workflow.item.labels.damageType;

    // exclude certain damage types because there are no rolltables
    if (!(["none", "no type", "no damage", "temphp", ""].includes(lastAttackType))) {

        // get target
        let target = workflow.tokenUuid;

        // get rolltable
        let rollResult;
        const rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
        rollTablePack.getIndex();
        rollTableID = "TIJizkcNCKbq2qWD";

        // roll on table
        rollResult = await rollTablePack.getDocument(rollTableID).then(table => table.draw({rollMode: "gmroll"}));
        let rollRange = rollResult.results[0].range.toString();
        let appliedEffect = linkedEffects['Fumble'][rollRange];

        if(!(linkedEffects[lastAttackTypeCapitalFirst][rollRange] === undefined)) {

            let appliedEffect = linkedEffects[lastAttackTypeCapitalFirst][rollRange];

            // apply Effect
            if(typeof appliedEffect === 'string') {

                applyEffect(appliedEffect, target);

            } else {

                for (let i = 0; i < appliedEffect.length; i++) {

                    applyEffect(appliedEffect[i], target);

                }
            }
        }

        // search and delete unnecessary chat messages
        for (let message of game.messages.contents) {
            if (message.flavor.search("Critical Fumbles Table!") > -1 || message.content.search("Critical Fumbles Table!") > -1) {
                message.delete();
            }
        }
    } else {

        // search and delete unnecessary chat messages
        for (let message of game.messages.contents) {
            if (message.flavor.search("Critical Hits Table!") > -1 || message.content.search("Critical Hits Table!") > -1) {
                message.delete();
            }
        }
    }
}
