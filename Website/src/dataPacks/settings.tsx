import ons from "onsenui";
import { List, ListItem } from "react-onsenui";
import { SettingsInterface } from "@Types/SettingsBuilder";
import native from "@Native";
import tools from "@Misc/tools";

const settings: SettingsInterface[] = [
  {
    title: "appearance",
    content: [
      {
        key: "enableDarkmode",
        type: "switch",
        icon: "dark_mode",
        text: "enableDarkmode-string",
        disabled: tools.typeIF(native.getPref("useIOSdesign"), true, false),
        expandable: tools.typeIF(native.getPref("useIOSdesign"), true, false),
        expandableContent: (
          <>
            <p>Dark mode isn't available while the iOS design is on</p>
          </>
        ),
      },
      {
        key: "useIOSdesign",
        type: "switch",
        icon: "star_rate",
        text: "useIOSdesign-string",
        disabled: tools.typeIF(native.getPref("enableDarkmode"), true, false),
        expandable: tools.typeIF(native.getPref("enableDarkmode"), true, false),
        expandableContent: (
          <>
            <p>iOS design isn't available while the dark mode is on</p>
          </>
        ),
      },
      {
        key: "hideSearchbar",
        icon: "search",
        type: "switch",
        text: "hideSearchbar-string",
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
        selectValue: (
          <>
            <option value="en">English</option>
            <option value="de">German</option>
          </>
        ),
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
        expandable: true,
        expandableContent: (
          <>
            <List>
              <ListItem>
                <div className="left">
                  <img className="list-item__thumbnail" src="https://placekitten.com/g/40/40" />
                </div>
                <div className="center">
                  <span className="list-item__title">Cutest kitty</span>
                  <span className="list-item__subtitle">YOU found me, please protect me...</span>
                </div>
              </ListItem>
            </List>
          </>
        ),
      },
      {
        key: "erudaEnabled",
        icon: "logo_dev",
        text: "erudaEnabled-string",
        type: "switch",
        style: {
          display: tools.typeIF(native.userAgentEqualAndroid(false), "none", ""),
        },
        disabled: native.userAgentEqualAndroid(false),
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
    ],
  },

  {
    title: "Electron",
    className: "electron",
    style: { display: tools.typeIF(native.userAgentEqualWindows(true), "", "none") },
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
        selectValue: (
          <>
            <option value="<width>375</width><height>812</height>">iPhone X</option>
            <option value="<width>540</width><height>720</height>">Surface Duo</option>
            <option value="<width>360</width><height>640</height>">Moto G4 / Galaxy S5</option>
            <option value="<width>411</width><height>731</height>">Pixel 2</option>
            <option value="<width>411</width><height>823</height>">Pixel 2 XL</option>
            <option value="<width>280</width><height>653</height>">Galaxy Fold</option>
            <option value="<width>1024</width><height>600</height>">Nest Hub</option>
            <option value="<width>1280</width><height>800</height>">Nest Hub Max</option>
          </>
        ),
      },
      {
        key: "electron.devTools",
        type: "switch",
        icon: "dev_logo",
        text: "Enable DevTools",
      },
      {
        key: "electron.alwaysOnTop",
        type: "switch",
        icon: "aod",
        text: "Always on top",
      },
      {
        key: "electron.centerOnOpen",
        type: "switch",
        icon: "format_align_center",
        text: "Center window when app opened",
      },
    ],
  },
];

export default settings;
