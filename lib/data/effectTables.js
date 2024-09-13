export const effectTables = {
    Acid: {
        '1,1' : 'scarred',
        '2,3' : 'disfigured',
        '7,8' : 'disfigured',
        '12,13' : 'armordamaged1',
        '14,16' : 'disfigured',
        '17,18' : 'armordamaged2',
        '20,20' : ['acidbath', 'disfigured'] // ACID BATH USES EFFECT MACRO
    },
    Bludgeoning: {
        '1,3' : 'offbalance',
        '12,13' : 'prone',
        '14,16' : 'prone',
        '20,20' : 'smashed'
    },
    Cold: {
        '2,3' : 'chilled',
        '7,8' : 'frost',
        '12,13' : 'freezing',
        '14,16' : 'freezing',
        '17,18' : 'freezing',
        '20,20' : 'frozen'
    },
    Fire: {
        '2,3' : 'heatwave',
        '7,8' : 'onfire',
        '12,13' : 'ablaze',
        '14,16' : 'charred',
        '17,18' : 'ablaze',
        '20,20' : 'inferno'
    },
    Force: {
        '2,3' : 'spellstruck',
        '7,8' : 'spellstruck',
        '12,13' : 'spellbound',
        '14,16' : 'mysticmagnet',
        '17,18' : 'enscorcelled',
        '20,20' : 'magicallymauled'
    },
    CriticalFumbles: {
        '1,1' : 'exposed',
        '6,7' : 'grappled',
        '8,10' : 'prone',
        '14,15' : 'weakpoint',
        '16,17' : 'wearandtear'
    },
    Insanity: {
        '1' : 'synesthesia',
        '2' : 'kleptomania',
        '3' : 'paranoia',
        '4' : 'obsession',
        '5' : 'addiction',
        '6' : 'oddthinking',
        '7' : 'narcissism',
        '8' : 'delusional',
        '9' : 'pica',
        '10' : 'retrogradeamnesia',
        '11' : 'overwhelmed',
        '12' : 'anterogradeamnesia',
        '13' : 'dependence',
        '14' : 'anxious',
        '15' : 'mute',
        '16' : 'narcolepsy',
        '17' : 'insomnia',
        '18' : 'homicidal',
        '19' : 'suicidal',
        '20' : 'catatonia'
    },
    Lightning: {
        '2,3' : 'reaction used',
        '17,18' : 'reaction used'
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
    Piercing: {},
    Poison: {
        '2,3' : 'nauseous',
        '7,8' : 'sickened',
        '12,13' : 'poisoned2',
        '14,16' : 'poisoned3',
        '17,18' : 'poisoned2',
        '20,20' : 'poisoned3'
    },
    Psychic: {
        '2,3' : 'disoriented',
        '7,8' : 'confused',
        '12,13' : 'dominated',
    },
    Radiant: {
        '2,3' : 'dazzled',
        '7,8' : 'disheartened',
        '12,13' : 'disheartened',
        '14,16' : 'holyterror',
        '17,18' : 'rightgeousmark',
        '20,20' : 'punished'
    },
    Slashing: {
        '1,3' : 'bleedingcut',
        '7,8' : 'minorbleeding',
        '12,13' : 'mediumbleeding',
        '14,16' : 'majorbleeding',
        '20,20' : 'severebleeding'
    },
    Thunder: {
        '2,3' : 'deafened',
        '7,8' : 'deafened2',
        '12,13' : ['deafened2','stunned1'],
        '14,16' : 'deafened',
        '17,18' : ['deafened3', 'stunned'],
        '20,20' : ['deafened', 'stunned2']
    }
}