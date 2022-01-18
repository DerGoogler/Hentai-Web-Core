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
      if (native.userAgentEqualAndroid(true)) {
        native.android.setStatusbarColor(
          native.fs.readFile(
            native.fs.getExternalStorageDir() + "/hentai-web/inject/StatusbarColor"
          )
        );
      }
    } else {
      console.log("Custom theming is disabled!");
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
