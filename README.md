# Hentai Web
Get updates in the [Telegram](https://t.me/HentaiWebUpdates) channel.   
           
Lets get started! The sources listed below:

- `/Website` Source for the website
- `/Windows` Source for Windows
- `/Android` Source for Andorid

# Website (Main)

The website is the base fragment, here runs all the code.

## Installing

The install is simple, before you need [Node.js](https://nodejs.org) installed. Install all packages with `npm i` or `npm install`. To build the final source run `npm run build-dev` and run it with an live server ([Live Server for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer))

Some string are in `strings.ts`, but not all. You're need to search manually.

# Android

At the first need you Android Studio ([Download it here](https://developer.android.com/studio))

Download it as zip and open it in Android Studio

Add need Js funtions to the webview:
```java
webView.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public void showMessage(String content) {
                Toast.makeText(MainActivity.this, content, Toast.LENGTH_SHORT).show();
            }

            @JavascriptInterface
            public String encryptAES(String password, String text) throws GeneralSecurityException {
                return AESCrypt.encrypt(password, text);
            }

            @JavascriptInterface
            public String decryptAES(String password, String text) throws GeneralSecurityException {
                return AESCrypt.decrypt(password, text);
            }

            @JavascriptInterface
            public void open(String link) {
                Uri uriUrl = Uri.parse(link);
                Intent launchBrowser = new Intent(Intent.ACTION_VIEW, uriUrl);
                startActivity(launchBrowser);
            }

            @JavascriptInterface
            public void copyToClipboard(String content) {
                ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                ClipData clip = ClipData.newPlainText("copy", content);
                clipboard.setPrimaryClip(clip);
            }
        }, "Android");
```


# Windows

The Windows app and design is currently not working, also is it current not used, Windows app is useless to build.
