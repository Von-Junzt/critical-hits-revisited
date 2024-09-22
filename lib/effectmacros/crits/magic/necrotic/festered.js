import {mainScriptUtils} from '../../../../utils/mainScriptUtils.js';
import {workflowCache} from "../../../../utils/workflowCache.js";

export async function festered(targetUuid) {
  const targetWorkflow = await workflowCache.getWorkflowByTargetUUID(targetUuid);
  mainScriptUtils.debug('festered', targetWorkflow);
}