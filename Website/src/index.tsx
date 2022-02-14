import React from "react";
import ReactDOM from "react-dom";
import ons from "onsenui";
import { Provider } from "react-translated";
import eruda from "eruda";
import StyleBuilder from "@Builders/StyleBuilder";
import InitActivity from "./views/InitActivity";
import native from "@Native/index";
import preset from "jss-preset-default";
import erudaDom from "eruda-dom";
import jss from "jss";
import darkMode from "@Styles/dark";
import lightMode from "@Styles/light";
import string from "@Strings";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-nord_dark";
import "onsenui/css/onsenui.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "material-icons/iconfont/material-icons.css";
import "@Styles/default.scss";
import tools from "@Misc/tools";

class Bootloader {
  private mountNode: any = document.querySelector("app");

  private loadConsole() {
    if (native.getPref("erudaEnabled") === "true") {
      eruda.init();
      eruda.add(erudaDom);
    }
  }

  private loadActivity(node: JSX.Element) {
    let pas,
      customPlugins = null;
    if (native.userAgentEqualAndroid(true) || native.userAgentEqualWindows(true)) {
      if (native.fs.isFileExist("plugins.yaml")) {
        pas = native.fs.readFile("plugins.yaml", { parse: { use: true, mode: "yaml" } });
        customPlugins = pas.map((item: string) => (
          <>
            <StyleBuilder folder={item} />;
          </>
        ));
      }
    }

    ReactDOM.render(
      <>
        {node}
        {customPlugins}
      </>,
      this.mountNode
    );
  }

  private electronInit() {
    native.electron.addEventListener("devtools-opened", () => {
      console.log("DevTools opened");
    });
  }

  /**
   * Loads styles dynamically
   */
  public styleInit() {
    jss.setup(preset());
    if (native.getPref("enableDarkmode") === "true") {
      native.android.setStatusbarColor("#ff1f1f1f");
      jss.createStyleSheet(darkMode).attach();
    } else {
      native.android.setStatusbarColor("#ff4a148c");
      jss.createStyleSheet(lightMode).attach();
    }
  }

  private androidSettingsinit() {
    if (native.getPref("enableKeepScreenOn") === "true") {
      native.android.keepScreenOn();
    }
  }

  private makeExamplePlugin() {
    native.fs.writeFile("plugins/example/plugin.yaml", "run: index.js");
    native.fs.writeFile("plugins/example/index.js", "console.log('Example Plugin')");
    native.fs.writeFile("plugins/example/note.txt", "THIS IS AN EXAMPLE PLUGIN AND CANNOT OVERRIDED");
  }

  private folderInit() {
    if (!native.fs.isFileExist("plugins.yaml")) {
      native.fs.writeFile("plugins.yaml", "- example");
    }
  }

  public init() {
    this.folderInit();
    this.makeExamplePlugin();
    this.styleInit();

    ons.ready(() => {
      ons.platform.select("android");
      this.electronInit();
      this.loadConsole();
      this.androidSettingsinit();
      this.loadActivity(<InitActivity />);
    });
  }
}

new Bootloader().init();

export default Bootloader;
