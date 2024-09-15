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
        //TODO: Add a crit and fumble check for spells without attack rolls,saves but with actionType = "other" and tokens in workflowObject.damageList, eg. Magic Missile. A new roll should be made for each target and if it's a crit/fumble, the effects should be rolled and applied accordingly.
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
        let tableName = utils.capitalizeFirstLetter(attackDamageType);
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
    }
}

Hooks.on

// Add the helperFunctions and itemMacros to critsRevisited
critsRevisited.utils = utils;
critsRevisited.effectMacros = effectMacros;
critsRevisited.effectData = effectData;

// Attach critsRevisited to the game object once Foundry is fully loaded
Hooks.once('ready', () => {
    game.critsRevisited = critsRevisited;
});

console.log("Critical Hits Revisited has finished loading!");