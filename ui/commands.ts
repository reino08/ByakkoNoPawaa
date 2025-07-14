export type Listener = (...data: any[]) => boolean;
export const listeners = new Set<Listener>();

window.addEventListener("message", event => {
    if (!Array.isArray(event.data) || !event.data.length)
        return;
    console.log("I>", event.data);

    for (const listener of [...listeners])
        if (listener(...event.data))
            listeners.delete(listener);
});

export function send(...data: any[]) {
    console.log("<O", data);
    window.parent.postMessage(data, "*");
}

export function subscribe(targetCommand: string, listener: Listener) {
    listeners.add((command, ...rest) => {
        if (command != targetCommand) return false;
        return listener(...rest);
    });
}
