import {mainScriptUtils} from "../../../utils/mainScriptUtils.js";
import {workflowCache} from "../../../utils/workflowCache.js";

export async function multipleInjuries(effect, targetToken) {
    mainScriptUtils.debug('multipleInjuries - effect: ' + effect);
    mainScriptUtils.debug('multipleInjuries - targetToken: ' + targetToken);
    const workflow = await workflowCache.getWorkflow();
    const tokenUuid = targetToken?.document?.uuid;
    mainScriptUtils.debug('multipleInjuries - tokenUuid: ' + tokenUuid);
    const targetDamage = Math.floor((workflow.damageList?.find(entry => entry.targetUuid === tokenUuid)?.healingAdjustedTotalDamage || 0) / 2) || 0;
    mainScriptUtils.debug('multipleInjuries - targetDamage: ' + targetDamage);
    await effect.update({
        changes: [{
            key: 'system.attributes.hp.tempmax',
            mode: 2,
            value: `-${targetDamage}`,
            priority: 20
        }]
    });
    return effect;
}
