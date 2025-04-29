import { withConfig } from "../../config.ts";

let timestamp = performance.now();
let max = 0;
let isPatched = false;

const targets = ["fillText", "stroke"];

(function frame() {
    timestamp = performance.now();
    requestAnimationFrame(frame);
})();

withConfig((prop, config) => {
    if (prop && prop != "min_framrate") return

    if (config.min_framerate) {
        max = 1_000 / config.min_framerate;

        if (!isPatched) {
            targets.forEach(prop => patch(CanvasRenderingContext2D.prototype, prop));
            isPatched = true;
        }
    } else {
        if (isPatched) {
            targets.forEach(prop => unpatch(CanvasRenderingContext2D.prototype, prop));
            isPatched = false;
        }
    }
});

function patch(ctx, prop) {
    const original = ctx[prop];
    ctx[prop] = function () {
        if (performance.now() - timestamp < max)
            return original.apply(this, arguments);
    }
    ctx[prop].original = original;
}

function unpatch(ctx, prop) {
    ctx[prop] = ctx[prop].original;
}
