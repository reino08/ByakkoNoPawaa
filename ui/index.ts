import "./index.css";

import { mount } from "svelte";
import App from "./App.svelte";

import type { Config } from "../src/config.ts";
export let config: Config = JSON.parse(decodeURI(document.location.hash.substring(1))) as unknown as Config;

// Side effects
import "./commands.ts";

mount(App, {
    target: document.body,
});
