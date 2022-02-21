import ons from "onsenui";
import { ListInterface } from "@Types/ListBuilder";
import native from "@Native/index";
import tools from "@Misc/tools";
import { string } from "@Strings";
import { settingsIndex } from "./../localization/languageIndexes";

const settings: ListInterface[] = [
  {
    title: string.appearance,
    content: [
      {
        key: "enableDarkmode",
        type: "switch",
        icon: "dark_mode",
        text: string.enableDarkmode,
      },
      {
        key: "hideSearchbar",
        icon: "search",
        type: "switch",
        text: string.hideSearchbar,
      },
      {
        key: "enableBottomTabbar",
        icon: "table_chart",
        type: "switch",
        text: string.placeTabberOnBottom,
      },
      {
        key: "language",
        icon: "language",
        type: "select",
        text: string.language,
        selectDefaultValue: "en",
        selectValue: settingsIndex,
      },
    ],
  },

  {
    title: string.card,
    content: [
      {
        key: "fitImageToCard",
        type: "switch",
        icon: "fit_screen",
        text: string.fitImageToCard,
      },
      {
        key: "displayDownload",
        icon: "file_download",
        type: "switch",
        text: string.displayMoreButton,
      },
      {
        key: "removeTitle",
        icon: "title",
        type: "switch",
        text: string.removeTitle,
      },
      {
        key: "hideCardWithImageError",
        icon: "error",
        type: "switch",
        text: string.hideCardWithImageError,
      },
    ],
  },

  {
    title: string.security,
    content: [
      {
        key: "alwaysLogin",
        type: "switch",
        icon: "login",
        text: string.alwaysLogin,
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
        text: string.useFingerPrintToLogin,
        type: "switch",
        style: {
          display: native.isWindows || !native.android.isHardwareAvailable() ? "none" : "",
        },
        disabled: tools.typeIF(native.android.hasBiometricEnrolled(), false, true),
      },
      {
        key: "erudaEnabled",
        icon: "logo_dev",
        text: string.erudaEnabled,
        type: "switch",
        style: {
          display: native.isAndroid ? "" : "none",
        },
      },
    ],
  },

  {
    title: string.others,
    content: [
      {
        key: "enableSwipeBetweenTabs",
        icon: "swipe",
        type: "switch",
        text: string.enableSwipeBetweenTabs,
      },
      {
        key: "saveLastUsedTab",
        icon: "save",
        type: "switch",
        text: string.saveLastUsedTab,
      },
      {
        key: "disableNSFW",
        icon: "accessible_forward",
        type: "switch",
        text: string.disableNSFWcontent,
        disabled: native.isInstagram || native.isFacebook,
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
        text: string.electronWindowSize,
        selectDefaultValue: "<width>375</width><height>812</height>",
        callback: (e: any, key: string) => {
          const keyWin = "electron.windowSize";
          const regex = /<width>(.*?)<\/width><height>(.*?)<\/height>/gm;
          const width = Number(e.target.value.replace(regex, "$1"));
          const height = Number(e.target.value.replace(regex, "$2"));

          ons.notification.confirm({
            message: string.formatString(string.electronChangeWindowSizeDialogMessage, {
              size: e.target.value.replace(regex, "$1x$2"),
            }),
            title: string.electronChangeWindowSizeDialogTitle,
            buttonLabels: [string.yes, string.no],
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
        text: string.enableDevTools,
      },
      {
        key: "electron.alwaysOnTop",
        type: "switch",
        icon: "pan_tool",
        text: string.enableAlwaysOnTop,
        callback: (keepDefaultFuntion: any) => {
          native.electron.notification("Restart", "Please restart the application");
          keepDefaultFuntion();
        },
      },
      {
        key: "electron.hardDevice",
        icon: "desktop_windows",
        type: "select",
        text: string.hardDevice,
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
        text: string.enableKeepScreenOn,
      },
    ],
  },
];

export default settings;
