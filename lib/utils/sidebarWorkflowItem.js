export const sidebarWorkflowItem = {
    init: async function() {
        const workflowItem = await this.checkItemExists();
        if (workflowItem) {
            await this.removeDeletedWorkflows(workflowItem);
        } else {
            await this.createInvisibleWorkflowItem();
        }
    },

    checkItemExists: async function() {
        // check if workflow item exists in sidebar
        mainScriptUtils.debug('Checking if workflow item exists in sidebar...');
        return game.items.find(item => item.name === 'CriticalHitsWorkflowItem');
    },

    removeDeletedWorkflows: async function(workflowItem) {
        // Implementation to remove existing workflows that have been deleted
        // This is a placeholder and should be replaced with actual logic
        const workflows = workflowItem.data.workflows || [];
        const updatedWorkflows = workflows.filter(workflow => !workflow.deleted);
        await workflowItem.update({ 'data.workflows': updatedWorkflows });
    },

    createInvisibleWorkflowItem: async function() {
        // Implementation to create a new workflow item and make it invisible for all users
        const workflowData = {
            name: 'CriticalHitsWorkflowItem',
            type: 'workflow',
            data: {
                workflows: [],
                visible: false
            }
        };
        await Item.create(workflowData);
    },

    saveWorkflowWithTargetUUID: async function(uuid, workflow) {
        const workflowItem = await this.getOrCreateWorkflowItem();

        if (workflowItem) {
            const existingWorkflows = workflowItem.data.workflows || [];
            existingWorkflows.push({ targetUUID: uuid, workflow: workflow, timestamp: Date.now() });

            await workflowItem.update({ 'data.workflows': existingWorkflows });
        }
    },

    getWorkflowByTargetUUID: async function(uuid) {
        const workflowItem = await this.getOrCreateWorkflowItem();

        if (workflowItem && workflowItem.data.workflows) {
            return workflowItem.data.workflows.find(workflow => workflow.targetUUID === uuid);
        }

        return null;
    },

    getOrCreateWorkflowItem: async function() {
        let workflowItem = await this.checkItemExists();

        if (!workflowItem) {
            workflowItem = await this.createInvisibleWorkflowItem();
        }

        return workflowItem;
    }
};