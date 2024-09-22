import {mainScriptUtils} from "./mainScriptUtils.js";

export const workflowCache = {
    workflows: [],
    saveWorkflow: function(workflow) {
        this.workflows.push({ workflow: workflow, timestamp: Date.now() });
    },
    deleteAllWorkflows: function () {
        this.workflows = [];
        mainScriptUtils.debug('All workflows deleted.');
    },
    getWorkflowByTargetUUID: function(uuid) {
        return this.workflows.find(workflow => workflow.damageList.target.uuid === uuid);
    },
};
