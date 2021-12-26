// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// preload.js
const remote = require("electron").remote;
const { BrowserWindow } = remote;

window.closeApp = () => {
  BrowserWindow.getCurrentWindow().window.close();
};
