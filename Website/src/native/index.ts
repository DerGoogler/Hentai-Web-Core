import config from "../misc/config";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import { hot } from "react-hot-loader/root";

class native {
  private static element: HTMLElement | null;
  private static userAgentAndroid = "HENTAI_WEB_AGENT";
  private static userAgentWindows = "HENTAI_WEB_WINDOWS";

  public static userAgentEqualAndroid(state: boolean) {
    if (state) {
      return window.navigator.userAgent === config.options.userAgent;
    } else {
      return window.navigator.userAgent != config.options.userAgent;
    }
  }

  public static userAgentEqualWindows(state: boolean) {
    if (state) {
      return window.navigator.userAgent === config.options.userAgentWindows;
    } else {
      return window.navigator.userAgent != config.options.userAgentWindows;
    }
  }

  /**
   * Builds the basic constructor
   */
  public constructor() {
    console.log("Android JS Bridge statred");
  }

  /**
   * Get mobile phones build serial (Is pn every phone different)
   * @returns {String}
   */
  public static getBuildMANUFACTURER(): string {
    const appCodeName = window.navigator.appCodeName.toUpperCase();
    switch (window.navigator.userAgent) {
      case this.userAgentAndroid:
        return window.Android.BuildMANUFACTURER().toUpperCase();
      case this.userAgentWindows:
        return appCodeName;
      default:
        return appCodeName;
    }
  }

  /**
   * Get mobile phones build model (Is pn every phone different)
   * @returns {String}
   */
  public static getBuildMODEL(): string {
    const platform = window.navigator.platform.toUpperCase();
    switch (window.navigator.userAgent) {
      case this.userAgentAndroid:
        return window.Android.BuildMODEL().toUpperCase();
      case this.userAgentWindows:
        return platform;
      default:
        return platform;
    }
  }

  /**
   * Reloads native the app
   * @returns
   */
  public static reload(): void {
    const reload = window.location.reload();
    switch (window.navigator.userAgent) {
      case this.userAgentAndroid:
        window.Android.BuildMANUFACTURER().toUpperCase();
        break;
      case this.userAgentWindows:
        return reload;
      default:
        return reload;
    }
  }

  /**
   * Copy an string to clipboard on Android
   * @param content
   */
  public static copyClipborad(content: string): void {
    const copy = window.navigator.clipboard.writeText(content);
    switch (window.navigator.userAgent) {
      case this.userAgentAndroid:
        window.Android.copyToClipboard(content);
        break;
      case this.userAgentWindows:
        copy;
        break;
      default:
        copy;
        break;
    }
  }

  /**
   * Download an anime picture
   * @param filename
   * @param downloadUrlOfImage
   * @param id
   */
  public static downloadPicture(filename: string, downloadUrlOfImage: string, id?: any): void {
    const dwnl = () => {
      if ((this.element = document.getElementById(id))) {
        htmlToImage.toBlob(this.element).then((blob: any) => {
          saveAs(blob, id + ".png");
        });
      }
    };
    switch (window.navigator.userAgent) {
      case this.userAgentAndroid:
        window.Android.downloadImage(filename, downloadUrlOfImage);
        break;
      case this.userAgentWindows:
        dwnl();
        break;
      default:
        dwnl();
        break;
    }
  }

  /**
   * Set an saved key from localstorage or shared prefs
   * @param key
   * @param content
   */
  public static setPref(key: string, content: string): void {
    const add = localStorage.setItem(key, content.toString());
    switch (window.navigator.userAgent) {
      case this.userAgentAndroid:
        window.Android.setPref(key, content.toString());
        break;
      case this.userAgentWindows:
        return add;
      default:
        return add;
    }
  }

  /**
   * Get an saved key from localstorage or shared prefs
   * @param key
   * @returns
   */
  public static getPref(key: string): string {
    const and = (): string => {
      const get = window.Android.getPref(key);
      if (get === undefined || get === null || get === "") {
        return "false";
      } else {
        return get;
      }
    };

    const bro = (): string => {
      const get = localStorage.getItem(key);
      if (get === undefined || get === null || get === "") {
        return "false";
      } else {
        return get;
      }
    };
    switch (window.navigator.userAgent) {
      case this.userAgentAndroid:
        return and();
      case this.userAgentWindows:
        return bro();
      default:
        return bro();
    }
  }

  /**
   * Remove an saved key from localstorage or shared prefs
   * @param key
   */
  public static removePref(key: string): void {
    const remove = localStorage.removeItem(key);
    switch (window.navigator.userAgent) {
      case this.userAgentAndroid:
        window.Android.removePref(key);
        break;
      case this.userAgentWindows:
        return remove;
      default:
        return remove;
    }
  }

  public static getAppManifest(state: string): string {
    switch (window.navigator.userAgent) {
      case this.userAgentAndroid:
        return window.Android.getAppManifest(state);
      case this.userAgentWindows:
        return "null";
      default:
        return "null";
    }
  }

  public static encodeAES(text: string, password?: string): string {
    const btoa = window.atob(text);
    switch (window.navigator.userAgent) {
      case this.userAgentAndroid:
        return window.Android.encryptAES(password, text);
      case this.userAgentWindows:
        return btoa;
      default:
        return btoa;
    }
  }

  public static decodeAES(text: string, password?: string): string {
    const atob = window.atob(text);
    switch (window.navigator.userAgent) {
      case this.userAgentAndroid:
        return window.Android.decryptAES(password, text);
      case this.userAgentWindows:
        return atob;
      default:
        return atob;
    }
  }

  /**
   * Opens an link with native Android method
   * @param link
   */
  public static open(link: string, target?: string): void {
    const open = window.open(link, target);
    switch (window.navigator.userAgent) {
      case this.userAgentAndroid:
        window.Android.open(link);
        break;
      case this.userAgentWindows:
        open;
        break;
      default:
        open;
        break;
    }
  }
}

export default hot(native);
