import { onRewrite } from "./index";

onRewrite.then((ctx) => {
    let msgProp = ctx.all.find(
        ([_, value]) =>
            value == "Copy command and image upload are currently disabled."
    )[0] as string;
    const target = "$wnd.alert(" + msgProp + ")";
    let targets = ctx.functions.filter(([_, func]) =>
        func.toString().includes(target)
    );

    for (const [key, func] of targets) {
        const str = func.toString();
        const index = str.indexOf(target);
        window[key] = new Function(
            "return " +
            str.substring(0, index) +
            str.substring(index).replace("return", "").replace(target, "")
        )();
    }
});
