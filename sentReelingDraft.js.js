export async function sentReeling(effect, token) {
	const CARDINAL_DIRECTIONS = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
	const DIRECTION_OPTIONS = CARDINAL_DIRECTIONS.map(dir =>`<option value="${dir}">${dir}</option>`).join('');
	let actorUuid = workflowCache.getWorkflowByUUID(token.document.uuid || token.uuid).actor.uuid;
	let actor = fromUuid(actorUuid);
	let dialogTitlePrimary = `Sent Reeling`;
	let dialogTitleGM = `Waiting for ${actor.name}'s selection`;
	let initialTimeLeft = 30;
	let dialogId = "sentReelingMacro";
    let dialogContent = `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 5px; background-color: transparent; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="flex-grow: 1; margin-right: 20px;">
            <p>You sent your enemy reeling. You can push him 15 feet in any direction. Please choose.</p>
			<select id="enemy-token" name="direction" style="width: 100%; margin-top: 10px;">
			<option value="">Select a direction</option>
			${DIRECTION_OPTIONS}
			</select>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: center; padding-left: 20px; border-left: 1px solid #ccc; text-align: center;">
            <p><b>Time Remaining</b></p>
            <p><span id="countdown" style="font-size: 16px; color: red;">${initialTimeLeft}</span> seconds</p>
            <button id="pauseButton_${dialogId}" type="button" class="gps-dialog-button">
			<i class="fas fa-pause" id="pauseIcon_${dialogId}" style="margin-right: 5px;"></i>Pause
            </button>
        </div>
    </div>
    `; //Build your dialog, note that the pauseButton button and countdown span work with my module, do not remove them or something bad may happen

    let result; //leave as-is
    let browserUser = MidiQOL.playerForActor(actor); //leave as-is
    if (!browserUser.active) {
        browserUser = game.users?.activeGM;
    }

    if (MidiQOL.safeGetGameSetting('gambits-premades', 'Mirror 3rd Party Dialog for GMs') && browserUser.id !== game.users?.activeGM.id) {
        let userDialogPromise = game.gps.socket.executeAsUser("process3rdPartyReactionDialog", browserUser.id, {
			dialogTitle:dialogTitlePrimary,
			dialogContent,
			dialogId,
			initialTimeLeft,
			validTokenPrimaryUuid:token.document.uuid,
			source: "user",
			type: "multiDialog"
		}); //If mirror dialog enabled, this is the users dialog
        let gmDialogPromise = game.gps.socket.executeAsGM("process3rdPartyReactionDialog", {
			dialogTitle:dialogTitleGM,
			dialogContent,
			dialogId,
			initialTimeLeft,
			validTokenPrimaryUuid:token.document.uuid,
			source: "gm", type: "multiDialog"
		}); //If mirror dialog enabled, this is the gms dialog
        result = await game.gps.socket.executeAsGM("handleDialogPromises", userDialogPromise, gmDialogPromise);
    } else {
        result = await game.gps.socket.executeAsUser("process3rdPartyReactionDialog", browserUser.id, {
			dialogTitle:dialogTitlePrimary,
			dialogContent,
			initialTimeLeft,
			validTokenPrimaryUuid:macroItem.uuid,
			source: browserUser.isGM ? "gm" : "user",
			type: "singleDialog"
		}); //Dialog if no Mirror Dialog enabled
    }

    const { userDecision, source, type, enemyTokenUuid } = result;
	const selectedDirection = enemyTokenUuid;

    if (!userDecision) {
        if(source === "user" && type === "multiDialog") await game.gps.socket.executeAsGM("closeDialogById", { dialogId: dialogId }); //These handle Mirror Dialog stuff, leave it!
        if(source === "gm" && type === "multiDialog") await game.gps.socket.executeAsUser("closeDialogById", browserUser.id, { dialogId: dialogId }); //These handle Mirror Dialog stuff, leave it!
        mainScriptUtils.debug("No user selection! Aborting script.");
		return; //Return if user selected no or timed out, etc
    }
    else if (userDecision) {
        // Sweet success, do whatever you want!
		mainScriptUtils.debug(`User selected direction:`, selectedDirection);
        const targetUuid = token.document.uuid; // Make sure 'target' is defined
        const distance = 15; // 15 feet as mentioned in the dialog text
        const movedDistance = await moveTokenByCardinal({ targetUuid, distance, direction: selectedDirection });
        mainScriptUtils.debug(`Token moved`, movedDistance);
		return movedDistance;
    }
}
