export const OPTIONS = {
    CRITS_ON_OTHER_ENABLED: true,
    DEBUG_MODE: false
};

export function updateOptions() {
    OPTIONS.CRITS_ON_OTHER_ENABLED = game.settings.get("critical-hits-revisited", "critsOnOtherEnabled");
    OPTIONS.DEBUG_MODE = game.settings.get("critical-hits-revisited", "enableDebug");
}