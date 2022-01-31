import ReactDOM from "react-dom";
import ons from "onsenui";
import "onsenui/css/onsenui.css";
import "@Styles/light/onsen-css-components.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "material-icons/iconfont/material-icons.css";
import "@Styles/default.scss";
import { Provider } from "react-translated";
import strings from "@DataPacks/strings";
import eruda from "eruda";
import StyleBuilder from "@Builders/StyleBuilder";
import InitActivity from "./InitActivity";
import CustomCursor from "@Builders/CustomCursor";
import native from "@Native";

class Bootloader {
  private mountNode: any = document.querySelector("app");

  private checkLanguage() {
    var get = native.getPref("language");
    if (get === "false") {
      return "en";
    } else {
      return get;
    }
  }

  private loadConsole() {
    if (native.getPref("erudaEnabled") === "true") {
      eruda.init();
    }
  }

  private loadActivity(node: JSX.Element) {
    ReactDOM.render(
      <Provider language={this.checkLanguage()} translation={strings}>
        {node}
        <StyleBuilder />
        <CustomCursor />
      </Provider>,
      this.mountNode
    );
  }

  private electronInit() {
    native.electron.addEventListener("devtools-opened", () => {
      console.log("DevTools opened");
    });
  }

  private statusbarColors() {
    if (native.getPref("enableDarkmode") === "true") {
      native.android.setStatusbarColor("#ff1f1f1f");
    } else if (native.getPref("useIOSdesign") === "true") {
      native.android.setStatusbarBackgroundWhite();
      native.android.setStatusbarColor("#fffafafa");
    } else {
      native.android.setStatusbarColor("#ff4a148c");
    }
  }

  private androidSettingsinit() {
    if (native.getPref("enableKeepScreenOn") === "true") {
      native.android.keepScreenOn();
    }
  }

  public init() {
    ons.ready(() => {
      if (native.getPref("electron.hardDevice") === ("" || null || undefined)) {
        native.setPref("electron.hardDevice", "C");
      }
      const getDesignCookie = native.getPref("useIOSdesign");
      if (getDesignCookie === "true") {
        ons.platform.select("ios");
      } else {
        ons.platform.select("android");
      }
      this.electronInit();
      this.loadConsole();
      this.statusbarColors();
      this.androidSettingsinit();
      this.loadActivity(<InitActivity />);
    });
  }
}

new Bootloader().init();

export default Bootloader;
