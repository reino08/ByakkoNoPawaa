import { originalPrompt } from "../features/constText";

let token: any;

export function start() {
    if (token)
        clearInterval(token);
    if (unsafeWindow.prompt != originalPrompt)
        token = setInterval(() => {
            if (unsafeWindow.prompt == originalPrompt) stop();
            document.body.dispatchEvent(new KeyboardEvent("keydown", {
                keyCode: 84
            }));
        });
    else alert("Set text by pressing `g` first");
}

export function stop() {
    clearInterval(token);
    token = undefined;
}
