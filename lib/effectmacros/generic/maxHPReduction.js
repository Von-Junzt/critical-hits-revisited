// after the imports, generic functions for use in the effects
import {workflowCache} from "../../utils/workflowCache";
import {mainScriptUtils} from "../../utils/mainScriptUtils";

export async function maxHPReduction (effect, targetToken, mode) {
    const tokenUuid = targetToken?.document?.uuid;
    const workflow = await workflowCache.getWorkflow();
    let targetDamage = 0;
    if(mode === 'full') {
        targetDamage = workflow.damageList.find(entry => entry.targetUuid === tokenUuid).healingAdjustedTotalDamage || 0;
        mainScriptUtils.debug('maxHPReduction - applying full damage reduction to target.');
    } else if( mode === 'half') {
        targetDamage = Math.floor((workflow.damageList?.find(entry => entry.targetUuid === tokenUuid)?.healingAdjustedTotalDamage || 0) / 2) || 0;
        mainScriptUtils.debug('maxHPReduction - applying half damage reduction to target.');
    }
    await effect.update({
        changes: [{
            key: 'system.attributes.hp.tempmax',
            mode: 2,
            value: `-${targetDamage}`,
            priority: 20
        }]
    });
    const debugObject = {
        effect: effect,
        targetToken: targetToken,
        targetDamage: targetDamage,
        mode: mode
    }
    mainScriptUtils.debug('maxHPReduction - debugObject: ', debugObject);
    return effect;
}