import {mainScriptUtils} from '../../../../utils/mainScriptUtils.js';
import {workflowCache} from "../../../../utils/workflowCache.js";

export async function festered(actor, effect) {
  if(!actor || !effect) {
      mainScriptUtils.debug('festered: targetUuid or effect is undefined');
      return false;
  }
  mainScriptUtils.debug('festered - actor: ' + fromUuid(actor.uuid) + ' effect: ' + effect);
  const workflow = await workflowCache.getWorkflow();
  const targetDamage = workflow.damageList.find(entry => entry.actorUuid === actor.uuid).healingAdjustedTotalDamage || 0;
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