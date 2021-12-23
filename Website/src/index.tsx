import MainActivity from "./MainActivity";
import React from "react";
import ReactDOM from "react-dom";
import ons from "onsenui";
import { isDesktop, isTablet, isElectron, isSmartTV, isWindows, isIE } from "react-device-detect";
import "onsenui/css/onsenui.css";
import "./styles/onsen-css-components.css";
import "react-windows-ui/config/app-config.css";
import "react-windows-ui/dist/react-windows-ui.min.css";
import "react-windows-ui/icons/fonts/fonts.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/default.css";
import LoginActivity from "./LoginActivity";
import { Provider } from "react-translated";
import translation from "./misc/strings";
import android from "./misc/android";
import SplashActivity from "./SplashActivity";
import { hot } from "react-hot-loader/root";

class boot {
  private element!: HTMLElement | null;
  private mountNode: any = document.querySelector("app");

  private checkDevice(mountNode: Element, mobile: JSX.Element, browser: JSX.Element) {
    if (isWindows || isElectron || isSmartTV || isTablet || isIE || isDesktop) {
      ReactDOM.render(browser, mountNode);
    } else {
      ReactDOM.render(mobile, mountNode);
    }
  }

  private getUrlParam(param: string) {
    param = param.replace(/([\[\](){}*?+^$.\\|])/g, "\\$1");
    var regex = new RegExp("[?&]" + param + "=([^&#]*)");
    var url = decodeURIComponent(window.location.href);
    var match = regex.exec(url);
    return match ? match[1] : "";
  }

  private checkLanguage() {
    var get = android.getPref("language");
    if (get === "false") {
      return "en";
    } else {
      return get;
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
      ons.platform.select("android");
      if (android.getPref("disableSplashscreen") === "true") {
        if (android.getPref("loggedIn") === "true") {
          // Removes the `loggedIn` key if always login is enabled
          if (android.getPref("alwaysLogin") === "true") {
            android.removePref("loggedIn");
          }
          this.loadActivity(<MainActivity />);
        } else {
          this.loadActivity(<LoginActivity />);
        }
      } else {
        this.loadActivity(<SplashActivity />);
      }
    });
  }
}

new boot().init();

export default hot(boot);
