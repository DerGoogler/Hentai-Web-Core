import native from "@Native/index";
import { isMobile } from "react-device-detect";
import config from "../misc/config";
import BaseComponent from "./BaseComponent";

/**
 * ContentBody is an optional component, to make the view better on desktop
 */
class ContentBody extends BaseComponent {
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
    if (native.isWindows) {
      return designWindows;
    } else {
      return designAndroid;
    }
  }

  public renderComponent = () => {
    const { className } = this.props;
    return (
      <content-body
        className={
          className === "markdownBody"
            ? native.getPref("enableDarkmode") === "true"
              ? "markdown-body-dark"
              : "markdown-body-light"
            : className
        }
        style={this.checkDevice({ padding: native.isWindows || isMobile ? "" : "16px" }, {})}
      >
        <inner-content-body style={this.checkDevice(this.stlye, {})}>{this.props.children}</inner-content-body>
      </content-body>
    );
  }
}

export default ContentBody;
