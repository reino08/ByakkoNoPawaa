let token: any;

export function start() {
    if (token)
        clearInterval(token);
    token = setInterval(() => {
        document.body.dispatchEvent(new KeyboardEvent("keydown", {
            keyCode: 67
        }));
    });
}

export function stop() {
    clearInterval(token);
    token = undefined;
}
