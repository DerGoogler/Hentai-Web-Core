import native from "@Native/index";
import * as React from "react";

class StyleBuilder extends React.Component<{ folder: string }, {}> {
  private hardDevice = native.getPref("electron.hardDevice");

  public state = {
    style: "",
  };

  public componentDidMount = () => {
    if (native.getPref("enableCustomTheming") === "true") {
      this.setState({
        style: native.fs.readFile("inject/custom.css"),
      });
      if (native.userAgentEqualAndroid(true)) {
        native.android.setStatusbarColor(native.fs.readFile("inject/StatusbarColor"));
      }
    } else {
      console.log("Custom theming is disabled!");
    }
    if (native.getPref("enableCustomScriptLoading") === "true") {
      if (native.fs.readFile(this.props.folder + "/index.js") === (null || "" || undefined)) {
        console.log("An plugin for " + this.props.folder + " was not found!");
        native.removePref("Plugin.Settings." + this.props.folder);
      } else {
        eval(native.fs.readFile(this.props.folder + "/index.js"));
      }
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
