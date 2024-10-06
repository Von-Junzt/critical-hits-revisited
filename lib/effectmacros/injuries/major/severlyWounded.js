import {mainScriptUtils} from "../../../utils/mainScriptUtils.js";
import {workflowCache} from "../../../utils/workflowCache.js";

export async function severlyWounded(effect, targetToken) {
    mainScriptUtils.debug('severlyWounded - effect: ' + effect);
    mainScriptUtils.debug('severlyWounded - targetToken: ' + targetToken);
    const workflow = await workflowCache.getWorkflow();
    const tokenUuid = targetToken?.document?.uuid;
    mainScriptUtils.debug('severlyWounded - tokenUuid: ' + tokenUuid);
    const targetDamage = workflow.damageList.find(entry => entry.targetUuid === tokenUuid).healingAdjustedTotalDamage || 0;
    mainScriptUtils.debug('severlyWounded - targetDamage: ' + targetDamage);
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
