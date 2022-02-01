import HWPlugin from "@Native/hwplugin";
import native from "@Native/index";
import * as React from "react";

class StyleBuilder extends React.Component<{ folder: string }, {}> {
  private getPlugin = new HWPlugin(this.props.folder);

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
      if (!native.fs.isFileExist(this.props.folder + "/index.js")) {
        console.log("An plugin for " + this.props.folder + " was not found!");
        native.setPref("Plugin.Settings." + this.props.folder, "null");
      } else {
        eval(native.fs.readFile(this.props.folder + "/index.js"));
      }
    } else {
      console.log("Custom Scripts are disabled!");
    }
  };

  public render() {
    return (
      // @ts-ignore
      <hw-plugin>{this.props.folder}</hw-plugin>
    );
  }
}

export default StyleBuilder;
