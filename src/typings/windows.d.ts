import { BrowserWindowConstructorOptions } from "@Types/newWindow";

/**
 * @Native
 */
interface Windows {
  /**
   * Open an new window in the desktop app
   * @param width
   * @param height
   * @param uri
   */
  newWindow(width: number, height: number, uri: string): void;

  /**
   * Try to close the window. This has the same effect as a user manually clicking
   * the close button of the window. The web page may cancel the close though. See
   * the close event.
   */
  close(): void;

  /**
   * Minimizes the window. On some platforms the minimized window will be shown in
   * the Dock.
   */
  minimize(): void;

  /**
   * Maximizes the window. This will also show (but not focus) the window if it isn't
   * being displayed already.
   */
  maximize(): void;

  /**
   * Whether the window is maximized.
   */
  isMaximized(): boolean;

  /**
   * Unmaximizes the window.
   */
  unmaximize(): boolean;

  /**
   * Opens an link in browser
   * @param link
   */
  open(link: string): void;

  /**
   * Sets an saved string in Windows app
   * @param key
   * @param value
   */
  setPref(key: string, value: any): void;

  /**
   * Gets an saved string in Windows app
   * @param key
   */
  getPref(key: string): string;

  /**
   * Removes an saved string in Windows app
   * @param key
   */
  removePref(key: string): void;

  /**
   * Reload the windows
   */
  reload(): void;

  /**
   *
   * @param state
   */
  discordRPC(state: string): void;

  /**
   *
   */
  discordRPCdisconnect(): void;

  /**
   * Resizes the window to `width` and `height`. If `width` or `height` are below any
   * set minimum size constraints the window will snap to its minimum size.
   */
  setWindowSize(width: number, height: number): void;

  /**
   * Adds an eventlistener to the electron window
   * @param event
   * @param callback
   */
  webContentsAddEventListener(event: string, callback: Function): void;

  /**
   * Creates an notification on desktop app
   * @param title
   * @param body
   * @param callback
   */
  notification(title: string, body: string): void;

  /**
   * A path to a special directory or file associated with `name`. On failure, an
   * `Error` is thrown.
   *
   * If `app.getPath('logs')` is called without called `app.setAppLogsPath()` being
   * called first, a default log directory will be created equivalent to calling
   * `app.setAppLogsPath()` without a `path` parameter.
   */
  appGetPath(
    path:
      | "home"
      | "appData"
      | "userData"
      | "cache"
      | "temp"
      | "exe"
      | "module"
      | "desktop"
      | "documents"
      | "downloads"
      | "music"
      | "pictures"
      | "videos"
      | "recent"
      | "logs"
      | "crashDumps"
  ): string | String;

  /**
   * Opens an selectd path
   * @param path
   */
  openPath(path: string | String): void;

  /**
   * Opens the devtools.
   *
   * When `contents` is a `<webview>` tag, the `mode` would be `detach` by default,
   * explicitly passing an empty `mode` can force using last used dock state.
   */
  openDevTools(): void;

  /**
   * Closes the devtools.
   */
  closeDevTools(): void;

  downloadImage(downloadUrlOfImage: string): void;

  readFile(path: string): string;

  writeFile(path: string, content: string): void;

  isFileExist(path: string): boolean;

  mkDir(path: string): void;

  /**
   * Evaluates JavaScript code and executes it.
   * @param x A String value that contains valid JavaScript code.
   */
  eval(javascriptString: string): void;

  newWindow(url: string, options: BrowserWindowConstructorOptions): void;

  getVersion(): string;
}

export default Windows;
