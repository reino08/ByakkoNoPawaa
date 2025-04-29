export function set(key: string, value: any) {
    window.parent.postMessage(["set", key, value], "*");
}
