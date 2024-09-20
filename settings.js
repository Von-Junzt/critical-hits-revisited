export const registerSettings = function() {
  game.settings.register("critical-hits-revisited", "critsOnOtherEnabled", {
    name: "Enable Crits on Other Spells",
    hint: "If enabled, spells with non-standard action types can crit.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => {
      game.critsRevisited.OPTIONS.CRITS_ON_OTHER_ENABLED = value;
    }
  });

  game.settings.register("critical-hits-revisited", "enableDebug", {
    name: "Enable Debug Logging",
    hint: "Turn on detailed debug logging for Critical Hits Revisited",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  })
};
