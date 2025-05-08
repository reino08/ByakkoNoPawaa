import type { Settings } from "../src/settings";
export const settings: Settings = window.parent[Symbol.for("WFP")].settings;
