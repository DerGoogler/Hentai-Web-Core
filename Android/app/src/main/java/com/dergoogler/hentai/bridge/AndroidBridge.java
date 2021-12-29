package com.dergoogler.hentai.bridge;

import android.Manifest;
import android.app.Activity;
import android.app.DownloadManager;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.browser.customtabs.CustomTabColorSchemeParams;
import androidx.browser.customtabs.CustomTabsIntent;

import com.dergoogler.hentai.BuildConfig;
import com.dergoogler.hentai.tools.AESCrypt;
import com.dergoogler.hentai.activity.WebViewActivity;
import com.dergoogler.hentai.bridge.process.AndroidBridgeProcess;
import com.dergoogler.hentai.zero.dialog.DialogBuilder;
import com.dergoogler.hentai.zero.json.JSONHelper;
import com.dergoogler.hentai.zero.log.Logger;
import com.dergoogler.hentai.zero.reflect.ReflectHelper;

import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.security.GeneralSecurityException;
import java.util.HashMap;
import java.util.Map;

/**
 * WebView JavaScript Interface Bridge
 *
 * @author mcharima5@gmail.com
 * @since 2018
 */
public class AndroidBridge {
    private static final String TAG = AndroidBridge.class.getSimpleName();
    private SharedPreferences nativaeLocalstorage;

    private static final String SCHEME_BRIDGE = "native";

    private static final String HOST_COMMAND = "callNative";
    private static final String HOST_COMMAND2 = "callToNative";

    private static final String SCHEME_JAVASCRIPT = "javascript:";

    private final WebView webView;

    private static final Map<String, String> callbackFunctionNames = new HashMap<>();
    private static File extraOutput;

    // constructor
    public AndroidBridge(WebView webView) {
        this.webView = webView;
    }


    //++ [START] call Web --> Native

    // ex) "native://callNative?" + btoa(encodeURIComponent(JSON.stringify({ command:\"apiSample\", args{max:1,min:1}, callback:\"callbackNativeResponse\" })))
    @JavascriptInterface
    public boolean callNativeMethod(String urlString) {
        //Logger.i(TAG, "[WEBVIEW] callNativeMethod: " + urlString);
        try {
            return executeProcess(this.webView, parse(urlString));
        } catch (Exception e) {
            Logger.e(TAG, e);

            DialogBuilder.with(webView.getContext())
                    .setMessage(e.toString())
                    .show();
        }
        return false;
    }

    private boolean executeProcess(final WebView webview, final JSONObject jsonObject) {
        final String hostCommand = JSONHelper.getString(jsonObject, "hostCommand", "");
        final String command = JSONHelper.getString(jsonObject, "command", "");
        final JSONObject args = JSONHelper.getJSONObject(jsonObject, "args", new JSONObject());
        final String callback = JSONHelper.getString(jsonObject, "callback", "");
        final String cbId = JSONHelper.getString(jsonObject, "cbId", "");

        Logger.i(TAG, "[WEBVIEW] callNativeMethod: executeProcess() :  command = " + command + ",  args = " + args + ",  callback = " + callback);

        final AndroidBridgeProcess process = AndroidBridgeProcess.getInstance();
        final Method method = ReflectHelper.getMethod(process, command);
        if (null == method) {
            Logger.e(TAG, "[WEBVIEW] method is null");
            return false;
        }

        try {
            if (HOST_COMMAND2.equals(hostCommand)) {
                ReflectHelper.invoke(process, method, webview, args, cbId);
            } else {
                ReflectHelper.invoke(process, method, webview, args, callback);
            }
            return true;
        } catch (Exception e) {
            Logger.e(TAG, e);
            DialogBuilder.with(webView.getContext())
                    .setMessage(e.toString())
                    .show();
        }
        return false;
    }

    private JSONObject parse(String urlString) throws IOException {
        Uri uri = Uri.parse(urlString);
        Logger.i(TAG, "[WEBVIEW] callNativeMethod: parse() : uri = " + uri);

        if (!SCHEME_BRIDGE.equals(uri.getScheme())) {
            throw new IOException("\"" + uri.getScheme() + "\" scheme is not supported.");
        }
        if (!HOST_COMMAND.equals(uri.getHost())
                && !HOST_COMMAND2.equals(uri.getHost())) {
            throw new IOException("\"" + uri.getHost() + "\" host is not supported.");
        }

        String query = uri.getEncodedQuery();
        try {
            query = new String(Base64.decode(query, Base64.DEFAULT));
            query = URLDecoder.decode(query, "utf-8");
            JSONObject jsonObject = new JSONObject(query);
            jsonObject.put("hostCommand", uri.getHost());
            return jsonObject;
        } catch (Exception e) {
            throw new IOException("\"" + query + "\" is not JSONObject.");
        }
    }

    //-- [E N D] call Web --> Native


    //++ [START] call Native --> Web

    public static void callFromNative(WebView webView, String cbId, String resultCode, String jsonString) {
        String param = "'" + cbId + "', '" + resultCode + "', '" + jsonString + "'";

        String buff = "!(function() {\n" +
                "  try {\n" +
                "    NativeBridge.callFromNative(" + param + ");\n" +
                "  } catch(e) {\n" +
                "    return '[JS Error] ' + e.message;\n" +
                "  }\n" +
                "})(window);";
        webView.post(() -> evaluateJavascript(webView, buff));
    }

    public static void callJSFunction(final WebView webView, String functionName, String... params) {
        if (functionName.startsWith("function")
                || functionName.startsWith("(")) {
            String buff = "!(\n" +
                    functionName +
                    ")(" + makeParam(params) + ");";
            webView.post(() -> evaluateJavascript(webView, buff));
        } else {
            String js = makeJavascript(functionName, params);
            String buff = "!(function() {\n" +
                    "  try {\n" +
                    "    " + js + "\n" +
                    "  } catch(e) {\n" +
                    "    return '[JS Error] ' + e.message;\n" +
                    "  }\n" +
                    "})(window);";
            webView.post(() -> evaluateJavascript(webView, buff));
        }
    }

    public static String makeJavascript(String functionName, String... params) {
        return functionName + "(" + makeParam(params) + ");";
    }

    public static String makeParam(String... params) {
        final StringBuilder buff = new StringBuilder();
        for (int i = 0; i < params.length; i++) {
            Object param = params[i];

            // 데이터 설정
            if (null != param) {
                buff.append("'").append(param).append("'");
            } else {
                buff.append("''");
            }

            if (i < params.length - 1) {
                buff.append(", ");
            }
        }
        return buff.toString();
    }

    private static void evaluateJavascript(final WebView webView, final String javascriptString) {
        String jsString = javascriptString;

        if (jsString.startsWith(SCHEME_JAVASCRIPT)) {
            jsString = jsString.substring(SCHEME_JAVASCRIPT.length());
        }

        jsString = jsString.replaceAll("\t", "    ");

        // Android 4.4 (KitKat, 19) or higher
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            webView.evaluateJavascript(jsString, value -> Logger.i(TAG, "[WEBVIEW] onReceiveValue: " + value));
        }
        // Android 4.3 or lower (Jelly Bean, 18)
        else {
            webView.loadUrl(SCHEME_JAVASCRIPT + jsString);
        }
    }

    //-- [E N D] call Native --> Web


    //++ [[START] for JS Callback]

    public static void setCallbackJSFunctionName(int requestCode, String functionName) {
        callbackFunctionNames.put(String.valueOf(requestCode), functionName);
    }

    public static String getCallbackJSFunctionName(int requestCode) {
        return callbackFunctionNames.remove(String.valueOf(requestCode));
    }

    public static File getExtraOutput(boolean pop) {
        if (pop) {
            File file = extraOutput;
            extraOutput = null;
            return file;
        }
        return extraOutput;
    }

    @JavascriptInterface
    public void showMessage(String content) {
        Toast.makeText(webView.getContext(), content, Toast.LENGTH_SHORT).show();
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
        CustomTabsIntent.Builder intentBuilder = new CustomTabsIntent.Builder();
        CustomTabColorSchemeParams params = new CustomTabColorSchemeParams.Builder()
                .setToolbarColor(0XFFFFFFFF)
                .build();
        CustomTabsIntent customTabsIntent = intentBuilder.build();
        customTabsIntent.launchUrl(webView.getContext(), uriUrl);
    }

    @JavascriptInterface
    public String BuildMANUFACTURER() {
        return Build.MANUFACTURER;
    }

    @JavascriptInterface
    public String BuildMODEL() {
        return Build.MODEL;
    }

    @JavascriptInterface
    public String getAppManifest(String state) {
        switch (state) {
            case "vasionName":
                return BuildConfig.VERSION_NAME;
            case "versionCode":
                return String.valueOf(BuildConfig.VERSION_CODE);
            case "packageName":
                return BuildConfig.APPLICATION_ID;
        }
        return state;
    }

    @JavascriptInterface
    public void reload() {
        Intent i = new Intent(webView.getContext(), WebViewActivity.class);
        ((Activity) webView.getContext()).finish();
        ((Activity) webView.getContext()).overridePendingTransition(0, 0);
        webView.getContext().startActivity(i);
        ((Activity) webView.getContext()).overridePendingTransition(0, 0);
    }

    @JavascriptInterface
    public void copyToClipboard(String content) {
        ClipboardManager clipboard = (ClipboardManager) webView.getContext().getSystemService(Context.CLIPBOARD_SERVICE);
        ClipData clip = ClipData.newPlainText("copy", content);
        clipboard.setPrimaryClip(clip);
    }

    @JavascriptInterface
    public void setPref(String key, String content) {
        nativaeLocalstorage = webView.getContext().getSharedPreferences("localstorage", Activity.MODE_PRIVATE);
        nativaeLocalstorage.edit().putString(key, content).apply();
    }

    @JavascriptInterface
    public String getPref(String key) {
        nativaeLocalstorage = webView.getContext().getSharedPreferences("localstorage", Activity.MODE_PRIVATE);
        return nativaeLocalstorage.getString(key, "");
    }

    @JavascriptInterface
    public void removePref(String key) {
        nativaeLocalstorage = webView.getContext().getSharedPreferences("localstorage", Activity.MODE_PRIVATE);
        nativaeLocalstorage.edit().remove(key).apply();
    }

    @JavascriptInterface
    public void downloadImage(String filename, String downloadUrlOfImage) {
        // Need to give permission to read an write external storage
        if (Build.VERSION.SDK_INT >= 23) {
            if (webView.getContext().checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_DENIED) {
                ((Activity) webView.getContext()).requestPermissions(new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, 1000);
            } else {
                try {
                    DownloadManager dm = (DownloadManager) webView.getContext().getSystemService(Context.DOWNLOAD_SERVICE);
                    Uri downloadUri = Uri.parse(downloadUrlOfImage);
                    DownloadManager.Request request = new DownloadManager.Request(downloadUri);
                    request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI | DownloadManager.Request.NETWORK_MOBILE)
                            .setAllowedOverRoaming(false)
                            .setTitle(filename)
                            .setMimeType("image/jpeg") // Your file type. You can use this code to download other file types also.
                            .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                            .setDestinationInExternalPublicDir(Environment.DIRECTORY_PICTURES, File.separator + filename + ".jpg");
                    dm.enqueue(request);
                    Toast.makeText(webView.getContext(), "Image download started.", Toast.LENGTH_SHORT).show();
                } catch (Exception e) {
                    Toast.makeText(webView.getContext(), "Image download failed." + e, Toast.LENGTH_SHORT).show();
                }
            }
        } else {
            try {
                DownloadManager dm = (DownloadManager) webView.getContext().getSystemService(Context.DOWNLOAD_SERVICE);
                Uri downloadUri = Uri.parse(downloadUrlOfImage);
                DownloadManager.Request request = new DownloadManager.Request(downloadUri);
                request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI | DownloadManager.Request.NETWORK_MOBILE)
                        .setAllowedOverRoaming(false)
                        .setTitle(filename)
                        .setMimeType("image/jpeg") // Your file type. You can use this code to download other file types also.
                        .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                        .setDestinationInExternalPublicDir(Environment.DIRECTORY_PICTURES, File.separator + filename + ".jpg");
                dm.enqueue(request);
                Toast.makeText(webView.getContext(), "Image download started.", Toast.LENGTH_SHORT).show();
            } catch (Exception e) {
                Toast.makeText(webView.getContext(), "Image download failed." + e, Toast.LENGTH_SHORT).show();
            }
        }
    }

    public static void setExtraOutput(File file) {
        extraOutput = file;
    }

    //-- [[E N D] for JS Callback]

}
