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
        if(!OPTIONS.ENABLE_ANIMATIONS) {
            console.warn("playAnimation - Animations globally disabled.");
            return;
        }
        const animationConfig = animationData[animationKey];
        if (!animationConfig) return;
        mainScriptUtils.debug("playAnimation - Playing animation:", animationData[animationKey].animation);
        let sequenceEffect = new Sequence().effect();
        for (const [key, value] of Object.entries(animationConfig.animation)) {
            if (key === 'atLocation') {
                mainScriptUtils.debug("playAnimation - At location:", atLocationToken);
                sequenceEffect = sequenceEffect.atLocation(atLocationToken);
            } else if (key === 'stretchTo') {
                mainScriptUtils.debug("playAnimation - Stretching to:", stretchToToken);
                sequenceEffect = sequenceEffect.stretchTo(stretchToToken);
            } else if (key === 'rotate') {
                let rotation = await this.getRelativeAngle(atLocationToken, stretchToToken);
                if (Object.keys(animationConfig.animation).includes('readjustAngle')) {
                    mainScriptUtils.debug("playAnimation - Readjusting angle of token animation.");
                    rotation = rotation + animationConfig.animation.readjustAngle;
                }
                mainScriptUtils.debug("Rotation:", rotation);
                sequenceEffect = sequenceEffect.rotate(Number(rotation));
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
    playSound: async function(animationKey) {
        mainScriptUtils.debug("playAnimation - Playing sound for animation:", animationKey);
        const soundConfig = animationData[animationKey].sound;
        mainScriptUtils.debug("playAnimation - Sound Config:", soundConfig);
        if (soundConfig && soundConfig.file) {
            const activeUserIds = game.users.filter(user => user.active).map(user => user.id);
            new Sequence().sound().file(soundConfig.file).volume(soundConfig.volume).forUsers(activeUserIds).play();
            mainScriptUtils.debug("playAnimation - Playing sound:", soundConfig.file);
        }
    },
    /**
     * Gets the relative angle between two tokens. Used to rotate the animation in the correct attack direction.
     * @param atLocationToken {token} The token to play the animation on.
     * @param stretchToToken {token} The token to stretch the animation to.
     * @returns {number}
     */
    getRelativeAngle: function(atLocationToken, stretchToToken) {
        mainScriptUtils.debug('playAnimation - Trying to compute animation rotation.')
        let debugObject = {
            "atLocationToken": atLocationToken,
            "stretchToToken": stretchToToken
        };
        mainScriptUtils.debug("playAnimation - Tokens:", debugObject);
        if (!atLocationToken || !stretchToToken) return 0;
        const dx = stretchToToken.x - atLocationToken.x;
        const dy = atLocationToken.y - stretchToToken.y;
        let angle = Math.atan2(dy, dx) * 180 / Math.PI;
        angle = (angle + 360) % 360;
        mainScriptUtils.debug("playAnimation - Computed angle:", angle);
        // 0 is to the left, 90 is up, 180 is to the right, 270 is down
        return Math.round(angle / 45) * 45;
    }
}