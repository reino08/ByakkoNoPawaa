import "./index.css";
import { ui_url } from "../../../config.json";
import { settings } from "../../settings";
import { onCanvas } from "../../utils";
import * as macros from "../macros/index";

let ui: HTMLIFrameElement = null;
onCanvas(canvas => {
    ui = GM_addElement(
        canvas.parentElement
            .parentElement
            .parentElement,
        "iframe",
        {
            id: "wfp-ui-root",
            src: ui_url + "#" + encodeURI(JSON.stringify(settings)),
        }
    ) as HTMLIFrameElement;
});

export type Listener = (...data: any[]) => boolean;
export const listeners = new Set<Listener>();
listeners.add((...data) => {
    const [command, ...args] = data;
    if (command == "set") {
        const [key, value] = args;
        settings[key] = value;
    } else if (command == "macro") {
        const [key, state] = args;
        macros[key][state ? "start" : "stop"]();
    }
    return false;
});

window.addEventListener("message", event => {
    if (!Array.isArray(event.data) || !event.data.length)
        return;

    for (const listener of [...listeners])
        if (listener(...event.data))
            listeners.delete(listener);
});

export function send(...data: any[]) {
    ui.contentWindow.postMessage(data, "*");
}

export function subscribe(targetCommand: string, listener: Listener) {
    listeners.add((command, ...rest) => {
        if (command != targetCommand) return false;
        return listener(...rest);
    });
}

