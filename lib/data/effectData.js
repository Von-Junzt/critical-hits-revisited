/**
 * This a database of all custom effects we use in this module.
 */

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
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": []
            }
        },
        "name": "Ablaze",
        "transfer": false,
        "statuses": [
            "Ablaze"
        ],
        "img": "icons/magic/fire/flame-burning-skull-orange.webp"
    },
    acidbath: {
        "changes": [],
        "description": "<p></p><p>If the creature is wearing armor, the armor is destroyed (if non-magical) or rendered useless until cleaned during a long rest (if magical) and roll on the major injury chart.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "effectmacro": {
                "onCreate": {
                    "script": "await game.critsRevisited.effectMacros.acidBath(effect, token, actor);"
                }
            }
        },
        "name": "Acid Bath",
        "transfer": false,
        "statuses": [
            "Acid Bath"
        ],
        "img": "modules/critical-hits-revisited/assets/img/acid/armor_damaged.webp"
    },
    addiction: {
        "changes": [],
        "description": "<p>Choose a behavior or substance you have used. Once per day, when you are presented with an opportunity to do the behavior or use the substance the DM can call on you to succeed on a Wisdom saving throw (DC 14) or ignore everything else to indulge in your vice.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Addiction",
        "tint": null,
        "transfer": false,
        "statuses": ["Addiction"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
    },
    anterogradeamnesia: {
        "changes": [],
        "description": "<p>Whenever you try to recall a fact you learned since you received this insanity, make a Wisdom saving throw (DC 12). If you fail you cannot recall the fact.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Anterograde Amnesia",
        "tint": null,
        "transfer": false,
        "statuses": ["Anterograde Amnesia"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
    },
    anxious: {
        "changes": [],
        "description": "<p>You have disadvantage on saving throws against being frightened. Additionally, once per day the DM can call on you to succeed a Wisdom saving throw (DC 14) or be frightened by a creature of the DM's choosing for the next minute.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Anxious",
        "tint": null,
        "transfer": false,
        "statuses": ["Anxious"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
    },
    arcaneinjury: {
        "changes": [],
        "description": "<p>Arcane injury! Roll on the major injury chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "effect.delete();"
                }
            }
        },
        "name": "Arcane Injury",
        "tint": null,
        "transfer": false,
        "statuses": ["Arcane Injury"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Armor damaged 1",
        "transfer": false,
        "statuses": [
            "Armor damaged 1"
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
        "img": "modules/critical-hits-revisited/assets/img/acid/armor_damaged.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Armor damaged 2",
        "transfer": false,
        "statuses": [
            "Armor damaged 2"
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
        "img": "modules/critical-hits-revisited/assets/img/acid/armor_damaged.webp"
    },
    atrophy: {
        "changes": [],
        "description": "<p>Atrophy! Roll on the major injury chart.</p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Atrophy",
        "transfer": false,
        "statuses": [
            "Atrophy"
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
        "img": "icons/magic/death/hand-undead-skeleton-fire-pink.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Badly Beaten",
        "transfer": false,
        "statuses": [
            "Badly Beaten"
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
        "img": "icons/skills/wounds/anatomy-bone-joint.webp"
    },
    bleedingcut: {
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": [
                    "turnStart"
                ]
            }
        },
        "name": "Bleeding Cut",
        "transfer": false,
        "statuses": [
            "Bleeding Cut"
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
        "img": "icons/skills/wounds/blood-spurt-spray-red.webp"
    },
    blight: {
        "changes": [],
        "description": "<p></p><p>The creature’s maximum hit points are reduced by the same amount as the damage dealt with the last attack.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Blight",
        "transfer": false,
        "statuses": [
            "Blight"
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
        "img": "icons/magic/death/hand-undead-skeleton-fire-pink.webp"
    },
    catatonia: {
        "changes": [],
        "description": "<p>You are unconscious for 10d10 years.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "catatonia",
        "tint": null,
        "transfer": false,
        "statuses": ["Unconscious","Incapacitated"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
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
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Charred",
        "transfer": false,
        "statuses": [
            "Charred"
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
        "img": "icons/magic/fire/flame-burning-skull-orange.webp"
    },
    chilled: {
        "changes": [
            {
                "key": "system.attributes.movement.all",
                "mode": 0,
                "value": "*0.5",
                "priority": 25
            },
            {
                "key": "macro.tokenMagic",
                "mode": 0,
                "value": "Super-Frost",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature’s movement speed is halved.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Chilled",
        "transfer": false,
        "statuses": ["Chilled"],
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
        "img": "icons/magic/water/barrier-ice-crystal-wall-faceted.webp"
    },
    clusterofbodies: {
        "changes": [],
        "description": "<p>The cluster of bodies in the fight causes you to accidentally hit the nearest other target within range.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "await game.critsRevisited.effectMacros.clusterOfBodies(effect, token, actor);"
                }
            },
        },
        "name": "Cluster of Bodies",
        "tint": null,
        "transfer": false,
        "statuses": ["Cluster of Bodies"],
        "icon": "icons/skills/melee/sword-damaged-broken-glow-red.webp"
    },
    combustion: {
        "changes": [],
        "description": "<p>Combustion! Roll on the major injury chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Combustion",
        "tint": null,
        "transfer": false,
        "statuses": ["Combustion"],
        "icon": "icons/magic/fire/explosion-flame-lightning-strike.webp"
    },
    confused: {
        "changes": [],
        "description": "<p></p><p>The creature cannot differentiate friend from foe until the end of its next turn.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd",
                    "shortRest",
                    "longRest"
                ]
            }
        },
        "name": "Confused",
        "transfer": false,
        "statuses": [
            "Confused"
        ],
        "_stats": {
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724260096884,
            "modifiedTime": 1724260096884,
            "lastModifiedBy": "YIqINWNHSYOv12xm"
        },
        "img": "icons/magic/perception/hand-eye-fire-blue.webp"
    },
    crippledarm: {
        "changes": [],
        "description": "<p></p><p>Randomly determine one of the creature’s arms. That arm cannot be used to hold an item and any ability check requiring that arm automatically fails or has disadvantage (DM’s choice).</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Crippled Arm",
        "transfer": false,
        "statuses": [
            "Crippled Arm"
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
        "img": "icons/skills/wounds/bone-broken-marrow-red.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Crippled Leg",
        "transfer": false,
        "statuses": ["Crippled Leg"],
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
        "img": "icons/skills/wounds/bone-broken-marrow-red.webp"
    },
    cruelprick: {
        "changes": [],
        "description": "<p><b>Cruel prick!</b> Roll on the major injury chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "effect.delete();"
                }
            }
        },
        "name": "Cruel Prick",
        "tint": null,
        "transfer": false,
        "statuses": ["Cruel Prick"],
        "icon": "icons/skills/melee/strike-sword-dagger-runes-red.webp"
    },
    crushed: {
        "changes": [],
        "description": "<p><b>Crushed!</b> Roll on the major injury chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Crushed",
        "tint": null,
        "transfer": false,
        "statuses": ["Crushed"],
        "icon": "icons/skills/melee/strike-hammer-destructive-orange.webp"
    },
    dazzled: {
        "changes": [],
        "description": "<p></p><p>The creature cannot willingly move closer to you until the end of its next turn.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Dazzled",
        "transfer": false,
        "statuses": [
            "Dazzled"
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
        "img": "icons/magic/light/beam-rays-orange-large.webp"
    },
    deafened1: {
        "changes": [],
        "description": "<p></p><p>The creature is deafened until the end of its next turn.. A deafened creature can't hear and automatically fails any ability check that requires hearing.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd",
                    "shortRest",
                    "longRest"
                ]
            }
        },
        "name": "Deafened 1",
        "transfer": false,
        "statuses": [
            "Deafened 1",
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
        "img": "systems/dnd5e/icons/svg/statuses/deafened.svg"
    },
    deafened2: {
        "changes": [],
        "description": "<p></p><p> The creature is deafened for one minute. A deafened creature can't hear and automatically fails any ability check that requires hearing.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": 60,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "shortRest",
                    "longRest"
                ]
            }
        },
        "name": "Deafened 2",
        "transfer": false,
        "statuses": [
            "Deafened 2",
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
        "img": "systems/dnd5e/icons/svg/statuses/deafened.svg"
    },
    deafened3: {
        "changes": [],
        "description": "<p></p><p> The creature is deafened permanently. A deafened creature can't hear and automatically fails any ability check that requires hearing.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Deafened 2",
        "transfer": false,
        "statuses": [
            "Deafened 2",
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
        "img": "systems/dnd5e/icons/svg/statuses/deafened.svg"
    },
    decapitated: {
        "name": "Decapitated",
        "transfer": false,
        "flags": {
            "chris-premades": {
                "effectInterface": {
                    "sort": 54
                }
            },
            "dae": {
                "enableCondition": "",
                "disableCondition": "",
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "core": {
                "overlay": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "await game.critsRevisited.effectMacros.decapitated(actor)"
                }
            },
            "exportSource": {
                "world": "die-vergessenen-reiche-reworked",
                "system": "dnd5e",
                "coreVersion": "12.331",
                "systemVersion": "3.3.1"
            }
        },
        "img": "icons/commodities/bones/skull-hollow-worn-white.webp",
        "type": "base",
        "system": {},
        "changes": [],
        "disabled": false,
        "duration": {
            "startTime": null,
            "seconds": null,
            "combat": null,
            "rounds": null,
            "turns": null,
            "startRound": null,
            "startTurn": null
        },
        "description": "",
        "statuses": [],
        "_stats": {
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1725792757585,
            "modifiedTime": 1725793133139,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        }
    },
    delusional: {
        "changes": [],
        "description": "<p>When you gain this insanity the DM will tell you a belief that you have. No matter what evidence is presented to the contrary so long as you have this insanity you cannot be persuaded that this belief is not true.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Delusional",
        "tint": null,
        "transfer": false,
        "statuses": ["Delusional"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
    },
    dependence: {
        "changes": [],
        "description": "<p>You must pass a Wisdom saving throw (DC 14) to take an action that one or more of your allies disapprove of.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "dependence",
        "tint": null,
        "transfer": false,
        "statuses": ["Dependence"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
    },
    disarmed: {
        "changes": [],
        "description": "<p>Your target catches you by the wrist and disarms you. Picking up your weapon (bonus action) will expose you to opportunity attacks.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "await game.critsRevisited.effectMacros.disarmed(effect, token, actor);"
                }
            },
        },
        "name": "Disarmed",
        "tint": null,
        "transfer": false,
        "statuses": ["Disarmed"],
        "icon": "icons/skills/melee/sword-damaged-broken-glow-red.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Disfigured",
        "transfer": false,
        "statuses": [
            "Disfigured"
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
        "img": "modules/critical-hits-revisited/assets/img/acid/disfigured.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd"
                ]
            }
        },
        "name": "Disheartened",
        "transfer": false,
        "statuses": [
            "Disheartened",
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
        "img": "icons/magic/light/beam-rays-orange-large.webp"
    },
    disoriented: {
        "changes": [],
        "description": "<p></p><p>The creature’s movement on its next turn is controlled by the enemy.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd",
                    "shortRest",
                    "longRest"
                ]
            }
        },
        "name": "Disoriented",
        "transfer": false,
        "statuses": [
            "Disoriented"
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
        "img": "icons/magic/perception/hand-eye-fire-blue.webp"
    },
    dissected: {
        "changes": [],
        "description": "<p><b>Dissected!</b> Roll on the major injury chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "effect.delete();"
                }
            }
        },
        "name": "Dissected",
        "tint": null,
        "transfer": false,
        "statuses": ["Dissected"],
        "icon": "icons/skills/melee/strike-sword-blood-red.webp"
    },
    dominated: {
        "changes": [],
        "description": "<p></p><p>The creature’s action on its next turn is controlled by the enemy.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd",
                    "shortRest",
                    "longRest"
                ]
            }
        },
        "name": "Dominated",
        "transfer": false,
        "statuses": [
            "Dominated"
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
        "img": "icons/magic/perception/hand-eye-fire-blue.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Edge of Death",
        "transfer": false,
        "statuses": [
            "Edge of Death"
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
        "img": "icons/skills/wounds/bone-broken-marrow-red.webp"
    },
    electricarc: {
        "changes": [],
        "description": "<p>A random creature within 15 ft. of the victim is chosen. That creature must succeed on a Dexterity saving throw (DC 18) or take half as much damage as the result for your critical hit.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "await game.critsRevisited.effectMacros.sparksFly(effect, token, 18);"
                }
            }
        },
        "name": "Electric Arc",
        "tint": null,
        "transfer": false,
        "statuses": ["Electric Arc"],
        "icon": "icons/magic/lightning/bolt-strike-beam-pink.webp"
    },
    electrocuted: {
        "changes": [],
        "description": "<p>Electrocuted! Roll on the major injury chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Electrocuted",
        "tint": null,
        "transfer": false,
        "statuses": ["Electrocuted"],
        "icon": "icons/magic/lightning/bolt-strike-beam-pink.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Enscorcelled",
        "transfer": false,
        "statuses": [
            "Enscorcelled"
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
        "img": "icons/magic/control/silhouette-hold-beam-blue.webp"
    },
    exposed: {
        "changes": [
            {
                "key": "flags.midi-qol.grants.advantage.attack.all",
                "mode": 2,
                "value": "true",
                "priority": 20
            }
        ],
        "description": "<p></p><p>All attacks made against the creature before the start of its next turn have advantage.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnStart"
                ]
            }
        },
        "name": "Exposed",
        "transfer": false,
        "statuses": [
            "Exposed"
        ],
        "_stats": {
            "compendiumSource": null,
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724260110351,
            "modifiedTime": 1724260110351,
            "lastModifiedBy": "YIqINWNHSYOv12xm"
        },
        "img": "icons/skills/melee/sword-damaged-broken-glow-red.webp"
    },
    festered: {
        "changes": [],
        "description": "<p></p><p>The creature’s maximum hit points are reduced by the same amount as the damage dealt with the last attack.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
            "combat": null,
            "startRound": null,
            "startTurn": null
        },
        "flags": {
            "effectmacro": {
                "onCreate": {
                    "script": "await game.critsRevisited.effectMacros.maxHPReduction(effect, token, 'full');"
                }
            },
            "dae": {
                "disableIncapacitated": false,
                "selfTarget": false,
                "selfTargetAlways": false,
                "dontApply": false,
                "stackable": "noneName",
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Festered",
        "transfer": false,
        "statuses": [
            "Festered"
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
        "img": "icons/magic/death/hand-undead-skeleton-fire-pink.webp"
    },
    freezing: {
        "changes": [
            {
                "key": "macro.tokenMagic",
                "mode": 0,
                "value": "Super-Frost",
                "priority": 20
            }
        ],
        "description": "<p></p><p>- A frozen creature is incapacitated (see the condition) and can't move or speak.<br />- The creature automatically fails Strength and Dexterity saving throws. Attack rolls against the creature have advantage.<br />- Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Freezing",
        "transfer": false,
        "statuses": [
            "freezing",
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
        "img": "icons/magic/water/barrier-ice-crystal-wall-faceted.webp"
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
                "key": "macro.tokenMagic",
                "mode": 0,
                "value": "Super-Frost",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature’s movement speed is 0 until the end of its next turn.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Frost",
        "transfer": false,
        "statuses": [
            "Frost"
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
        "img": "icons/magic/water/barrier-ice-crystal-wall-faceted.webp"
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
            },
            {
                "key": "macro.tokenMagic",
                "mode": 0,
                "value": "Super-Frost",
                "priority": 20
            }
        ],
        "description": "<p></p><p>The creature’s movement speed is 0 until the end of its next turn.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Frost",
        "transfer": false,
        "statuses": [
            "Frost",
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
        "img": "icons/magic/water/barrier-ice-crystal-wall-faceted.webp"
    },
    fulminate: {
        "changes": [],
        "description": "<p>Fulminate! Roll on the minor injury chart. If the creature is wearing metal armor roll on the major injury chart instead.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Fulminate",
        "tint": null,
        "transfer": false,
        "statuses": ["Fulminate"],
        "icon": "icons/magic/lightning/bolt-strike-beam-pink.webp"
    },
    glacial: {
        "changes": [
            {
                "key": "macro.tokenMagic",
                "mode": 0,
                "value": "Super-Frost",
                "priority": 20
            }
        ],
        "description": "<p>You are unconscious for 10d10 years.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Glacial",
        "tint": null,
        "transfer": false,
        "statuses": ["Glacial"],
        "icon": "icons/magic/water/barrier-ice-crystal-wall-faceted.webp"
    },
    grievousinjury: {
        "changes": [],
        "description": "<p><b>Grievous injury!</b> Roll on the Major Injury chart. If the creature is wearing heavy armor roll on the Minor Injury chart instead.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "effect.delete();"
                }
            }
        },
        "name": "Grievous Injury",
        "tint": null,
        "transfer": false,
        "statuses": ["Grievous Injury"],
        "icon": "icons/skills/melee/strike-hammer-destructive-orange.webp"
    },
    halffrozen: {
        "changes": [
            {
                "key": "macro.tokenMagic",
                "mode": 0,
                "value": "Super-Frost",
                "priority": 20
            }
        ],
        "description": "<p>Half-Frozen! The creature is paralyzed until the end of its next turn. If the creature takes damage before the end of its next turn, roll on the minor injury chart.</p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Half-Frozen",
        "transfer": false,
        "statuses": ["Half-Frozen", "paralyzed"],
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
        "img": "icons/magic/water/barrier-ice-crystal-wall-faceted.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd"
                ]
            }
        },
        "name": "Heat Wave",
        "transfer": false,
        "statuses": [
            "Heat Wave"
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
        "img": "icons/magic/fire/flame-burning-skull-orange.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Holy Terror",
        "transfer": false,
        "statuses": [
            "Holy Terror",
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
        "img": "icons/magic/light/beam-rays-orange-large.webp"
    },
    homicidal: {
        "changes": [],
        "description": "<p>After each long rest you must pass a Wisdom saving throw (DC 14) or be overcome with the urge to end the life of a humanoid creature and you cannot benefit from another long rest until you do so.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Homicidal",
        "tint": null,
        "transfer": false,
        "statuses": ["Homicidal"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": []
            }
        },
        "name": "Inferno",
        "transfer": false,
        "statuses": [
            "Inferno"
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
        "img": "icons/magic/fire/flame-burning-skull-orange.webp"
    },
    injuredarm: {
        "changes": [],
        "description": "<p></p><p>Randomly determine one of the creature’s arms. That arm cannot be used to hold a shield and the creature has disadvantage on any rolls involving the use of that arm.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Injured Arm",
        "transfer": false,
        "statuses": [
            "Injured Arm"
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
        "img": "icons/skills/wounds/anatomy-bone-joint.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Injured Leg",
        "transfer": false,
        "statuses": ["Injured Leg"],
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
        "img": "icons/skills/wounds/anatomy-bone-joint.webp"
    },
    insomnia: {
        "changes": [],
        "description": "<p>You cannot take long rests and your short rests take 8 hours to complete.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Insomnia",
        "tint": null,
        "transfer": false,
        "statuses": ["Insomnia"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
    },
    kleptomania: {
        "changes": [],
        "description": "<p>Once per day when you are in a personal residence or marketplace, the DM can call on you to succeed on a Wisdom saving throw (DC 12) or attempt to steal an item of insignificant practical and monetary value.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Kleptomania",
        "tint": null,
        "transfer": false,
        "statuses": ["Kleptomania"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
    },
    lightningrod: {
        "changes": [],
        "description": "<p>A random creature within 15 ft. of the victim is chosen. That creature must succeed on a Dexterity saving throw (DC 14) or take half as much damage as the result for your critical hit.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "await game.critsRevisited.effectMacros.sparksFly(effect, 20);"
                }
            }
        },
        "name": "Lightning Rod",
        "tint": null,
        "transfer": false,
        "statuses": ["Lightning Rod"],
        "icon": "icons/magic/lightning/bolt-strike-beam-pink.webp"
    },
    litup: {
        "changes": [],
        "description": "<p>Lit up! Each enemy creature within 15 ft. of it cannot take reactions until the end of their next turn. Then roll on the minor injury chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "await game.critsRevisited.effectMacros.litUp(effect, token);"
                }
            }
        },
        "name": "Lit Up",
        "tint": null,
        "transfer": false,
        "statuses": ["Lit Up"],
        "icon": "icons/magic/lightning/bolt-strike-beam-pink.webp"
    },
    madness: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.skill.prc",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.skill.inv",
                "mode": 0,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p>Madness! Roll on the Insanity chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Madness",
        "tint": null,
        "transfer": false,
        "statuses": ["Madness"],
        "icon": "icons/magic/perception/hand-eye-fire-blue.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Magically Mauled",
        "transfer": false,
        "statuses": [
            "Magically Mauled"
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
        "img": "icons/magic/control/silhouette-hold-beam-blue.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": [
                    "None"
                ]
            }
        },
        "name": "Major Bleeding",
        "transfer": false,
        "statuses": [
            "Major Bleeding"
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
        "img": "icons/skills/wounds/blood-spurt-spray-red.webp"
    },
    mediumbleeding: {
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": []
            }
        },
        "name": "Medium Bleeding",
        "transfer": false,
        "statuses": [
            "Medium Bleeding"
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
        "img": "icons/skills/wounds/blood-spurt-spray-red.webp"
    },
    mindmelt: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.skill.prc",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.skill.inv",
                "mode": 0,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p>Mind melt! Roll on the Insanity chart with advantage.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Mind Melt",
        "tint": null,
        "transfer": false,
        "statuses": ["Mind Melt"],
        "icon": "icons/magic/perception/hand-eye-fire-blue.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": []
            }
        },
        "name": "Minor Bleeding",
        "transfer": false,
        "statuses": [
            "Minor Bleeding"
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
        "img": "icons/skills/wounds/blood-spurt-spray-red.webp"
    },
    misstep: {
        "changes": [],
        "description": "<p>You misstep, losing your balance in the scuffle and allowing an enemy in range to make an opportunity attack against you.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "await game.critsRevisited.effectMacros.misstep(effect, token);"
                }
            },
        },
        "name": "Misstep",
        "tint": null,
        "transfer": false,
        "statuses": ["Misstep"],
        "icon": "icons/skills/melee/sword-damaged-broken-glow-red.webp"
    },
    multipleinjuries: {
        "changes": [],
        "description": "<p></p><p>The creature’s maximum hit points are reduced by an amount equivalent to half of the damage dealt by the attack.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "effectmacro": {
                "onCreate": {
                    "script": "await game.critsRevisited.effectMacros.maxHPReduction(effect, token, 'half');"
                }
            },

        },
        "name": "Multiple Injuries",
        "transfer": false,
        "statuses": [
            "Multiple Injuries"
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
        "img": "icons/skills/wounds/anatomy-bone-joint.webp"
    },
    mute: {
        "changes": [],
        "description": "<p>Whenever you wish to speak aloud (including casting a spell that has verbal components) you must succeed on a Wisdom saving throw (DC 13) to do so.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Mute",
        "tint": null,
        "transfer": false,
        "statuses": ["Mute"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Mystic Magnet",
        "transfer": false,
        "statuses": [
            "Mystic Magnet"
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
        "img": "icons/magic/control/silhouette-hold-beam-blue.webp"
    },
    narcissism: {
        "changes": [],
        "description": "<p>When you take an action or series of action that doesn't directly benefit you, you must pass a Wisdom saving throw (DC 11) or you can't take that action / series of actions. If any self-sacrifice on your part would be required the DC of the saving throw is increased to 16.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Narcissism",
        "tint": null,
        "transfer": false,
        "statuses": ["Narcissism"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
    },
    narcolepsy: {
        "changes": [],
        "description": "<p>You have disadvantage on saving throws against sleeping or unconsciousness. Once per day the DM may call on you to succeed on a Constitution saving throw (DC 12) or fall unconscious for one minute or until you take damage or another creature spends their action trying to rouse you.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Narcolepsy",
        "tint": null,
        "transfer": false,
        "statuses": ["Narcolepsy"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "isCheck",
                    "isSave",
                    "1Attack"
                ]
            }
        },
        "name": "Nauseous",
        "transfer": false,
        "statuses": [
            "Nauseous"
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
        "img": "icons/magic/acid/dissolve-drip-droplet-smoke.webp"
    },
    obsession: {
        "changes": [],
        "description": "<p>Choose a person or personal interest you are obsessed with. Once per day, when you are presented with an opportunity to interact with or learn more about the subject of your obsession the DM can call on you to succeed on a Wisdom saving throw (DC 14) or ignore everything else to obsess over the object of your fascination.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Obsession",
        "tint": null,
        "transfer": false,
        "statuses": ["Obsession"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
    },
    oddthinking: {
        "changes": [],
        "description": "<p>Once per day when you hear a rational explanation for an event or occurrence, your DM may call on you to succeed on a Wisdom saving throw (DC 12) or you reject the rational explanation for a conspiratorial or fantastical explanation.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Odd Thinking",
        "tint": null,
        "transfer": false,
        "statuses": ["Odd Thinking"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "isAttacked"
                ]
            }
        },
        "name": "Off Balance",
        "transfer": false,
        "statuses": [
            "Off Balance"
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
        "img": "icons/skills/melee/strike-hammer-destructive-orange.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": []
            }
        },
        "name": "On Fire",
        "transfer": false,
        "statuses": [
            "On Fire"
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
        "img": "icons/magic/fire/flame-burning-skull-orange.webp"
    },
    overwhelmed: {
        "changes": [
            {
                "key": "system.traits.dv.value",
                "mode": 2,
                "value": "psychic",
                "priority": 20
            }
        ],
        "description": "<p>If you do not have immunity or resistance to psychic damage, you gain vulnerability to psychic damage. If you have resistance to psychic damage, you lose it. If you have immunity to psychic damage, you lose it but gain resistance to psychic damage.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Overwhelmed",
        "tint": null,
        "transfer": false,
        "statuses": ["Overwhelmed"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
    },
    paranoia: {
        "changes": [],
        "description": "<p>Once per day following an interaction with another creature (including other PCs) the DM can call on you to succeed on a Wisdom saving throw (DC 12) or you suspect that creature is secretly plotting against you.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Paranoia",
        "tint": null,
        "transfer": false,
        "statuses": ["Paranoia"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
    },
    pica: {
        "changes": [],
        "description": "<p>Once per day the DM can call on you to pass a Wisdom saving throw (DC 14) or immediately eat one non-food object (such as dirt, napkins, or a small piece of jewelry) of the DM's choice.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Pica",
        "tint": null,
        "transfer": false,
        "statuses": ["Pica"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
    },
    pierce: {
        "changes": [],
        "description": "<p><b>Pierce!</b> Roll on the minor injury chart, and roll on the major injury chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "effect.delete();"
                }
            }
        },
        "name": "Pierce",
        "tint": null,
        "transfer": false,
        "statuses": ["Pierce"],
        "icon": "icons/skills/melee/strike-sword-dagger-runes-red.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Poisoned 2",
        "transfer": false,
        "statuses": [
            "Poisoned 2",
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
        "img": "icons/magic/acid/dissolve-drip-droplet-smoke.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Poisoned 3",
        "transfer": false,
        "statuses": [
            "Poisoned 3",
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
        "img": "icons/magic/acid/dissolve-drip-droplet-smoke.webp"
    },
    punctured: {
        "changes": [],
        "description": "<p><b>Punctured!</b> Roll on the minor injury chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "effect.delete();"
                }
            }
        },
        "name": "Punctured",
        "tint": null,
        "transfer": false,
        "statuses": ["Punctured"],
        "icon": "icons/skills/melee/strike-sword-dagger-runes-red.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Punished",
        "transfer": false,
        "statuses": [
            "Punished"
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
        "img": "icons/magic/light/beam-rays-orange-large.webp"
    },
    psychologicalbreak: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.skill.prc",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.skill.inv",
                "mode": 0,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p>Psychological break! Roll on the Insanity chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Psychological Break",
        "tint": null,
        "transfer": false,
        "statuses": ["Psychological Break"],
        "icon": "icons/magic/perception/hand-eye-fire-blue.webp"
    },
    psychologicalfracture: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.skill.prc",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.skill.inv",
                "mode": 0,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p>Psychological fracture! Roll on the Insanity chart with disadvantage.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Psychological Fracture",
        "tint": null,
        "transfer": false,
        "statuses": ["Psychological Fracture"],
        "icon": "icons/magic/perception/hand-eye-fire-blue.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Rightgeous Mark",
        "transfer": false,
        "statuses": [
            "Rightgeous Mark"
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
        "img": "icons/magic/light/beam-rays-orange-large.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd"
                ]
            }
        },
        "name": "Ringing Blow",
        "transfer": false,
        "statuses": [
            "Ringing Blow",
            "stunned",
            "incapacitated",
            "deafened"
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
        "img": "icons/skills/wounds/anatomy-bone-joint.webp"
    },
    reactionused: {
        "name": "Reaction used",
        "changes": [
            {
                "key": "flags.midi-qol.actions.reaction",
                "mode": 2,
                "value": "true",
                "priority": 20
            }
        ],
        "img": "icons/magic/lightning/bolt-strike-beam-pink.webp",
        "flags": {
            "dae": {
                "specialDuration": [
                    "turnEnd",
                    "combatEnd",
                    "shortRest"
                ],
                "disableCondition": "",
                "disableIncapacitated": false,
                "stackable": "noneName",
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none"
            }
        },
        "statuses": [],
        "type": "base",
        "system": {},
        "disabled": false,
        "duration": {
            "startTime": null,
            "seconds": null,
            "combat": null,
            "rounds": null,
            "turns": null,
            "startRound": null,
            "startTurn": null
        },
        "description": "",
        "transfer": true,
        "_stats": {
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1727869542084,
            "modifiedTime": 1727871309252,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        }
    },
    retrogradeAmnesia: {
        "changes": [],
        "description": "<p>You forget everything about your personal life prior to the moment you received this insanity.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Retrograde Amnesia",
        "tint": null,
        "transfer": false,
        "statuses": ["Retrograde Amnesia"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Rot",
        "transfer": false,
        "statuses": [
            "Rot"
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
        "img": "icons/magic/death/hand-undead-skeleton-fire-pink.webp"
    },
    runthrough: {
        "changes": [],
        "description": "<p><b>Run through!</b> Roll on the major injury chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "effect.delete();"
                }
            }
        },
        "name": "Run Through",
        "tint": null,
        "transfer": false,
        "statuses": ["Run Through"],
        "icon": "icons/skills/melee/strike-sword-dagger-runes-red.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Scarred",
        "transfer": false,
        "statuses": [
            "Scarred"
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
        "img": "modules/critical-hits-revisited/assets/img/acid/disfigured.webp"
    },
    sentreeling: {
        "name": "Sent Reeling",
        "transfer": true,
        "flags": {
            "chris-premades": {
                "effectInterface": {
                    "sort": 58
                }
            },
            "dae": {
                "disableCondition": "",
                "disableIncapacitated": false,
                "stackable": "noneName",
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "core": {
                "overlay": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "await game.critsRevisited.effectMacros.sentReeling(effect);"
                }
            },
            "exportSource": {
                "world": "die-vergessenen-reiche-reworked",
                "system": "dnd5e",
                "coreVersion": "12.331",
                "systemVersion": "3.3.1"
            }
        },
        "img": "icons/magic/control/silhouette-fall-slip-prone.webp",
        "type": "base",
        "system": {},
        "changes": [],
        "disabled": false,
        "duration": {
            "startTime": null,
            "seconds": null,
            "combat": null,
            "rounds": null,
            "turns": null,
            "startRound": null,
            "startTurn": null
        },
        "description": "<b>Sent reeling!</b>  Push the creature up to 15 feet in any direction.",
        "statuses": [],
        "_stats": {
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1727111202638,
            "modifiedTime": 1727111418772,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        }
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "startEveryTurn",
                "specialDuration": []
            }
        },
        "name": "Severe Bleeding",
        "transfer": false,
        "statuses": [
            "Severe Bleeding"
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
        "img": "icons/skills/wounds/blood-spurt-spray-red.webp"
    },
    severed: {
        "changes": [],
        "description": "<p><b>Severed!</b> Roll on the Minor Injury chart. If the creature is wearing light or no armor roll on the Major Injury chart instead.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "effect.delete();"
                }
            }
        },
        "name": "Severed",
        "tint": null,
        "transfer": false,
        "statuses": ["Severed"],
        "icon": "icons/skills/melee/strike-sword-blood-red.webp"
    },
    severlywounded: {
        "changes": [],
        "description": "<p></p><p>The creature’s maximum hit points are reduced by an amount equivalent to the damage dealt by the attack.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "effectmacro": {
                "onCreate": {
                    "script": "await game.critsRevisited.effectMacros.maxHPReduction(effect, token, 'full');"
                }
            },
        },
        "name": "Severly Wounded",
        "transfer": false,
        "statuses": [
            "Severly Wounded"
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
        "img": "icons/skills/wounds/bone-broken-marrow-red.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd"
                ]
            }
        },
        "name": "Sickened",
        "transfer": false,
        "statuses": [
            "Sickened"
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
        "img": "icons/magic/acid/dissolve-drip-droplet-smoke.webp"
    },
    sidestep: {
        "name": "Sidestep",
        "transfer": true,
        "flags": {
            "dae": {
                "disableCondition": "",
                "disableIncapacitated": false,
                "stackable": "noneName",
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            },
            "core": {
                "overlay": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "await game.critsRevisited.effectMacros.sidestep(effect, token, actor);"
                }
            },
            "exportSource": {
                "world": "die-vergessenen-reiche-reworked",
                "system": "dnd5e",
                "coreVersion": "12.331",
                "systemVersion": "3.3.1"
            }
        },
        "img": "icons/magic/control/silhouette-fall-slip-prone.webp",
        "type": "base",
        "system": {},
        "changes": [],
        "disabled": false,
        "duration": {
            "startTime": null,
            "seconds": null,
            "combat": null,
            "rounds": null,
            "turns": null,
            "startRound": null,
            "startTurn": null
        },
        "description": "<p>Your enemy sidesteps your attack and uses your momentum to move you 10 feet in a direction of their choice.</p>",
        "statuses": [],
        "_stats": {
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1727111202638,
            "modifiedTime": 1727111418772,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        }
    },
    smashed: {
        "changes": [],
        "description": "<p></p><p>- A stunned creature is incapacitated (see the condition), can't move, and can speak only falteringly.<br />- The creature automatically fails Strength and Dexterity saving throws.<br />- Attack rolls against the creature have advantage.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": 1,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEndSource"
                ]
            }
        },
        "name": "Smashed",
        "transfer": false,
        "statuses": [
            "Smashed",
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
        "img": "icons/skills/melee/strike-hammer-destructive-orange.webp"
    },
    sparksfly: {
        "changes": [],
        "description": "<p>A random creature within 15 ft. of the victim is chosen. That creature must succeed on a Dexterity saving throw (DC 14) or take half as much damage as the result for your critical hit.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "await game.critsRevisited.effectMacros.sparksFly(effect, token, 14);"
                }
            }
        },
        "name": "Sparks Fly",
        "tint": null,
        "transfer": false,
        "statuses": ["Sparks Fly"],
        "icon": "icons/magic/lightning/bolt-strike-beam-pink.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": []
            }
        },
        "name": "Spellbound",
        "transfer": false,
        "statuses": [
            "Spellbound"
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
        "img": "icons/magic/control/silhouette-hold-beam-blue.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd"
                ]
            }
        },
        "name": "Spellstruck",
        "transfer": false,
        "statuses": [
            "Spellstruck"
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
        "img": "icons/magic/control/silhouette-hold-beam-blue.webp"
    },
    spoiled: {
        "changes": [],
        "description": "<p></p><p>The creature cannot regain hit points until the end of its next turn.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnEnd",
                    "longRest",
                    "shortRest"
                ]
            }
        },
        "name": "Spoiled",
        "transfer": false,
        "statuses": [
            "Spoiled"
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
        "img": "icons/magic/death/hand-undead-skeleton-fire-pink.webp"
    },
    stunned1 : {
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
        "description": "<p></p><p>The creature is stunned until the start of its next turn A stunned creature is incapacitated (see the condition), can't move, and can speak only falteringly. The creature automatically fails Strength and Dexterity saving throws. Attack rolls against the creature have advantage.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": null,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnStart"
                ]
            }
        },
        "name": "Stunned 1",
        "transfer": false,
        "statuses": [
            "Stunned 1",
            "stunned",
            "incapacitated"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.Cr5pq26SOZO0ybrs",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333032309,
            "modifiedTime": 1724333032309,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "modules/dfreds-convenient-effects/images/stunned.svg"
    },
    stunned2 : {
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
        "description": "<p></p><p>The creature is stunned until the end of its next round. A stunned creature is incapacitated (see the condition), can't move, and can speak only falteringly. The creature automatically fails Strength and Dexterity saving throws. Attack rolls against the creature have advantage.</p><p></p>",
        "disabled": false,
        "duration": {
            "rounds": 1,
            "seconds": null,
            "turns": null,
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "None"
                ]
            }
        },
        "name": "Stunned 2",
        "transfer": false,
        "statuses": [
            "Stunned 2",
            "stunned",
            "incapacitated"
        ],
        "_stats": {
            "compendiumSource": "Item.KScMomjnVjU3eBKs.ActiveEffect.Dfyw5eUc20MPzYUw",
            "duplicateSource": null,
            "coreVersion": "12.331",
            "systemId": "dnd5e",
            "systemVersion": "3.3.1",
            "createdTime": 1724333033226,
            "modifiedTime": 1724333033226,
            "lastModifiedBy": "byW8uRmdCnHPlu8H"
        },
        "img": "modules/dfreds-convenient-effects/images/stunned.svg"
    },
    suicidal: {
        "changes": [],
        "description": "<p>After each long rest you must pass a Wisdom saving throw (DC 12) or make an attempt to end your own life.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Suicidal",
        "tint": null,
        "transfer": false,
        "statuses": ["Suicidal"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
    },
    swisscheese: {
        "changes": [],
        "description": "<p><<b>Swiss cheese!</b> Roll twice on the minor injury chart and use the lower result.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            },
            "effectmacro": {
                "onCreate": {
                    "script": "effect.delete();"
                }
            }
        },
        "name": "Swiss Cheese",
        "tint": null,
        "transfer": false,
        "statuses": ["Swiss Cheese"],
        "icon": "icons/skills/melee/strike-sword-dagger-runes-red.webp"
    },
    synesthesia: {
        "changes": [
            {
                "key": "flags.midi-qol.disadvantage.skill.prc",
                "mode": 0,
                "value": "1",
                "priority": 20
            },
            {
                "key": "flags.midi-qol.disadvantage.skill.inv",
                "mode": 0,
                "value": "1",
                "priority": 20
            }
        ],
        "description": "<p>You can hear colors, smell sounds, or taste textures. Regardless of the specific manifestation, you have disadvantage on all Perception and Investigation skill checks.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Synesthesia",
        "tint": null,
        "transfer": false,
        "statuses": ["Synesthesia"],
        "icon": "icons/skills/wounds/injury-face-impact-orange.webp"
    },
    systemfailure: {
        "changes": [],
        "description": "<p>System failure! Roll on the major injury chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "System Failure",
        "tint": null,
        "transfer": false,
        "statuses": ["System Failure"],
        "icon": "icons/magic/acid/dissolve-drip-droplet-smoke.webp"
    },
    takeaseat: {
        "changes": [],
        "description": "<p><b>Take a seat!</b> The creature is knocked prone.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Take a Seat",
        "tint": null,
        "transfer": false,
        "statuses": ["Take a Seat"],
        "icon": "icons/skills/melee/strike-hammer-destructive-orange.webp"
    },
    vitriolic: {
        "changes": [],
        "description": "<p>Vitriolic! Roll on the major injury chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Vitrolic",
        "tint": null,
        "transfer": false,
        "statuses": ["Vitriolic"],
        "icon": "icons/magic/acid/dissolve-arm-flesh.webp"
    },
    wallofsound: {
        "changes": [],
        "description": "<p>Wall of sound! Roll on the major injury chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Wall of Sound",
        "tint": null,
        "transfer": false,
        "statuses": ["Wall of Sound"],
        "icon": "icons/magic/light/beam-rays-orange-large.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "turnStart",
                    "isAttacked"
                ]
            }
        },
        "name": "Weak Point",
        "transfer": false,
        "statuses": [
            "Weak Point"
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
        "img": "icons/skills/melee/sword-damaged-broken-glow-red.webp"
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
            "startTime": null,
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
                "showIcon": true,
                "durationExpression": "",
                "macroRepeat": "none",
                "specialDuration": [
                    "1Attack"
                ]
            }
        },
        "name": "Wear and Tear",
        "transfer": false,
        "statuses": [
            "Wear and Tear"
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
        "img": "icons/skills/melee/sword-damaged-broken-glow-red.webp"
    },
    wrathofthegods: {
        "changes": [],
        "description": "Wrath of the gods! Roll on the major injury chart.</p>",
        "disabled": false,
        "duration": {
            "seconds": null
        },
        "flags": {
            "dae": {
                "stackable": "none",
                "macroRepeat": "none",
                "specialDuration": [],
                "transfer": false
            }
        },
        "name": "Wrath of the Gods",
        "tint": null,
        "transfer": false,
        "statuses": ["Wrath of the Gods"],
        "icon": "icons/magic/light/beam-rays-orange-large.webp"
    },
}
