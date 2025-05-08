import { settings, withSettings } from "../../settings";
import { onCanvas } from "../../utils";

let canvas: HTMLCanvasElement | undefined;
onCanvas((_canvas) => {
    canvas = _canvas;

    const observer = new MutationObserver(scale);
    const options = {
        attributes: true,
        attributeFilter: ["width", "height"],
    };
    observer.observe(canvas, options)

    withSettings(prop => {
        if (prop && prop != "downscale") return;
        scale();
    });

    function scale() {
        observer.disconnect();

        let rect = canvas?.getBoundingClientRect();
        if (settings?.downscale) {
            canvas.width = rect.width / 2;
            canvas.height = rect.height / 2;
        } else {
            canvas.width = rect.width;
            canvas.height = rect.height;
        }

        observer.observe(canvas, options);
    }
});

let original = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (type, callback, options) {
    return original.call(this, type, function (event) {
        if (event.clientX) {
            let rect = canvas?.getBoundingClientRect();
            if (
                rect && settings?.downscale &&
                event.clientX >= rect.x &&
                event.clientX <= rect.x + rect.width &&
                event.clientY >= rect.y &&
                event.clientY <= rect.y + rect.height
            ) {
                console.log(rect.width, canvas.width);

                // scale by sqrt(scaling_factor)
                let clientX = (event.clientX - rect.x) * Math.SQRT1_2 + rect.x;
                let clientY = (event.clientY - rect.y) * Math.SQRT1_2 + rect.y;
                event.__defineGetter__("clientX", () => clientX);
                event.__defineGetter__("clientY", () => clientY);
            }
        }

        if (typeof callback == "function") return callback.call(this, event);
        else return callback.handleEvent.call(this, event);
    }, options);
};
