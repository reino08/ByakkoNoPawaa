import { settings } from "./settings";

unsafeWindow[Symbol.for("WFP")] = {
    settings,
};
