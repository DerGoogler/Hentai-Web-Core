// App Pages
import App from "./App";

// Regular Modules
import React from "react";
import ReactDOM from "react-dom";
import ons from "onsenui";
import Cookies from 'universal-cookie';

// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

const cookies = new Cookies();


ons.ready(function () {
    // Can only edit with an cookie editor
    if (cookies.get('useAndroidDesign') === true) {
        ons.platform.select("android");
    } else if (cookies.get('useAndroidDesign') === true
        || cookies.get('useAndroidDesign') === undefined
        || cookies.get('useAndroidDesign') === '') {
        ons.platform.select("ios");
    }
    var mountNode = document.getElementById("app");
    ReactDOM.render(<App />, mountNode);
});
