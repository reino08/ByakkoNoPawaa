import injection from "../../../public/injected.js";
import { config, onConfigUpdate } from "../../config.ts";

let original = document.createElement;
document.createElement = function (type) {
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

      onConfigUpdate.push(() => element.contentWindow.postMessage(["set-all", JSON.stringify(config)], '*'));
      return window;
    },
  });

  return element;
}
