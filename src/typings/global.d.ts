import * as React from "react";
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
    readonly Android: Android;

    /**
     * Declare the custom window event (`Windows`) for the WebView
     */
    readonly Windows: Windows;
  }

  namespace JSX {
    interface IntrinsicElements {
      "content-body": React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      "inner-content-body": React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

      "page-section": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      "gerture-element": React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

      "markdown-body": React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    }
  }
}
