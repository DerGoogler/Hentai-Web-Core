import App from "./App";
import ContextMenu from "./makers/ContextMenu";
import BrowserApp from "./browser/App";
import React from "react";
import ReactDOM from "react-dom";
import ons from "onsenui";
import config from "./config";
import {
  isDesktop,
  isTablet,
  isElectron,
  isSmartTV,
  isWindows,
  isIE,
  isIOS,
  isSafari,
  isMobileSafari,
} from "react-device-detect";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";
import "react-windows-ui/config/app-config.css";
import "react-windows-ui/dist/react-windows-ui.min.css";
import "react-windows-ui/icons/fonts/fonts.min.css";
import "./styles.css";

ons.ready(function () {
  if (isIOS || isMobileSafari || isSafari) {
    alert("Error by load the page");
  } else {
    ons.platform.select(config.base.platform);
    var mountNode = document.getElementById("app");
    if (isWindows || isElectron || isSmartTV || isTablet || isIE || isDesktop) {
      ReactDOM.render(
        <>
          <BrowserApp />
          <ContextMenu />
        </>,
        mountNode
      );
    } else {
      ReactDOM.render(<App />, mountNode);
    }
  }
});
