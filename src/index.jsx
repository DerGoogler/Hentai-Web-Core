// App pages
import App from "./App";
import Splash from "./Splash";

// Regular imports
import React from "react";
import ReactDOM from "react-dom";
import ons from "onsenui";
import Cookies from 'universal-cookie';

// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

const cookies = new Cookies();

ons.ready(function () {
    if (cookies.get('useAndroidDesign')) {
        ons.platform.select("android");
    } else {
        ons.platform.select("ios");
    }

    if (cookies.get('age18')) {
        var mountNode = document.getElementById("app");
        ReactDOM.render(<App />, mountNode);
    } else {
        var mountNode = document.getElementById("app");
        ReactDOM.render(<Splash />, mountNode);
    }
});
