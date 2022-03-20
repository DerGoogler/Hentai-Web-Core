import native from "@Native/index";

/**
 * Provides information about the app and frameworks
 * @extends HTMLElement
 */
class HwA extends HTMLElement {
  public constructor() {
    super();
  }

  public connectedCallback() {
    const href = this.getAttribute("href");
    if (href) {
      this.onclick = () => {
        native.open(href, "_blank");
      };
    }
  }
}

export default HwA;
