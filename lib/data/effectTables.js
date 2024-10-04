export const effectTables = {
    Acid: {
        '2,3' : 'scarred',
        '7,8' : 'disfigured',
        '12,13' : 'armordamaged1',
        '14,16' : 'disfigured',
        '17,18' : 'armordamaged2',
        '19,19' : 'vitriolic',
        '20,20' : ['acidbath']
    },
    Bludgeoning: {
        '1,3' : 'offbalance',
        '7,8' : 'sentreeling',
        '12,13' : ['takeaseat','prone'],
        '14,16' : ['sentreeling','prone'],
        '17,18' : 'grievousinjury',
        '19,19': 'crushed',
        '20,20' : 'smashed'
    },
    Cold: {
        '2,3' : 'chilled',
        '7,8' : 'frost',
        '12,13' : 'freezing',
        '14,16' : 'freezing',
        '17,18' : 'freezing',
        '19,19' : 'glacial',
        '20,20' : 'frozen'
    },
    Fire: {
        '2,3' : 'heatwave',
        '7,8' : 'onfire',
        '12,13' : 'ablaze',
        '14,16' : 'charred',
        '17,18' : 'ablaze',
        '19,19': 'combustion',
        '20,20' : 'inferno'
    },
    Force: {
        '2,3' : 'spellstruck',
        '7,8' : 'spellstruck',
        '12,13' : 'spellbound',
        '14,16' : 'mysticmagnet',
        '17,18' : 'enscorcelled',
        '19,19' : 'arcaneinjury',
        '20,20' : 'magicallymauled'
    },
    MeleeCriticalFumbles: {
        '1,1' : 'exposed',
        '2,3' : 'dogded',
        '4,5' : 'clusterofbodies',
        '6,7' : 'grappled',
        '8,10' : 'prone',
        '11,13' : 'disarmed',
        '14,15' : 'weakpoint',
        '16,17' : 'wearandtear',
        '18,19': 'sentreeling',
    },
    SpellCriticalFumbles: {
        '1,1' : 'exposed',
        '6,7' : 'grappled',
        '8,10' : 'prone',
        '14,15' : 'weakpoint',
        '16,17' : 'wearandtear'
    },
    RangedCriticalFumbles: {
        '1,1' : 'exposed',
        '6,7' : 'grappled',
        '8,10' : 'prone',
        '14,15' : 'weakpoint',
        '16,17' : 'wearandtear'
    },
    Insanity: {
        '1,1' : 'synesthesia',
        '2,2' : 'kleptomania',
        '3,3' : 'paranoia',
        '4,4' : 'obsession',
        '5,5' : 'addiction',
        '6,6' : 'oddthinking',
        '7,7' : 'narcissism',
        '8,8' : 'delusional',
        '9,9' : 'pica',
        '10,10' : 'retrogradeamnesia',
        '11,11' : 'overwhelmed',
        '12,12' : 'anterogradeamnesia',
        '13,13' : 'dependence',
        '14,14' : 'anxious',
        '15,15' : 'mute',
        '16,16' : 'narcolepsy',
        '17,17' : 'insomnia',
        '18,18' : 'homicidal',
        '19,19' : 'suicidal',
        '20,20' : 'catatonia'
    },
    Lightning: {
        '2,3' : 'reactionused',
        '7,8' : 'sparksfly',
        '12,13' : 'electricarc',
        '14,16' : 'fulminate',
        '17,18' : 'litup',
        '19,19' : 'electrocuted',
        '20,20' : 'lightningrod'
    },
    MinorInjuries: {
        '1,3' : 'injuredleg',
        '4,8' : 'injuredarm',
        '9,11' : 'multipleinjuries',
        '12,16' : 'badlybeaten',
        '17,19' : 'ringingblow',
        '20,20' : 'unconscious'
    },
    Necrotic: {
        '2,3' : 'spoiled',
        '7,8' : 'festered',
        '12,13' : 'festered',
        '14,16' : 'rot',
        '17,18' : 'festered',
        '19,19' : 'atrophy',
        '20,20' : ['festered', 'rot']
    },
    MajorInjuries: {
        '1,3' : 'crippledleg',
        '4,8' : 'crippledarm',
        '9,11' : 'severlywounded',
        '12,16' : 'edgeofdeath',
        '17,19' : 'blinded',
        '20,20' : 'decapitated' // DECAPITATED USES EFFECT MACRO
    },
    Piercing: {
        '12,13' : 'swisscheese',
        '14,16' : 'punctured',
        '17,18' : 'cruelprick',
        '19,19' : 'runthrough',
        '20,20' : 'pierce'
    },
    Poison: {
        '2,3' : 'nauseous',
        '7,8' : 'sickened',
        '12,13' : 'poisoned2',
        '14,16' : 'poisoned3',
        '17,18' : 'poisoned2',
        '19,19': 'systemfailure',
        '20,20' : 'poisoned3'
    },
    Psychic: {
        '2,3' : 'disoriented',
        '7,8' : 'confused',
        '12,13' : 'dominated',
        '14,16': 'psychologicalfracture',
        '17,18': 'psychologicalbreak',
        '19,19': 'madness',
        '20,20': 'mindmelt'
    },
    Radiant: {
        '2,3' : 'dazzled',
        '7,8' : 'disheartened',
        '12,13' : 'disheartened',
        '14,16' : 'holyterror',
        '17,18' : 'rightgeousmark',
        '19,19': 'wrathofthegods',
        '20,20' : 'punished'
    },
    Slashing: {
        '1,3' : 'bleedingcut',
        '7,8' : 'minorbleeding',
        '12,13' : 'mediumbleeding',
        '14,16' : 'majorbleeding',
        '17,18' : 'severed',
        '19,19' : 'dissected',
        '20,20' : 'severebleeding'
    },
    Thunder: {
        '2,3' : 'deafened',
        '7,8' : 'deafened2',
        '12,13' : ['deafened2','stunned1'],
        '14,16' : 'deafened',
        '17,18' : ['deafened3', 'stunned'],
        '19,19': 'wallofsound',
        '20,20' : ['deafened', 'stunned2']
    }
}