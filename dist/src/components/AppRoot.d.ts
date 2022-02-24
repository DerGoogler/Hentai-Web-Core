/**
 * Provides information about the app and frameworks
 * @extends HTMLElement
 */
declare class AppRoot extends HTMLElement {
    constructor();
    private initConfigStats;
    connectedCallback(): void;
    disconnectedCallback(): void;
    adoptedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
}
export default AppRoot;
