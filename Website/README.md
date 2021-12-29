# Hentai Web

How to install:

- `npm install`
- `npm run build-dev`
- launch any `localhost`

## Add New Settings

Adding settings is really easy here

Add more settings in `dataPacks/settings.tsx`:

```tsx
const settings: SettingsInterface[] = [
  // Hidding statements for different platforms
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

  // Basic switch
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

  // Expandable content
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
      {
        key: "disableSplashscreen",
        type: "switch",
        text: "disableSplashscreen-string",
      },
    ],
  },

  // Complex setting
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
];

export default settings;
```

## Get an Setting

Check if user is logged in

```tsx
new Bootloader().doLogin();
```

Hide Elements with `tools.typeIF()` and `native.getPref()`

> The button gets hidden if `displayDownload` is `false` or `undefined`

```tsx
<Button
  style={{
    display: tools.typeIF(native.getPref("displayDownload"), "flex", "none"),
  }}
  onClick={this.handleClick}
  variant={this.buttonDesign}
>
  <Icon icon="md-more" />
</Button>
```

Complex usage with `tools.typeIF()`

```tsx
<img
  id={this.getID}
  src={source}
  alt={this.getNote}
  style={{
    width: "100%",
    borderRadius: tools.typeIF(
      native.getPref("fitImageToCard"),
      tools.typeIF(
        native.getPref("displayDownload"),
        tools.typeIF(
          native.getPref("removeTitle"),
          "0.25rem 0.25rem 0rem 0rem",
          "0rem 0rem 0rem 0rem"
        ),
        tools.typeIF(
          native.getPref("removeTitle"),
          "0.25rem 0.25rem 0.25rem 0.25rem",
          "0rem 0rem 0.25rem 0.25rem"
        )
      ),
      ".25rem"
    ),
  }}
/>
```

## Add native Android funtions

You can also add some simple Android funtions

First we need to declare the function in Android

```java
webView.addJavascriptInterface(new Object() {
            // ...
            @JavascriptInterface
            public void open(String link) {
                Uri uriUrl = Uri.parse(link);
                Intent launchBrowser = new Intent(Intent.ACTION_VIEW, uriUrl);
                startActivity(launchBrowser);
            }
            // ...
        }, "Android");
```

Then declare it in TypeScript

`Android` is in `native/androidi.ts`  

`Windows` is in `native/windows.i.ts`

```ts
export interface Android {
  // Some other funtions

  /**
   * @Native
   */
  open(link: string): void;

  // Some other funtions
}

export class android {
  /**
   * Builds the basic constructor
   */
  public constructor() {
    console.log("Android JS Bridge statred");
  }

  // Some other funtions

  /**
   * Opens an link from Android native method
   * @param link
   */
  static open(link: string): void {
    // config.options.userAgent needs to be import
    if (window.navigator.userAgent === config.options.userAgent) {
      return window.Android.decryptAES(password, text);
    } else {
      return window.atob(text);
    }
  }

  // Some other funtions

```
