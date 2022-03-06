declare class HWIMG extends HTMLImageElement {
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
export default HWIMG;
