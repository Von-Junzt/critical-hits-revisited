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
    async saveDialogResult(dialogResult) {
        if (!dialogResult) {
            mainScriptUtils.debug('Dialog result undefined: ', dialogResult);
            return;
        }
        if(dialogResult) {
            const workflowItem = await workflowCache.getWorkflowItem();
            await workflowItem.update({'flags.cachedDialogResult': dialogResult});
            mainScriptUtils.debug('Dialog result saved: ', dialogResult);
        } else {
            mainScriptUtils.debug('Dialog result undefined: ', dialogResult);
        }
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
    async getWorkflowByTargetUUID(uuid) {
        const workflow = await workflowCache.getWorkflow();
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

