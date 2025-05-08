import "./index.css";
import { ui_url } from "../../../config.json";
import { settings } from "../../settings";
import { onCanvas } from "../../utils";
import * as macros from "../macros/index";
export { };

onCanvas(canvas => {
    GM_addElement(
        canvas.parentElement
            .parentElement
            .parentElement,
        "iframe",
        {
            id: "wfp-ui-root",
            src: ui_url + "#" + encodeURI(JSON.stringify(settings)),
        }
    );
});

window.addEventListener("message", event => {
    if (!Array.isArray(event.data) || event.data.length < 1) return;

    const [command, ...args] = event.data;
    if (command == "set") {
        const [key, value] = args;
        settings[key] = value;
    } else if (command == "macro") {
        const [key, state] = args;
        macros[key][state ? "start" : "stop"]();
    } else console.warn("Unknown command", command);
});
