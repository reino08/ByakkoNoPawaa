import { settings } from "../remoteSettings";

WebSocket = new Proxy(WebSocket, {
    construct(target, args) {
        let socket = new (target as any)(...args);
        socket.addEventListener("close", () => {
            if (settings?.auto_reload)
                window.top.document.location.reload()
        });

        Object.defineProperty(socket, "onmessage", {
            set: (value) => socket.addEventListener("message", onMessage.bind(socket, value)),
        });

        return socket;
    },
});

function onMessage(original: Function, event: MessageEvent) {
    if (settings?.skip_old && event.data[0] == "g") return;

    return original.call(this, event);
}