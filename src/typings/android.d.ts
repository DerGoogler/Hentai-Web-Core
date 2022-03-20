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
  open(link: string): void;

  /**
   * @Native
   */
  setStatusbarColor(color: `${string}`): void;

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
   * @Native
   */
  hasStoragePermission(): boolean;

  /**
   * @Native
   */
  requestStoargePermission(): void;

  /**
   * @Native
   */
  getVersion(): string;

  /**
   * @Native
   */
  requireSDK(): string;

  /**
   * @Native
   */
  dialog(title: string, message: string): void;
}

export default Android;
