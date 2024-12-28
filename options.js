export const OPTIONS = {
    DEBUG_MODE: false,
    ENABLE_ANIMATIONS: true
};

export function updateOptions() {
    OPTIONS.DEBUG_MODE = game.settings.get("critical-hits-revisited", "enableDebug");
    OPTIONS.ENABLE_ANIMATIONS = game.settings.get("critical-hits-revisited", "enableAnimations");
}