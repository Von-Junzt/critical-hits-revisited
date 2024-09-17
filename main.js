// Description: This script contains the main functions for the module.
console.log("Critical Hits Revisited is starting to load!");

import {utils} from './lib/utils/utils.js';
import {effectMacros} from "./lib/effectmacros/effectMacros.js";
import {effectTables} from "./lib/data/effectTables.js";
import {effectData} from "./lib/data/effecData.js";

export const critsRevisited = {
    // damageTypes that have no critical hits or fumbles and will end the function early
    undesiredTypes: ["none", "no type", "no damage", "temphp", ""],
    // damageTypes that are not preferred for critical hits amd will be used as a "last resort"
    nonPreferredTypes: ['bludgeoning', 'slashing', 'piercing'],
    rollForCriticalEvents: async function (workflowObject, critState) {
        console.log("Critical Hits Revisited: Rolling for critical event...");
        let actionType = workflowObject.item.system.actionType;
        let attackDamageType = critState !== "isFumble"
            ? await this.getAttackDamageType(workflowObject.damageDetail, workflowObject.damageItem)
            : actionType === "rsak" || actionType === "other"
                ? "Spell Critical Fumbles"
                : actionType === "rwak"
                    ? "Ranged Critical Fumbles"
                    : "Melee Critical Fumbles";
        if (!attackDamageType || this.undesiredTypes.includes(attackDamageType)) {
            console.warn("Critical Hits Revisited: No critical hit or fumble for this damage type.");
            return;
        }
        const critEventHandler = {
            isCritical: async () => this.handleCritEvents(workflowObject.damageList, attackDamageType),
            isFumble: async () => this.rollOnTable(workflowObject.actor.uuid, attackDamageType),
            isFumbledSave: async () => this.handleCritEvents(workflowObject.fumbleSaves, attackDamageType)
        };
        await critEventHandler[critState]();
        console.log("Critical Hits Revisited: Critical Event rolled!");
        return true;
    },
    handleCritEvents: async function (targets, attackDamageType) {
        for (const token of targets) {
            const uuid = token.actorUuid ?? token.document?.actor.uuid;
            if (uuid) {
                await this.rollOnTable(uuid, attackDamageType);
            }
        }
    },
    rollOnTable: async function (targetUuid, attackDamageType) {
        let tableName = attackDamageType.capitalize();
        if (!game.tables.getName(tableName)) {
            console.warn(`Critical Hits Revisited: No table found for ${tableName}.`);
            return;
        }
        let rollResult = await game.tables.getName(tableName).draw({displayChat: true, rollMode: "publicroll"});
        for (let result of rollResult.results) {
            let rollRange = result.range.toString();
            tableName = result.parent.name.replace(/\s+/g, '');
            let effects = effectTables[tableName][rollRange];
            if (effects) {
                await utils.applyEffects(effects, targetUuid, tableName);
            }
        }
    },
    getAttackDamageType: async function (damageDetail, damageItem) {
        if (damageDetail.length === 0) {
            console.warn("Critical Hits Revisited: No damage detail found.");
            return;
        }
        const targetUuid = damageItem.actorUuid;
        const filteredDetails = (await Promise.all(damageDetail.map(async detail => {
            const isImmune = await utils.checkImmunity(detail.type, targetUuid, detail.type);
            return isImmune ? null : [detail.type, detail.damage];
        }))).filter(detail => detail !== null);
        if (filteredDetails.length === 0) {
            console.warn("Critical Hits Revisited: No valid damage types found.");
            return null;
        }
        const maxDamageValue = Math.max(...filteredDetails.map(([_, damage]) => damage));
        const maxDamageTypes = filteredDetails.filter(([_, damage]) => damage === maxDamageValue);
        if (maxDamageTypes.length > 1) {
            const preferredType = maxDamageTypes.find(([type]) => !this.nonPreferredTypes.includes(type));
            return preferredType ? preferredType[0] : maxDamageTypes[0][0];
        } else {
            return maxDamageTypes[0][0];
        }
    },
    checkForCriticalHit: async function (workflowObject) {
        const { isCritical, isFumble, fumbleSaves, item: { system: { actionType } }, damageList } = workflowObject;
        const actionList = ["rsak", "rwak", "mwak"];
        if (isCritical) {
            await critsRevisited.rollForCriticalEvents(workflowObject, "isCritical");
        } else if (isFumble) {
            await critsRevisited.rollForCriticalEvents(workflowObject, "isFumble");
        } else if (fumbleSaves.size > 0) {
            await this.rollForCriticalEvents(workflowObject, "isFumbledSave");
        } else if (!actionList.includes(actionType)) {
            if(damageList) {
                for (const token of damageList) {
                    const roll = await new Roll("1d20").evaluate();
                    const speakerActor = workflowObject.actor;
                    roll.toMessage({
                        content: `Rolling for critical hit`,
                        speaker: ChatMessage.getSpeaker(speakerActor),
                        flavor: "Rolling for critical hit"
                    });
                    const critState = roll.result === "20" ? "isCritical" : roll.result === "1" ? "isFumble" : null;
                    if (critState) {
                        await critsRevisited.rollForCriticalEvents(workflowObject, critState);
                    }
                }
            }
        } else {
            console.warn("Critical Hits Revisited: No critical hit recognized.");
        }
    }
}

// Add the helperFunctions and itemMacros to critsRevisited
critsRevisited.utils = utils;
critsRevisited.effectMacros = effectMacros;
critsRevisited.effectData = effectData;

// Attach critsRevisited to the game object once Foundry is fully loaded
Hooks.once('ready', () => {
    game.critsRevisited = critsRevisited;
});

Hooks.on('midi-qol.postActiveEffects', async (workflow) => {
    console.log("Critical Hits Revisited: Hooked into midi-qol.postActiveEffects, let's check for critical hits!");
    console.log(workflow);
    await critsRevisited.checkForCriticalHit(workflow);
});

console.log("Critical Hits Revisited has finished loading!");