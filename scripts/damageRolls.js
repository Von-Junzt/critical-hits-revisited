// TODO: Implement optional damage roll tables for critical hits and fumbles
const damageRolls = {
    Bludgeoning: {
        '1,1': 'Scarred',
        '2,3': 'Disfigured',
        '7,8': 'Disfigured',
        '12,13': 'Armor damaged 1',
        '14,16': 'Disfigured',
        '17,18': 'Armor damaged 2',
        '20,20': ['Acid Bath', 'Disfigured'] // ACID BATH USES EFFECT MACRO
    }
}