import {mainScriptUtils} from "../utils/mainScriptUtils.js";
import {effectTables} from "../data/effectTables.js";
import {OPTIONS} from "../../options.js";

export const UNDESIRED_TYPES = new Set(["none", "no type", "no damage", "temphp", ""]);
const NON_PREFERRED_TYPES = new Set(['bludgeoning', 'slashing', 'piercing']);
export const ACTIONS_LIST = new Set(["rsak", "rwak", "mwak"]);
export const UNDESIRED_ACTIONS_LIST = new Set(["heal", "save"]);
const FUMBLE_TYPES = new Map([
    ["rsak", "Spell Critical Fumbles"],
    ["rwak", "Ranged Critical Fumbles"],
    ["mwak", "Melee Critical Fumbles"]
]);

export const critCheckWorkflow = {
    rollForCriticalEvents: async function (workflow, critState) {
        mainScriptUtils.debug('Rolling for critical event...');
        let actionType = workflow.item.system.actionType;
        mainScriptUtils.debug(`Action type: ${actionType}`);
        let attackDamageType = critState !== "isFumble"
            ? await this.getAttackDamageType(workflow.damageDetail, workflow.damageItem)
            : await this.determineFumbleType(actionType);
        if (!attackDamageType || UNDESIRED_TYPES.has(attackDamageType)) {
            mainScriptUtils.debug('No critical hit or fumble for this damage type. Aborting script.');
            return false;
        }
        const critEventHandler = {
            isCritical: () => this.handleCritEvents(workflow.damageList, workflow.damageDetail, workflow.damageItem),
            isFumble: () => {
                mainScriptUtils.debug(`Rolling on table for fumble. Actor UUID: ${workflow.actor.uuid}, Attack Damage Type: ${attackDamageType}`);
                return this.rollOnTable(workflow.actor.uuid, attackDamageType);
            },
            isFumbledSave: () => this.handleCritEvents(workflow.fumbleSaves, workflow.damageDetail, workflow.damageItem)
        };
        await critEventHandler[critState]();
        mainScriptUtils.debug('Critical Event successfully rolled!');
        return true;
    },
    handleCritEvents: async function (targets, damageDetail, damageItem) {
        for (const token of targets) {
            const uuid = token.actorUuid ?? token.document?.actor.uuid;
            if (!uuid) {
                mainScriptUtils.debug(`No valid target UUID for target ${token.name}. Skipping effect roll.`);
                continue;
            }
            const attackDamageType = await this.getAttackDamageType(damageDetail, {...damageItem, actorUuid: uuid});
            if (!attackDamageType) {
                mainScriptUtils.debug(`No valid damage type for target ${token.name}. Skipping effect roll.`);
                continue;
            }
            await this.rollOnTable(uuid, attackDamageType);
        }
    },
    // This function
    rollOnTable: async function (targetUuid, attackDamageType) {
        mainScriptUtils.debug(`Rolling on table. Target UUID: ${targetUuid}, Attack Damage Type: ${attackDamageType}`);
        let tableName = attackDamageType.capitalize();
        mainScriptUtils.debug(`Table name: ${tableName}`);
        if (!game.tables.getName(tableName)) {
            console.warn(`No table found for ${tableName}. Aborting script.`);
            return false;
        }
        mainScriptUtils.debug(`Table found. Drawing from ${tableName}`);
        let rollResult = await game.tables.getName(tableName).draw({displayChat: true, rollMode: 'publicroll'});
        mainScriptUtils.debug('Roll result: ', rollResult);
        for (let result of rollResult.results) {
            let rollRange = result.range.toString();
            tableName = result.parent.name.replace(/\s+/g, '');
            let effects = effectTables[tableName][rollRange];
            if (!effects) {
                mainScriptUtils.debug(`No effects found for ${tableName} ${rollRange}. Skipping effect application.`);
                continue;
            }
            await mainScriptUtils.applyEffects(effects, targetUuid, tableName);
        }
    },
    // This function checks for critical hits, fumbles, and fumbled saves
    checkForCriticalHit: async function (workflow) {
        const {isCritical, isFumble, fumbleSaves, item: {system: {actionType}}, damageList, damageDetail} = workflow;
        if (isCritical) {
            return await critCheckWorkflow.rollForCriticalEvents(workflow, 'isCritical');
        }
        if (isFumble) {
            return await critCheckWorkflow.rollForCriticalEvents(workflow, 'isFumble');
        }
        if (fumbleSaves.size > 0) {
            return await this.rollForCriticalEvents(workflow, 'isFumbledSave');
        }
        mainScriptUtils.debug('No critical hit recognized.');
        return false;
    },
    checkForCritsOnOther: async function (workflow) {
        if (!OPTIONS.CRITS_ON_OTHER_ENABLED) {
            workflow.continueCritCheck = true;
            return;
        }
        mainScriptUtils.debug('Hooked into midi-qol.preCheckHits, checking for critical hits...');
        if (workflow.item.type !== "spell" || ACTIONS_LIST.has(workflow.item.system.actionType) || UNDESIRED_ACTIONS_LIST.has(workflow.item.system.actionType)) {
            workflow.continueCritCheck = true;
            return;
        }
        mainScriptUtils.debug('This is a spell attack, with no attack action. Checking for critical hits or fumbles...');
        mainScriptUtils.debug(workflow);
        const attackDamageType = workflow.item.labels.damageTypes.toLowerCase();
        if (UNDESIRED_TYPES.has(attackDamageType)) {
            console.warn('No critical hit or fumble for this damage type. Workflow aborted.');
            workflow.aborted = true;
            return false;
        }
        const roll = await new Roll("1d20").evaluate();
        await roll.toMessage({
            flavor: 'Rolling for critical hit',
            content: 'Rolling for critical hit',
            speaker: ChatMessage.getSpeaker(workflow.actor),
        });
        const critState = roll.result === '20' ? 'isOtherSpellCritical' : roll.result === '1' ? 'isFumble' : null;
        workflow.critState = critState;
        if (critState === 'isFumble') {
            mainScriptUtils.debug('Fumble for spell with other action detected, rolling on the spell fumble table and aborting workflow.');
            await critCheckWorkflow.rollOnTable(workflow.actor.uuid, 'Spell Critical Fumbles');
            workflow.aborted = true;
            return false;
        }
        if (critState === 'isOtherSpellCritical') {
            mainScriptUtils.debug('Critical hit for spell with other action detected, rolling on the spell critical hit table.');
            workflow.continueCritCheck = false;
            return true;
        }
        mainScriptUtils.debug('No critical hits or fumbles for spells with other action detected. Continuing workflow...');
        workflow.continueCritCheck = true;
    },
    // This function determines the attack damage type based on the damage detail
    getAttackDamageType: async function (damageDetail, damageItem) {
        if (damageDetail.length === 0) {
            console.warn('No damage detail found. Aborting script.');
            return false;
        }
        const targetUuid = damageItem.actorUuid;
        const filteredDetails = [];
        for (const detail of damageDetail) {
            const isImmune = await mainScriptUtils.checkImmunity(detail.type, targetUuid, detail.type, detail.type.capitalize());
            if (isImmune) {
                mainScriptUtils.debug(`Target is immune to ${detail.type}. Removing from damage type list.`);
                continue;
            }
            filteredDetails.push([detail.type, detail.damage]);
        }
        if (filteredDetails.length === 0) {
            console.warn('No valid damage types found. Aborting script.');
            return false;
        }
        const maxDamageValue = Math.max(...filteredDetails.map(([_, damage]) => damage));
        const maxDamageTypes = filteredDetails.filter(([_, damage]) => damage === maxDamageValue);
        if (maxDamageTypes.length > 1) {
            const preferredType = maxDamageTypes.find(([type]) => !NON_PREFERRED_TYPES.has(type));
            return preferredType ? preferredType[0] : maxDamageTypes[0][0];
        } else {
            return maxDamageTypes[0][0];
        }
    },
    // This function determines the fumble type based on the action type
    determineFumbleType: function (actionType) {
        mainScriptUtils.debug(`Action type received: ${actionType}`);
        mainScriptUtils.debug(`FUMBLE_TYPES Map:`, FUMBLE_TYPES);
        let fumbleType = FUMBLE_TYPES.get(actionType);
        mainScriptUtils.debug(`Fumble type determined: ${fumbleType}`);
        return fumbleType;
    },
    memoize: function (fn) {
        const cache = new Map();
        return (...args) => {
            const key = JSON.stringify(args);
            if (cache.has(key)) return cache.get(key);
            const result = fn.apply(this, args);
            cache.set(key, result);
            return result;
        };
    }
}

// Memoize the getAttackDamageType function
critCheckWorkflow.getAttackDamageType = critCheckWorkflow.memoize(critCheckWorkflow.getAttackDamageType);