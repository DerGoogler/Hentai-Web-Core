import React from "react";
declare class tools {
    /**
     * Easy use undefined
     */
    static readonly undefined: undefined;
    /**
     * Converts an string into boolean
     * @param string
     * @returns {Boolean}
     */
    static stringToBoolean(string: string): boolean;
    /**
     * Returns a reference to the first object with the specified value of the ID attribute.
     * @param id String that specifies the ID value.
     * @deprecated
     *
     * Use
     * ```ts
     * // Id's
     * tools.ref("element", (element: HTMLElement) => { element.style.display = "none" })
     *
     * // Refs
     * tools.ref(this.myRef, (reff: HTMLElement) => { reff.style.display = "none" })
     * ```
     */
    static getElementById(id: string, callback: Function): void;
    /**
     * @param id
     * @param callback HTMLElement
     * @deprecated Use `doc.id` or `doc.ref`
     * @description
     * Usage
     * ```ts
     * // Id's
     * tools.ref("element", (element: HTMLElement) => { element.style.display = "none" })
     *
     * // Refs
     * tools.ref(this.myRef, (ref: HTMLElement) => { ref.style.display = "none" })
     * ```
     */
    static ref(id: string | React.RefObject<any>, callback: (...props: any) => void): void;
    static gesture(e: any, eventName: "drag" | "dragleft" | "dragright" | "dragup" | "dragdown" | "hold" | "release" | "swipe" | "swipeleft" | "swiperight" | "swipeup" | "swipedown" | "tap" | "doubletap" | "touch" | "transform" | "pinch" | "pinchin" | "pinchout" | "rotate", callback: Function): void;
    /**
     * Inline IF statement
     * @deprecated Use the normal inline if statement
     */
    static typeIF(_: any, __: any, ___: any): any;
    static getMisc(url: string, callback: Function, options?: {
        json: boolean;
    }): void;
    static inViewport(element: any): boolean;
    static PluginInitial(folder: string): void;
    static if(item: {
        wenn: any;
        dann: any;
        fehler: any;
    }): any;
    static arrayRemove(arr: any, position: any): any;
    static typeCheck(_: any, __: any): any;
    static getUrlParam(param: string): string;
}
export default tools;
