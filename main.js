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
    // action types that should allways trigger critical hits
    actionsList: ["rsak", "rwak", "mwak"],
    // action types that should never trigger critical hits in midi-qol.preItemRoll
    undesiredActionsList: ["heal", "save"],
    // Options for the module
    OPTIONS: {
        CRITS_ON_OTHER_ENABLED: true
    },
    rollForCriticalEvents: async function (workflow, critState) {
        console.log("Critical Hits Revisited: Rolling for critical event...");
        let actionType = workflow.item.system.actionType;
        let attackDamageType = critState !== "isFumble"
            ? await this.getAttackDamageType(workflow.damageDetail, workflow.damageItem)
            : actionType === "rsak"
                ? "Spell Critical Fumbles"
                : actionType === "rwak"
                    ? "Ranged Critical Fumbles"
                    : "Melee Critical Fumbles";
        if (!attackDamageType || this.undesiredTypes.includes(attackDamageType)) {
            console.warn("Critical Hits Revisited: No critical hit or fumble for this damage type. Aborting script.");
            return;
        }
        const critEventHandler = {
            isCritical: async () => this.handleCritEvents(workflow.damageList, attackDamageType),
            isFumble: async () => this.rollOnTable(workflow.actor.uuid, attackDamageType),
            isFumbledSave: async () => this.handleCritEvents(workflow.fumbleSaves, attackDamageType)
        };
        await critEventHandler[critState]();
        console.log("Critical Hits Revisited: Critical Event successfully rolled!");
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
            console.warn(`Critical Hits Revisited: No table found for ${tableName}. Aborting script.`);
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
            console.warn("Critical Hits Revisited: No damage detail found. Aborting script.");
            return;
        }
        const targetUuid = damageItem.actorUuid;
        const filteredDetails = (await Promise.all(damageDetail.map(async detail => {
            const isImmune = await utils.checkImmunity(detail.type, targetUuid, detail.type);
            return isImmune ? null : [detail.type, detail.damage];
        }))).filter(detail => detail !== null);
        if (filteredDetails.length === 0) {
            console.warn("Critical Hits Revisited: No valid damage types found. Aborting script.");
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
    checkForCriticalHit: async function (workflow) {
        const { isCritical, isFumble, fumbleSaves, item: { system: { actionType } }, damageList, damageDetail } = workflow;
        if (isCritical) {
            await critsRevisited.rollForCriticalEvents(workflow, "isCritical");
        } else if (isFumble) {
            await critsRevisited.rollForCriticalEvents(workflow, "isFumble");
        } else if (fumbleSaves.size > 0) {
            await this.rollForCriticalEvents(workflow, "isFumbledSave");
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

Hooks.on('midi-qol.preItemRoll', async (workflow) => {
    console.log('Critical Hits Revisited: Hooked into midi-qol.preCheckHits, checking for critical hits...');
    if(critsRevisited.OPTIONS.CRITS_ON_OTHER_ENABLED && workflow.item.type === "spell" && !critsRevisited.actionsList.includes(workflow.item.system.actionType) && !critsRevisited.undesiredActionsList.includes(workflow.item.system.actionType)) {
        console.log("Critical Hits Revisited: This is a spell attack, with no attack action. Checking for critical hits or fumbles...");
        console.log(workflow);
        const attackDamageType = workflow.item.labels.damageTypes.toLowerCase();
        if (critsRevisited.undesiredTypes.includes(attackDamageType)) {
            console.warn("Critical Hits Revisited: No critical hit or fumble for this damage type. Workflow aborted.");
            workflow = false;
            return;
        } else {
            const roll = await new Roll("1").evaluate();
            await roll.toMessage({
                flavor: "Rolling for critical hit",
                content: "Rolling for critical hit",
                speaker: ChatMessage.getSpeaker(workflow.actor),
            });
            const critState = roll.result === "20" ? "isOtherSpellCritical" : roll.result === "1" ? "isFumble" : null;
            workflow.critState = critState;
            if (critState === "isFumble") {
                console.log("Critical Hits Revisited: Fumble  for spell with other action detected, rolling on the spell fumble table and aborting workflow.");
                await critsRevisited.rollOnTable(workflow.actor.uuid, "Spell Critical Fumbles");
                workflow.aborted = true;
                return;
            } else if (critState === "isCritical") {
                console.log("Critical Hits Revisited: Critical hit for spell with other action detected, rolling on the spell critical hit table.");
                workflow.continueCritCheck = new Boolean(false);
                return;
            }
        }
    } else {
        console.log("Critical Hits Revisited: No critical hits or fumbles for spells with other action detected. Continuing workflow...");
        workflow.continueCritCheck = new Boolean(true);
    }
});

Hooks.on('midi-qol.postActiveEffects', async (workflow) => {
    if(workflow.continueCritCheck) {
        console.log("Critical Hits Revisited: Hooked into midi-qol.postActiveEffects.");
        console.log(workflow);
        await critsRevisited.checkForCriticalHit(workflow);
    } else if(critsRevisited.OPTIONS.CRITS_ON_OTHER_ENABLED && workflow.critState === "isOtherSpellCritical") {
        const attackDamageType = await critsRevisited.getAttackDamageType(workflow.damageDetail, workflow.damageItem);
        await critsRevisited.handleCritEvents(workflow.damageList, attackDamageType)
        return false;
    } else {
        console.warn("Critical Hits Revisited: Workflow was previously aborted. Aborting script.");
    }
});

console.log("Critical Hits Revisited has finished loading!");