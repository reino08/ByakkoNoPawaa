import "./index.css";
import { ui_url } from "../../../../config.json";
import { config } from "../../../config.ts";
import { onCanvas } from "../../../utils.ts";
export { };

onCanvas(canvas => {
    GM_addElement(
        canvas.parentElement
            .parentElement
            .parentElement,
        "iframe",
        {
            id: "wfp-ui-root",
            src: ui_url + "#" + encodeURI(JSON.stringify(config)),
        }
    );
});

window.addEventListener("message", event => {
    if (!Array.isArray(event.data) || event.data.length < 1) return;

    const [command, ...args] = event.data;
    if (command == "set") {
        const [key, value] = args;
        config[key] = value;
    } else if (command == "get-all") {
        event.source.postMessage(["set-all", JSON.stringify(config)]);
    } else console.warn("Unknown command", command);
});
