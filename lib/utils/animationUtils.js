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
        mainScriptUtils.debug("Playing animation:", animationKey);
        let sequenceEffect = new Sequence().effect();
        for (const [key, value] of Object.entries(animationConfig.animation)) {
            if (key === 'atLocation') {
                mainScriptUtils.debug("At location:", atLocationToken);
                sequenceEffect = sequenceEffect.atLocation(atLocationToken);
            } else if (key === 'stretchTo') {
                mainScriptUtils.debug("Stretching to:", stretchToToken);
                sequenceEffect = sequenceEffect.stretchTo(stretchToToken);
            } else if (key === 'rotate' && animationKey === 'bludgeoning' || animationKey === 'piercing' || animationKey === 'slashing') {
                const rotation = this.getTokenRotation(atLocationToken, stretchToToken);
                mainScriptUtils.debug("Rotation:", rotation);
                sequenceEffect = sequenceEffect.rotate(Number(rotation));
            } else if (typeof sequenceEffect[key] === 'function') {
                sequenceEffect = sequenceEffect[key](value);
            }
        }
        mainScriptUtils.debug("Sequence Effect:",  JSON.stringify(sequenceEffect, null, 2));
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
    getTokenRotation: function(token, targetToken) {
        if (!token || !targetToken) return 0;
        const dx = targetToken.x - token.x;
        const dy = targetToken.y - token.y;
        // Calculate angle in radians
        let angle = Math.atan2(dy, dx);
        // Convert to degrees and normalize to 0-360 range
        angle = (angle * 180 / Math.PI + 360) % 360;
        // Round to nearest 90 degrees
        return Math.round(angle / 90) * 90;
    }
}