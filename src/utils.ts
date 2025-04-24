export function onLoad(callback: () => void) {
    console.log(document.readyState)
    if (document.readyState == 'complete')
        return callback();
    window.addEventListener("load", callback);
}

export function delay(ms: number) {
    return new Promise(res => setTimeout(res, ms));
}
