import { apiKey } from "../../config.json";
import { onLoad, delay } from "../utils.ts";

if (document.location.pathname == "/login.jsp") {
    onLoad(async () => {
        const values = "abcdefghijklmnopqrstuvwxyz";
        const gen = length => new Array(length).fill(0).map(_ => values[Math.floor(Math.random() * values.length)]).join("");

        await logout();
        const name = gen(10);
        const token = await create(`${gen(16)}@${gen(16)}.com`, name, gen(20));
        await login(token, name);
        await delay(1_250);

        const search = document.location.search;
        const start = search.indexOf("redirect=");
        let end = search.substring(start).indexOf("&");
        if (start == -1) return document.location = document.location.origin;
        if (end == -1) end = undefined;
        document.location = document.location.origin + "/" + search.substring(start + 9, end);
    });
} else if (document.getElementsByTagName("h1")?.[0]?.textContent?.includes("403")) {
    onLoad(async () => {
        await logout();
        await delay(1_250);
        document.location.reload();
    });
}

const API_BASE = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const OPTIONS: RequestInit = {
    method: "POST",
    headers: [["Content-Type", "application/json"]]
};

export async function create(email: string, displayName: string, password: string): Promise<string> {
    await fetch(`${API_BASE}/createAuthUri?key=${apiKey}`, {
        ...OPTIONS,
        body: JSON.stringify({
            identifier: email,
            continueUri: `${document.location.origin}/login.jsp`,
        })
    });

    let { idToken } = await fetch(`${API_BASE}/signupNewUser?key=${apiKey}`, {
        ...OPTIONS,
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        }),
    }).then(x => x.json());

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

export function logout(): Promise<void> {
    return frameCall(`${document.location.origin}/logout`);
}

async function frameCall(src: string): Promise<void> {
    new Promise(res => {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = src;
        iframe.onload = () => res(iframe.remove());
        document.body.appendChild(iframe);
    });
};
