const workflowCache = {
    workflows: [],
    saveWorkflowWithTargetUUID: function(uuid, workflow) {
        this.workflows.push({ targetUuid: uuid, workflow: workflow, timestamp: Date.now() });
    },
    deleteWorkflowByTargetUUID: function (uuid) {
        const index = this.workflows.findIndex(workflow => workflow.targetUuid === uuid);
        if (index !== -1) {
            this.workflows.splice(index, 1);
        }
    },
    getWorkflowByTargetUUID: function(uuid) {
        return this.workflows.find(workflow => workflow.targetUuid === uuid);
    },
};
