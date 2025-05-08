import { Canvas } from "./routes";

export function onLoad(callback: () => void) {
    if (document.readyState == 'complete')
        return callback();
    window.addEventListener("load", callback);
}

let token: any;
let canvas: HTMLCanvasElement | undefined;
const canvasListeners: ((canvas: HTMLCanvasElement) => void)[] = [];
export function onCanvas(callback: (canvas: HTMLCanvasElement) => void) {
    if (!Canvas) return;

    if (canvas) return callback(canvas);
    canvasListeners.push(callback);

    if (!token) {
        token = setInterval(() => {
            canvas = document.getElementById("canvasId") as HTMLCanvasElement | undefined;
            if (!canvas) return;

            clearInterval(token);
            canvasListeners.forEach(callback => callback(canvas));
            canvasListeners.splice(0);
        }, 100);
    }
}

export function delay(ms: number) {
    return new Promise(res => setTimeout(res, ms));
}
