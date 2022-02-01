// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  shell,
  Notification,
  session,
} = require("electron");
const path = require("path");
const Store = require("electron-store");
const fenster = require("@electron/remote/main");
const setting = require("./defaultSettings");
const pkg = require("./../package.json");
const client = require("discord-rich-presence")("726837711851356242");
const contextMenu = require("electron-context-menu");

const date = Date.now();
let tray = null;

contextMenu({
  showLookUpSelection: false,
  showSearchWithGoogle: false,
  showCopyImage: false,
  showCopyImageAddress: false,
  showSaveImageAs: true,
  showSaveLinkAs: false,
  showInspectElement: false,
  showServices: false,
});

function createWindow() {
  // Create the browser window.
  const width = setting("electron.windowSize.width", 375);
  const height = setting("electron.windowSize.height", 812);
  const devTools = setting("electron.devTools", "false");
  const alwaysOnTop = setting("electron.alwaysOnTop", "false");
  const dcrpclogo = setting("electron.rpcLogo", "hentaiweb__");
  // electron.hardDevice
  setting("electron.hardDevice", "C");

  const appIcon = path.join(app.getAppPath(), "/build/ic_launcher.png");

  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    hasShadow: false,
    resizable: false,
    alwaysOnTop: alwaysOnTop === "true" ? true : false,
    transparent: true,
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    title: "Hentai Web Windows",
    icon: appIcon,
    webPreferences: {
      nativeWindowOpen: true,
      devTools: devTools === "true" ? true : false,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: true,
      spellcheck: true,
    },
  });

  const webContents = mainWindow.webContents;

  Store.initRenderer();

  console.log(app.getPath("userData"));

  fenster.initialize();
  fenster.enable(webContents);

  const url = "https://dergoogler.com/hentai-web/";
  const url_ = "http://192.168.178.81:5500/";

  mainWindow.loadURL(url_);
  mainWindow.on("page-title-updated", function (e) {
    e.preventDefault();
  });

  webContents.setUserAgent("HENTAI_WEB_WINDOWS");

  ipcMain.on("dcrpc-state", (arg) => {
    client.updatePresence({
      state: arg,
      details: "Version " + pkg.version,
      startTimestamp: date,
      largeImageKey: dcrpclogo,
      instance: true,
    });
  });

  ipcMain.on("dcrpc-state-disconnect", (event, arg) => {
    if (arg) {
      client.disconnect();
    }
  });

  ipcMain.on("notification-send", (event, title, body) => {
    new Notification({
      title: title,
      body: body,
      icon: appIcon,
      silent: false,
    }).show();
  });

  webContents.on("did-finish-load", function () {
    ipcMain.on("eval", (javascriptString) => {
      webContents.executeJavaScript(javascriptString);
    });
  });

  tray = new Tray(appIcon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Plain Settings Edit",
      type: "normal",
      click: () => {
        shell.openPath(app.getPath("userData") + "/config.json");
      },
    },
  ]);
  tray.setToolTip("Other settings/options");
  tray.setContextMenu(contextMenu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.setUserTasks([
    {
      program: process.execPath,
      arguments: "--new-window",
      iconPath: process.execPath,
      iconIndex: 0,
      title: "New Window",
      description: "Create a new window",
    },
  ]);

  // Modify the origin for all requests to the following urls.
  const filter = {
    urls: ["file:///A:/hentai-web/*"],
  };

  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    console.log(details);
    details.requestHeaders["Origin"] = "http://example.com";
    callback({ requestHeaders: details.requestHeaders });
  });

  session.defaultSession.webRequest.onHeadersReceived(filter, (details, callback) => {
    console.log(details);
    details.responseHeaders["Access-Control-Allow-Origin"] = ["capacitor-electron://-"];
    callback({ responseHeaders: details.responseHeaders });
  });

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Set app name
app.setAppUserModelId("Hentai Web Windows");

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
