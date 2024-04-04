// In theory, we could use this to change the damage roll for a critical hit. Unfortunately it is very difficult apply
// the damage rolls that are given in the critical-hits-revisited.pdf accordingly. The damage rolls are given as strings
// and are not easily converted to Roll objects. Therefore, we will have to use a different approach in the future.
if (args[0].macroPass == 'preDamageRollComplete' && workflow.isCritical) {
    console.log('---------------------------------------------------------------');
    console.log(workflow);
    let weaponDamage = workflow.item.
    let damageRoll = await new Roll("7").roll({async: true});
    damageRoll = await workflow.convertRollToDamageRoll(damageRoll);
    workflow.setDamageRoll(damageRoll);
    console.log('---------------------------------------------------------------');
}



