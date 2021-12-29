import React from "react";
import { hot } from "react-hot-loader/root";
import native from "../native";

class tools {
  /**
   * Converts an string into boolean
   * @param string
   * @returns {Boolean}
   */
  public static stringToBoolean(string: string): boolean {
    if (typeof string == "boolean") return string;
    switch (string) {
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
   * Returns a reference to the first object with the specified value of the ID attribute.
   * @param id String that specifies the ID value.
   * @deprecated
   *
   * Use
   * ```ts
   * tools.ref("element", (element: HTMLElement) => { element.style.display = "none" })
   * ```
   */
  public static getElementById(id: string, callback: Function) {
    var e: HTMLElement | null;
    if ((e = document.getElementById(id))) {
      if (typeof callback == "function") {
        callback(e);
        name;
      }
    }
  }

  /**
   * Simplfied
   * @param id
   * @param callback HTMLElement
   */
  public static ref(id: any | React.RefObject<HTMLElement>, callback: Function) {
    if (typeof id == "string") {
      var element: HTMLElement | null;
      if ((element = document.getElementById(id))) {
        if (typeof callback == "function") {
          callback(element);
        }
      }
    } else {
      var ref: React.RefObject<HTMLElement>;
      if ((ref = id)) {
        if (typeof callback == "function") {
          callback(ref);
        }
      }
    }
  }

  public static typeIF(_: any, __: any, ___: any) {
    if (this.stringToBoolean(_)) {
      return __;
    } else {
      return ___;
    }
  }

  public static if(item: { wenn: any; dann: any; fehler: any }) {
    if (this.stringToBoolean(item.wenn)) {
      return item.dann;
    } else {
      return item.fehler;
    }
  }

  public static typeCheck(_: any, __: any) {
    if (
      _ === undefined ||
      _ === null ||
      _ === "" ||
      __ === 0 ||
      _ === "0" ||
      _ === false ||
      _ === "false"
    ) {
      return __;
    } else {
      return _;
    }
  }

  public static getUrlParam(param: string) {
    param = param.replace(/([\[\](){}*?+^$.\\|])/g, "\\$1");
    var regex = new RegExp("[?&]" + param + "=([^&#]*)");
    var url = decodeURIComponent(window.location.href);
    var match = regex.exec(url);
    return match ? match[1] : "";
  }

  public static settingsEfect(key: string, _element: string, callback: Function) {
    var element: HTMLElement | null;
    if (native.getPref(key) === "true") {
      if ((element = document.querySelector(_element))) {
        if (typeof callback == "function") {
          callback(element);
        }
      }
    }
  }
}

export default tools;
