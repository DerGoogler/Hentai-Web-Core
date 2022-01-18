import tools from "@Misc/tools";
import native from "@Native";
import ons from "onsenui";
import * as React from "react";

class StyleBuilder extends React.Component {
  public state = {
    style: "",
  };

  public componentDidMount = () => {
    if (native.getPref("enableCustomTheming") === "true") {
      this.setState({
        style: native.fs.readFile(
          native.fs.getExternalStorageDir() + "/hentai-web/inject/custom.css"
        ),
      });
    } else {
      console.log("Custom theming is disabled!");
    }
  };

  public render() {
    return <style>{this.state.style}</style>;
  }
}

export default StyleBuilder;
