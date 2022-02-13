import ons from "onsenui";
import { SettingsInterface } from "@Types/SettingsBuilder";
import native from "@Native/index";
import tools from "@Misc/tools";
// There is a difference between native.isAndroid !
import { isAndroid } from "react-device-detect";

const settings: SettingsInterface[] = [
  {
    title: "appearance",
    content: [
      {
        key: "enableDarkmode",
        type: "switch",
        icon: "dark_mode",
        text: "enableDarkmode-string",
      },
      {
        key: "hideSearchbar",
        icon: "search",
        type: "switch",
        text: "hideSearchbar-string",
      },
      {
        key: "enableBottomTabbar",
        icon: "table_chart",
        type: "switch",
        text: "Place Tabbar at bottom",
      },
      {
        key: "hideFAB",
        icon: "add",
        type: "switch",
        text: "hideFAB-string",
      },
      {
        key: "language",
        icon: "language",
        type: "select",
        text: "language-string",
        selectDefaultValue: "en",
        selectValue: [
          {
            text: "English",
            value: "en",
          },
          {
            text: "German",
            value: "de",
          },
        ],
      },
      {
        key: "enableCustomTheming",
        icon: "water_drop",
        style: {
          display: native.isAndroid || native.isWindows ? "block" : "none",
        },
        type: "switch",
        expandable: true,
        expandableContent:
          'Custom themes can break the general app experience and includes no official theme fixes from the developer. Use at your own risk!\r\n\r\nIf you want to load the custom theme from an different hard device, just open the "config.json" and change the letter at "hardDivice"',
        text: "Custom Theming",
      },
    ],
  },

  {
    title: "card",
    content: [
      {
        key: "fitImageToCard",
        type: "switch",
        icon: "fit_screen",
        text: "fitImageToCard-string",
      },
      {
        key: "displayDownload",
        icon: "file_download",
        type: "switch",
        text: "displayDownload-string",
      },
      {
        key: "removeTitle",
        icon: "title",
        type: "switch",
        text: "removeTitle-string",
      },
    ],
  },

  {
    title: "security",
    content: [
      {
        key: "alwaysLogin",
        type: "switch",
        icon: "login",
        text: "alwaysLogin-string",
      },
      {
        key: "enableCustomScriptLoading",
        icon: "description",
        style: {
          display: native.isAndroid || native.isWindows ? "" : "none",
        },
        type: "switch",
        expandable: true,
        expandableContent: "Danger by using this!",
        text: "Custom Scripting",
      },
      {
        key: "useFingerPrintToLogin",
        icon: "fingerprint",
        text: "useFingerPrintToLogin-string",
        type: "switch",
        style: {
          display: native.isWindows || !native.android.isHardwareAvailable() ? "none" : "",
        },
        disabled: tools.typeIF(native.android.hasBiometricEnrolled(), false, true),
      },
      {
        key: "erudaEnabled",
        icon: "logo_dev",
        text: "erudaEnabled-string",
        type: "switch",
        style: {
          display: isAndroid ? "" : "none",
        },
        disabled: !isAndroid,
      },
    ],
  },

  {
    title: "others",
    content: [
      {
        key: "enableSwipeBetweenTabs",
        icon: "swipe",
        type: "switch",
        text: "enableSwipeBetweenTabs-string",
      },
      {
        key: "saveLastUsedTab",
        icon: "save",
        type: "switch",
        text: "saveLastUsedTab-string",
      },
      {
        key: "disableNSFW",
        icon: "accessible_forward",
        type: "switch",
        text: "Disable NSFW content",
      },
    ],
  },

  {
    title: "Electron",
    className: "electron",
    style: { display: native.isWindows ? "" : "none" },
    content: [
      {
        key: "electron.screenSizeInUse",
        type: "select",
        icon: "aspect_ratio",
        text: "Screen/Window Size",
        selectDefaultValue: "<width>375</width><height>812</height>",
        callback: (e: any, key: string, translate: any) => {
          const keyWin = "electron.windowSize";
          const regex = /<width>(.*?)<\/width><height>(.*?)<\/height>/gm;
          const width = Number(e.target.value.replace(regex, "$1"));
          const height = Number(e.target.value.replace(regex, "$2"));

          ons.notification.confirm({
            message: translate({
              text: "electron-window-cange-size-screen-dialog-message",
              data: { size: e.target.value.replace(regex, "$1x$2") },
            }),
            title: translate({
              text: "electron-window-cange-size-screen-dialog-title",
            }),
            buttonLabels: [
              translate({
                text: "yes",
              }),
              translate({
                text: "no",
              }),
            ],
            animation: "default",
            modifier: native.checkPlatformForBorderStyle,
            primaryButtonIndex: 1,
            cancelable: true,
            callback: (index: number) => {
              switch (index) {
                case 0:
                  window.Windows.setPref(keyWin + ".width", width);
                  window.Windows.setPref(keyWin + ".height", height);
                  window.Windows.setPref(key, e.target.value);
                  window.Windows.setWindowSize(width, height);
                  break;

                default:
                  e.target.value = window.Windows.getPref(key);
                  break;
              }
            },
          });
        },
        selectValue: [
          {
            text: "iPhone X",
            value: "<width>375</width><height>812</height>",
          },
          {
            text: "Surface Duo",
            value: "<width>540</width><height>720</height>",
          },
          {
            text: "Moto G4 / Galaxy S5",
            value: "<width>360</width><height>640</height>",
          },
          {
            text: "Pixel 2",
            value: "<width>411</width><height>731</height>",
          },
          {
            text: "Pixel 2 XL",
            value: "<width>411</width><height>823</height>",
          },
          {
            text: "Galaxy Fold",
            value: "<width>280</width><height>653</height>",
          },
          {
            text: "Nest Hub",
            value: "<width>1024</width><height>600</height>",
          },
          {
            text: "Nest Hub Max",
            value: "<width>1280</width><height>800</height>",
          },
        ],
      },
      {
        key: "electron.devTools",
        type: "switch",
        icon: "logo_dev",
        text: "Enable DevTools",
      },
      {
        key: "electron.alwaysOnTop",
        type: "switch",
        icon: "pan_tool",
        text: "Enable Always on top",
        callback: (keepDefaultFuntion: any) => {
          native.electron.notification("Restart", "Please restart the application");
          keepDefaultFuntion();
        },
      },
      {
        key: "electron.hardDevice",
        icon: "desktop_windows",
        type: "select",
        text: "Hard device",
        selectDefaultValue: "C",
        selectValue: [
          {
            text: "A",
            value: "A",
          },

          {
            text: "B",
            value: "B",
          },
          {
            text: "C",
            value: "C",
          },
          {
            text: "D",
            value: "D",
          },
          {
            text: "E",
            value: "E",
          },
          {
            text: "F",
            value: "F",
          },
          {
            text: "G",
            value: "G",
          },
          {
            text: "H",
            value: "H",
          },
          {
            text: "I",
            value: "I",
          },
          {
            text: "J",
            value: "J",
          },
          {
            text: "K",
            value: "K",
          },
          {
            text: "L",
            value: "L",
          },
          {
            text: "M",
            value: "M",
          },
          {
            text: "N",
            value: "N",
          },
          {
            text: "O",
            value: "O",
          },
          {
            text: "P",
            value: "P",
          },
          {
            text: "Q",
            value: "Q",
          },
          {
            text: "R",
            value: "R",
          },
          {
            text: "S",
            value: "S",
          },
          {
            text: "T",
            value: "T",
          },
          {
            text: "U",
            value: "U",
          },
          {
            text: "V",
            value: "V",
          },
          {
            text: "W",
            value: "W",
          },
          {
            text: "X",
            value: "X",
          },
          {
            text: "Y",
            value: "Y",
          },
          {
            text: "Z",
            value: "Z",
          },
        ],
      },
      {
        key: "electron.disableDiscordRPC",
        type: "switch",
        icon: "discord",
        text: "Disable Discord RPC",
        expandable: true,
        expandableContent: "You need to relaunch whole app!",
      },
      {
        key: "electron.rpcLogo",
        type: "select",
        icon: "discord",
        text: "Discord RPC Logo",
        selectDefaultValue: "hentaiweb__",
        selectValue: [
          {
            text: "Hentai Web",
            value: "hentaiweb__",
          },
          {
            text: "Bot Logo",
            value: "bot_logo",
          },
          {
            text: "Googler",
            value: "googler",
          },
          {
            text: "App Icon",
            value: "ic_launcher",
          },
        ],
      },
    ],
  },
  {
    title: "Android",
    className: "android",
    style: { display: native.isAndroid ? "" : "none" },
    content: [
      {
        key: "enableKeepScreenOn",
        type: "switch",
        icon: "visibility",
        text: "enableKeepScreenOn--string",
      },
    ],
  },
];

export default settings;
