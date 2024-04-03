if (args[0].macroPass == 'preDamageRollComplete' && workflow.isCritical) {
    console.log('---------------------------------------------------------------');
    console.log(workflow);
    let weaponDamage = workflow.item.
    let damageRoll = await new Roll("7").roll({async: true});
    damageRoll = await workflow.convertRollToDamageRoll(damageRoll);
    workflow.setDamageRoll(damageRoll);
    console.log('---------------------------------------------------------------');
}



