import {acidBath} from './crits/magic/acid/acidbath.js'
import {clusterOfBodies} from "./fumbles/melee/clusterOfBodies.js";
import {decapitated} from './injuries/major/decapitated.js';
import {disarmed} from './fumbles/melee/disarmed.js';
import {litUp} from "./crits/magic/lightning/litUp.js";
import {misstep} from './fumbles/melee/misstep.js';
import {sentReeling} from './crits/weapon/bludgeoning/sentReeling.js';
import {sidestep} from "./fumbles/melee/sidestep.js";
import {sparksFly} from './crits/magic/lightning/sparksFly.js';
import {mainScriptUtils} from "../utils/mainScriptUtils.js";
import {workflowCache} from "../utils/workflowCache.js";

export const effectMacros = {
    acidBath,
    clusterOfBodies,
    decapitated,
    disarmed,
    litUp,
    misstep,
    sentReeling,
    sidestep,
    sparksFly,

    // after the imports, generic functions for use in the effects
    maxHPReduction: async function  (effect, targetToken, mode) {
        const tokenUuid = targetToken?.document?.uuid;
        const workflow = await workflowCache.getWorkflow();
        let targetDamage = 0;
        if(mode === 'full') {
            targetDamage = workflow.damageList.find(entry => entry.targetUuid === tokenUuid).healingAdjustedTotalDamage || 0;
            mainScriptUtils.debug('maxHPReduction - applying full damage reduction to target.');
        } else if( mode === 'half') {
            targetDamage = Math.floor((workflow.damageList?.find(entry => entry.targetUuid === tokenUuid)?.healingAdjustedTotalDamage || 0) / 2) || 0;
            mainScriptUtils.debug('maxHPReduction - applying half damage reduction to target.');
        }
        await effect.update({
            changes: [{
                key: 'system.attributes.hp.tempmax',
                mode: 2,
                value: `-${targetDamage}`,
                priority: 20
            }]
        });
        const debugObject = {
            effect: effect,
            targetToken: targetToken,
            targetDamage: targetDamage,
            mode: mode
        }
        mainScriptUtils.debug('maxHPReduction - debugObject: ', debugObject);
        return effect;
    },
};