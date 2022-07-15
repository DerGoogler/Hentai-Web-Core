import ReactDOM from "react-dom";
import ons from "onsenui";
import eruda from "eruda";
import native from "@Native/index";
import preset from "jss-preset-default";
import erudaDom from "eruda-dom";
import jss from "jss";
import darkMode from "@Styles/dark";
import lightMode from "@Styles/light";
import { InitActivity } from "@Views";
import { dom } from "googlers-tools";

import "onsenui/css/onsenui-core.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "material-icons/iconfont/material-icons.css";
import "@Styles/default.scss";
import "@Styles/github/markdown-dark.scss";
import "@Styles/github/markdown-light.scss";

class Bootloader {
  private loadConsole() {
    if (native.getPref("erudaEnabled") === "true") {
      eruda.init();
      eruda.add(erudaDom);
    }
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

  public init() {
    ons.platform.select("android");
    this.styleInit();
    this.loadConsole();
    this.electronInit();
    this.androidSettingsinit();

    if (native.isInstagram || native.isFacebook) {
      native.setPref("disableNSFW", "true");
    }

    dom.render(<InitActivity />, "app");
  }
}

new Bootloader().init();

export default Bootloader;
