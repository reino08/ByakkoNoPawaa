import { settings } from "../../settings";

const disconnect_message = "Connection to server was lost - please refresh page to reconnect";

const original = unsafeWindow.alert;
unsafeWindow.alert = function (message) {
    if (settings?.auto_reload && message == disconnect_message)
        return;
    return original.apply(this, arguments);
}
