async function applyEffect(effect, uuid) {
    let hasEffectApplied = await game.dfreds.effectInterface.hasEffectApplied(effect, uuid);
    if (!hasEffectApplied) {
        game.dfreds.effectInterface.addEffect({ effectName: effect, uuid});
    }
}

async function acidBath(target) {
    if(!(typeof(target.system.attributes.ac.equippedArmor) === undefined)) {

        let equippedArmor =  target.system.attributes.ac.equippedArmor;

        if(equippedArmor) {

            let equippedArmor = target.system.attributes.ac.equippedArmor;
            let armorLabels = target.system.attributes.ac.equippedArmor.labels.properties;
            let isMagical;

            for (let i = 0; i < armorLabels.length; i++) {
                if(armorLabels[i].label === "Magical") {
                    isMagical = true;
                }
            }

            if(!isMagical) {
                equippedArmor.delete();
            } else {

                target.system.attributes.ac.equippedArmor.system.updateSource({'armor.value' : 0 });
                target.system.attributes.ac.equippedArmor.system.updateSource({'armor.magicalBonus' :0 });

            }
        }
    }
}
