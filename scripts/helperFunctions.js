async function applyEffect(effect, uuid) {
    let hasEffectApplied = await game.dfreds.effectInterface.hasEffectApplied(effect, uuid);
    if (!hasEffectApplied) {
        game.dfreds.effectInterface.addEffect({ effectName: effect, uuid});
    }
}