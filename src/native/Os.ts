import ons from "onsenui";
import React, { useCallback } from "react";
import { useEventListener } from "usehooks-ts";
import { Native } from "./Native";

export namespace Os {
  export type OpenOptions = {
    target?: string | undefined;
    features?:
      | {
          window?: string | undefined;
          /**
           * Only for Android
           */
          color?: string | undefined;
        }
      | undefined;
  };
}

class Os extends Native {
  public constructor() {
    super();
    this.interface = "os";
  }

  public open(url?: string | URL | undefined, options?: Os.OpenOptions): Window | null {
    if (this.isAndroid) {
      return this.getInterface.open(url, options?.features?.color || "#fffddd");
    } else {
      return window.open(url, options?.target, options?.features?.window);
    }
  }

  /**
   * Closes the window. On Android closes the App
   */
  public close(): void {
    this.isAndroid ? this.getInterface.close() : window.close();
  }

  /**
   * Makes an toast, even on Android
   * @param text
   * @param duration
   */
  public toast(text: string, duration: "long" | "short"): void {
    const _duration = duration === "short" ? (this.isAndroid ? 0 : 2000) : this.isAndroid ? 1 : 5000;
    if (this.isAndroid) {
      this.getInterface.makeToast(text, _duration);
    } else {
      ons.notification.toast(text, { timeout: _duration, animation: "ascend" });
    }
  }

  public getMonetColor(id: string): string {
    if (this.isAndroid) {
      return this.getInterface.getMonetColor(id);
    } else {
      return "#ffffff";
    }
  }

  /**
   * Changes the status bar color
   * @param color Your color
   * @param white `true` makes the status bar white
   */
  public setStatusBarColor(color: string, white: boolean): void {
    this.isAndroid ? this.getInterface.setStatusBarColor(color, white) : null;
  }

  public setNavigationBarColor(color: string): void {
    this.isAndroid ? this.getInterface.setNavigationBarColor(color) : null;
  }

  public useOnBackPressed(callback: () => void): void {
    // @ts-ignore
    useEventListener("backbutton", callback);
  }
}

export const os: Os = new Os();
