import { onLoad } from "../utils.ts";

if (document.location.pathname == "/lobby.jsp")
    override();

type LobbyDocument = {
    diagramName: string,
    preferredUserName: string,
    avatarSVG: string,
    activeUsers: number,
    domainUrl: string,
}

function override() {
    document.close();
    onLoad(() => {
        document.body.innerHTML = "";

        {
            const button = document.createElement("button");
            button.style.all = "revert";
            button.textContent = "Refresh";
            button.onclick = () => {
                for (let elements = document.getElementsByClassName("wfp-board"), i = elements.length - 1; i >= 0; i--)
                    elements[i].parentNode.removeChild(elements[i]);
                load();
            };
            document.body.appendChild(button);
        }

        load();
    });
}

async function load() {
    let count = 0;
    let seen = 0;
    let page = 1;
    do {
        let { docs, totalCount }: { docs: LobbyDocument[], totalCount: number } = await fetch(`${document.location.origin}/lobby?page=${page}`).then(x => x.json());
        count = totalCount;
        seen += docs.length;
        page++;

        for (let doc of docs) {
            const element = document.createElement("div");
            element.className = "wfp-board";
            document.body.appendChild(element);
            renderDocument(doc, element);
        }
    } while (seen < count);
}

async function renderDocument({ domainUrl, diagramName, preferredUserName, activeUsers }: LobbyDocument, parent: HTMLDivElement) {
    const url = `${domainUrl}${diagramName}`;

    const element = document.createElement("a");
    element.href = url;
    element.textContent = `${preferredUserName} (${activeUsers})`;
    parent.appendChild(element);

    GM.xmlHttpRequest({
        url,
        method: "HEAD",
        onload: function (resp) {
            if (resp.status == 403)
                element.style.textDecoration = "line-through";
        }
    });
}