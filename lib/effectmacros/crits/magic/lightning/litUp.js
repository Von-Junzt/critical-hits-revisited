import {mainScriptUtils} from "../../../../utils/mainScriptUtils.js";
import {animationUtils} from "../../../../utils/animationUtils.js";

/**
 * Lit Up checks if the actor is within 15ft of any other token and applies the reactionused effect to them.
 * @param effect {effect} The effect object, passed by the effect macro
 * @param token {token} The token object, passed by the effect macro
 * @returns {Promise<void>}
 */

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

