package com.dergoogler.hentai.bridge;

import android.Manifest;
import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.view.View;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.biometric.BiometricManager;
import androidx.browser.customtabs.CustomTabColorSchemeParams;
import androidx.browser.customtabs.CustomTabsIntent;

import com.dergoogler.hentai.activity.WebViewActivity;
import com.dergoogler.hentai.tools.Lib;
import com.dergoogler.hentai.zero.download.CSDownloadManager;
import com.dergoogler.hentai.zero.util.FileUtil;
import com.dergoogler.hentai.zero.util.PackageUtil;

public class AndroidBridge {
    private static final String TAG = AndroidBridge.class.getSimpleName();
    private final WebView webView;


    public AndroidBridge(WebView webView) {
        this.webView = webView;
    }


    @JavascriptInterface
    public void showMessage(String content) {
        Toast.makeText(webView.getContext(), content, Toast.LENGTH_SHORT).show();
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
        SharedPreferences nativaeLocalstorage = webView.getContext().getSharedPreferences(Lib.getStorageKey(), Activity.MODE_PRIVATE);
        nativaeLocalstorage.edit().putString(key, content).apply();
    }

    @JavascriptInterface
    public String getPref(String key) {
        SharedPreferences nativaeLocalstorage = webView.getContext().getSharedPreferences(Lib.getStorageKey(), Activity.MODE_PRIVATE);
        return nativaeLocalstorage.getString(key, "");
    }

    @JavascriptInterface
    public void removePref(String key) {
        SharedPreferences nativaeLocalstorage = webView.getContext().getSharedPreferences(Lib.getStorageKey(), Activity.MODE_PRIVATE);
        nativaeLocalstorage.edit().remove(key).apply();
    }

    @JavascriptInterface
    public void setStatusbarColor(String color) {
        try {
            ((Activity) webView.getContext()).getWindow().setStatusBarColor(Color.parseColor(color));
        } catch (Exception e) {
            Toast.makeText(webView.getContext(), e.toString(), Toast.LENGTH_SHORT).show();
        }
    }

    @JavascriptInterface
    public boolean isHardwareAvailable() {
        BiometricManager bm = BiometricManager.from(webView.getContext());
        int canAuthenticate = bm.canAuthenticate();
        return !(canAuthenticate == BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE || canAuthenticate == BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE);

    }

    @JavascriptInterface
    public boolean hasBiometricEnrolled() {
        BiometricManager bm = BiometricManager.from(webView.getContext());
        int canAuthenticate = bm.canAuthenticate();
        return (canAuthenticate == BiometricManager.BIOMETRIC_SUCCESS);

    }

    @JavascriptInterface
    public void setStatusbarBackgroundWhite() {
        try {
            ((Activity) webView.getContext()).getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        } catch (Exception e) {
            Toast.makeText(webView.getContext(), e.toString(), Toast.LENGTH_SHORT).show();
        }
    }

    @JavascriptInterface
    public void keepScreenOn() {
        try {
            ((Activity) webView.getContext()).getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        } catch (Exception e) {
            Toast.makeText(webView.getContext(), e.toString(), Toast.LENGTH_SHORT).show();
        }
    }

    @JavascriptInterface
    public void downloadImage(String downloadUrlOfImage) {
        // Need to give permission to read an write external storage
        if (webView.getContext().checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_DENIED) {
            ((Activity) webView.getContext()).requestPermissions(new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, 1000);
        } else {
            try {
                new CSDownloadManager().download(webView.getContext(), downloadUrlOfImage);
                Toast.makeText(webView.getContext(), "Image download started.", Toast.LENGTH_SHORT).show();
            } catch (Exception e) {
                Toast.makeText(webView.getContext(), "Image download failed." + e, Toast.LENGTH_SHORT).show();
            }
        }
    }

    @JavascriptInterface
    public boolean hasStoragePermission() {
        return webView.getContext().checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED;
    }

    @RequiresApi(api = Build.VERSION_CODES.R)
    @JavascriptInterface
    public void requestStoargePermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
            Uri uri = Uri.fromParts("package", ((Activity) webView.getContext()).getPackageName(), null);
            intent.setData(uri);
            ((Activity) webView.getContext()).startActivity(intent);
        } else {
            //below android 11=======
            ((Activity) webView.getContext()).requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.MANAGE_EXTERNAL_STORAGE}, 1000);
        }
    }

    @JavascriptInterface
    public void close() {
        ((Activity) webView.getContext()).finishAffinity();
        int pid = android.os.Process.myPid();
        android.os.Process.killProcess(pid);
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        webView.getContext().startActivity(intent);
    }

    @JavascriptInterface
    public String readFile(String path) {
        return FileUtil.readFile(FileUtil.getExternalStorageDir() + "/hentai-web/" + path);
    }

    @JavascriptInterface
    public void writeFile(String path, String content) {
        FileUtil.writeFile(FileUtil.getExternalStorageDir() + "/hentai-web/" + path, content);
    }

    @JavascriptInterface
    public void mkDir(String path) {
        FileUtil.makeDir(FileUtil.getExternalStorageDir() + "/hentai-web/" + path);
    }

    @JavascriptInterface
    public String getVersion() throws PackageManager.NameNotFoundException {
        return PackageUtil.getPackageVersionName(webView.getContext());
    }

    @JavascriptInterface
    public boolean isFileExist(String path) {
        return FileUtil.isExistFile(FileUtil.getExternalStorageDir() + "/hentai-web/" + path);
    }
}