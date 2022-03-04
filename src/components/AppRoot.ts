import pkg from "#Package";
import ons_pkg from "#OnsenUI-Package";
import react_ons_pkg from "#React-OnsenUI-Package";
import react_bs_pkg from "#React-Bootstrap-Package";
import react_pkg from "#React-Package";

/**
 * Provides information about the app and frameworks
 * @extends HTMLElement
 */
class AppRoot extends HTMLElement {
  public constructor() {
    super();
  }

  private initConfigStats(data: { key: string; value: string }[]) {
    return data.map((element: { key: string; value: string }) => {
      return this.setAttribute(element.key, element.value);
    });
  }

  public connectedCallback() {
    this.initConfigStats([
      { key: "version", value: pkg.version },
      { key: "onsenui-version", value: ons_pkg.version },
      { key: "react-onsenui-version", value: react_ons_pkg.version },
      { key: "react-version", value: react_pkg.version },
      { key: "react-bootstrap-version", value: react_bs_pkg.version },
    ]);
  }
}

export default AppRoot;
