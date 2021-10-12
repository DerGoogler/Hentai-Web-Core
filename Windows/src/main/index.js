import { app, BrowserWindow } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";

// const isDevelopment = process.env.NODE_ENV !== "production";

let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1024,
    height: 768,
    title: "Hentai Web Desktop",
    frame: true,
    autoHideMenuBar: true,
    webPreferences: {
      devTools: false,
      nodeIntegration: true,
    },
  });

  window.loadURL("https://dergoogler.com/hentai-web");

  window.on("closed", () => {
    mainWindow = null;
  });

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow();
});
