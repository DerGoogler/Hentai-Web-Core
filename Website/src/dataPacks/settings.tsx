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
        type: "switch",
        text: "hideSearchbar-string",
      },
      {
        key: "hideFAB",
        type: "switch",
        text: "hideFAB-string",
      },

      {
        key: "language",
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
        text: "fitImageToCard-string",
      },
      {
        key: "displayDownload",
        type: "switch",
        text: "displayDownload-string",
      },
      {
        key: "removeTitle",
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
        type: "switch",
        text: "enableSwipeBetweenTabs-string",
      },
      {
        key: "saveLastUsedTab",
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
        text: "Enable DevTools",
      },
      {
        key: "electron.alwaysOnTop",
        type: "switch",
        text: "Always on top",
      },
      {
        key: "electron.centerOnOpen",
        type: "switch",
        text: "Center window when app opened",
      },
    ],
  },
  {
    title: "Discord",
    className: "discord",
    content: [
      {
        key: "discord.enableBot",
        type: "",
        text: "Invite bot",
        onClick: ()=>{
          native.open("https://discord.com/api/oauth2/authorize?client_id=726837711851356242&permissions=8&scope=bot")
        }
      },
    ],
  },
];

export default settings;
