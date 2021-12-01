import App from "./App";
import BrowserApp from "./browser/App";
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
} from "react-device-detect";
import "onsenui/css/onsenui.css";
import "./styles/onsen-css-components.css";
import "react-windows-ui/config/app-config.css";
import "react-windows-ui/dist/react-windows-ui.min.css";
import "react-windows-ui/icons/fonts/fonts.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/default.css";
// import "./styles/android.css";
// import "./styles/ios.css";

ons.ready(function () {
  var mountNode = document.querySelector("app");
  if (isWindows || isElectron || isSmartTV || isTablet || isIE || isDesktop) {
    ReactDOM.render(
      <>
        <BrowserApp />
      </>,
      mountNode
    );
  } else {
    ReactDOM.render(<App />, mountNode);
  }
});
