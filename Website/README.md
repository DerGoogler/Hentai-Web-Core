# Hentai Web

How to install:

- `npm install`
- `npm run build-dev`
- launch any `localhost`

## Add own Settings

Adding settings is really easy here

Add more settings in `view/Settings/index.tsx`:

```tsx
<List>
  <ListHeader>
    <Translate text="appearance" />
  </ListHeader>
  <SettingsSwitch _key="enableDarkmode" disabled={true}>
    enableDarkmode-string
  </SettingsSwitch>
  <SettingsSwitch
    disabled={window.navigator.userAgent === config.options.userAgent}
    _key="useIOSdesign"
  >
    useIOSdesign-string
  </SettingsSwitch>
  <SettingsSwitch _key="hideFAB">hideFAB-string</SettingsSwitch>
  <SettingsSwitch _key="hideSearchbar">hideSearchbar-string</SettingsSwitch>
  <SettingsSelect _key="language">language-string</SettingsSelect>

  <ListHeader>
    <Translate text="card" />
  </ListHeader>
  <SettingsSwitch _key="fitImageToCard">fitImageToCard-string</SettingsSwitch>
  <SettingsSwitch _key="displayDownload">displayDownload-string</SettingsSwitch>
  <SettingsSwitch _key="removeTitle">removeTitle-string</SettingsSwitch>

  <ListHeader>
    <Translate text="security" />
  </ListHeader>
  <SettingsSwitch _key="alwaysLogin">alwaysLogin-string</SettingsSwitch>
  <SettingsSwitch
    disabled={window.navigator.userAgent != config.options.userAgent}
    _key="erudaEnabled"
  >
    erudaEnabled-string
  </SettingsSwitch>

  <ListHeader>
    <Translate text="others" />
  </ListHeader>
  <SettingsSwitch _key="enableSwipeBetweenTabs">enableSwipeBetweenTabs-string</SettingsSwitch>
  <SettingsSwitch _key="saveLastUsedTab">saveLastUsedTab-string</SettingsSwitch>
  <SettingsSwitch _key="disableSplashscreen">disableSplashscreen-string</SettingsSwitch>
</List>
```

## Get an Setting

If `loggedIn` is false it'll load the `<LoginActivity/>`

```tsx
if (android.getPref("loggedIn") === "false") {
  new Bootloader().loadActivity(<LoginActivity />);
}
```

Hide Elements with `tools.typeIF()` and `android.getPref()`

> The button gets hidden if `displayDownload` is `false` or `undefined`

```tsx
<Button
  style={{
    display: tools.typeIF(android.getPref("displayDownload"), "flex", "none"),
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
      android.getPref("fitImageToCard"),
      tools.typeIF(
        android.getPref("displayDownload"),
        tools.typeIF(
          android.getPref("removeTitle"),
          "0.25rem 0.25rem 0rem 0rem",
          "0rem 0rem 0rem 0rem"
        ),
        tools.typeIF(
          android.getPref("removeTitle"),
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
  static element: HTMLElement | null;
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
