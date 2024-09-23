import {mainScriptUtils} from "../../../../utils/mainScriptUtils.js";

export async function sentReeling(token) {
    mainScriptUtils.debug('Token is sent reeling', token);
    const maxDistance = 15; // 15 feet push
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    const content = `
        <form>
            <div class="form-group">
                <label>Choose push direction:</label>
                <select id="pushDirection" name="pushDirection">
                    ${directions.map(dir => `<option value="${dir}">${dir}</option>`).join('')}
                </select>
            </div>
        </form>
    `;
    const direction = await new Promise(resolve => {
        new Dialog({
            title: "Push Direction",
            content: content,
            buttons: {
                push: {
                    label: "Push",
                    callback: html => resolve(html.find('[name="pushDirection"]').val())
                }
            }
        }).render(true);
    });
    // Move the target token using moveTokenByCardinal via game.gps.socket.executeAsGM
    const distanceMoved = await game.gps.socket.executeAsGM("moveTokenByCardinal", {
        targetUuid: token.document.uuid,
        distance: maxDistance,
        direction: direction
    });
    mainScriptUtils.debug(`Token moved number of feet:`, distanceMoved);
    return distanceMoved;
}