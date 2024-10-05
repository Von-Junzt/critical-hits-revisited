import {acidBath} from './crits/magic/acid/acidbath.js'
import {clusterOfBodies} from "./fumbles/melee/clusterOfBodies.js";
import {decapitated} from './injuries/major/decapitated.js';
import {misstep} from './fumbles/melee/misstep.js';
import {festered} from './crits/magic/necrotic/festered.js';
import {litUp} from "./crits/magic/lightning/litUp.js";
import {sentReeling} from './crits/weapon/bludgeoning/sentReeling.js';
import {sparksFly} from './crits/magic/lightning/sparksFly.js';

export const effectMacros = {
    acidBath,
    clusterofbodies: clusterOfBodies,
    decapitated,
    festered,
    litUp,
    misstep,
    sentReeling,
    sparksFly
};
