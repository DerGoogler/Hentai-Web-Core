import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import ons from "onsenui";
import config from "./config";
import "onsenui/css/onsenui.css";
import "onsenui/css/onsen-css-components.css";

ons.ready(function () {
  ons.platform.select(config.base.platform);
  var mountNode = document.getElementById("app");
  ReactDOM.render(<App />, mountNode);
});
