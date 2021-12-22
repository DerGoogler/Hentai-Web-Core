import { hot } from "react-hot-loader/root";

/**
 * To enable deifferent functions from settings
 * @param key
 * @param _element
 */
function settingsEfect(key: string, _element: string, callback: Function) {
  var element: HTMLElement | null;
  if (localStorage.getItem(key) === "true") {
    if ((element = document.querySelector(_element))) {
      if (typeof callback == "function") {
        callback(element);
      }
    }
  }
}

export default hot(settingsEfect);
