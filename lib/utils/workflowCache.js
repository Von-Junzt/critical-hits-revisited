import {mainScriptUtils} from "./mainScriptUtils.js";

export const workflowCache = {
    cachedWorkflows: [],
    saveWorkflow: function(workflow) {
        this.cachedWorkflows.push({ workflow: workflow, timestamp: Date.now() });
    },
    deleteAllWorkflows: function () {
        this.cachedWorkflows = [];
        mainScriptUtils.debug('All cachedWorkflows deleted.');
    },
    getWorkflowByTargetUUID: function(uuid) {
        const workflowByUuid = this.cachedWorkflows.find(chachedWorkflow =>
            Array.isArray(chachedWorkflow.workflow.damageList)
                ? chachedWorkflow.workflow.damageList.some(actor => actor.actorUuid === uuid)
                : chachedWorkflow.workflow.damageList.actorUuid === uuid
        );
        return workflowByUuid.workflow;
    },
};
