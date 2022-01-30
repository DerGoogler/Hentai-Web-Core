import config from "../misc/config";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import tools from "../misc/tools";
import Mousetrap from "mousetrap";
import ons from "onsenui";

/**
 * Native calls for Windows and Android
 */
class native {
  private static element: HTMLElement | null;
  private static userAgentAndroid = "HENTAI_WEB_AGENT";
  private static userAgentWindows = "HENTAI_WEB_WINDOWS";
  private static agent = window.navigator.userAgent;

  public static checkPlatformForBorderStyle = tools.typeIF(
    native.userAgentEqualWindows(true),
    "windows",
    ""
  );

  public static userAgentEqualAndroid(state: boolean): boolean {
    if (state) {
      return window.navigator.userAgent === config.options.userAgent;
    } else {
      return window.navigator.userAgent != config.options.userAgent;
    }
  }

  public static userAgentEqualWindows(state: boolean): boolean {
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
  public static getBuildMANUFACTURER(): string | String {
    const appCodeName = window.navigator.appCodeName.toUpperCase();
    if (this.agent === this.userAgentAndroid) {
      return window.Android.BuildMANUFACTURER().toUpperCase();
    } else if (this.agent === this.userAgentWindows) {
      return appCodeName;
    } else {
      return appCodeName;
    }
  }

  /**
   * Get mobile phones emei number
   * @returns {String}
   */
  public static getMODEL(): string | String {
    const platform = window.navigator.platform.toUpperCase();
    if (this.agent === this.userAgentAndroid) {
      return window.Android.BuildMODEL().toUpperCase();
    } else if (this.agent === this.userAgentWindows) {
      return platform;
    } else {
      return platform;
    }
  }

  /**
   * Reloads native the app
   * @returns
   */
  public static reload(): void {
    const reload = window.location.reload();
    if (this.agent === this.userAgentAndroid) {
      window.Android.reload();
    } else if (this.agent === this.userAgentWindows) {
      window.Windows.reload();
    } else {
      return reload;
    }
  }

  /**
   * Copy an string to clipboard on Android
   * @param content
   */
  public static copyClipborad(content: string): void {
    const copy = window.navigator.clipboard.writeText(content);
    if (this.agent === this.userAgentAndroid) {
      window.Android.copyToClipboard(content);
    } else if (this.agent === this.userAgentWindows) {
      copy;
    } else {
      copy;
    }
  }

  /**
   * Download an anime picture
   * @param filename
   * @param downloadUrlOfImage
   * @param id
   */
  public static downloadPicture(downloadUrlOfImage: string, filename?: string, id?: any): void {
    /**
     * @deprecated
     */
    const dwnl = () => {
      if ((this.element = document.getElementById(id))) {
        htmlToImage.toBlob(this.element).then((blob: any) => {
          saveAs(blob, id + ".png");
        });
      }
    };

    const a = () =>
      ons.notification.alert("Make an right click on the picture you want an save it.");

    if (this.agent === this.userAgentAndroid) {
      window.Android.downloadImage(downloadUrlOfImage);
    } else if (this.agent === this.userAgentWindows) {
      a();
    } else {
      a();
    }
  }

  /**
   * Set an saved key from localstorage or shared prefs
   * @param key
   * @param content
   */
  public static setPref(key: string, content: string): void {
    if (this.agent === this.userAgentAndroid) {
      window.Android.setPref(key, content.toString());
    } else if (this.agent === this.userAgentWindows) {
      window.Windows.setPref(key, content.toString());
    } else {
      localStorage.setItem(key, content.toString());
    }
  }

  /**
   * Get an saved key from localstorage or shared prefs
   * @param key
   * @returns
   */
  public static getPref(key: string): string {
    if (this.agent === this.userAgentAndroid) {
      const get = window.Android.getPref(key);
      if (get === undefined || get === null || get === "") {
        return "false";
      } else {
        return get;
      }
    } else if (this.agent === this.userAgentWindows) {
      const get = window.Windows.getPref(key);
      if (get === undefined || get === null || get === "") {
        return "false";
      } else {
        return get;
      }
    } else {
      const get = localStorage.getItem(key);
      if (get === undefined || get === null || get === "") {
        return "false";
      } else {
        return get;
      }
    }
  }

  /**
   * Remove an saved key from localstorage or shared prefs
   * @param key
   */
  public static removePref(key: string): void {
    if (this.agent === this.userAgentAndroid) {
      window.Android.removePref(key);
    } else if (this.agent === this.userAgentWindows) {
      window.Windows.removePref(key);
    } else {
      localStorage.removeItem(key);
    }
  }

  public static encodeAES(text: string, password?: string): string | String {
    const btoa = window.atob(text);
    if (this.agent === this.userAgentAndroid) {
      return window.Android.encryptAES(password, text);
    } else if (this.agent === this.userAgentWindows) {
      return btoa;
    } else {
      return btoa;
    }
  }

  public static decodeAES(text: string, password?: string): string | String {
    const atob = window.atob(text);
    if (this.agent === this.userAgentAndroid) {
      return window.Android.decryptAES(password, text);
    } else if (this.agent === this.userAgentWindows) {
      return atob;
    } else {
      return atob;
    }
  }

  /**
   * Opens an link with native Android method
   * @param link
   */
  public static open(link: string, target?: string): void {
    if (this.agent === this.userAgentAndroid) {
      window.Android.open(link);
    } else if (this.agent === this.userAgentWindows) {
      window.Windows.open(link);
    } else {
      window.open(link, target);
    }
  }

  /**
   * Closes the app
   */
  public static close(): void {
    function clo(method: any) {
      ons.notification.confirm({
        message: "Do you want to close this app?",
        title: "Close app?",
        buttonLabels: ["Yes", "No"],
        modifier: native.checkPlatformForBorderStyle,
        animation: "default",
        primaryButtonIndex: 1,
        cancelable: true,
        callback: (index: number) => {
          switch (index) {
            case 0:
              method();
              break;

            default:
              break;
          }
        },
      });
    }

    if (this.agent === this.userAgentAndroid) {
      clo(() => window.Android.close());
    } else if (this.agent === this.userAgentWindows) {
      clo(() => window.Windows.close());
    } else {
      clo(() => window.close());
    }
  }

  public static registerShortcut(shortcut: string, callback?: Function): any | void {
    if (this.agent === this.userAgentAndroid) {
      console.log("globalShortcut are not supported on Android");
    } else if (this.agent === this.userAgentWindows) {
      window.Windows.registerShortcut(shortcut, callback);
    } else {
      Mousetrap.bind(shortcut, (e) => {
        if (typeof callback == "function") {
          callback(e, shortcut);
        } else {
          console.log(shortcut + " pressed Successfully");
        }
      });
    }
  }

  /**
   * Methods that are here can only used on Windows
   */
  public static electron = {
    userAgentAndroid: "HENTAI_WEB_AGENT",
    userAgentWindows: "HENTAI_WEB_WINDOWS",
    agent: window.navigator.userAgent,

    isRegisteredShortcut(shortcut: string): boolean | Boolean {
      if (this.agent === this.userAgentAndroid) {
        return false;
      } else if (this.agent === this.userAgentWindows) {
        return window.Windows.isRegisteredShortcut(shortcut);
      } else {
        return false;
      }
    },

    /**
     *
     * @param state
     */
    discordRPC(state: string): void {
      if (this.agent === this.userAgentWindows) {
        if (native.getPref("electron.disableDiscordRPC") === "true") {
          window.Windows.discordRPCdisconnect();
        } else {
          window.Windows.discordRPC(state);
        }
      }
    },

    addEventListener(event: string, callback: Function): void {
      if (this.agent === this.userAgentWindows) {
        window.Windows.webContentsAddEventListener(event, callback);
      }
    },

    /**
     * Opens the devtools.
     *
     * When `contents` is a `<webview>` tag, the `mode` would be `detach` by default,
     * explicitly passing an empty `mode` can force using last used dock state.
     */
    openDevTools(): void {
      if (this.agent === this.userAgentWindows) {
        window.Windows.openDevTools();
      }
    },
    /**
     * Closes the devtools.
     */
    closeDevTools(): void {
      if (this.agent === this.userAgentWindows) {
        window.Windows.closeDevTools();
      }
    },

    notification(title: string, body: string): void {
      if (this.agent === this.userAgentWindows) {
        window.Windows.notification(title, body);
      }
    },
  };

  /**
   * Methods that are here can only used on Android
   */
  public static android = {
    userAgentAndroid: "HENTAI_WEB_AGENT",
    userAgentWindows: "HENTAI_WEB_WINDOWS",
    agent: window.navigator.userAgent,

    getAppManifest(state: "versionName" | "versionCode" | "packageName" | "sdk"): string | String {
      if (this.agent === this.userAgentAndroid) {
        return window.Android.getAppManifest(state);
      } else {
        return "";
      }
    },

    setStatusbarColor(color: string): void {
      if (this.agent === this.userAgentAndroid) {
        window.Android.setStatusbarColor(color);
      }
    },

    setStatusbarBackgroundWhite(): void {
      if (this.agent === this.userAgentAndroid) {
        window.Android.setStatusbarBackgroundWhite();
      }
    },

    keepScreenOn(): void {
      if (this.agent === this.userAgentAndroid) {
        window.Android.keepScreenOn();
      }
    },

    hasBiometricEnrolled(): boolean {
      if (this.agent === this.userAgentAndroid) {
        return window.Android.hasBiometricEnrolled();
      } else {
        return false;
      }
    },

    isHardwareAvailable(): boolean {
      if (this.agent === this.userAgentAndroid) {
        return window.Android.isHardwareAvailable();
      } else {
        return false;
      }
    },

    isAppInstalled(): boolean {
      if (this.agent === this.userAgentAndroid) {
        return window.Android.isAppInstalled();
      } else {
        return false;
      }
    },

    /**
     *
     * Example
     * ```js
     * if (native.android.isRooted()) {
     *  return "Yes"
     * } else {
     *  return "No"
     * }
     * ```
     * @returns {Boolean}
     */
    isRooted(): boolean {
      if (this.agent === this.userAgentAndroid) {
        return window.Android.isRooted();
      } else {
        return false;
      }
    },
  };

  /**
   * This class is for the file access on both platforms, Android and Windows.
   */
  public static fs = {
    userAgentAndroid: "HENTAI_WEB_AGENT",
    userAgentWindows: "HENTAI_WEB_WINDOWS",
    agent: window.navigator.userAgent,

    readFile(letter = "C", path: string): string {
      if (this.agent === this.userAgentAndroid) {
        return window.Android.readFile(path);
      } else if (this.agent === this.userAgentWindows) {
        return window.Windows.readFile(letter, path);
      } else {
        return "";
      }
    },

    mkDir(letter = "C", path: string): void {
      if (this.agent === this.userAgentAndroid) {
        window.Android.mkDir(path);
      } else if (this.agent === this.userAgentWindows) {
        window.Windows.mkDir(letter, path);
      } else {
        return;
      }
    },

    writeFile(letter = "C", path: string, content: string): void {
      if (this.agent === this.userAgentAndroid) {
        window.Android.writeFile(path, content);
      } else if (this.agent === this.userAgentWindows) {
        window.Windows.writeFile(letter, path, content);
      } else {
        return;
      }
    },

    isFileExist(letter = "C", path: string): boolean {
      if (this.agent === this.userAgentAndroid) {
        return window.Android.isFileExist(path);
      } else if (this.agent === this.userAgentWindows) {
        return window.Windows.isFileExist(letter, path);
      } else {
        return false;
      }
    },
  };
}

export default native;
