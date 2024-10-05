// Your target catches you by the wrist and disarms you. Picking up your weapon (bonus action) will expose you to opportunity attacks.
import {workflowCache} from "../../../utils/workflowCache";
import {mainScriptUtils} from "../../../utils/mainScriptUtils";

export async function disarmed(effect, fumbleToken, fumbleActor) {
    const workflow = await workflowCache.getWorkflow();
    const weapon = fromUuid(workflow.itemUuid);
    let actor = await fromUuid(workflow.actor.uuid);
    let actorToken = await fromUuid(workflow.tokenUuid);
    let debugObject = {
        fumbleActor: fumbleActor,
        fumbleToken: fumbleToken,
        effect: effect,
        workflow: workflow,
        weapon: weapon
    };
    mainScriptUtils.debug('sentReeling - debugObject: ', debugObject);
    let dialogTitlePrimary = `Disarmed`;
    let dialogTitleGM = `Waiting for ${actor.name}'s selection`;
    let initialTimeLeft = 30;
    let dialogId = "disarmedMacro";
    let dialogContent = `
        <div class="gps-dialog-container">
            <div class="gps-dialog-section">
                <div class="gps-dialog-content">
                    <div>
                        <div class="gps-dialog-flex">
                            <p class="gps-dialog-paragraph">Do you want to pick up your weapon?</p>
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
    }
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
        mainScriptUtils.debug('sentReeling - userDecision: ', userDecision);
        effect.delete();
        mainScriptUtils.debug('sentReeling - effect deleted');
        return movedDistance;
    }
}