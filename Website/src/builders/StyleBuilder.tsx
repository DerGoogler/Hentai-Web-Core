import tools from "@Misc/tools";
import HWPlugin from "@Native/hwplugin";
import native from "@Native/index";
import axios from "axios";
import * as React from "react";

class StyleBuilder extends React.Component<{ folder: string }, {}> {
  private getPlugin = new HWPlugin(this.props.folder);
  private getPluginConfig = native.fs.readFile(this.props.folder + "/plugin.yaml", {
    parse: { use: true, mode: "yaml" },
  });

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
      if (!native.fs.isFileExist(this.props.folder + "/plugin.yaml")) {
        native.fs.writeFile(this.props.folder + "/plugin.yaml", '[""]');
      }
      if (!native.fs.isFileExist(this.props.folder + "/" + this.getPluginConfig.run)) {
        console.log("An plugin for " + this.props.folder + " was not found!");
        native.setPref("Plugin.Settings." + this.props.folder, "null");
      } else {
        switch (this.getPluginConfig.mode) {
          case "local":
            eval(native.fs.readFile(this.props.folder + "/" + this.getPluginConfig.run));
            break;

          case "online":
            axios.get(this.getPluginConfig.run).then((res: { data: any }) => {
              eval(res.data);
            });
          default:
            eval(native.fs.readFile(this.props.folder + "/" + this.getPluginConfig.run));
            break;
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
