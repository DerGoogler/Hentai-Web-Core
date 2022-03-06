import Packages from "@Misc/Packages";

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
      { key: "version", value: Packages.HentaiWeb.version },
      { key: "onsenui-version", value: Packages.OnsenUI.version },
      { key: "react-onsenui-version", value: Packages.ReactOnsenUI.version },
      { key: "react-version", value: Packages.React.version },
      { key: "react-bootstrap-version", value: Packages.ReactBootstrap.version },
    ]);
  }
}

export default AppRoot;
