let token: any;

export function start() {
    const canvas = document.getElementById("canvasId");
    const rect = canvas.getBoundingClientRect();
    const left = Math.floor(rect.left);
    const top = Math.floor(rect.top);
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    if (token)
        clearInterval(token);
    token = setInterval(() => {
        let rng = (x: number) => Math.floor(Math.random() * x);

        canvas.dispatchEvent(new MouseEvent("mousedown", {
            clientX: left + rng(width),
            clientY: top + rng(height),
        }));

        canvas.dispatchEvent(new MouseEvent("mousemove", {
            clientX: left + rng(width),
            clientY: top + rng(height),
        }));

        canvas.dispatchEvent(new MouseEvent("mouseup"));
    });
}

export function stop() {
    clearInterval(token);
    token = undefined;
}
