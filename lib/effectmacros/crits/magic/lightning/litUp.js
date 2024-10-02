import {mainScriptUtils} from "../../../../utils/mainScriptUtils.js";

export async function litUp (effect) {
    const tokenUuid = effect?.parent?.token?.uuid || game.scenes.active?.tokens.find(token => token.actor?.id === effect?.target?.id)?.uuid;
    const token = await fromUuid(tokenUuid);
    const targets = await MidiQOL.findNearby(1, token, 15);
    const debugObject = {
        tokenUuid: tokenUuid,
        token: token,
        targets: targets,
    };
    mainScriptUtils.debug("Debug Token:", debugObject);
    targets.forEach(target => {
        mainScriptUtils.applyEffects('litup', target.actor.uuid, 'lightning');
    });
}