/* this macro is used to roll for critical hits and fumbles. it is added to the critical hit item in foundry vtt
if (args[0].macroPass === 'postActiveEffects') {
    if (workflow.isCritical) {
        game.critsRevisited.rollForCriticalEvents(workflow, "isCritical"); //Critical Hit for item with attack roll and damage roll
    } else if (workflow.isFumble) {
        game.critsRevisited.rollForCriticalEvents(workflow, "isFumble"); //Critical Fumble for item with attack roll and damage roll
    } else if (workflow.fumbleSaves.size > 0) {
        game.critsRevisited.rollForCriticalEvents(workflow, "isFumbledSave"); //Critical Fumble for item without attackroll and with saving throw
    }
    // TODO: Add a crit and fumble check for spells without attack rolls,saves but with actionType = "other" and tokens in workflow.damageList, eg. Magic Missile. A new roll should be made for each target and if it's a crit/fumble, the effects should be rolled and applied accordingly.
};
 */

// this macro is used to roll for critical hits and fumbles. it is added to the critical hit item in foundry vtt
if (args[0].macroPass === 'postActiveEffects') {
    if (workflow.isCritical) {
        game.critsRevisited.rollForCriticalEvents(workflow, "isCritical"); // Critical Hit for item with attack roll and damage roll
    } else if (workflow.isFumble) {
        game.critsRevisited.rollForCriticalEvents(workflow, "isFumble"); // Critical Fumble for item with attack roll and damage roll
    } else if (workflow.fumbleSaves.size > 0) {
        game.critsRevisited.rollForCriticalEvents(workflow, "isFumbledSave"); // Critical Fumble for item without attack roll and with saving throw
    } else if (workflow.item.system.actionType === "other" && workflow.damageList.length > 0) { // Critical Hit for item without attack roll and damage roll but with tokens in workflow.damageList
        for (const token of workflow.damageList) {
            const roll = await new Roll("1d20").evaluate();
            roll.toMessage({flavor: "Rolling for critical hit"});
            if (roll.result === 20) {
                game.critsRevisited.rollForCriticalEvents(workflow, "isCritical");
            } else if (roll.result === 1) {
                game.critsRevisited.rollForCriticalEvents(workflow, "isFumble");
            }
        }
    }
}