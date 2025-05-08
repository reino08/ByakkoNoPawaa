export function send(...data: any[]) {
    window.parent.postMessage(data, "*");
}
