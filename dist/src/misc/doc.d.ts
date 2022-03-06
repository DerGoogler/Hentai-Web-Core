import * as React from "react";
/**
 * Simplefied document tools
 */
declare class doc {
    /**
     * @description
     * Usage
     * ```ts
     * doc.id("my-element")?.addEventListener(event, callback)
     * ```
     * @param element
     * @returns {HTMLElement}
     */
    static id(element: string): HTMLElement | null;
    /**
     * @description
     * Usage
     * ```ts
     * doc.ref<HTMLDivElement>(this.gerstureID)?.addEventListener(event, callback)
     * ```
     * @param element
     * @returns {ElementType}
     */
    static ref<ElementType>(element: React.RefObject<ElementType>): ElementType | null;
    static createRef<ElementType>(): ElementType | null;
}
export default doc;
