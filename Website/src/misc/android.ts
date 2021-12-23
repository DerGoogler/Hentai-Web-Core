import config from "./config";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

declare global {
  /**
   * A window containing a DOM document; the document property points to the DOM document loaded in that window.
   */
  interface Window {
    /**
     * Declare the custom window event (`Android`) for the WebView
     */
    Android: Android;
  }
}

interface Android {
  /**
   * @Native
   */
  BuildMANUFACTURER(): string;

  /**
   * @Native
   */
  BuildMODEL(): string;

  /**
   * @Native
   */
  reload(): void;

  /**
   * @Native
   */
  copyToClipboard(content: string): void;

  /**
   * @Native
   */
  downloadImage(filename: string, downloadUrlOfImage: string): void;

  /**
   * @Native
   */
  setPref(key: string, content: string): void;

  /**
   * @Native
   */
  getPref(key: string): string;

  /**
   * @Native
   */
  removePref(key: string): void;
}

export default class android {
  static element: HTMLElement | null;
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
  static getBuildMANUFACTURER(): string {
    if (window.navigator.userAgent === config.options.userAgent) {
      return window.Android.BuildMANUFACTURER().toUpperCase();
    } else {
      return window.navigator.appCodeName.toUpperCase();
    }
  }

  /**
   * Get mobile phones build model (Is pn every phone different)
   * @returns {String}
   */
  static getBuildMODEL(): string {
    if (window.navigator.userAgent === config.options.userAgent) {
      return window.Android.BuildMODEL().toUpperCase();
    } else {
      return window.navigator.platform.toUpperCase();
    }
  }

  /**
   * Reloads native the app
   * @returns
   */
  static reload(): void {
    if (window.navigator.userAgent === config.options.userAgent) {
      return window.Android.reload();
    } else {
      return window.location.reload();
    }
  }

  /**
   * Copy an string to clipboard on Android
   * @param content
   */
  static copyClipborad(content: string): void {
    if (window.navigator.userAgent === config.options.userAgent) {
      window.Android.copyToClipboard(content);
    } else {
      navigator.clipboard.writeText(content);
    }
  }

  /**
   * Download an anime picture
   * @param filename
   * @param downloadUrlOfImage
   * @param id
   */
  static downloadPicture(filename: string, downloadUrlOfImage: string, id?: any): void {
    if (window.navigator.userAgent === config.options.userAgent) {
      window.Android.downloadImage(filename, downloadUrlOfImage);
    } else {
      if ((this.element = document.getElementById(id))) {
        htmlToImage.toBlob(this.element).then((blob: any) => {
          saveAs(blob, id + ".png");
        });
      }
      console.log("This option is not supported");
    }
  }

  /**
   * Set an saved key from localstorage or shared prefs
   * @param key
   * @param content
   */
  static setPref(key: string, content: string): void {
    if (window.navigator.userAgent === config.options.userAgent) {
      window.Android.setPref(key, content.toString());
    } else {
      localStorage.setItem(key, content.toString());
    }
  }

  /**
   * Get an saved key from localstorage or shared prefs
   * @param key
   * @returns
   */
  static getPref(key: string): string | null {
    if (window.navigator.userAgent === config.options.userAgent) {
      return window.Android.getPref(key);
    } else {
      return localStorage.getItem(key);
    }
  }

  /**
   * Remove an saved key from localstorage or shared prefs
   * @param key
   */
  static removePref(key: string): void {
    if (window.navigator.userAgent === config.options.userAgent) {
      window.Android.removePref(key);
    } else {
      localStorage.removeItem(key);
    }
  }
}