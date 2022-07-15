import { isMobile } from "react-device-detect";
import config from "../misc/config";
import native from "@Native/index";
import { ViewX, ViewXRenderData } from "react-onsenuix";

/**
 * ContentBody is an optional component, to make the view better on desktop
 */
class ContentBody extends ViewX {
  public constructor(props: {}) {
    super(props);
    this.createView = this.createView.bind(this);
  }

  private stlye: any = {
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: "200px",
    maxWidth: "580px",
    margin: "0px auto",
    padding: native.isWindows || isMobile ? "" : "45px",
  };

  private checkDevice(designWindows: any, designAndroid: any) {
    if (window.navigator.userAgent !== config.options.userAgent) {
      return designWindows;
    } else {
      return designAndroid;
    }
  }

  public createView(data: ViewXRenderData<{}, {}, HTMLElement>): JSX.Element {
    return (
      <div
        className={data.p.className === "markdownBody" ? (native.getPref("enableDarkmode") === "true" ? "markdown-body-dark" : "markdown-body-light") : data.p.className}
        style={this.checkDevice({ padding: native.isWindows || isMobile ? "" : "16px" }, {})}
      >
        <div style={this.checkDevice(this.stlye, {})}>{data.p.children}</div>
      </div>
    );
  }
}

export default ContentBody;
