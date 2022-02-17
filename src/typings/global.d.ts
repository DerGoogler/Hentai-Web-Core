import Android from "@Types/android";
import Windows from "@Types/windows";

declare global {
  /**
   * A window containing a DOM document; the document property points to the DOM document loaded in that window.
   */
  interface Window {
    /**
     * Declare the custom window event (`Android`) for the WebView
     */
    Android: Android;

    /**
     * Declare the custom window event (`Windows`) for the WebView
     */
    Windows: Windows;

    /**
     *
     */
    webkit: any;
  }
}
