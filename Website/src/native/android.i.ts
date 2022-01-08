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
}

export default Android;
