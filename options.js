export const OPTIONS = {
    CRITS_ON_OTHER_ENABLED: true,
    DEBUG_MODE: false,
    ENABLE_ANIMATIONS: true
};

export function updateOptions() {
    OPTIONS.CRITS_ON_OTHER_ENABLED = game.settings.get("critical-hits-revisited", "critsOnOtherEnabled");
    OPTIONS.DEBUG_MODE = game.settings.get("critical-hits-revisited", "enableDebug");
    OPTIONS.ENABLE_ANIMATIONS = game.settings.get("critical-hits-revisited", "enableAnimations");
}