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
}

export default class android {
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
    if (window.navigator.userAgent === "HENTAI_WEB_AGENT") {
      return window.Android.BuildMANUFACTURER().toUpperCase();
    } else {
      return window.navigator.appCodeName;
    }
  }

  /**
   * Get mobile phones build model (Is pn every phone different)
   * @returns {String}
   */
  static getBuildMODEL(): string {
    if (window.navigator.userAgent === "HENTAI_WEB_AGENT") {
      return window.Android.BuildMODEL().toUpperCase();
    } else {
      return window.navigator.platform;
    }
  }

  /**
   * Reloads native the app
   * @returns
   */
  static reload(): void {
    if (window.navigator.userAgent === "HENTAI_WEB_AGENT") {
      return window.Android.reload();
    } else {
      return window.location.reload();
    }
  }
}
