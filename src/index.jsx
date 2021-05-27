// Regular imports
import React from "react";
import ReactDOM from "react-dom";
import ons from "onsenui";
import App from "./App";

// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

ons.ready(function () {
    ons.platform.select("ios");
    // Build app
    var mountNode = document.getElementById("app");
    ReactDOM.render(<App />, mountNode);
});
