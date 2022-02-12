import native from "@Native/index";
import * as React from "react";

class StyleBuilder extends React.Component<{ folder: string }, {}> {
  private getPluginConfig = native.fs.readFile("plugins/" + this.props.folder + "/plugin.yaml", {
    parse: { use: true, mode: "yaml" },
  });

  public state = {
    style_: "",
  };

  public componentDidMount = () => {
    if (native.getPref("enableCustomTheming") === "true") {
      this.setState({
        style_: native.fs.readFile("inject/custom.css"),
      });
      if (native.userAgentEqualAndroid(true)) {
        native.android.setStatusbarColor(native.fs.readFile("inject/StatusbarColor"));
      }
    } else {
      console.log("Custom theming is disabled!");
    }
    if (native.getPref("enableCustomScriptLoading") === "true") {
      if (native.fs.isFileExist("plugins.yaml")) {
        if (!native.fs.isFileExist("plugins/" + this.props.folder + "/" + this.getPluginConfig.run)) {
          console.log("An plugin for " + this.props.folder + " was not found!");
          native.setPref("Plugin.Settings." + this.props.folder, "null");
        } else {
          eval(native.fs.readFile("plugins/" + this.props.folder + "/" + this.getPluginConfig.run));
        }
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
