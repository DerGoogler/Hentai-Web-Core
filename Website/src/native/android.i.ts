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
  getEmei(): string;

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
  isAppInstalled(): boolean;

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
  writeFile(path: string, str: string): void;

  /**
   * @Native
   */
  copyFile(sourcePath: string, destPath: string): void;

  /**
   * @Native
   */
  moveFile(sourcePath: string, destPath: string): void;

  /**
   * @Native
   */
  deleteFile(path: string): void;

  /**
   * @Native
   */
  isFileExist(path: string): boolean;

  /**
   * @Native
   */
  isDirectory(path: string): boolean;

  /**
   * @Native
   */
  isFile(path: string): boolean;

  /**
   * @Native
   */
  getFileLength(path: string): string;

  /**
   * @Native
   */
  getExternalStorageDir(): string;

  /**
   * @Native
   */
  getPackageDataDir(): string;

  /**
   * @Native
   */
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
  ): string;
}

export default Android;
