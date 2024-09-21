import { utils } from '../../../../utils/utils.js';

export async function festered(target, mode, workflow) {
    const festeredFlag = target.flags['critical-hits-revisited']?.festeredHPReduction;
    const festeredEffect = target.effects.find(e => e.flags['critical-hits-revisited']?.festered);
    if (mode === 'add') {
        if (festeredEffect) {
            // Revert existing effect
            const currentMaxHP = target.system.attributes.hp.max;
            const existingReduction = festeredEffect.flags['critical-hits-revisited'].hpReduction;
            await target.update({
                "system.attributes.hp.max": currentMaxHP + existingReduction,
                "flags.critical-hits-revisited.-=festeredHPReduction": null
            });
            await target.deleteEmbeddedDocuments("ActiveEffect", [festeredEffect.id]);
            utils.debug('Existing Festered effect reverted', { actor: target.name, restoredHP: existingReduction });
        }
        let newHPReduction = 0;
        if (workflow && workflow.damageTotal) {
            newHPReduction = Math.floor(workflow.damageTotal / 2);
        } else {
            newHPReduction = Math.floor(target.system.attributes.hp.max * 0.1);
        }
        const currentMaxHP = target.system.attributes.hp.max;
        await target.update({
            "system.attributes.hp.max": currentMaxHP - newHPReduction,
            "flags.critical-hits-revisited.festeredHPReduction": newHPReduction
        });
        utils.debug('New Festered effect applied', { actor: target.name, hpReduction: newHPReduction });
    } else if (mode === 'remove') {
        const hpReduction = target.flags["critical-hits-revisited"].festeredHPReduction ||
            effect.flags["critical-hits-revisited"].hpReduction;
        const currentMaxHP = target.system.attributes.hp.max;
        await target.update({
            "system.attributes.hp.max": currentMaxHP + hpReduction,
            "flags.critical-hits-revisited.-=festeredHPReduction": null
        });
        utils.debug("Festered effect removed", { actor: target.name, restoredHP: hpReduction });
    }
}