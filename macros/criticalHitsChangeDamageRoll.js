// In theory, we could use this to change the damage roll for a critical hit. Technically it's not possible, because we choose
// the damage type depending on the highest damage value after immunities and resistances are applied. For my dnd5e group
// this is the most realistic approach.
if (args[0].macroPass == 'preDamageRollComplete' && workflow.isCritical) {
    console.log(workflow);
    let damageRoll = await new Roll("7").roll({async: true});
    damageRoll = await workflow.convertRollToDamageRoll(damageRoll);
    workflow.setDamageRoll(damageRoll);
    console.log('---------------------------------------------------------------');
}



