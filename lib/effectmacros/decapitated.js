export async function decapitated(target) {
    if (target.type === 'character') {
        ui.notifications.warn('The target is a player. The GM should be asked if they want the player to die or not.');
        target.update({"system.attributes.hp.value" : 0});
    } else {
        target.update({"system.attributes.hp.value" : 0});
    }
}