import * as React from "react";

/**
 * Simplefied document tools
 */
class doc {
  /**
   * @description
   * Usage
   * ```ts
   * doc.getById("my-element")?.addEventListener(event, callback)
   * ```
   * @param element
   * @returns {HTMLElement}
   */
  public static getById(element: string): HTMLElement | null {
    var id: HTMLElement | null;
    if ((id = document.getElementById(element))) {
      return id;
    } else {
      return document.getElementById(element);
    }
  }

  public static getByQuery<T extends HTMLElement = HTMLElement>(element: string): T | null {
    var id: T | null;
    if ((id = document.querySelector<T>(element))) {
      return id;
    } else {
      return document.querySelector(element);
    }
  }

  /**
   * @description
   * Usage
   * ```ts
   * doc.getByRef<HTMLDivElement>(this.gerstureID)?.addEventListener(event, callback)
   * ```
   * @param element
   * @returns {T}
   */
  public static getByRef<T>(element: React.RefObject<T>): T | null {
    var id: React.RefObject<T>;
    if ((id = element)) {
      if (id && id.current) {
        const ref: T = id.current;
        return ref;
      } else {
        return id.current;
      }
    } else {
      return id;
    }
  }

  public static createRef<T>(): T | null {
    const ref = React.createRef<T>();
    return this.getByRef<T>(ref);
  }
}

export default doc;
