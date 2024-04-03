if (args[0].macroPass == 'postActiveEffects' && workflow.isCritical) {
    rollForCriticalHits(workflow);
} else if (args[0].macroPass == 'postActiveEffects' && workflow.isFumble) {
    rollForCriticalFumbles(workflow);
}