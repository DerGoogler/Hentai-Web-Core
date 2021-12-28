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
   * @param shortcut
   * @param callbacl
   */
  registerShortcut(shortcut: string, callback?: Function): void;

  /**
   *
   * @param shortcut
   */
  isRegisteredShortcut(shortcut: string): boolean;

  /**
   *
   * @param shortcut
   */
  unregisterShortcut(shortcut: string): void;

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
  notification(title: string, body: string, callback: Function): void;

  /**
   * Gets the userData from app path
   * @param path
   */
  appGetPath(path: "userData"): string | String;

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
}

export default Windows;
