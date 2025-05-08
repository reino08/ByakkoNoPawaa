import injection from "../../public/injected.js";
import { settings, onSettingsUpdate } from "../settings.js";

let original = document.createElement;
document.createElement = function (type: string) {
  let element = original.apply(this, arguments);
  if (type != "iframe") return element;

  Object.defineProperty(element, "contentWindow", {
    configurable: true,
    get: () => {
      delete element.contentWindow;
      let window = element.contentWindow;

      let original = window.document.write;
      window.document.write = function (data: string) {
        return original.call(this, data + `<script>${injection}</script>`);
      }

      onSettingsUpdate.push(() => element.contentWindow.postMessage(["set-all", JSON.stringify(settings)], '*'));
      return window;
    },
  });

  return element;
}
