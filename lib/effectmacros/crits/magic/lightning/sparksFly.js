import { workflowCache } from '../../workflowCache.js';


// const targets = MidiQOL.findNearby(-1, token, 5); // disposition: looks like -1 is opposite, 1 is same, 0 is neutral, and 2 is secret
// game.user.updateTokenTargets([chosenTarget.id]);

export async function sparksFly (actor, token){
    // You may choose one other creature within 15 ft. of the victim. That creature must succeed on a Dexterity saving
    // throw (DC 14) or take half as much damage as the result for your critical hit.
    const workflow = workflowCache.get(actor.uuid);
    if (!workflow) return;

    const targets = MidiQOL.findNearby(null, token, 15, { exclude: [workflow.targets.first()] });

    if (targets.length === 0) {
        ui.notifications.warn("No valid targets within 15 feet.");
        return;
    }

    const chosenTarget = await new Promise(resolve => {
        new Dialog({
            title: "Choose a target for Sparks Fly",
            content: `<p>Select one creature within 15 feet to be affected by Sparks Fly.</p>`,
            buttons: targets.reduce((acc, t) => {
                acc[t.id] = {
                    label: t.name,
                    callback: () => resolve(t)
                };
                return acc;
            }, {}),
            close: () => resolve(null)
        }).render(true);
    });

    if (!chosenTarget) return;

    const targetToken = chosenTarget;
    const targetActor = targetToken.actor;

    const dc = 14;
    const saveRoll = await targetActor.rollAbilitySave('dex', { flavor: `Dexterity Save (DC ${dc}) to avoid Sparks Fly` });
    const saved = saveRoll.total >= dc;

    const criticalDamage = workflow.damageTotal;
    const sparksDamage = Math.floor(criticalDamage / 2);

    if (!saved) {
        await MidiQOL.applyTokenDamage([{ damage: sparksDamage, type: 'lightning' }], sparksDamage, new Set([targetToken]), null, null, { flavor: "Sparks Fly Damage" });
        ChatMessage.create({ content: `${targetToken.name} fails the save and takes ${sparksDamage} lightning damage from Sparks Fly!` });
    } else {
        ChatMessage.create({ content: `${targetToken.name} succeeds on the save and avoids the Sparks Fly effect!` });
    }
}