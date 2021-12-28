import MainActivity from "./MainActivity";
import ReactDOM from "react-dom";
import ons from "onsenui";
import "onsenui/css/onsenui.css";
import "./styles/onsen-css-components.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/default.scss";
import LoginActivity from "./LoginActivity";
import { Provider } from "react-translated";
import translation from "./dataPacks/strings";
import native from "./native";
import SplashActivity from "./SplashActivity";
import { hot } from "react-hot-loader/root";
import eruda from "eruda";
import SettingsActivity from "./SettingsActivity";
import tools from "./misc/tools";
import Bota from "./misc/bota64";

native.setPref(
  "test",
  new Bota().encode(
    "sfhdfghstfdgdshsdghvfghgasdzgzdhdfjgdgjhshbsdgafgsdf sfgsd fsh  sfgsfg h sgnsgagty 56 u468476 454566 54y 46"
  )
);

class Bootloader {
  private element!: HTMLElement | null;
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
      eruda.init({
        tool: ["console", "elements"],
        plugins: ["fps", "timing", "memory", "benchmark"],
      });
    }
  }

  public loadActivity(node: JSX.Element) {
    ReactDOM.render(
      <Provider language={this.checkLanguage()} translation={translation}>
        {node}
      </Provider>,
      this.mountNode
    );
  }

  public init() {
    ons.ready(() => {
      const getDesignCookie = native.getPref("useIOSdesign");
      if (getDesignCookie === "true") {
        ons.platform.select("ios");
      } else {
        ons.platform.select("android");
      }
      this.loadConsole();
      if (native.getPref("disableSplashscreen") === "true") {
        if (native.getPref("loggedIn") === "true") {
          // Removes the `loggedIn` key if always login is enabled
          if (native.getPref("alwaysLogin") === "true") return native.removePref("loggedIn");
          switch (tools.getUrlParam("activity")) {
            case "settings":
              this.loadActivity(<SettingsActivity />);
              break;

            default:
              this.loadActivity(<MainActivity />);
              break;
          }
        } else {
          this.loadActivity(<LoginActivity />);
        }
      } else {
        switch (tools.getUrlParam("activity")) {
          case "settings":
            this.loadActivity(<SettingsActivity />);
            break;

          default:
            this.loadActivity(<SplashActivity />);
            break;
        }
      }
    });
  }
}

new Bootloader().init();

export default hot(Bootloader);
