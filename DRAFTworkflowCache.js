import { mainScriptUtils } from "./mainScriptUtils.js";

export const workflowCache = {
    WORKFLOW_ITEM_NAME: 'critsRevisitedWorkflowCache',

    async getWorkflowItem() {
        let workflowItem = game.items.getName(this.WORKFLOW_ITEM_NAME);
        if (!workflowItem) {
            workflowItem = await Item.create({
                name: this.WORKFLOW_ITEM_NAME,
                type: 'data', // Adjust this type as needed
                data: null,
                permission: { default: CONST.ENTITY_PERMISSIONS.OBSERVER },
                flags: { 
                    "critical-hits-revisited": { 
                        hideFromSidebar: true 
                    } 
                }
            });
        } else {
            // Ensure permissions and flags are set correctly for existing item
            if (workflowItem.data.permission.default !== CONST.ENTITY_PERMISSIONS.OBSERVER || 
                !workflowItem.getFlag("critical-hits-revisited", "hideFromSidebar")) {
                await workflowItem.update({
                    "permission.default": CONST.ENTITY_PERMISSIONS.OBSERVER,
                    "flags.critical-hits-revisited.hideFromSidebar": true
                });
            }
        }
        return workflowItem;
    },

    async saveWorkflow(workflow) {
        const workflowItem = await this.getWorkflowItem();
        await workflowItem.update({ data: workflow });
        mainScriptUtils.debug('Workflow saved.');
    },

    async deleteWorkflow() {
        const workflowItem = await this.getWorkflowItem();
        await workflowItem.update({ data: null });
        mainScriptUtils.debug('Workflow deleted.');
    },

    async getWorkflow() {
        const workflowItem = await this.getWorkflowItem();
        return workflowItem.data;
    },

    async getWorkflowByTargetUUID(uuid) {
        const workflow = await this.getWorkflow();
        if (!workflow) return null;

        if (Array.isArray(workflow.damageList)) {
            if (workflow.damageList.some(actor => actor.actorUuid === uuid)) {
                return workflow;
            }
        } else if (workflow.damageList.actorUuid === uuid) {
            return workflow;
        }
        return null;
    }
};