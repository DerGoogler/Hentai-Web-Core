import { app, BrowserWindow, Menu, MenuItem, shell } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";
const contextMenu = require("electron-context-menu");

const isDevelopment = process.env.NODE_ENV !== "production";

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow({
    icon: path.join(__dirname, "icon.png"),
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
    },
  });

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      })
    );
  }

  contextMenu({
    prepend: (defaultActions, parameters, browserWindow) => [
      {
        label: "Rainbow",
        // Only show it when right-clicking images
        visible: parameters.mediaType === "image",
      },
      {
        label: "Search Google for “{selection}”",
        // Only show it when right-clicking text
        visible: parameters.selectionText.trim().length > 0,
        click: () => {
          shell.openExternal(
            `https://google.com/search?q=${encodeURIComponent(
              parameters.selectionText
            )}`
          );
        },
      },
    ],
  });

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  var menu = Menu.buildFromTemplate([
    {
      label: "GitHub",
      submenu: [
        {
          label: "Source Website",
          click: function () {
            shell.openExternal("https://github.com/Hentai-Web/Website");
          },
        },
        {
          label: "Source Windows",
          click: function () {
            shell.openExternal("https://github.com/Hentai-Web/Windows");
          },
        },
        {
          label: "Source Android",
          click: function () {
            shell.openExternal("https://github.com/Hentai-Web/Android");
          },
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);

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
