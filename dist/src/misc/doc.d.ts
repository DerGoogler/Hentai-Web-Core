import * as React from "react";
/**
 * Simplefied document tools
 */
declare class doc {
    /**
     * @description
     * Usage
     * ```ts
     * doc.getById("my-element")?.addEventListener(event, callback)
     * ```
     * @param element
     * @returns {HTMLElement}
     */
    static getById(element: string): HTMLElement | null;
    static getByQuery<T extends HTMLElement = HTMLElement>(element: string): T | null;
    /**
     * @description
     * Usage
     * ```ts
     * doc.getByRef<HTMLDivElement>(this.gerstureID)?.addEventListener(event, callback)
     * ```
     * @param element
     * @returns {T}
     */
    static getByRef<T>(element: React.RefObject<T>): T | null;
    static createRef<T>(): T | null;
}
export default doc;
