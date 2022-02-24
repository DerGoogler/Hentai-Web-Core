import pkg from "../../package.json";
import ons_pkg from "./../../node_modules/onsenui/package.json";
import react_ons_pkg from "./../../node_modules/react-onsenui/package.json";
import react_bs_pkg from "./../../node_modules/react-bootstrap/package.json";
import react_pkg from "./../../node_modules/react/package.json";

/**
 * Provides information about the app and frameworks
 * @extends HTMLElement
 */
class AppRoot extends HTMLElement {
  public constructor() {
    super();
    this.initConfigStats([
      { key: "version", value: pkg.version },
      { key: "onsenui-version", value: ons_pkg.version },
      { key: "react-onsenui-version", value: react_ons_pkg.version },
      { key: "react-version", value: react_pkg.version },
      { key: "react-bootstrap-version", value: react_bs_pkg.version },
    ]);
  }

  private initConfigStats(data: { key: string; value: string }[]) {
    return data.map((element: { key: string; value: string }) => {
      return this.setAttribute(element.key, element.value);
    });
  }

  public connectedCallback() {
    // Element wurde ins DOM eingehängt
  }

  public disconnectedCallback() {
    // Element wurde entfernt
  }

  public adoptedCallback() {
    // Element ist in ein anderes Dokument umgezogen
  }

  public attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    // Elementparameter wurden geändert
    // Achtung attributeChangedCallback wird vor connectedCallback aufgerufen
  }
}

export default AppRoot;
