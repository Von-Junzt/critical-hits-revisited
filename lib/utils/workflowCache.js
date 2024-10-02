import { mainScriptUtils } from "./mainScriptUtils.js";

export const workflowCache = {
    WORKFLOW_ITEM_NAME: 'critsRevisitedWorkflowCache',
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
    async saveWorkflow(workflowWrapper) {
        if(!workflowWrapper) {
            mainScriptUtils.debug('workflowWrapper undefined: ', workflowWrapper);
            return;
        }
        const workflowItem = await workflowCache.getWorkflowItem();
        const essentialData = {
            actor: { uuid : workflowWrapper.workflow.actor.uuid },
            damageList: workflowWrapper.workflow.damageList
        };
        await workflowItem.update({ 'flags.cachedWorkflowData': essentialData });
        mainScriptUtils.debug('Essential workflow data saved: ', essentialData);
    },
    async deleteWorkflow() {
        const workflowItem = await workflowCache.getWorkflowItem();
        await workflowItem.update({ 'flags.cachedWorkflowData': null });
        mainScriptUtils.debug('Workflow deleted.');
    },
    async getWorkflow() {
        const workflowItem = await workflowCache.getWorkflowItem();
        mainScriptUtils.debug('Workflow retrieved: ', workflowItem.flags.cachedWorkflowData);
        return workflowItem.flags.cachedWorkflowData;
    },
    async saveDialogResults(dialogResults) {
        const workflowItem = await workflowCache.getWorkflowItem();
        if(workflowItem.flags.cachedDialogResults) {
            delete workflowItem.flags.cachedDialogResults;
        }
        await workflowItem.update({'flags.cachedDialogResults': dialogResults});
        mainScriptUtils.debug('Dialog results saved: ', dialogResults);
    },
    async getDialogResults() {
        const workflowItem = await workflowCache.getWorkflowItem();
        const dialogResults = workflowItem.flags.cachedDialogResults;
        mainScriptUtils.debug('Dialog results retrieved: ', dialogResults);
        return dialogResults;
    },
    async deleteDialogResults() {
        const workflowItem = await workflowCache.getWorkflowItem();
        await workflowItem.update({'flags.cachedDialogResults': null});
        mainScriptUtils.debug('Dialog results deleted.');
    }
};

