/**
 * This file imports all the effect macros and makes them available to game.critsRevisited.effectMacros
 */

import {acidBath} from './crits/magic/acid/acidbath.js'
import {clusterOfBodies} from "./fumbles/melee/clusterOfBodies.js";
import {decapitated} from './injuries/major/decapitated.js';
import {disarmed} from './fumbles/melee/disarmed.js';
import {litUp} from "./crits/magic/lightning/litUp.js";
import {maxHPReduction} from "./generic/maxHPReduction.js";
import {misstep} from './fumbles/melee/misstep.js';
import {sentReeling} from './crits/weapon/bludgeoning/sentReeling.js';
import {sidestep} from "./fumbles/melee/sidestep.js";
import {sparksFly} from './crits/magic/lightning/sparksFly.js';

export const effectMacros = {
    acidBath,
    clusterOfBodies,
    decapitated,
    disarmed,
    litUp,
    maxHPReduction,
    misstep,
    sentReeling,
    sidestep,
    sparksFly
};