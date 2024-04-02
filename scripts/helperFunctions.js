async function applyEffect(effect, uuid) {
    let hasEffectApplied = await game.dfreds.effectInterface.hasEffectApplied(effect, uuid);
    if (!hasEffectApplied) {
        game.dfreds.effectInterface.addEffect({ effectName: effect, uuid});
    }
}

async function acidBath(target) {
    if(!(target.system.attributes.ac.equippedArmor.system.armor === undefined)) {

        let equippedArmor =  target.system.attributes.ac.equippedArmor;

        if(equippedArmor === undefined) {

            let equippedArmorAC = target.system.attributes.ac.equippedArmor.system.armor.value;
            let magicalBonus = target.system.attributes.ac.equippedArmor.system.armor.magicalBonus;

            if(magicalBonus === undefined) {
                equippedArmor.delete();
            } else {
                equippedArmorAC -= equippedArmorAC;
                target.system.attributes.ac.equippedArmor.system.updateSource({"armor.value" : equippedArmorAC });
            }

            target.update();

        }
    }
}
