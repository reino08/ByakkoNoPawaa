import { Canvas } from "../../routes";

if (Canvas) {
    const original = unsafeWindow.prompt;

    document.addEventListener("keydown", e => {
        if (e.key != "g") return;

        let res = prompt("Enter repeated text (empty to clear):").substring(0, 200);
        if (res)
            unsafeWindow.prompt = () => res;
        else unsafeWindow.prompt = original;
    });
}
