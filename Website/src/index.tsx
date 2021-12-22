import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import ons from "onsenui";
import {
  isDesktop,
  isTablet,
  isElectron,
  isSmartTV,
  isWindows,
  isIE,
  isChromium,
} from "react-device-detect";
import * as serviceWorker from "./misc/serviceWorker";
import "onsenui/css/onsenui.css";
import "./styles/onsen-css-components.css";
import "react-windows-ui/config/app-config.css";
import "react-windows-ui/dist/react-windows-ui.min.css";
import "react-windows-ui/icons/fonts/fonts.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/default.css";
import Login from "./Login";
import { Provider } from "react-translated";
import translation from "./misc/strings";

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
    var get = localStorage.getItem("language");
    if (get === undefined || get === null || get === "") {
      return "en";
    } else {
      return get;
    }
  }

  public init() {
    ons.ready(() => {
      if (isDesktop) ons.platform.select("ios");
      ons.platform.select("android");
      if (localStorage.getItem("loggedIn") === "true") {
        ReactDOM.render(
          <Provider language={this.checkLanguage()} translation={translation}>
            <App />
          </Provider>,
          this.mountNode
        );
      } else {
        ReactDOM.render(
          <Provider language={this.checkLanguage()} translation={translation}>
            <Login />
          </Provider>,
          this.mountNode
        );
      }
    });
    serviceWorker.register();
  }
}

new boot().init();
