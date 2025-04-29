import { config } from "../ext_config.ts";

WebSocket = new Proxy(WebSocket, {
    construct(target, args) {
        let socket = new (target as any)(...args);
        socket.addEventListener("close", () => {
            if (config?.auto_reload)
                window.top.document.location.reload()
        });

        Object.defineProperty(socket, "onmessage", {
            set: (value) => socket.addEventListener("message", onMessage.bind(socket, value)),
        });

        return socket;
    },
});

function onMessage(original: Function, event: MessageEvent) {
    if (config?.skip_old && event.data[0] == "g") return;

    return original.call(this, event);
}