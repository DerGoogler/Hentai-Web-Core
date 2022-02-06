/**
 * @Native
 */
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
  downloadImage(downloadUrlOfImage: string): void;

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

  /**
   * @Native
   */
  getAppManifest(state: string): string;

  /**
   * @Native
   */
  encryptAES(password?: string, text?: string): string;

  /**
   * @Native
   */
  decryptAES(password?: string, text?: string): string;

  /**
   * @Native
   */
  open(link: string): void;

  /**
   * @Native
   */
  setStatusbarColor(color: string): void;

  /**
   * @Native
   */
  setStatusbarBackgroundWhite(): void;

  /**
   * @Native
   */
  keepScreenOn(): void;

  /**
   * @Native
   */
  isAppInstalled(uri: string): boolean;

  /**
   *
   * Example
   * ```js
   * if (window.Android.isRooted()) {
   *  return "Yes"
   * } else {
   *  return "No"
   * }
   * ```
   * @returns {Boolean}
   */
  isRooted(): boolean;

  /**
   * @Native
   */
  close(): void;

  /**
   * @Native
   */
  readFile(path: string): string;

  /**
   * @Native
   */
  writeFile(path: string, content: string): void;

  /**
   * @Native
   */
  mkDir(path: string): void;

  /**
   * @Native
   */
  isFileExist(path: string): boolean;

  /**
   * @Native
   */
  hasBiometricEnrolled(): boolean;

  /**
   * @Native
   */
  isHardwareAvailable(): boolean;

  /**
   * Evaluates JavaScript code and executes it.
   * @param x A String value that contains valid JavaScript code.
   */
  eval(javascriptString: string): void;

  /**
   * @Native
   */
  hasStoragePermission(): boolean;

  /**
   * @Native
   */
  requestPermission(): void;

  /**
   * @Native
   */
  getVersion(): string;
}

export default Android;
