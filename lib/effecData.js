export const effectData = {
    ablaze: {
        "changes": [
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 0,
                "value": "turn=start, damageRoll=2d6[Fire], label=Burning",
                "priority": 20
            },
            {
                "key": "macro.tokenMagic",
                "mode": 0,
                "value": "fire",
                "priority": 20
            },
            {
                "key": "ATL.light.dim",
                "mode": 5,
                "value": "3",
                "priority": 20
            },
            {
                "key": "ATL.light.bright",
                "mode": 5,
                "value": "2",
                "priority": 20
            },
            {
                "key": "ATL.light.color",
                "mode": 5,
                "value": "#f98026",
                "priority": 20
            },
            {
                "key": "ATL.light.alpha",
                "mode": 5,
                "value": "0.2",
                "priority": 20
            },
            {
                "key": "ATL.light.animation",
                "mode": 5,
                "value": "{\"type\": \"torch\",\"speed\": 10,\"intensity\": 10}",
                "priority": 20
            }
        ],
        "description": "<p></p><p>While the creature is on fire it takes 2d6 fire damage at the start of each of its turns. The creature can end this condition by dropping prone and using 5 feet of movement to roll on the ground.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            },
            "babonus": {
                "bonuses": {}
            }
        },
        "name": "Ablaze",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Ablaze"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.vYcwudjTa7YnXM36",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332961440,
            "modifiedTime": 1724332961440,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/fire/flame-burning-skull-orange.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    acidbath: {
        "changes": [
            {
                "key": "macro.execute",
                "mode": 0,
                "value": "Compendium.critical-hits-revisited.critical-hits-macros.Macro.xIywKrxEzDs1BDnj",
                "priority": 20
            }
        ],
        "description": "<p></p><p>If the creature is wearing armor, the armor is destroyed (if non-magical) or rendered useless until cleaned during a long rest (if magical) and roll on the major injury chart. If the creature is not wearing armor, roll on the major injury chart and the creature is disfigured. While disfigured the creature has disadvantage on all Charisma ability checks except Charisma (Intimidation). Being disfigured can be removed with the spell greater restoration.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Acid Bath",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Acid Bath"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.NkmGvoMAoGgaY2R8",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332962495,
            "modifiedTime": 1724332962495,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/acid/dissolve-arm-flesh.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    armordamaged1: {
        "changes": [
            {
                "key": "system.attributes.ac.bonus",
                "mode": 2,
                "value": "-1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>If the creature is wearing armor its AC modifier is reduced by 1 until it can be repaired (for 1/4th the price of new armor of the same type) or cleaned (if the armor is magical). If the creature is not wearing armor, roll on the minor injury chart.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Armor damaged 1",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Armor damaged 1"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.sgtg1ZPNusZTTrRe",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332963461,
            "modifiedTime": 1724332963461,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/acid/dissolve-arm-flesh.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    armordamaged2: {
        "changes": [
            {
                "key": "system.attributes.ac.bonus",
                "mode": 2,
                "value": "-2",
                "priority": 20
            }
        ],
        "description": "<p></p><p>If the creature is wearing armor, roll on the minor injury chart and its AC modifier is reduced by 2 until it can be repaired (for half the price of new armor of the same type) or cleaned (if the armor is magical). If the creature is not wearing armor, roll on the major injury chart.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Armor damaged 2",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Armor damaged 2"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.d1aLGyryBHJtYUlY",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332964442,
            "modifiedTime": 1724332964442,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/acid/dissolve-arm-flesh.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    atrophy: {
        "changes": [],
        "description": "<p></p><p>The creature’s maximum hit points are reduced by the same amount as the damage dealt with the last attack.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Atrophy",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Atrophy"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.H1rZ55KAUgk3mgfV",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332965383,
            "modifiedTime": 1724332965383,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/death/hand-undead-skeleton-fire-pink.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    badlybeaten: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.ability.save.con",
                "mode": 2,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature has disadvantage on Constitution saving throws.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Badly Beaten",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Badly Beaten"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.8eY8VWLmIaPHq6jL",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332966354,
            "modifiedTime": 1724332966354,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/wounds/anatomy-bone-joint.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    bleedingccut: {
        "changes": [
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 0,
                "value": "turn=start, damageRoll=1d6, label=Bleeding, removeCondition=true",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature bleeds and loses 1d6 hit points at the start of its next turn.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": [
                    "turnStart"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Bleeding Cut",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Bleeding Cut"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.rNoE9EMfhCRAKGk5",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332967654,
            "modifiedTime": 1724332967654,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/wounds/blood-spurt-spray-red.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    blight: {
        "changes": [],
        "description": "<p></p><p>The creature’s maximum hit points are reduced by the same amount as the damage dealt with the last attack.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Blight",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Blight"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.0aKcLIs2u06YBEUE",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332968564,
            "modifiedTime": 1724332968564,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/death/hand-undead-skeleton-fire-pink.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    charred: {
        "changes": [
            {
                "key": "system.traits.dv.value",
                "mode": 2,
                "value": "fire",
                "priority": 20
            },
            {
                "key": "macro.tokenMagic",
                "mode": 0,
                "value": "fumes",
                "priority": 20
            }
        ],
        "description": "<p></p><p>If the creature has resistance to fire, it loses that resistance. If the creature does not have resistance to fire, it gains vulnerability to fire.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Charred",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Charred"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.zccev1sdcUJ4sV2f",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332970541,
            "modifiedTime": 1724332970541,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/fire/flame-burning-skull-orange.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    chilled: {
        "changes": [
            {
                "key": "system.attributes.movement.all",
                "mode": 0,
                "value": "*0.5",
                "priority": 25
            }
        ],
        "description": "<p></p><p>The creature’s movement speed is halved.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Chilled",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Chilled",
            "exhaustion"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.SE6KD4KqiacbEyIT",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332971697,
            "modifiedTime": 1724332971697,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/water/barrier-ice-crystal-wall-faceted.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    confused: {
        "changes": [
            {
                "key": "system.attributes.movement.all",
                "mode": 0,
                "value": "*0.5",
                "priority": 25
            }
        ],
        "description": "<p></p><p>The creature’s movement speed is halved.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Chilled",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Chilled",
            "exhaustion"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.SE6KD4KqiacbEyIT",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332971697,
            "modifiedTime": 1724332971697,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/water/barrier-ice-crystal-wall-faceted.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    crippledarm: {
        "changes": [],
        "description": "<p></p><p>Randomly determine one of the creature’s arms. That arm cannot be used to hold an item and any ability check requiring that arm automatically fails or has disadvantage (DM’s choice).</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Crippled Arm",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Crippled Arm"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.fdRYq7Kaf9ttxuNW",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332973948,
            "modifiedTime": 1724332973948,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/wounds/bone-broken-marrow-red.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    crippledleg: {
        "changes": [
            {
                "key": "system.attributes.movement.all",
                "mode": 0,
                "value": "-10",
                "priority": 25
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.check.dex",
                "mode": 2,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>Crippled leg! The creature’s movement speed is reduced by 10 feet and it has disadvantage on Dexterity saving throws.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Crippled Leg",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Crippled Leg",
            "exhaustion"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.03EceZPdP8gDWuQX",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332974915,
            "modifiedTime": 1724332974915,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/wounds/bone-broken-marrow-red.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    dazzled: {
        "changes": [],
        "description": "<p></p><p>The creature cannot willingly move closer to you until the end of its next turn.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Dazzled",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Dazzled"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.6lQd9SIIl6wZLnbK",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332975759,
            "modifiedTime": 1724332975759,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/light/beam-rays-orange-large.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    deafened1: {
        "changes": [],
        "description": "<p></p><p>The creature is deafened until the end of its next turn.. A deafened creature can't hear and automatically fails any ability check that requires hearing.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd",
                    "shortRest",
                    "longRest"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Deafened 1",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Deafened 1",
            "deafened"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.tptobiMyxW7LiOEJ",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332976587,
            "modifiedTime": 1724332976587,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "modules/dfreds-convenient-effects/images/deafened.svg",
        "type": "base",
        "system": {},
        "sort": 0
    },
    deafened2: {
        "changes": [],
        "description": "<p></p><p> The creature is deafened for one minute. A deafened creature can't hear and automatically fails any ability check that requires hearing.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "shortRest",
                    "longRest"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Deafened 2",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Deafened 2",
            "deafened"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.ZEpdnVIITTW9cWLL",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332977398,
            "modifiedTime": 1724332977398,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "modules/dfreds-convenient-effects/images/deafened.svg",
        "type": "base",
        "system": {},
        "sort": 0
    },
    disfigured: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.ability.check.cha",
                "mode": 2,
                "value": "1",
                "priority": 20
            },
            {
                "key": "",
                "mode": 2,
                "value": "",
                "priority": 20
            }
        ],
        "description": "<p></p><p>While disfigured the creature has disadvantage on all Charisma ability checks except Charisma (Intimidation). Being disfigured can be removed with the spell greater restoration.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Disfigured",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Disfigured"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.dEZ6DpwaTUU7ccA3",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332981048,
            "modifiedTime": 1724332981048,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/acid/dissolve-arm-flesh.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    disheartened: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.check.all",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.check.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.check.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature is frightened until the end of its next turn. A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight. The creature can't willingly move closer to the source of its fear.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Disheartened",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Disheartened",
            "frightened"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.a28bazdKme5DOdPz",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332982482,
            "modifiedTime": 1724332982482,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/light/beam-rays-orange-large.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    disoriented: {
        "changes": [],
        "description": "<p></p><p>The creature’s movement on its next turn is controlled by the enemy.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd",
                    "shortRest",
                    "longRest"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Disoriented",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Disoriented"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.sBnZCXcFhsmnUu6B",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332983349,
            "modifiedTime": 1724332983349,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/perception/hand-eye-fire-blue.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    dominated: {
        "changes": [],
        "description": "<p></p><p>The creature’s action on its next turn is controlled by the enemy.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd",
                    "shortRest",
                    "longRest"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Dominated",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Dominated"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.NX7KfU2q4xEdfdUw",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332984204,
            "modifiedTime": 1724332984204,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/perception/hand-eye-fire-blue.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    edgeofdeath: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.ability.save.con",
                "mode": 2,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.deathSave",
                "mode": 2,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature has disadvantage on Constitution and Death saving throws.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Edge of Death",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Edge of Death"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.iovZfS15t7aJoEFf",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332985373,
            "modifiedTime": 1724332985373,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/wounds/bone-broken-marrow-red.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    enscorcelled: {
        "changes": [
            {
                "key": "flags.midi-qol.magicVulnerability.all",
                "mode": 2,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.rsak",
                "mode": 2,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 2,
                "value": "turn=end, rollType=save, saveDC=16, saveAbility=int, saveRemove=true",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature is spellbound for the next minute. While spellbound it is vulnerable against spells and spell attack rolls against it have advantage. At the end of each of the creature’s turns it can make an Intelligence saving throw (DC 16) to end this effect.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Enscorcelled",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Enscorcelled"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.6fs683C5b0Lh2Wy1",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332986349,
            "modifiedTime": 1724332986349,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/control/silhouette-hold-beam-blue.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    festered: {
        "changes": [],
        "description": "<p></p><p>The creature’s maximum hit points are reduced by the same amount as the damage dealt with the last attack.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Festered",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Festered"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.dCzgI9Csjd1e96GC",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332988256,
            "modifiedTime": 1724332988256,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/death/hand-undead-skeleton-fire-pink.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    freezing: {
        "changes": [
            {
                "key": "flags.midi-qol.fail.ability.save.dex",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.fail.ability.save.str",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.grants.critical.range",
                "mode": 5,
                "value": "5",
                "priority": 50
            },
            {
                "key": "system.attributes.movement.all",
                "mode": 0,
                "value": "0",
                "priority": 25
            },
            {
                "key": "flags.midi-qol.fail.ability.save.dex",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.fail.ability.save.str",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.critical.range",
                "mode": 5,
                "value": "5",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.fail.ability.save.dex",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.fail.ability.save.str",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.critical.range",
                "mode": 5,
                "value": "5",
                "priority": 20
            }
        ],
        "description": "<p></p><p>- A frozen creature is incapacitated (see the condition) and can't move or speak.<br />- The creature automatically fails Strength and Dexterity saving throws. Attack rolls against the creature have advantage.<br />- Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Freezing",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Freezing",
            "paralyzed",
            "incapacitated"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.tn7AsoHBCAjSK0TE",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332989526,
            "modifiedTime": 1724332989526,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/water/barrier-ice-crystal-wall-faceted.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    frost: {
        "changes": [
            {
                "key": "system.attributes.movement.all",
                "mode": 0,
                "value": "0",
                "priority": 25
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.save.dex",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.save.dex",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature’s movement speed is 0 until the end of its next turn.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Frost",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Frost",
            "restrained"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.ejAZTj8VME0TA1FN",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332990901,
            "modifiedTime": 1724332990901,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/water/barrier-ice-crystal-wall-faceted.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    frozen: {
        "changes": [
            {
                "key": "system.attributes.movement.all",
                "mode": 0,
                "value": "0",
                "priority": 25
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.save.dex",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.save.dex",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature’s movement speed is 0 until the end of its next turn.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dfreds-convenient-effects": {
                "isConvenient": true,
                "isDynamic": false,
                "isViewable": true,
                "nestedEffects": [],
                "subEffects": [],
                "ceEffectId": "ce-frost",
                "isBackup": false,
                "isTemporary": true
            },
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Frost",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Frost",
            "restrained"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.ejAZTj8VME0TA1FN",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332990901,
            "modifiedTime": 1724332990901,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/water/barrier-ice-crystal-wall-faceted.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    heatwave: {
        "changes": [
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 2,
                "value": "true",
                "priority": 20
            },
            {
                "key": "macro.tokenMagic",
                "mode": 0,
                "value": "fire",
                "priority": 20
            }
        ],
        "description": "<p></p><p>Attack rolls have advantage when made against the creature until the end of its next turn.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Heat Wave",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Heat Wave"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.QIRgHr25PzEIKIP1",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332995735,
            "modifiedTime": 1724332995735,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/fire/flame-burning-skull-orange.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    holyterror: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.check.all",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 2,
                "value": "turn=end,rollType=save, saveAbility=wis, saveDC=16, saveRemove=true",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.check.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.check.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature is frightened for thenext minute. It can make a Wisdom saving throw (DC 16) at the end of each of its turns to end this effect. A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight. The creature can't willingly move closer to the source of its fear.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Holy Terror",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Holy Terror",
            "frightened"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.dhrHJiByOFp1G3Eu",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332996774,
            "modifiedTime": 1724332996774,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/light/beam-rays-orange-large.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    inferno: {
        "changes": [
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 0,
                "value": "turn=start, damageRoll=2d8[Fire], label=Burning",
                "priority": 20
            },
            {
                "key": "macro.tokenMagic",
                "mode": 0,
                "value": "fire",
                "priority": 20
            },
            {
                "key": "ATL.light.dim",
                "mode": 5,
                "value": "5",
                "priority": 20
            },
            {
                "key": "ATL.light.bright",
                "mode": 5,
                "value": "3",
                "priority": 20
            },
            {
                "key": "ATL.light.color",
                "mode": 5,
                "value": "#f98026",
                "priority": 20
            },
            {
                "key": "ATL.light.alpha",
                "mode": 5,
                "value": "0.2",
                "priority": 20
            },
            {
                "key": "ATL.light.animation",
                "mode": 5,
                "value": "{\"type\": \"torch\",\"speed\": 10,\"intensity\": 10}",
                "priority": 20
            }
        ],
        "description": "<p></p><p>While the creature is on fire it takes 2d8 fire damage at the start of each of its turns. The creature can end this condition by dropping prone and using 5 feet of movement to roll on the ground.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Inferno",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Inferno"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.pvlVpju0IKQGRQuT",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724332998976,
            "modifiedTime": 1724332998976,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/fire/flame-burning-skull-orange.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    injuredarm: {
        "changes": [],
        "description": "<p></p><p>Randomly determine one of the creature’s arms. That arm cannot be used to hold a shield and the creature has disadvantage on any rolls involving the use of that arm.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Injured Arm",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Injured Arm"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.J7WSv6DvqjyJva43",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333000206,
            "modifiedTime": 1724333000206,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/wounds/anatomy-bone-joint.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    injuredleg: {
        "changes": [
            {
                "key": "system.attributes.movement.all",
                "mode": 0,
                "value": "-10",
                "priority": 25
            }
        ],
        "description": "<p></p><p>Disadvantage on ability checks and speed halved</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Injured Leg",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Injured Leg",
            "exhaustion"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.vpZGR8DQs8q67MNB",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333001148,
            "modifiedTime": 1724333001148,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/wounds/anatomy-bone-joint.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    magicallymauled: {
        "changes": [
            {
                "key": "flags.midi-qol.magicVulnerability.all",
                "mode": 2,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.rsak",
                "mode": 2,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 2,
                "value": "turn=end, rollType=save, saveDC=18, saveAbility=int, saveRemove=true",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature is spellbound for the next minute. While spellbound it is vulnerable against spells and spell attack rolls against it have advantage. At the end of each of the creature’s turns it can make an Intelligence saving throw (DC 16) to end this effect.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Magically Mauled",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Magically Mauled"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.6GqHkbMqlQSVoCE9",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333004912,
            "modifiedTime": 1724333004912,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/control/silhouette-hold-beam-blue.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    majorbleeding: {
        "changes": [
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 0,
                "value": "turn=start, damageRoll=1d12, label=Bleeding",
                "priority": 20
            }
        ],
        "description": "<p></p><p>For the next minute the creature loses 1d12 hit points at the start of each of its turns until it uses an action to staunch this wound.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dfreds-convenient-effects": {
                "isConvenient": true,
                "isDynamic": false,
                "isViewable": true,
                "nestedEffects": [],
                "subEffects": [],
                "ceEffectId": "ce-major-bleeding",
                "isBackup": false,
                "isTemporary": true
            },
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": [
                    "None"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Major Bleeding",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Major Bleeding"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.zZFZgnP0xvRaoAuE",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333005930,
            "modifiedTime": 1724333005930,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/wounds/blood-spurt-spray-red.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    meediumbleeding: {
        "changes": [
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 0,
                "value": "turn=start, damageRoll=1d8, label=Bleeding",
                "priority": 20
            }
        ],
        "description": "<p></p><p>For the next minute the creature loses 1d8 hit points at the start of each of its turns until it uses an action to staunch this wound.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Medium Bleeding",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Medium Bleeding"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.JjlnooY2XvEXFX4F",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333006942,
            "modifiedTime": 1724333006942,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/wounds/blood-spurt-spray-red.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    minorbleeding: {
        "changes": [
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 0,
                "value": "turn=start, damageRoll=1d4, label=Bleeding",
                "priority": 20
            }
        ],
        "description": "<p></p><p>For the next minute the creature loses 1d4 hit points at the start of each of its turns until it uses an action to staunch this wound.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Minor Bleeding",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Minor Bleeding"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.MAishnu8vRlnPXG9",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333009581,
            "modifiedTime": 1724333009581,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/wounds/blood-spurt-spray-red.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    multipleinjuries: {
        "changes": [],
        "description": "<p></p><p>The creature’s maximum hit points are reduced by an amount equivalent to half of the damage dealt by the attack.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Multiple Injuries",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Multiple Injuries"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.YkZzr2MWXnF5DW4P",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333012741,
            "modifiedTime": 1724333012741,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/wounds/anatomy-bone-joint.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    mysticmagnet: {
        "changes": [
            {
                "key": "flags.midi-qol.magicVulnerability.all",
                "mode": 2,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.rsak",
                "mode": 2,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 2,
                "value": "turn=end, saveAbility=int, saveDC=14, saveRemove=true",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature is spellbound for the next minute. While spellbound it is vulnerable against spells and spell attack rolls against it have advantage. At the end of each of the creature’s turns it can make an Intelligence saving throw (DC 14) to end this effect.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Mystic Magnet",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Mystic Magnet"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.ZkP8tca3p4BaYHsT",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333013776,
            "modifiedTime": 1724333013776,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/control/silhouette-hold-beam-blue.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    nauseous: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 2,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.disadvantage.save.all",
                "mode": 2,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.all",
                "mode": 2,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature has disadvantage on its next ability check, attack roll, or saving throw.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "isCheck",
                    "isSave",
                    "1Attack"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Nauseous",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Nauseous"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.NMtfsX1JUwUgT7it",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333014794,
            "modifiedTime": 1724333014794,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/acid/dissolve-drip-droplet-smoke.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    offbalance: {
        "changes": [
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 2,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The nex attack roll has advantage when made against the creature.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "isAttacked"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Off Balance",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Off Balance"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.ql5ZwyhwLIoHBnqG",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333015726,
            "modifiedTime": 1724333015726,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/melee/strike-hammer-destructive-orange.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    onfire: {
        "changes": [
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 0,
                "value": "turn=start, damageRoll=2d4[Fire], label=Burning",
                "priority": 20
            },
            {
                "key": "macro.tokenMagic",
                "mode": 0,
                "value": "fire",
                "priority": 20
            },
            {
                "key": "ATL.light.dim",
                "mode": 5,
                "value": "2",
                "priority": 20
            },
            {
                "key": "ATL.light.bright",
                "mode": 5,
                "value": "1",
                "priority": 20
            },
            {
                "key": "ATL.light.color",
                "mode": 5,
                "value": "#f98026",
                "priority": 20
            },
            {
                "key": "ATL.light.alpha",
                "mode": 5,
                "value": "0.2",
                "priority": 20
            },
            {
                "key": "ATL.light.animation",
                "mode": 5,
                "value": "{\"type\": \"torch\",\"speed\": 10,\"intensity\": 10}",
                "priority": 20
            }
        ],
        "description": "<p></p><p>While the creature is on fire it takes 2d4 fire damage at the start of each of its turns. The creature can end this condition by dropping prone and using 5 feet of movement to roll on the ground.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "On Fire",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: On Fire"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.e73gmk7NtAMBzKN4",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333016697,
            "modifiedTime": 1724333016697,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/fire/flame-burning-skull-orange.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    poisoned2: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.check.all",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 0,
                "value": "turn=end, rollType=save, saveDC=12, saveAbility=con, saveRemove=true",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.check.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.check.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature is poisoned for the next minute. The creature may attempt a saving throw at the end of each of its turns (DC 12) to end this effect. A poisoned creature has disadvantage on attack rolls and ability checks.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Poisoned 2",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Poisoned 2",
            "poisoned"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.vcY3oIvPeMy76o4f",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333018528,
            "modifiedTime": 1724333018528,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/acid/dissolve-drip-droplet-smoke.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    poisoned3: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.check.all",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 0,
                "value": "turn=end, rollType=save, saveDC=16, saveAbility=con, saveRemove=true",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.check.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.check.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature is poisoned for the next minute. The creature may attempt a saving throw at the end of each of its turns (DC 16) to end this effect. A poisoned creature has disadvantage on attack rolls and ability checks.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Poisoned 3",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Poisoned 3",
            "poisoned"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.AomeQXSNFLGTGEoB",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333019406,
            "modifiedTime": 1724333019406,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/acid/dissolve-drip-droplet-smoke.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    punished: {
        "changes": [
            {
                "key": "ATL.light.dim",
                "mode": 5,
                "value": "30",
                "priority": 50
            },
            {
                "key": "ATL.light.bright",
                "mode": 5,
                "value": "10",
                "priority": 50
            },
            {
                "key": "ATL.light.color",
                "mode": 5,
                "value": "#dfcb68",
                "priority": 50
            },
            {
                "key": "ATL.light.alpha",
                "mode": 5,
                "value": "0.4",
                "priority": 50
            },
            {
                "key": "ATL.light.animation",
                "mode": 5,
                "value": "{\"type\": \"starlight\", \"speed\": 3,\"intensity\": 1}",
                "priority": 50
            },
            {
                "key": "flags.midi-qol.grants.attack.bonus.all",
                "mode": 2,
                "value": "+4",
                "priority": 50
            }
        ],
        "description": "<p></p><p>The creature glows for the next minute. While glowing it produces bright light up 10 feet and dim light up to 30 feet and all successful attacks against the creature are granted a +4 bonus to their attack roll.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Punished",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Punished"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.wUTGNbMhb2sUFLjb",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333020304,
            "modifiedTime": 1724333020304,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/light/beam-rays-orange-large.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    rightgeousmark: {
        "changes": [
            {
                "key": "ATL.light.dim",
                "mode": 5,
                "value": "30",
                "priority": 50
            },
            {
                "key": "ATL.light.bright",
                "mode": 5,
                "value": "10",
                "priority": 50
            },
            {
                "key": "ATL.light.color",
                "mode": 5,
                "value": "#dfcb68",
                "priority": 50
            },
            {
                "key": "ATL.light.alpha",
                "mode": 5,
                "value": "0.25",
                "priority": 50
            },
            {
                "key": "ATL.light.animation",
                "mode": 5,
                "value": "{\"type\": \"starlight\", \"speed\": 3,\"intensity\": 1}",
                "priority": 50
            },
            {
                "key": "flags.midi-qol.grants.attack.bonus.all",
                "mode": 2,
                "value": "+2",
                "priority": 50
            }
        ],
        "description": "<p></p><p>The creature glows for the next minute. While glowing it produces bright light up 10 feet and dim light up to 30 feet and all successful attacks against the creature are granted a +2 bonus on the attack roll.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Rightgeous Mark",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Rightgeous Mark"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.qCBCDWwGSlA56zN0",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333021318,
            "modifiedTime": 1724333021318,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/light/beam-rays-orange-large.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    ringingblow: {
        "changes": [
            {
                "key": "flags.midi-qol.fail.ability.save.dex",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.fail.ability.save.str",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.fail.ability.save.dex",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.fail.ability.save.str",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.fail.ability.save.dex",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.fail.ability.save.str",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>- A stunned creature is incapacitated (see the condition), can't move, and can speak only falteringly.<br />- The creature automatically fails Strength and Dexterity saving throws.<br />- Attack rolls against the creature have advantage.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Ringing Blow",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Ringing Blow",
            "stunned",
            "incapacitated"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.Ova5n1JjVaQrJoxK",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333022239,
            "modifiedTime": 1724333022239,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/wounds/anatomy-bone-joint.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    rot: {
        "changes": [
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 2,
                "value": "turn=end, saveAbility= con, saveDC=16, saveRemove=true",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature cannot regain hit points for the next minute. It may make a saving throw (DC 16) at the end of each of its turns to end this effect.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Rot",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Rot"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.i9EvtKxUpcpMqCp9",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333023218,
            "modifiedTime": 1724333023218,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/death/hand-undead-skeleton-fire-pink.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    scarred: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.ability.check.cha",
                "mode": 2,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>While scarred the creature has disadvantage on all Charisma ability checks except Charisma (Intimidation). Being scarred can be healed in the same way as a minor injury.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Scarred",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Scarred"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.U1rWnYlhoAh1J70V",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333024108,
            "modifiedTime": 1724333024108,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/acid/dissolve-arm-flesh.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    severebleeding: {
        "changes": [
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 0,
                "value": "turn=start, damageRoll=2d8, label=Bleeding",
                "priority": 20
            }
        ],
        "description": "<p></p><p>For the next minute the creature loses 2d8 hit points at the start of each of its turns until it uses an action to staunch this wound.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Severe Bleeding",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Severe Bleeding"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.Y6vZmjHFQztnDO0r",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333024963,
            "modifiedTime": 1724333024963,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/wounds/blood-spurt-spray-red.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    severlywounded: {
        "changes": [],
        "description": "<p></p><p>The creature’s maximum hit points are reduced by an amount equivalent to the damage dealt by the attack.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Severly Wounded",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Severly Wounded"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.zVQHFIn7MXEIeA1v",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333025910,
            "modifiedTime": 1724333025910,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/wounds/bone-broken-marrow-red.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    sickened: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 2,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.disadvantage.save.all",
                "mode": 2,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.ability.all",
                "mode": 2,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature has disadvantage on all ability checks, attack rolls, and saving throws until the end of its next turn.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Sickened",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Sickened"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.tOKjmppsIfA1SAgX",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333027593,
            "modifiedTime": 1724333027593,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/acid/dissolve-drip-droplet-smoke.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    smashed: {
        "changes": [
            {
                "key": "flags.midi-qol.fail.ability.save.dex",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.fail.ability.save.str",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 0
            },
            {
                "key": "flags.midi-qol.fail.ability.save.dex",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.fail.ability.save.str",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.fail.ability.save.dex",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.fail.ability.save.str",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 0,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>- A stunned creature is incapacitated (see the condition), can't move, and can speak only falteringly.<br />- The creature automatically fails Strength and Dexterity saving throws.<br />- Attack rolls against the creature have advantage.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEndSource"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Smashed",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Smashed",
            "stunned",
            "incapacitated"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.VfVBw09yN8jL8XMX",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333028761,
            "modifiedTime": 1724333028761,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/melee/strike-hammer-destructive-orange.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    spellbound: {
        "changes": [
            {
                "key": "flags.midi-qol.magicVulnerability.all",
                "mode": 2,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.grants.advantage.attack.rsak",
                "mode": 2,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.OverTime",
                "mode": 2,
                "value": "turn=end, saveAbility= int, saveDC=14, saveRemove=true",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature is spellbound for the next minute. While spellbound is vulnerable against spells spell attack rolls against it have advantage. At the end of each of the creature’s turns it can make an Intelligence saving throw (DC 14) to end this effect.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dfreds-convenient-effects": {
                "isConvenient": true,
                "isDynamic": false,
                "isViewable": true,
                "nestedEffects": [],
                "subEffects": [],
                "ceEffectId": "ce-spellbound",
                "isBackup": false,
                "isTemporary": true
            },
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Spellbound",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Spellbound"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.ac3CjhFECOJLHZ3M",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333029650,
            "modifiedTime": 1724333029650,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/control/silhouette-hold-beam-blue.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    spellstruck: {
        "changes": [
            {
                "key": "flags.midi-qol.magicVulnerability.all",
                "mode": 2,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p></p><p>Tthe creature is vulnerable against spells until the end of its next turn.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Spellstruck",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Spellstruck"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.NGX8MnrwRp7RfFn1",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333030493,
            "modifiedTime": 1724333030493,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/control/silhouette-hold-beam-blue.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    spoiled: {
        "changes": [],
        "description": "<p></p><p>The creature cannot regain hit points until the end of its next turn.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd",
                    "longRest",
                    "shortRest"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Spoiled",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Spoiled"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.pzq0af8O59I3She7",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333031426,
            "modifiedTime": 1724333031426,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/magic/death/hand-undead-skeleton-fire-pink.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    weakpoint: {
        "changes": [
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 2,
                "value": "true",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The next attack made against the creature before the start of its next turn has advantage.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnStart",
                    "isAttacked"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Weak Point",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Weak Point"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.MfHUboSQRq6WidgP",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333037180,
            "modifiedTime": 1724333037180,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/melee/sword-damaged-broken-glow-red.webp",
        "type": "base",
        "system": {},
        "sort": 0
    },
    wearandtear: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.attack.all",
                "mode": 2,
                "value": "true",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The target creature suffers disadvantage on its next attack roll.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": 47194061940,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": false,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "1Attack"
                ]
            },
            "ActiveAuras": {
                "isAura": false,
                "aura": "None",
                "nameOverride": "",
                "radius": "",
                "alignment": "",
                "type": "",
                "customCheck": "",
                "ignoreSelf": false,
                "height": false,
                "hidden": false,
                "displayTemp": false,
                "hostile": false,
                "onlyOnce": false,
                "wallsBlock": "system"
            }
        },
        "name": "Wear and Tear",
        "tint": "#ffffff",
        "transfer": false,
        "statuses": [
            "Convenient Effect: Wear and Tear"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.cKxc8AHFVyFnBtDQ",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333038073,
            "modifiedTime": 1724333038073,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "icons/skills/melee/sword-damaged-broken-glow-red.webp",
        "type": "base",
        "system": {},
        "sort": 0
    }
}
