export const Lobby = document.location.pathname == "/lobby.jsp"
export const Login = document.location.pathname == "/login.jsp"
export const Forbidden = document.getElementsByTagName("h1")?.[0]?.textContent?.includes("403")
export const Canvas = /\/[0-9]{8}-[0-9]{4}-[0-9]{4}/.test(document.location.pathname);