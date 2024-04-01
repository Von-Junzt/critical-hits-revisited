let actor = canvas.tokens.controlled[0].actor;
let uuid = actor.uuid;
let equippedArmorAC = -actor.system.attributes.ac.equippedArmor.system.armor.value;
let magical = false;
let magicalBonus = 0;

// check if magical
if (actor.system.attributes.ac.equippedArmor.system.armor.magicalBonus) {
    magical = true;
    magicalBonus = actor.system.attributes.ac.equippedArmor.system.armor.magicalBonus;
}

// reduce AC
// actor.system.attributes.ac.equippedArmor.system.updateSource({"armor.value" : equippedArmorAC })


/*
rollResult.then((promisedata) => {
    console.log(promisedata);
})
*/