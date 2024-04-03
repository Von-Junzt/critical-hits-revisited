const linkedEffects = {
    Acid: {
        '1,1' : 'Scarred',
        '2,3' : 'Disfigured',
        '7,8' : 'Disfigured',
        '12,13' : 'Armor damaged 1',
        '14,16' : 'Disfigured',
        '17,18' : 'Armor damaged 2',
        '20,20' : ['Acid Bath', 'Disfigured'] // ACID BATH USES EFFECT MACRO
    },
    Bludgeoning: {
        '2,3' : 'Off Balance',
        '12,13' : 'Prone',
        '14,16' : 'Prone',
        '20,20' : 'Smashed'
    },
    Cold: {
        '2,3' : 'Chilled',
        '7,8' : 'Frost',
        '12,13' : 'Freezing',
        '14,16' : 'Freezing',
        '17,18' : 'Freezing',
        '20,20' : 'Frozen'
    },
    Fire: {
        '2,3' : 'Heat Wave',
        '7,8' : 'On Fire',
        '12,13' : 'Ablaze',
        '14,16' : 'Charred',
        '17,18' : 'Ablaze',
        '20,20' : 'Inferno'
    },
    Force: {
        '2,3' : 'Spellstruck',
        '7,8' : 'Spellstruck',
        '12,13' : 'Spellbound',
        '14,16' : 'Mystic Magnet',
        '17,18' : 'Enscorcelled',
        '20,20' : 'Magically Mauled'
    },
    Fumble: {
        '1,1' : 'Exposed',
        '6,7' : 'Grappled',
        '8,10' : 'Prone',
        '14,15' : 'Weak Point',
        '16,17' : 'Wear and Tear'
    },
    MinorInjuries: {
        '1,3' : 'Injured Leg',
        '4,8' : 'Injured Arm',
        '9,11' : 'Multiple Injuries',
        '12,16' : 'Badly Beaten',
        '17,19' : 'Ringing Blow',
        '20,20' : 'Dead'
    },
    MajorInjuries: {
        '1,3' : 'Crippled Leg',
        '4,8' : 'Crippled Arm',
        '9,11' : 'Severly Wounded',
        '12,16' : 'Edge of Death',
        '17,19' : 'Blinded',
        '20,20' : 'Unconscious'
    },
    Piercing: {},
    Radiant: {
        '2,3' : 'Dazzled',
        '7,8' : 'Disheartened',
        '12,13' : 'Disheartened',
        '14,16' : 'Holy Terror',
        '17,18' : 'Righteous Mark',
        '20,20' : 'Punished'
    },
    Slashing: {
        '2,3' : 'Open Cut',
        '7,8' : 'Minor Bleeding',
        '12,13' : 'Medium Bleeding',
        '14,16' : 'Major Bleeding',
        '20,20' : 'Severe Bleeding'
    }
}