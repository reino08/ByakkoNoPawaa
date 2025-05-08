type RewriteContext = {
    all: ([string | symbol, any])[];
    functions: ([string | symbol, Function])[];
};

export const onRewrite: Promise<RewriteContext> = new Promise(res => {
    let original = window.parent["whiteboard"].__sendStats;
    window.parent["whiteboard"].__sendStats = function (_: string, val: string) {
        if (val == "end") setup(res);
        return original.apply(this, arguments);
    }
});

function setup(res: (value: RewriteContext | PromiseLike<RewriteContext>) => void) {
    let props = Object.entries(window) as ([string | symbol, any])[];
    let functions = props.filter(([_, value]) => typeof value == "function" && !value.toString().includes("[native code]"));

    res({
        all: props,
        functions,
    });
}
