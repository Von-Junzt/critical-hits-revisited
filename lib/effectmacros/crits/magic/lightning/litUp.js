import {mainScriptUtils} from "../../../../utils/mainScriptUtils.js";
import {animationUtils} from "../../../../utils/animationUtils.js";

export async function litUp (effect, token) {
    const tokenUuid = token.document.uuid;
    const targets = await MidiQOL.findNearby(1, token, 15);
    const debugObject = {
        tokenUuid: tokenUuid,
        token: token,
        targets: targets,
    };
    animationUtils.playAnimation('litup', token);
    mainScriptUtils.debug("litup - Debug Token:", debugObject);
    targets.forEach(target => {
        mainScriptUtils.applyEffects('reactionused', target.actor.uuid, 'lightning');
    });
    effect.delete();
}

