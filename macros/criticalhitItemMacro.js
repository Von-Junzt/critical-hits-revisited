/* this macro is used to roll for critical hits and fumbles. it is added to the critical hit item in foundry vtt
if (args[0].macroPass == 'postActiveEffects' && workflow.isCritical) {
    game.critsRevisited.rollForCriticalEvents(workflow, "isCritical");
} else if (args[0].macroPass == 'postActiveEffects' && workflow.isFumble) {
    game.critsRevisited.rollForCriticalEvents(workflow, "isFumble");
} else if (args[0].macroPass == 'postActiveEffects' && !workflow.isCritical && !workflow.isFumble && workflow.fumbleSaves.size > 0) {
    game.critsRevisited.rollForCriticalEvents(workflow, "isFumbledSave");
} */

// this macro is used to roll for critical hits and fumbles. it is added to the critical hit item in foundry vtt
if (args[0].macroPass === 'postActiveEffects') {
    if (workflow.isCritical) {
        game.critsRevisited.rollForCriticalEvents(workflow, "isCritical");
    } else if (workflow.isFumble) {
        game.critsRevisited.rollForCriticalEvents(workflow, "isFumble");
    } else if (workflow.fumbleSaves.size > 0) {
        game.critsRevisited.rollForCriticalEvents(workflow, "isFumbledSave");
    }
}