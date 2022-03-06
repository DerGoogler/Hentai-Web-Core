import * as React from "react";
/**
 * Simplefied document tools
 */
declare namespace doc {
    const $: Document;
    /**
     * @description
     * Usage
     * ```ts
     * doc.getById("my-element")?.addEventListener(event, callback)
     * ```
     * @param element
     * @returns {HTMLElement}
     */
    function getById(element: string): HTMLElement | null;
    function getByQuery<T extends HTMLElement = HTMLElement>(element: string): T | null;
    /**
     * @description
     * Usage
     * ```ts
     * doc.getByRef<HTMLDivElement>(this.gerstureID)?.addEventListener(event, callback)
     * ```
     * @param element
     * @returns {T}
     */
    function getByRef<T>(element: React.RefObject<T>): T | null;
    function createRef<T>(): T | null;
}
export default doc;
