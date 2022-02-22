import axios from "axios";
import React, { useEffect, useState } from "react";
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import yaml from "js-yaml";
import native from "@Native/index";

class tools {
  /**
   * Easy use undefined
   */
  public static readonly undefined = null || "" || undefined;

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

  public static gesture(
    e: any,
    eventName:
      | "drag"
      | "dragleft"
      | "dragright"
      | "dragup"
      | "dragdown"
      | "hold"
      | "release"
      | "swipe"
      | "swipeleft"
      | "swiperight"
      | "swipeup"
      | "swipedown"
      | "tap"
      | "doubletap"
      | "touch"
      | "transform"
      | "pinch"
      | "pinchin"
      | "pinchout"
      | "rotate",
    callback: Function
  ) {
    tools.ref(e, (element: HTMLElement) => {
      element.addEventListener(eventName, () => {
        if (typeof callback === "function") {
          callback();
        }
      });
    });
  }

  /**
   * Inline IF statement
   * @deprecated Use the normal inline if statement
   */
  public static typeIF(_: any, __: any, ___: any) {
    if (this.stringToBoolean(_)) {
      return __;
    } else {
      return ___;
    }
  }

  public static getMisc(url: string, callback: Function, options?: { json: boolean }) {
    axios.get(window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + `misc/${url}`).then((res: { data: any }) => {
      let data;
      if (options?.json) {
        data = res.data;
      } else {
        data = yaml.load(res.data, { json: true });
      }
      if (typeof callback === "function") {
        callback(data);
      }
    });
  }

  public static inViewport(element: any) {
    const scroll = window.scrollY || window.pageYOffset;
    const boundsTop = element.getBoundingClientRect().top + scroll;

    const viewport = {
      top: scroll,
      bottom: scroll + window.innerHeight,
    };

    const bounds = {
      top: boundsTop,
      bottom: boundsTop + element.clientHeight,
    };

    return (
      (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
      (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
    );
  }

  public static PluginInitial(folder: string) {
    const getPluginConfig = native.fs.readFile("plugins/" + folder + "/plugin.yaml", {
      parse: { use: true, mode: "yaml" },
    });

    if (native.getPref("enableCustomScriptLoading") === "true") {
      if (native.fs.isFileExist("plugins.yaml")) {
        if (!native.fs.isFileExist("plugins/" + folder + "/" + getPluginConfig.run)) {
          console.log("An plugin for " + folder + " was not found!");
          native.setPref("Plugin.Settings." + folder, "null");
        } else {
          native.eval(native.fs.readFile("plugins/" + folder + "/" + getPluginConfig.run), {
            plugin: {
              name: folder,
            },
          });
        }
      }
    }
  }

  public static if(item: { wenn: any; dann: any; fehler: any }) {
    if (this.stringToBoolean(item.wenn)) {
      return item.dann;
    } else {
      return item.fehler;
    }
  }

  public static arrayRemove(arr: any, position: any) {
    arr.splice(position, position);
    return arr;
  }

  public static typeCheck(_: any, __: any) {
    if (_ === undefined || _ === null || _ === "" || __ === 0 || _ === "0" || _ === false || _ === "false") {
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
}

export default tools;
