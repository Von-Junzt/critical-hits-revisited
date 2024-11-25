import {mainScriptUtils} from "./mainScriptUtils.js";
import {animationData} from "../data/animationData.js";
import {OPTIONS} from "../../options.js";

export const animationUtils = {
    /**
     * Plays an animation on a token.
     * @param animationKey {string} The key of the animation to play.
     * @param atLocationToken {token} The token to play the animation on.
     * @param stretchToToken {token} The token to stretch the animation to.
     * @returns {Promise<void>}
     */
    playAnimation: async function (animationKey, atLocationToken, stretchToToken) {
        if (!OPTIONS.ENABLE_ANIMATIONS) {
            console.warn("playAnimation - Animations globally disabled.");
            return;
        }
        const animationConfig = animationData[animationKey];
        if (!animationConfig) return;
        mainScriptUtils.debug("playAnimation - Playing animation:", animationData[animationKey].animation);
        let sequenceEffect = new Sequence().effect();
        for (const [key, value] of Object.entries(animationConfig.animation)) {
            if (key === 'atLocation') {
                sequenceEffect = sequenceEffect.atLocation(atLocationToken);
            } else if (key === 'stretchTo') {
                sequenceEffect = sequenceEffect.stretchTo(stretchToToken);
            } else if (key === 'rotate') {
                sequenceEffect = sequenceEffect.rotateTowards(stretchToToken, {
                    rotationOffset: animationConfig.animation.animOffset || 0
                });
            } else if (typeof sequenceEffect[key] === 'function') {
                sequenceEffect = sequenceEffect[key](value);
            }
        }
        mainScriptUtils.debug("playAnimation - Sequencing.");
        sequenceEffect.play();
        await this.playSound(animationKey);
    },
    /**
     * Plays a sound for an animation.
     * @param animationKey {string} The key of the animation to play.
     * @returns {Promise<void>}
     */
    playSound: async function (animationKey) {
        mainScriptUtils.debug("playAnimation - Playing sound for animation:", animationKey);
        const soundConfig = animationData[animationKey].sound;
        mainScriptUtils.debug("playAnimation - Sound Config:", soundConfig);
        if (soundConfig && soundConfig.file) {
            const activeUserIds = game.users.filter(user => user.active).map(user => user.id);
            new Sequence().sound().file(soundConfig.file).volume(soundConfig.volume).forUsers(activeUserIds).play();
            mainScriptUtils.debug("playAnimation - Playing sound:", soundConfig.file);
        }
    }
}