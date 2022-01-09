import ReactDOM from "react-dom";
import ons from "onsenui";
import "onsenui/css/onsenui.css";
import "@Styles/light/onsen-css-components.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "material-icons/iconfont/material-icons.css";
import "@Styles/default.scss";
import LoginActivity from "./LoginActivity";
import { Provider } from "react-translated";
import native from "@Native";
import strings from "@DataPacks/strings";
import eruda from "eruda";
import mainfest from "./Manifest";
import Bota from "@Misc/bota64";

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
      eruda.init();
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

  private loadIcons() {
    var favicon = document.createElement("link");
    favicon.rel = "stylesheet";
    favicon.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    document.head.appendChild(favicon);
  }

  public loadActivity(node: JSX.Element) {
    ReactDOM.render(
      <Provider language={this.checkLanguage()} translation={strings}>
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

  private statusbarColors() {
    if (native.getPref("enableDarkmode")) {
      native.android.setStatusbarColor("#ff1f1f1f");
    } else if (native.getPref("useIOSdesign")) {
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

  private activitLoader(manifest: any) {
    var url = window.location.search.replace("?activity=", "").replace("/", "");

    this.statusbarColors();
    this.androidSettingsinit();

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
      const uri = window.location.search;
      if (getDesignCookie === "true") {
        ons.platform.select("ios");
      } else {
        ons.platform.select("android");
      }
      this.electronInit();
      this.loadConsole();

      if (uri === "" || uri === "?activity=") return this.activity.load("main");

      this.activitLoader(mainfest);
    });
  }
}

new Bootloader().init();

export default Bootloader;
