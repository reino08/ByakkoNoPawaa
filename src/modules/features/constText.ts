import { Canvas } from "../../routes";

export const originalPrompt = unsafeWindow.prompt;

if (Canvas) {
    document.addEventListener("keydown", e => {
        if (e.key != "g") return;

        let res = prompt("Enter repeated text (empty to clear):").substring(0, 200);
        if (res)
            unsafeWindow.prompt = () => res;
        else unsafeWindow.prompt = originalPrompt;
    });
}
