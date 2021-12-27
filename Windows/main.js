// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const Store = require("electron-store");
const path = require("path");
const fenster = require("@electron/remote/main");

function createWindow() {
  // Create the browser window.
  const store = new Store();

  const width = store.get("electronWindowSize.width");
  const height = store.get("electronWindowSize.height");

  if (width === undefined && height === undefined) {
    store.set("electronWindowSize.width", 375);
    store.set("electronWindowSize.height", 812);
  }

  const mainWindow = new BrowserWindow({
    width: store.get("electronWindowSize.width"),
    height: store.get("electronWindowSize.height"),
    frame: true,
    resizable: false,
    backgroundColor: "#4a148c",
    fullscreenable: true,
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    title: "Hentai Web Windows",
    icon: path.join(__dirname, "ic_launcher.png"),
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      preload: path.join(app.getAppPath(), "preload.js"),
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  const webContents = mainWindow.webContents;

  Store.initRenderer();

  fenster.initialize();
  fenster.enable(webContents);

  console.log(app.getPath("userData") + "///");

  // and load the index.html of the app.
  const url = "https://www.dergoogler.com/hentai-web";
  const url_ = "http://192.168.178.81:5500/";

  mainWindow.loadURL(url_);
  mainWindow.on("page-title-updated", function (e) {
    e.preventDefault();
  });

  webContents.setUserAgent("HENTAI_WEB_WINDOWS");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
