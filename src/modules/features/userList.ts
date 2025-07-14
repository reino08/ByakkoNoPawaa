import { Canvas } from "../../routes";
import { onLoad } from "../../utils";
import { send, subscribe } from "../ui";

type User = { status: "offline" | "pro" | "online" | "blockStatusIcon", name: string };
let users: User[];

if (Canvas) {
    const observer = new MutationObserver(() => {
        const element = document.querySelector(".liveUsersPanel tbody");
        if (!element) return;

        observer.disconnect();

        const updater = update.bind(null, element);
        new MutationObserver(updater).observe(element, { childList: true });
        subscribe("get-userlist", updater);
        subscribe("click-user", click.bind(null, element));
    });
    onLoad(() => observer.observe(document.body, { subtree: true, childList: true, }));
}

function update(element: HTMLElement) {
    users = Array.from(element.children).map(user => ({
        status: user.children[0].children[0].children[1].className.split(" ").filter(status => status != "userStatus")[0] || "offline",
        name: user.children[1].children[0].textContent.split(" (you)")[0],
    })) as typeof users;

    send("set-userlist", users);
}

function click(element: HTMLElement, target: String) {
    (Array.from(element.children)
        .map(user => user.children[1].children[0])
        .find(name => name.textContent == target) as HTMLAnchorElement)
        .click();
}
