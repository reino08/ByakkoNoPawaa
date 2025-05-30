import { apiKey } from "../../../config.json";
import { Forbidden, Login } from "../../routes";
import { settings } from "../../settings";
import { onLoad } from "../../utils";

if (Login) onLoad(run);
Forbidden.then(run);

async function run() {
    const alpha = "abcdefghijklmnopqrstuvwxyz"
    const getGenerator = (values: string) => (length: number) => new Array(length).fill(0).map(_ => values[Math.floor(Math.random() * values.length)]).join("");
    const gen = getGenerator(alpha);

    const name = gen(10);
    const token = await create(`${gen(16)}@${gen(16)}.com`, name, gen(20));
    await login(token, name);

    if (settings.username_prefix) {
        let name = settings.username_prefix.trim();
        if (!/^[a-zA-Z0-9._]{1,32}$/.test(name)) {
            alert(`Invaild username prefix. Was "${name}". Removing.`);
            settings.username_prefix = "";
        } else {
            const data = new FormData();
            data.append("preferredUserName", name + getGenerator(alpha + "1234567890_.")(32 - name.length))
            await fetch(location.origin + "/api/user", {
                body: data,
                "method": "PUT",
            }).catch(() => { });
        }
    }

    if (Forbidden) return document.location.reload();

    const search = document.location.search;
    const start = search.indexOf("redirect=");
    let end = search.substring(start).indexOf("&");
    if (start == -1) return document.location = document.location.origin;
    if (end == -1) end = undefined;
    document.location = document.location.origin + "/" + search.substring(start + 9, end);
}

const API_BASE = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const OPTIONS: RequestInit = {
    method: "POST",
    headers: [["Content-Type", "application/json"]]
};

export async function create(email: string, displayName: string, password: string): Promise<string> {
    // TODO: determine which of these can be removed
    await fetch(`${API_BASE}/createAuthUri?key=${apiKey}`, {
        ...OPTIONS,
        body: JSON.stringify({
            identifier: email,
            continueUri: `${document.location.origin}/login.jsp`,
        })
    }).catch(console.error);

    let { idToken } = await fetch(`${API_BASE}/signupNewUser?key=${apiKey}`, {
        ...OPTIONS,
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        }),
    }).then(x => x.json()).catch(console.error);

    await fetch(`${API_BASE}/setAccountInfo?key=${apiKey}`, {
        ...OPTIONS,
        body: JSON.stringify({
            idToken, displayName, returnSecureToken: true,
        }),
    });

    return idToken;
}

export function login(token: string, name: string): Promise<void> {
    return frameCall(`${document.location.origin}/login?idToken=${token}&name=${encodeURI(name)}&redirect=%2F`);
}

async function frameCall(src: string): Promise<void> {
    return new Promise(res => {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = src;
        iframe.onload = () => res(iframe.remove());
        document.body.appendChild(iframe);
    });
};
