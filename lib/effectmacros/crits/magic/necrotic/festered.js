import {mainScriptUtils} from '../../../../utils/mainScriptUtils.js';
import {workflowCache} from "../../../../utils/workflowCache.js";

export async function festered(effect, targetToken) {
  mainScriptUtils.debug('festered - effect: ' + effect);
  mainScriptUtils.debug('festered - targetToken: ' + targetToken);
  const workflow = await workflowCache.getWorkflow();
  const tokenUuid = targetToken?.document?.uuid;
  mainScriptUtils.debug('festered - tokenUuid: ' + tokenUuid);
  const targetDamage = workflow.damageList.find(entry => entry.targetUuid === tokenUuid).healingAdjustedTotalDamage || 0;
  mainScriptUtils.debug('festered - targetDamage: ' + targetDamage);
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
