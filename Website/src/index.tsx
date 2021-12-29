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
import eruda from "eruda";
import Bota from "./misc/bota64";
import mainfest from "./Manifest";

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

  public activity = {
    load(activityName: string): void | Location {
      window.location.search = `activity=${activityName}`;
    },

    getCurrent(): string | String {
      return window.location.search.replace("?activity=", "");
    },
  };

  public loadActivity(node: JSX.Element) {
    ReactDOM.render(
      <Provider language={this.checkLanguage()} translation={translation}>
        {node}
      </Provider>,
      this.mountNode
    );
  }

  /**
   * Checks if the user is logged in
   */
  public doLogin() {
    if (native.getPref("alwaysLogin") === "true") return native.removePref("loggedIn");
    if (native.getPref("loggedIn") === "false") {
      this.activity.load("login");
      this.loadActivity(<LoginActivity />);
    }
  }

  private electronInit() {
    native.electron.addEventListener("devtools-opened", () => {
      console.log("DevTools opened");
    });

    native.registerShortcut("s e t t i n g s", () => {
      this.activity.load("settings");
    });
  }

  private activitLoader(manifest: any) {
    var url = window.location.search.replace("?activity=", "").replace("/", "");

    if (manifest[url] !== undefined) {
      this.loadActivity(manifest[url]);
    } else {
      ons.notification.alert({
        message: `The "${url}" activity was not found.`,
        title: "Activity not found",
        buttonLabels: ["OK"],
        animation: "default",
        modifier: native.checkPlatformForBorderStyle,
        cancelable: false,
      });
      this.loadActivity(manifest["main"]);
    }
  }

  public init() {
    ons.ready(() => {
      const getDesignCookie = native.getPref("useIOSdesign");
      if (getDesignCookie === "true") {
        ons.platform.select("ios");
      } else {
        ons.platform.select("android");
      }
      this.electronInit();
      this.loadConsole();

      if (window.location.search === "") return this.activity.load("main");
      if (window.location.search === "?activity=") return this.activity.load("main");

      this.activitLoader(mainfest);
    });
  }
}

new Bootloader().init();

export default Bootloader;
