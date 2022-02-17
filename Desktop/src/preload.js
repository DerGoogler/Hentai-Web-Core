// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// preload.js
const { BrowserWindow, shell, app } = require("@electron/remote");
const { ipcRenderer } = require("electron");
const { contextBridge } = require("electron");
const Store = require("electron-store");
const fs = require("fs");
const http = require("http");
const path = require("path");
const fenster = require("@electron/remote");
const Mousetrap = require("mousetrap");

const store = new Store();

contextBridge.exposeInMainWorld("Windows", {
  newWindow: (uri, options) => {
    const win = new BrowserWindow(options);
    if (options.loadLocal) {
      win.loadFile(path.join(__dirname, uri));
    } else {
      win.loadURL(uri);
    }
  },

  getVersion: () => {
    return app.getVersion();
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

  discordRPC: (arg) => {
    ipcRenderer.send("dcrpc-state", arg);
  },

  discordRPCdisconnect() {
    ipcRenderer.send("dcrpc-state-disconnect", true);
  },

  webContentsAddEventListener: (event, callback) => {
    fenster.getCurrentWindow().webContents.on(event, () => {
      if (typeof callback == "function") {
        callback();
      }
    });
  },

  notification: (title, body) => {
    ipcRenderer.send("notification-send", title, body);
  },

  appGetPath: (path) => {
    return app.getPath(path);
  },

  downloadImage: (downloadUrlOfImage) => {
    const file = fs.createWriteStream(downloadUrlOfImage.replace(/(\w+)(\.\w+)+(?!.*(\w+)(\.\w+)+)/gm, "$1$2"));
    http.get(downloadUrlOfImage, function (response) {
      response.pipe(file);
    });
  },

  /**
   * @param {*} path
   * @returns
   */
  readFile: (path) => {
    try {
      return fs.readFileSync(store.get("electron.hardDevice") + ":".toUpperCase() + "/hentai-web/" + path).toString();
    } catch (error) {
      console.trace(`%c${error}`, "color: orange;");
    }
  },

  mkDir: (path) => {
    try {
      fs.mkdirSync(store.get("electron.hardDevice") + ":".toUpperCase() + "/hentai-web/" + path);
    } catch (error) {
      console.trace(`%c${error}`, "color: orange;");
    }
  },

  writeFile: (path, content) => {
    try {
      fs.writeFileSync(store.get("electron.hardDevice") + ":".toUpperCase() + "/hentai-web/" + path, content, "UTF-8");
    } catch (error) {
      console.trace(`%c${error}`, "color: orange;");
    }
  },

  isFileExist: (path) => {
    try {
      return fs.existsSync(store.get("electron.hardDevice") + ":".toUpperCase() + "/hentai-web/" + path);
    } catch (error) {
      console.trace(`%c${error}`, "color: orange;");
    }
  },

  eval: (javascriptString) => {
    ipcRenderer.send("eval", javascriptString);
  },

  installReactDevTools: () => {
    ipcRenderer.send("installreactdevtools");
  },
});
