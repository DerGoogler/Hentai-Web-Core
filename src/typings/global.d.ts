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

  type HTMLAttributes<E, P = {}> = React.DetailedHTMLProps<React.HTMLAttributes<E> & P, E>;
  type AnchorHTMLAttributes<E, P = {}> = React.DetailedHTMLProps<React.AnchorHTMLAttributes<E> & P, E>;

  namespace JSX {
    interface IntrinsicElements {
      /**
       * ContentBody is an optional component, to make the view better on desktop
       */
      "content-body": HTMLAttributes<HTMLDivElement>;
      /**
       * ContentBody is an optional component, to make the view better on desktop
       */
      "inner-content-body": HTMLAttributes<HTMLDivElement>;

      "gerture-element": HTMLAttributes<HTMLDivElement>;

      "markdown-body": HTMLAttributes<HTMLDivElement>;

      "hw-component": HTMLAttributes<HTMLElement, { name?: string }>;
      "hw-activity": HTMLAttributes<HTMLElement, { name?: string }>;

      // Custom abnormal dom elements
      "hw-a": AnchorHTMLAttributes<HTMLAnchorElement>;
    }
  }
}
