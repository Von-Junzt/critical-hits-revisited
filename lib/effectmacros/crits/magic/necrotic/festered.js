import {mainScriptUtils} from '../../../../utils/mainScriptUtils.js';
import {workflowCache} from "../../../../utils/workflowCache.js";

export async function festered(effect) {
  mainScriptUtils.debug('festered - effect: ' + effect);
  const workflow = await workflowCache.getWorkflow();
  const tokenUuid = effect?.parent?.token?.uuid || game.scenes.active?.tokens.find(token => token.actor?.id === effect?.target?.id)?.uuid;
  const targetDamage = workflow.damageList.find(entry => entry.targetUuid === tokenUuid).healingAdjustedTotalDamage || 0;
  await effect.update({
    changes: [{
      key: 'system.attributes.hp.max',
      mode: 2,
      value: `-${targetDamage}`,
      priority: 20
    }]
  });
  return effect;
}