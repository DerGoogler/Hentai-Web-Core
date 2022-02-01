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
import native from "@Native/index";
import erudaDom from "eruda-dom";

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
      eruda.add(erudaDom);
    }
  }

  private loadActivity(node: JSX.Element) {
    let pas,
      customPlugins = <div style={{ display: "none" }}>LOL</div>;
    if (native.userAgentEqualWindows(true) || native.userAgentEqualAndroid(true)) {
      pas = JSON.parse(native.fs.readFile("plugins.json"));
      customPlugins = pas.map((item: string) => (
        <>
          {(() => {
            if (native.getPref("Plugin.Settings." + item + ".name") === item) {
              return <StyleBuilder folder={item} />;
            } else {
              return;
            }
          })()}
        </>
      ));
    }

    ReactDOM.render(
      <>
        <Provider language={this.checkLanguage()} translation={strings}>
          {node}
          {customPlugins}
        </Provider>
      </>,
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
    if (native.getPref("electron.hardDevice") === ("" || null || undefined)) {
      native.setPref("electron.hardDevice", "C");
    }

    if (!native.fs.isFileExist("plugins.json")) {
      native.fs.writeFile("plugins.json", '[""]');
    }

    ons.ready(() => {
      ons.platform.select("android");
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
