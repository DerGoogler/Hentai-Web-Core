import * as React from "react";
import { isMobile } from "react-device-detect";
import config from "../misc/config";
import tools from "../misc/tools";
import native from "@Native/index";

class ContentBody extends React.Component<React.HTMLAttributes<Element>, Element> {
  private stlye: any = {
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: "200px",
    maxWidth: "580px",
    margin: "0px auto",
    padding: tools.typeIF(native.userAgentEqualWindows(true) || isMobile, "", "45px"),
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
        className={className}
        style={this.checkDevice(
          { padding: tools.typeIF(native.userAgentEqualWindows(true) || isMobile, "", "16px") },
          {}
        )}
      >
        <div style={this.checkDevice(this.stlye, {})}>{this.props.children}</div>
      </div>
    );
  }
}

export default ContentBody;
