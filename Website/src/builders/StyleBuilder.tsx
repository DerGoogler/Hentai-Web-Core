import native from "@Native";
import * as React from "react";

class StyleBuilder extends React.Component {
  private hardDevice = native.getPref("electron.hardDevice");

  public state = {
    style: "",
  };

  public componentDidMount = () => {
    if (native.getPref("enableCustomTheming") === "true") {
      this.setState({
        style: native.fs.readFile(this.hardDevice, "inject/custom.css"),
      });
      if (native.userAgentEqualAndroid(true)) {
        native.android.setStatusbarColor(
          native.fs.readFile(this.hardDevice, "inject/StatusbarColor")
        );
      }
    } else {
      console.log("Custom theming is disabled!");
    }
    if (native.getPref("enableCustomScriptLoading") === "true") {
      eval(native.fs.readFile(this.hardDevice, "inject/custom.js"));
    } else {
      console.log("Custom Scripts are disabled!");
    }
  };

  public render() {
    return (
      <div style={{ display: "none" }}>
        DON'T REMOVE THIS!
        <style>{this.state.style}</style>
        <div className="StatusbarColor"></div>
      </div>
    );
  }
}

export default StyleBuilder;
