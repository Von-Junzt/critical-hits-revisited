import { mainScriptUtils } from "./mainScriptUtils.js";

export const workflowCache = {
    WORKFLOW_ITEM_NAME: 'critsRevisitedWorkflowCache',
    /**
     * Gets the workflow item from the foundry sidebar items.
     * @returns {Promise<*>}
     */
    async getWorkflowItem() {
        let workflowItem = game.items.getName(workflowCache.WORKFLOW_ITEM_NAME);
        if (!workflowItem) {
            workflowItem = await Item.create({
                name: workflowCache.WORKFLOW_ITEM_NAME,
                ownership: {default: 3},
                type: 'feat',
                img: 'icons/skills/melee/blade-tip-chipped-blood-red.webp',
                data: null
            });
        }
        return workflowItem;
    },
    /**
     * Saves the workflow to the foundry sidebar items.
     * @param workflowWrapper {object} The wrapped workflow object.
     * @returns {Promise<void>}
     */
    async saveWorkflow(workflowWrapper) {
        if(!workflowWrapper) {
            mainScriptUtils.debug('workflowWrapper undefined: ', workflowWrapper);
            return;
        }
        const workflowItem = await workflowCache.getWorkflowItem();
        const essentialData = {
            actor: { uuid : workflowWrapper.workflow.actor.uuid },
            options : { targetUuids : workflowWrapper.workflow.options.targetUuids},
            tokenUuid: workflowWrapper.workflow.tokenUuid,
            itemUuid: workflowWrapper.workflow.itemUuid,
            damageList: workflowWrapper.workflow.damageList
        };
        await workflowItem.update({ 'flags.cachedWorkflowData': essentialData });
        mainScriptUtils.debug('saveWorkflow - Essential workflow data saved: ', essentialData);
    },
    /**
     * Empties the workflow cache from the foundry sidebar items.
     * @returns {Promise<void>}
     */
    async deleteWorkflow() {
        if(!workflowCache.getWorkflow()) {
            mainScriptUtils.debug('No workflow to delete.');
            return;
        }
        const workflowItem = await workflowCache.getWorkflowItem();
        await workflowItem.update({ 'flags.cachedWorkflowData': null });
        mainScriptUtils.debug('Workflow deleted.');
    },
    /**
     * Gets the cached workflow data from the foundry sidebar items.
     * @returns {Promise<*>}
     */
    async getWorkflow() {
        const workflowItem = await workflowCache.getWorkflowItem();
        mainScriptUtils.debug('getWorkflow - Workflow retrieved: ', workflowItem.flags.cachedWorkflowData);
        return workflowItem.flags.cachedWorkflowData;
    }
};

