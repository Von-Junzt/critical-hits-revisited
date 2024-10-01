// This script will allways be run on the gm, because it's called in an effect macro
import {mainScriptUtils} from "../../../../utils/mainScriptUtils.js";
import {workflowCache} from "../../../../utils/workflowCache.js";

export async function sentReeling(effect) {
    const CARDINAL_DIRECTIONS = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    const DIRECTION_OPTIONS = CARDINAL_DIRECTIONS.map(dir => `<option value="${dir}">${dir}</option>`).join('');
    let workflow = await workflowCache.getWorkflow();
    let actor = await fromUuid(workflow.actor.uuid);
    let debugObject = {
        actor: actor,
        token: effect.parent.token,
        effect: effect,
        workflow: workflow,
    };
    mainScriptUtils.debug('sentReeling - actor: ', debugObject);
    let actorToken = game.scenes.active.tokens.find(token => token.actor?.id === actor.id);
    let dialogTitlePrimary = `Sent Reeling`;
    let dialogTitleGM = `Waiting for ${actor.name}'s selection`;
    let initialTimeLeft = 30;
    let dialogId = "sentReelingMacro";
    let dialogContent = `
        <div class="gps-dialog-container">
            <div class="gps-dialog-section">
                <div class="gps-dialog-content">
                    <div>
                        <div class="gps-dialog-flex">
                            <p class="gps-dialog-paragraph">Choose direction:</p>
                                <select id="ally-token" name="direction" style="width: 100%; margin-top: 10px;">
                                    <option value="">Select a direction</option>
                                    ${DIRECTION_OPTIONS}
                                </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gps-dialog-button-container">
                <button id="pauseButton_${dialogId}" type="button" class="gps-dialog-button">
                    <i class="fas fa-pause" id="pauseIcon_${dialogId}" style="margin-right: 5px;"></i>Pause
                </button>
            </div>
        </div>
    `;
    let result;
    let browserUser = MidiQOL.playerForActor(actor);
    if (!browserUser.active) {
        browserUser = game.users?.activeGM;
    }
    const isActiveGM = game.user.id === game.users?.activeGM.id;
    mainScriptUtils.debug('sentReeling - isActiveGM: ', isActiveGM);
    let gmDialogArgs = {
        dialogTitle: dialogTitleGM,
        dialogContent,
        dialogId,
        initialTimeLeft,
        validTokenPrimaryUuid: actorToken.uuid,
        source: "gm",
        type: "multiDialog"
    };
    let userDialogArgs = {
        dialogTitle: dialogTitlePrimary,
        dialogContent,
        dialogId,
        initialTimeLeft,
        validTokenPrimaryUuid: actorToken.uuid,
        source: "user",
        type: "multiDialog",
        browserUser: browserUser.id
    };
    if(game.users.filter(u => u.active).length > 1 &&  game.users.activeGM.id !== undefined && browserUser.id !== game.users?.activeGM.id) {
        mainScriptUtils.debug('At least one user and active GM are both active');
        result = await game.gps.socket.executeAsGM("handleDialogPromises", { userDialogArgs, gmDialogArgs });
        await workflowCache.saveDialogResult(result);
    } else if (game.users.activeGM.id !== undefined) {
        mainScriptUtils.debug('No other user is not active, but GM is');
        result = await game.gps.socket.executeAsUser("process3rdPartyReactionDialog", browserUser.id, {
            dialogTitle:dialogTitlePrimary,
            dialogContent,
            dialogId,
            initialTimeLeft,
            validTokenPrimaryUuid: actorToken.uuid,
            source:browserUser.isGM ? "gm" : "user",
            type:"singleDialog"
        });
        // await workflowCache.saveDialogResult(result); This was implemented because of locality issues, but it's not needed anymore
    }
    // If the result is not defined, get it from the cache
    // (!result) ? result = workflowCache.getCachedDialogResult() : mainScriptUtils.debug('sentReeling - No need to import result', result);
    mainScriptUtils.debug('sentReeling - result: ', result);
    const { userDecision, allyTokenUuid, source, type } = result;
    if (!userDecision) {
        if (source === "user" && type === "multiDialog") await game.gps.socket.executeAsGM("closeDialogById", {dialogId: dialogId}); //These handle Mirror Dialog stuff, leave it!
        if (source === "gm" && type === "multiDialog") await game.gps.socket.executeAsUser("closeDialogById", browserUser.id, {dialogId: dialogId}); //These handle Mirror Dialog stuff, leave it!
        mainScriptUtils.debug("No user selection! Aborting script.");
        effect.delete();
        return; //Return if user selected no or timed out, etc
    } else if (userDecision) {
        // Sweet success, do whatever you want!
        const selectedDirection = allyTokenUuid;
        mainScriptUtils.debug(`User selected direction:`, selectedDirection);
        const movedDistance = await game.gps.socket.executeAsGM("moveTokenByCardinal", {
            targetUuid: effect.parent.token.uuid,
            distance: 15,
            direction: selectedDirection
        });
        mainScriptUtils.debug(`Token moved`, movedDistance);
        effect.delete();
        mainScriptUtils.debug('sentReeling - effect deleted');
        return movedDistance;
    }
}