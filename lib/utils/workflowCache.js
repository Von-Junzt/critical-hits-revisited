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
     * Saves the workflow to the foundry sidebar item.
     * @param workflowWrapper {object} The wrapped workflow object.
     * @returns {Promise<void>}
     */
    async saveWorkflow(workflowWrapper) {
        if(!workflowWrapper) {
            mainScriptUtils.debug('workflowCache - workflowWrapper undefined: ', workflowWrapper);
            return;
        }
        const workflowItem = await workflowCache.getWorkflowItem();
        if(!workflowItem) {
            mainScriptUtils.debug('workflowCache - Could not get or create workflow item');
            return;
        }
        const essentialData = {
            actor: { uuid : workflowWrapper.workflow.actor.uuid },
            options : { targetUuids : workflowWrapper.workflow.options.targetUuids},
            tokenUuid: workflowWrapper.workflow.tokenUuid,
            itemUuid: workflowWrapper.workflow.itemUuid,
            damageList: workflowWrapper.workflow.damageList
        };
        await workflowItem.setFlag('critical-hits-revisited', 'cachedWorkflowData', essentialData);
        mainScriptUtils.debug('workflowCache - Essential workflow data saved: ', essentialData);
    },
    /**
     * Empties the workflow cache from the foundry sidebar item.
     * @returns {Promise<void>}
     */
    async deleteWorkflow() {
        const workflowItem = await workflowCache.getWorkflowItem();
        if (workflowItem) {
            await workflowItem.unsetFlag('critical-hits-revisited', 'cachedWorkflowData');
            // Flag should be gone at this point
            const checkFlag = workflowItem.getFlag('critical-hits-revisited', 'cachedWorkflowData');
            mainScriptUtils.debug('Flag after deletion:', checkFlag); // Should be undefined
        }
    },
    /**
     * Gets the cached workflow data from the foundry sidebar items.
     * @returns {Promise<*>}
     */
    async getWorkflow() {
        const workflowItem = await workflowCache.getWorkflowItem();
        mainScriptUtils.debug('workflowCache - Workflow retrieved: ', workflowItem.flags.cachedWorkflowData);
        return workflowItem.flags.cachedWorkflowData;
    }
};

