import { OPTIONS, updateOptions } from "./options.js";

export const registerSettings = function() {
  // Enable debug logging
  game.settings.register("critical-hits-revisited", "enableDebug", {
    name: "Enable Debug Logging",
    hint: "Turn on detailed debug logging for Critical Hits Revisited",
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    onChange: value => {
      OPTIONS.DEBUG_MODE = value;
    }
  });
  // Enable custom effect animations
  game.settings.register("critical-hits-revisited", "enableAnimations", {
    name: "Enable Animations",
    hint: "If enabled, animations will play for critical hits.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => {
      OPTIONS.ANIMATIONS_ENABLED = value;
    }
  });

  // Initialize options
  updateOptions();
};