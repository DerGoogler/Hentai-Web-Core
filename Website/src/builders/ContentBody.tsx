import * as React from "react";
import { hot } from "react-hot-loader/root";
import config from "../misc/config";

class ContentBody extends React.Component {
  private stlye: any = {
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    minWidth: "200px",
    maxWidth: "580px",
    margin: "0px auto",
    padding: "45px",
  };

  private checkDevice(designWindows: any, designAndroid: any) {
    if (window.navigator.userAgent !== config.options.userAgent) {
      return designWindows;
    } else {
      return designAndroid;
    }
  }

  public render() {
    return (
      <div style={this.checkDevice({ padding: "16px" }, {})}>
        <div style={this.checkDevice(this.stlye, {})}>{this.props.children}</div>
      </div>
    );
  }
}

export default hot(ContentBody);
