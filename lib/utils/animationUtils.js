import {mainScriptUtils} from "./mainScriptUtils.js";
import {animationData} from "../data/animationData.js";
import {OPTIONS} from "../../options.js";

export const animationUtils = {
    playAnimation: async function (animationKey, atLocationToken, stretchToToken) {
        if(!OPTIONS.ENABLE_ANIMATIONS) {
            console.warn("Animations globally disabled.");
            return;
        }
        const animationConfig = animationData[animationKey];
        if (!animationConfig) return;
        mainScriptUtils.debug("Playing animation:", animationData[animationKey].animation);
        let sequenceEffect = new Sequence().effect();
        for (const [key, value] of Object.entries(animationConfig.animation)) {
            if (key === 'atLocation') {
                mainScriptUtils.debug("At location:", atLocationToken);
                sequenceEffect = sequenceEffect.atLocation(atLocationToken);
            } else if (key === 'stretchTo') {
                mainScriptUtils.debug("Stretching to:", stretchToToken);
                sequenceEffect = sequenceEffect.stretchTo(stretchToToken);
            } else if (key === 'rotate') {
                let rotation = await this.getTokenRotation(atLocationToken, stretchToToken);
                if (Object.keys(animationConfig.animation).includes('readjustAngle')) {
                    mainScriptUtils.debug("Readjusting angle of token animation.");
                    rotation = rotation + animationConfig.animation.readjustAngle;
                }
                mainScriptUtils.debug("Rotation:", rotation);
                sequenceEffect = sequenceEffect.rotate(Number(rotation));
            } else if (typeof sequenceEffect[key] === 'function') {
                sequenceEffect = sequenceEffect[key](value);
            }
        }
        mainScriptUtils.debug("Sequencing.");
        sequenceEffect.play();
        await this.playSound(animationKey);
    },
    playSound: async function(animationKey) {
        mainScriptUtils.debug("Playing sound for animation:", animationKey);
        const soundConfig = animationData[animationKey].sound;
        mainScriptUtils.debug("Sound Config:", soundConfig);
        if (soundConfig && soundConfig.file) {
            const activeUserIds = game.users.filter(user => user.active).map(user => user.id);
            new Sequence().sound().file(soundConfig.file).volume(soundConfig.volume).forUsers(activeUserIds).play();
            mainScriptUtils.debug("Playing sound:", soundConfig.file);
        }
    },
    getTokenRotation: function(atLocationToken, stretchToToken) {
        mainScriptUtils.debug('Trying to compute animation rotation.')
        let debugObject = {
            "atLocationToken": atLocationToken,
            "stretchToToken": stretchToToken
        };
        mainScriptUtils.debug("Tokens:", debugObject);
        if (!atLocationToken || !stretchToToken) return 0;
        const dx = stretchToToken.x - atLocationToken.x;
        const dy = atLocationToken.y - stretchToToken.y;
        let angle = Math.atan2(dx, dy) * 180 / Math.PI;
        angle = (angle + 360) % 360;
        mainScriptUtils.debug("Computed angle:", angle);
        return Math.round(angle / 45) * 45;
    }
}