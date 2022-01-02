// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// preload.js
const { BrowserWindow, shell, Notification, app } = require("@electron/remote");
const { contextBridge } = require("electron");
const Store = require("electron-store");
const fenster = require("@electron/remote");
const Mousetrap = require("mousetrap");

const store = new Store();

contextBridge.exposeInMainWorld("Windows", {
  newWindow: (uri, options) => {
    const win = new BrowserWindow(options);
    win.loadURL(uri);
  },

  close: () => {
    fenster.getCurrentWindow().close();
  },

  minimize: () => {
    fenster.getCurrentWindow().minimize();
  },

  maximize: () => {
    fenster.getCurrentWindow().maximize();
  },

  unmaximize: () => {
    fenster.getCurrentWindow().unmaximize();
  },

  isMaximized: () => {
    return fenster.getCurrentWindow().isMaximized();
  },

  setWindowSize: (width, height) => {
    fenster.getCurrentWindow().setBounds({ width, height });
  },

  reload: () => {
    fenster.getCurrentWindow().reload();
  },

  open: (link) => {
    shell.openExternal(link);
  },

  openDevTools: () => {
    fenster.getCurrentWindow().webContents.openDevTools();
  },

  closeDevTools: () => {
    fenster.getCurrentWindow().webContents.closeDevTools();
  },

  openPath: (path) => {
    shell.openPath(path);
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
    Mousetrap.bind(shortcut, (e) => {
      if (typeof callback == "function") {
        callback(e, shortcut);
      } else {
        console.log(shortcut + " pressed Successfully");
      }
    });
  },
  /*
  unregisterShortcut: (shortcut) => {
    unregister(shortcut);
  },
*/

  webContentsAddEventListener: (event, callback) => {
    fenster.getCurrentWindow().webContents.on(event, () => {
      if (typeof callback == "function") {
        callback();
      }
    });
  },

  notification: (title, body, callback) => {
    new Notification(title, { body: body }).onclick = () => {
      if (typeof callback) {
        callback(title, body);
      }
    };
  },

  appGetPath: (path) => {
    return app.getPath(path);
  },
});
