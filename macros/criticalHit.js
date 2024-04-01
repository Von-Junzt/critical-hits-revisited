if (args[0].macroPass == 'postActiveEffects' && workflow.isCritical) {
    // get last attack damage type
    let lastAttack = workflow.damageItem;
    let lastAttackType = lastAttack.damageDetail[0][0].type;

    // exclude certain damage types because there are no rolltables
    if (!(["none", "no type", "no damage", "temphp", ""].includes(lastAttackType))) {

        // get damageType and customize
        let lastAttackTypeCapitalFirst = lastAttackType.charAt(0).toUpperCase() + lastAttackType.slice(1);
        let rollResult;

        // get rolltable
        const rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");

        // get target
        let target = workflow.damageItem.actorUuid;

        // prepare rolltable
        rollTablePack.getIndex();
        rollTableID = rollTablePack.index.find(t => t.name === lastAttackTypeCapitalFirst)._id;

        // roll on table
        rollResult = await rollTablePack.getDocument(rollTableID).then(table => table.draw({rollMode: "gmroll"}));
        let rollTotal = rollResult.roll._total;
        let appliedEffect = rollEffects[lastAttackTypeCapitalFirst][rollTotal];

        // apply Effect
        if(typeof appliedEffect === 'string') {
            applyEffect(appliedEffect, target);

        } else {
            for (let i = 0; i < appliedEffect.length; i++) {
                applyEffect(appliedEffect[i], target);
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
    console.log(lastAttackType);

    // exclude certain damage types because there are no rolltables
    if (!(["none", "no type", "no damage", "temphp", ""].includes(lastAttackType))) {

        // get rolltable
        let rollResult;
        const rollTablePack = game.packs.get("critical-hits-revisited.critical-hits-tables");
        rollTablePack.getIndex();
        rollTableID = "TIJizkcNCKbq2qWD";

        // roll on table
        rollResult = await rollTablePack.getDocument(rollTableID).then(table => table.draw({rollMode: "gmroll"}));

        // search and delete unnecessary chat messages
        for (let message of game.messages.contents) {
            if (message.flavor.search("Critical Fubles Table!") > -1 || message.content.search("Critical Fumbles Table!") > -1) {
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
