// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// preload.js
const { BrowserWindow } = require("@electron/remote");
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("Windows", {
  newWindow: (width = 800, height = 600, uri) => {
    let win = new BrowserWindow({ width: width, height: height });
    win.loadURL(uri);
  },
  close: () => {
    require("@electron/remote").getCurrentWindow().close();
  },
  minimize: () => {
    require("@electron/remote").getCurrentWindow().minimize();
  },
});
