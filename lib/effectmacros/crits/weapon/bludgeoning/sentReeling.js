import {mainScriptUtils} from "../../../../utils/mainScriptUtils.js";
import {workflowCache} from "../../../../utils/workflowCache.js";

export async function sentReeling(effect) {
    const CARDINAL_DIRECTIONS = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    const DIRECTION_OPTIONS = CARDINAL_DIRECTIONS.map(dir => `<option value="${dir}">${dir}</option>`).join('');
    let workflow = await workflowCache.getWorkflow();
    let actor = await fromUuid(workflow.actor.uuid);
    let token = effect.token;
    mainScriptUtils.debug('sentReeling - actor: ', actor);
    mainScriptUtils.debug('sentReeling - token: ', token);
    mainScriptUtils.debug('sentReeling - effect: ', effect);
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
    let browserUser = MidiQOL.playerForActor(actor); //leave as-is
    mainScriptUtils.debug('Initial browserUser: ', browserUser);
    if (!browserUser.active) {
        browserUser = game.users?.activeGM;
    }
    if (MidiQOL.safeGetGameSetting('gambits-premades', 'Mirror 3rd Party Dialog for GMs') && browserUser.id !== game.users?.activeGM.id) {
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

        let gmDialogArgs = {
            dialogTitle: dialogTitleGM,
            dialogContent,
            dialogId,
            initialTimeLeft,
            validTokenPrimaryUuid: actorToken.uuid,
            source: "gm",
            type: "multiDialog"
        };
        result = await game.gps.socket.executeAsGM("handleDialogPromises", userDialogArgs, gmDialogArgs);
    } else {
        result = await game.gps.socket.executeAsUser("process3rdPartyReactionDialog", browserUser.id, {
            dialogTitle: dialogTitlePrimary,
            dialogContent,
            dialogId,
            initialTimeLeft,
            validTokenPrimaryUuid: actorToken.uuid,
            source: browserUser.isGM ? "gm" : "user",
            type: "singleDialog"
        });
    }
    mainScriptUtils.debug(`Sent Reeling result:`, result);
    const { userDecision, allyTokenUuid, source, type } = result;

    if (!userDecision) {
        if (source === "user" && type === "multiDialog") await game.gps.socket.executeAsGM("closeDialogById", {dialogId: dialogId}); //These handle Mirror Dialog stuff, leave it!
        if (source === "gm" && type === "multiDialog") await game.gps.socket.executeAsUser("closeDialogById", browserUser.id, {dialogId: dialogId}); //These handle Mirror Dialog stuff, leave it!
        mainScriptUtils.debug("No user selection! Aborting script.");
        return; //Return if user selected no or timed out, etc
    } else if (userDecision) {
        // Sweet success, do whatever you want!
        const selectedDirection = allyTokenUuid;
        mainScriptUtils.debug(`User selected direction:`, selectedDirection);
        const distance = 15; // 15 feet as mentioned in the dialog text
        const movedDistance = await game.gps.socket.executeAsGM("moveTokenByCardinal", {
            targetUuid: token.document.uuid,
            distance: 15,
            direction: selectedDirection
        });
        mainScriptUtils.debug(`Token moved`, movedDistance);
        return movedDistance;
    }
}