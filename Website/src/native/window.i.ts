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
   * Closes the desktop app
   */
  close(): void;

  /**
   * Minimizes thedesktop app
   */
  minimize(): void;
}

export default Windows;
