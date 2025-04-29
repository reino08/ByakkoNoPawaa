import type { Config } from "../src/config";
export let config: Config;
export const onConfigChanged: (() => void)[] = [];

window.addEventListener("message", event => {
    if (!Array.isArray(event.data) || event.data.length < 1) return;
    let [command, ...rest] = event.data;
    if (command != "set-all") return console.warn("Unknown command", command);

    config = JSON.parse(rest[0]);
    onConfigChanged.forEach(callback => callback());
});

window.parent.postMessage(["get-all"]);
