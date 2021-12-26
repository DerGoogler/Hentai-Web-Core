import { hot } from "react-hot-loader/root";
import { android } from "./android";

class tools {
  /**
   * Converts an string into boolean
   * @param string
   * @returns {Boolean}
   */
  static stringToBoolean(string: any): boolean {
    if (typeof string == "boolean") return string;
    switch (string.toLowerCase().trim()) {
      case "true":
      case "yes":
      case "1":
        return true;

      case "false":
      case "no":
      case "0":
      case null:
        return false;

      default:
        return Boolean(string);
    }
  }

  /**
   * Simplfied
   * @param id
   * @param callback HTMLElement
   */
  static getByElementId(id: string, callback: Function) {
    var e: HTMLElement | null;
    if ((e = document.getElementById(id))) {
      if (typeof callback == "function") {
        callback(e);
      }
    }
  }

  static typeIF(_: any, __: any, ___: any) {
    if (this.stringToBoolean(_)) {
      return __;
    } else {
      return ___;
    }
  }

  static settingsEfect(key: string, _element: string, callback: Function) {
    var element: HTMLElement | null;
    if (android.getPref(key) === "true") {
      if ((element = document.querySelector(_element))) {
        if (typeof callback == "function") {
          callback(element);
        }
      }
    }
  }
}

export default hot(tools);
