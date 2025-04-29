// TODO: metadata for min-max values, names, descriptions.
export class Config {
    min_framerate: number = 0;
    downscale: boolean = false;
    skip_old: boolean = false;
    auto_reload: boolean = false;

    constructor(props?: Partial<Config>) {
        Object.assign(this, props);
    }
}

export const onConfigUpdate: ((prop: string, prev: any, next: any) => void)[] = [];

export const config: Config = new Proxy(new Config(GM_getValue("wfp-config", {})), {
    set(target, prop, value, recv) {
        let prev = target[prop];
        if (prev == value) return;

        let res = Reflect.set(target, prop, value, recv);
        GM_setValue("wfp-config", config);
        if (typeof prop == "string")
            onConfigUpdate.forEach(callback => callback(prop as string, prev, value));
        return res;
    }
});

export function withConfig(callback: (prop: string | undefined, config: Config) => void) {
    callback(undefined, config);
    onConfigUpdate.push(prop => callback(prop, config));
}
