const regex = /\/[0-9]{8}-[0-9]{4}-[0-9]{4}/;

let original = unsafeWindow.prompt;

if (regex.test(document.location.pathname)) {
    document.addEventListener("keydown", e => {
        if (e.key == "g") {
            let res = prompt("Enter repeated text (empty to clear):");
            if (res)
                unsafeWindow.prompt = () => res;
            else unsafeWindow.prompt = original;
        }
    });
}
