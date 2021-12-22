import * as React from "react";
import { isDesktop } from "react-device-detect";
import { hot } from "react-hot-loader/root";

class ContentBody extends React.Component {
  private stlye: any = {
    boxSizing: "border-box",
    minWidth: "200px",
    maxWidth: "980px",
    margin: "0 auto",
    padding: "45px",
  };

  private typeIf(IF: any, returnIFtrue: any, returnELSE: any) {
    if (IF) {
      return returnIFtrue;
    } else {
      return returnELSE;
    }
  }

  public render() {
    return (
      <div style={this.typeIf(isDesktop, { padding: "16px" }, { padding: "24px" })}>
        <div style={this.typeIf(isDesktop, this.stlye, {})}>{this.props.children}</div>
      </div>
    );
  }
}

export default hot(ContentBody);
