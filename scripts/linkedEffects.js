const linkedEffects = {
    Acid: {
        '1,1' : 'Prone',
        '2,3' : ['Prone', 'Severe Bleeding']
    },
    Bludgeoning: {
        '2,3' : 'Off Balance',
        '12,13' : 'Prone',
        '14,16' : 'Prone',
        '20,20' : 'Smashed'
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
        '12,16' : 'Badly Beaten',
        '17,19' : 'Ringing Blow',
        '20,20' : 'Dead'
    },
    MajorInjuries: {
        '1,3' : 'Crippled Leg',
        '4,8' : 'Crippled Arm',
        '12,16' : 'Edge of Death',
        '17,19' : 'Blinded',
        '20,20' : 'Unconscious'
    },
    Piercing: {},
    Slashing: {
        '2,3' : 'Open Cut',
        '7,8' : 'Minor Bleeding',
        '12,13' : 'Medium Bleeding',
        '14,16' : 'Major Bleeding',
        '20,20' : 'Severe Bleeding'
    }
}