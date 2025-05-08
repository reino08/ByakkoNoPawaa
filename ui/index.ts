import "./index.css";

import { mount } from "svelte";
import App from "./App.svelte";

import type { Settings } from "../src/settings.ts";
export let settings: Settings = JSON.parse(decodeURI(document.location.hash.substring(1))) as unknown as Settings;

// Side effects
import "./commands.ts";

mount(App, {
    target: document.body,
});
