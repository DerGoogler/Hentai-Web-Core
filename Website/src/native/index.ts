import config from "../misc/config";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import tools from "../misc/tools";
import Mousetrap from "mousetrap";

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
    const dwnl = () => {
      if ((this.element = document.getElementById(id))) {
        htmlToImage.toBlob(this.element).then((blob: any) => {
          saveAs(blob, id + ".png");
        });
      }
    };
    if (this.agent === this.userAgentAndroid) {
      window.Android.downloadImage(downloadUrlOfImage);
    } else if (this.agent === this.userAgentWindows) {
      return dwnl();
    } else {
      return dwnl();
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
  public static getPref(key: string): string | String {
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
    if (this.agent === this.userAgentAndroid) {
      window.Android.close();
    } else if (this.agent === this.userAgentWindows) {
      window.Windows.close();
    } else {
      window.close();
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

    unregisterShortcut(shortcut: string): void {
      if (this.agent === this.userAgentAndroid) {
        console.log("globalShortcut are not supported on Android");
      } else if (this.agent === this.userAgentWindows) {
        window.Windows.unregisterShortcut(shortcut);
      } else {
        console.log("globalShortcut are not supported on Browsers");
      }
    },

    addEventListener(event: string, callback: Function): void {
      if (this.agent === this.userAgentAndroid) {
        console.log("Shortcut are not supported on Android");
      } else if (this.agent === this.userAgentWindows) {
        window.Windows.webContentsAddEventListener(event, callback);
      } else {
        console.log("Electrons event listener's are not supported on Browsers");
      }
    },

    /**
     * Opens the devtools.
     *
     * When `contents` is a `<webview>` tag, the `mode` would be `detach` by default,
     * explicitly passing an empty `mode` can force using last used dock state.
     */
    openDevTools(): void {
      if (this.agent === this.userAgentAndroid) {
        console.log("DevTools open event listener are not supported on Android");
      } else if (this.agent === this.userAgentWindows) {
        window.Windows.openDevTools();
      } else {
        console.log("DevTools open event listener are not supported on Browsers");
      }
    },
    /**
     * Closes the devtools.
     */
    closeDevTools(): void {
      if (this.agent === this.userAgentAndroid) {
        console.log("DevTools close event listener are not supported on Android");
      } else if (this.agent === this.userAgentWindows) {
        window.Windows.closeDevTools();
      } else {
        console.log("DevTools close event listener are not supported on Browsers");
      }
    },
  };

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

    fs: {
      userAgentAndroid: "HENTAI_WEB_AGENT",
      userAgentWindows: "HENTAI_WEB_WINDOWS",
      agent: window.navigator.userAgent,

      readFile(path: string): string {
        if (this.agent === this.userAgentAndroid) {
          return window.Android.readFile(path);
        } else {
          return "";
        }
      },

      getFileLength(path: string): string {
        if (this.agent === this.userAgentAndroid) {
          return window.Android.getFileLength(path);
        } else {
          return "";
        }
      },

      getExternalStorageDir(): string {
        if (this.agent === this.userAgentAndroid) {
          return window.Android.getExternalStorageDir();
        } else {
          return "";
        }
      },

      getPackageDataDir(): string {
        if (this.agent === this.userAgentAndroid) {
          return window.Android.getPackageDataDir();
        } else {
          return "";
        }
      },

      getPublicDir(
        type:
          | "DIRECTORY_ALARMS"
          | "DIRECTORY_AUDIOBOOKS"
          | "DIRECTORY_DCIM"
          | "DIRECTORY_DOWNLOADS"
          | "DIRECTORY_MOVIES"
          | "DIRECTORY_MUSIC"
          | "DIRECTORY_NOTIFICATIONS"
          | "DIRECTORY_PICTURES"
          | "DIRECTORY_PODCASTS"
          | "DIRECTORY_RECORDINGS"
          | "DIRECTORY_RINGTONES"
          | "DIRECTORY_SCREENSHOTS"
      ): string {
        if (this.agent === this.userAgentAndroid) {
          return window.Android.getPublicDir(type);
        } else {
          return "";
        }
      },

      isFileExist(path: string): boolean {
        if (this.agent === this.userAgentAndroid) {
          return window.Android.isFileExist(path);
        } else {
          return false;
        }
      },

      isDirectory(path: string): boolean {
        if (this.agent === this.userAgentAndroid) {
          return window.Android.isDirectory(path);
        } else {
          return false;
        }
      },

      isFile(path: string): boolean {
        if (this.agent === this.userAgentAndroid) {
          return window.Android.isFile(path);
        } else {
          return false;
        }
      },

      writeFile(path: string, str: string): void {
        if (this.agent === this.userAgentAndroid) {
          return window.Android.writeFile(path, str);
        } else {
          return;
        }
      },

      copyFile(sourcePath: string, destPath: string): void {
        if (this.agent === this.userAgentAndroid) {
          return window.Android.copyFile(sourcePath, destPath);
        } else {
          return;
        }
      },

      moveFile(sourcePath: string, destPath: string): void {
        if (this.agent === this.userAgentAndroid) {
          return window.Android.moveFile(sourcePath, destPath);
        } else {
          return;
        }
      },

      deleteFile(path: string): void {
        if (this.agent === this.userAgentAndroid) {
          return window.Android.deleteFile(path);
        } else {
          return;
        }
      },
    },
  };
}

export default native;
