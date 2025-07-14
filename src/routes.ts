import { onLoad } from "./utils";

export const Lobby = document.location.pathname == "/lobby.jsp"
export const Login = document.location.pathname == "/login.jsp"
export const Forbidden = new Promise(res => {
    onLoad(() => {
        let forbidden = document.getElementsByTagName("h1")?.[0]?.textContent?.includes("403");
        if (forbidden) res(undefined);
    });
});
export const Canvas = /\/\d{8}-\d{4}-\d{4}/.test(document.location.pathname);