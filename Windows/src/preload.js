/* eslint-disable @typescript-eslint/no-var-requires */
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// preload.js
const { BrowserWindow, shell, globalShortcut } = require("@electron/remote");
const { contextBridge } = require("electron");
const Store = require("electron-store");
const fenster = require("@electron/remote");

const store = new Store();

contextBridge.exposeInMainWorld("Windows", {
  newWindow: (width = 800, height = 600, uri) => {
    const win = new BrowserWindow({ width: width, height: height });
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

  setWindowSize: (width, height) => {
    fenster.getCurrentWindow().setSize(width, height);
  },

  reload: () => {
    fenster.getCurrentWindow().reload();
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

  registerShortcut: (shortcut, callback) => {
    globalShortcut.register(shortcut, () => {
      if (typeof callback == "function") {
        callback(shortcut);
      } else {
        console.log(shortcut + " pressed Successfully");
      }
    });
  },

  isRegisteredShortcut: (shortcut) => {
    return globalShortcut.isRegistered(shortcut);
  },

  unregisterShortcut: (shortcut) => {
    globalShortcut.unregister(shortcut);
  },
});
