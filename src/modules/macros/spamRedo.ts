import { settings } from "../../settings";

let token: any;

export function start() {
    if (token)
        clearInterval(token);
    let flip = false;
    token = setInterval(() => {
        if (flip = !flip)
            document.body.dispatchEvent(new KeyboardEvent("keydown", {
                keyCode: 90
            }));
        else document.body.dispatchEvent(new KeyboardEvent("keydown", {
            keyCode: 89
        }));
    }, settings.redo_delay_ms);
}

export function stop() {
    clearInterval(token);
    token = undefined;
}
