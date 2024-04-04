// this macro is used to roll for critical hits and fumbles. it is added to the critical hit item in foundry vtt
if (args[0].macroPass == 'postActiveEffects' && workflow.isCritical) {
    rollForCriticalHits(workflow);
} else if (args[0].macroPass == 'postActiveEffects' && workflow.isFumble) {
    rollForCriticalFumbles(workflow);
}