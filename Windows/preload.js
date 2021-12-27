// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// preload.js
const { BrowserWindow, shell } = require("@electron/remote");
const { contextBridge } = require("electron");
const Store = require("electron-store");

const fenster = require("@electron/remote");

const store = new Store();

contextBridge.exposeInMainWorld("Windows", {
  newWindow: (width = 800, height = 600, uri) => {
    let win = new BrowserWindow({ width: width, height: height });
    win.loadURL(uri);
  },

  close: () => {
    fenster.getCurrentWindow().close();
  },

  minimize: () => {
    fenster.getCurrentWindow().minimize();
  },

  maximize: () => {
    fenster.isMaximized() ? fenster.unmaximize() : fenster.maximize();
  },
  reload: () => {
    fenster.getCurrentWindow.reload();
  },

  open: (link) => {
    shell.openExternal(link);
  },

  setPref: (key, value) => {
    store.set(key, value);
  },

  getPref: (key) => {
    return store.get(key);
  },

  removePref: (key) => {
    store.delete(key);
  },
});
