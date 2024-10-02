import {mainScriptUtils} from "./mainScriptUtils.js";
import {animationData} from "../data/animationData.js";

export const animationUtils = {
    playAnimation: async function (animationKey, token, targetToken) {
        const animationConfig = animationData[animationKey];
        if (!animationConfig) return;
        mainScriptUtils.debug("Playing animation:", animationKey);
        let sequenceEffect = new Sequence().effect();
        for (const [key, value] of Object.entries(animationConfig.animation)) {
            if (key === 'atLocation') {
                sequenceEffect = sequenceEffect.atLocation(token);
            } else if (key === 'stretchTo') {
                sequenceEffect = sequenceEffect.stretchTo(targetToken);
            } else if (typeof sequenceEffect[key] === 'function') {
                sequenceEffect = sequenceEffect[key](value);
            }
        }
        mainScriptUtils.debug("Sequence Effect:", sequenceEffect);
        sequenceEffect.play();
        await this.playSound(animationKey);
    },
    playSound: async function(animationKey) {
        mainScriptUtils.debug("Playing sound for animation:", animationKey);
        const soundConfig = animationData[animationKey].sound;
        mainScriptUtils.debug("Sound Config:", soundConfig);
        if (soundConfig && soundConfig.file) {
            const activeUserIds = game.users.filter(user => user.active).map(user => user.id);
            new Sequence().sound().file(soundConfig.file).forUsers(activeUserIds).play();
            mainScriptUtils.debug("Playing sound:", soundConfig.file);
        }
    }
}