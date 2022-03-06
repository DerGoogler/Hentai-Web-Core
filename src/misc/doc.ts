import * as React from "react";

/**
 * Simplefied document tools
 */
class doc {
  /**
   * @description
   * Usage
   * ```ts
   * doc.id("my-element")?.addEventListener(event, callback)
   * ```
   * @param element
   * @returns {HTMLElement}
   */
  public static id(element: string): HTMLElement | null {
    var id: HTMLElement | null;
    if ((id = document.getElementById(element))) {
      return id;
    } else {
      return document.getElementById(element);
    }
  }

  /**
   * @description
   * Usage
   * ```ts
   * doc.ref<HTMLDivElement>(this.gerstureID)?.addEventListener(event, callback)
   * ```
   * @param element
   * @returns {ElementType}
   */
  public static ref<ElementType>(element: React.RefObject<ElementType>): ElementType | null {
    var id: React.RefObject<ElementType>;
    if ((id = element)) {
      if (id && id.current) {
        const ref: ElementType = id.current;
        return ref;
      } else {
        return id.current;
      }
    } else {
      return id;
    }
  }

  public static createRef<ElementType>(): ElementType | null {
    const ref = React.createRef<ElementType>();
    return this.ref<ElementType>(ref);
  }
}

export default doc;
