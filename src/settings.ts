// TODO: metadata for min-max values, names, descriptions.
export class Settings {
    min_framerate: number = 0;
    downscale: boolean = false;
    skip_old: boolean = false;
    auto_reload: boolean = false;
    username_prefix: string = "";

    constructor(props?: Partial<Settings>) {
        Object.assign(this, props);
    }
}

export const onSettingsUpdate: ((prop: string, prev: any, next: any) => void)[] = [];

export const settings: Settings = new Proxy(new Settings(GM_getValue("wfp-config", {})), {
    set(target, prop, value, recv) {
        let prev = target[prop];
        if (prev == value) return;

        let res = Reflect.set(target, prop, value, recv);
        GM_setValue("wfp-config", settings);
        if (typeof prop == "string")
            onSettingsUpdate.forEach(callback => callback(prop as string, prev, value));
        return res;
    }
});

export function withSettings(callback: (prop: string | undefined, config: Settings) => void) {
    callback(undefined, settings);
    onSettingsUpdate.push(prop => callback(prop, settings));
}
