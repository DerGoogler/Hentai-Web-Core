import * as React from "react";
import { isMobile } from "react-device-detect";
import config from "../misc/config";
import native from "@Native/index";

/**
 * ContentBody is an optional component, to make the view better on desktop
 */
class ContentBody extends React.Component<React.HTMLAttributes<Element>, Element> {
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

  public render() {
    const { className } = this.props;
    return (
      <div
        className={
          className === "markdownBody"
            ? native.getPref("enableDarkmode") === "true"
              ? "markdown-body-dark"
              : "markdown-body-light"
            : className
        }
        style={this.checkDevice({ padding: native.isWindows || isMobile ? "" : "16px" }, {})}
      >
        <div style={this.checkDevice(this.stlye, {})}>{this.props.children}</div>
      </div>
    );
  }
}

export default ContentBody;
