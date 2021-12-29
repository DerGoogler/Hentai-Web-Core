package com.dergoogler.hentai.activity;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;

import com.dergoogler.hentai.BuildConfig;
import com.dergoogler.hentai.R;
import com.dergoogler.hentai.bridge.process.AndroidBridgeProcessActivityResult;
import com.dergoogler.hentai.zero.activity.BaseActivity;
import com.dergoogler.hentai.zero.dialog.DialogBuilder;
import com.dergoogler.hentai.zero.keyevent.BackKeyShutdown;
import com.dergoogler.hentai.zero.requetcode.RequestCode;
import com.dergoogler.hentai.zero.util.PackageUtil;
import com.dergoogler.hentai.zero.util.StringUtil;
import com.dergoogler.hentai.zero.webview.CSDownloadListener;
import com.dergoogler.hentai.zero.webview.CSFileChooserListener;
import com.dergoogler.hentai.zero.webview.CSWebChromeClient;
import com.dergoogler.hentai.zero.webview.CSWebViewClient;
import com.dergoogler.hentai.bridge.AndroidBridge;
import com.dergoogler.hentai.zero.log.Logger;
import com.dergoogler.hentai.webview.WebViewHelper;

import java.util.Objects;

/**
 * WebView Activity
 *
 * @author mcharima5@gmail.com
 * @since 2018
 */
public class WebViewActivity extends BaseActivity {
    private static final String TAG = WebViewActivity.class.getSimpleName();
    private SharedPreferences nativaeLocalstorage;
    private WebView webview;
    private CSWebChromeClient webChromeClient;
    private CSFileChooserListener webviewFileChooser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        init();

        if (BuildConfig.DEBUG) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                WebView.setWebContentsDebuggingEnabled(true);
            }
        }
    }

    @SuppressLint("AddJavascriptInterface")
    private void init() {
        ViewGroup contentView = findViewById(R.id.contentView);
        if (null == contentView) {
            DialogBuilder.with(getActivity())
                    .setMessage("The contentView does not exist.")
                    .setPositiveButton(android.R.string.ok, (dialog, which) -> finish())
                    .show();
            return;
        }

        // add webview
        this.webview = WebViewHelper.addWebView(getContext(), contentView);

        // options
        //this.webview.getSettings().setSupportMultipleWindows(true);

        // set user-agent
        try {
            String ua = this.webview.getSettings().getUserAgentString();
            if (!ua.endsWith(" ")) {
                ua += " ";
            }
            ua += PackageUtil.getApplicationName(this);
            ua += "/" + PackageUtil.getPackageVersionName(this);
            ua += "." + PackageUtil.getPackageVersionCode(this);
            this.webview.getSettings().setUserAgentString(ua);
        } catch (PackageManager.NameNotFoundException e) {
            Logger.e(TAG, e);
        }

        // set webViewClient
        CSWebViewClient webviewClient = new CSWebViewClient(getContext());
        this.webview.setWebViewClient(webviewClient);

        // set webChromeClient
        this.webChromeClient = new CSWebChromeClient(getContext());
        this.webview.setWebChromeClient(this.webChromeClient);

        // set fileChooser
        this.webviewFileChooser = new CSFileChooserListener(getContext());
        this.webChromeClient.setFileChooserListener(this.webviewFileChooser);

        // add interface
        this.webview.addJavascriptInterface(new AndroidBridge(webview), "Android");

        // add download listener
        this.webview.setDownloadListener(new CSDownloadListener(getActivity()));
        nativaeLocalstorage = this.getSharedPreferences("localstorage", Activity.MODE_PRIVATE);

        if (nativaeLocalstorage.getString("enableDarkmode", "").equals("true")) {
            getWindow().setStatusBarColor(0xFF1f1f1f);
        } else {
            getWindow().setStatusBarColor(0xFF4A148C);
        }

        if (nativaeLocalstorage.getString("useIOSdesign", "").equals("true")) {
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
            getWindow().setStatusBarColor(0xFFFAFAFA);
        } else {
            getWindow().setStatusBarColor(0xFF4A148C);
        }


        Objects.requireNonNull(getSupportActionBar()).hide();

        String urlCore = "https://dergoogler.com/hentai-web/";
        String urlCore_ = "http://192.168.178.81:5500"; // For debugging
        String mainURL = urlCore_; // Main url

        WebViewHelper.loadUrl(this.webview, mainURL);
        WebViewHelper.setUserAgentString(this.webview, "HENTAI_WEB_AGENT");
        //WebViewHelper.loadUrl(this.webview, "https://www.google.com");
    }

    @Override
    protected void onDestroy() {
        WebViewHelper.removeWebView(this.webview);
        this.webview = null;
        super.onDestroy();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (KeyEvent.KEYCODE_BACK == keyCode) {
            Logger.i(TAG, "[ACTIVITY] onKeyDown(): WebView isVideoPlayingInFullscreen = " + this.webChromeClient.isVideoPlayingInFullscreen());
            if (this.webChromeClient.isVideoPlayingInFullscreen()) {
                return false;
            }

            // multiple windows go back
            if (null != this.webChromeClient.getNewWebView()) {
                Logger.i(TAG, "[ACTIVITY] onKeyDown(): NewWebView canGoBack = " + this.webChromeClient.getNewWebView().canGoBack());
                if (this.webChromeClient.getNewWebView().canGoBack()) {
                    this.webChromeClient.getNewWebView().goBack();
                    return true;
                } else {
                    this.webChromeClient.closeNewWebView();
                }
                return true;
            }

            Logger.i(TAG, "[ACTIVITY] onKeyDown(): WebView canGoBack = " + this.webview.canGoBack());
            // go back
            if (this.webview.canGoBack()) {
                this.webview.goBack();
                return true;
            }

            if (BackKeyShutdown.isFirstBackKeyPress(keyCode, event)) {
                DialogBuilder.with(getContext())
                        .setMessage("Please the Back button once more shut down.")
                        .toast();
                return true;
            }
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (null == data) {
            Logger.i(TAG, "[ACTIVITY] onActivityResult(): requestCode[" + requestCode + "],  resultCode[" + resultCode + "],  data[null]");
        } else {
            Logger.i(TAG, "[ACTIVITY] onActivityResult(): requestCode[" + requestCode + "],  resultCode[" + resultCode + "],  data[" +
                    "\n  action = " + data.getAction() +
                    "\n  scheme = " + data.getScheme() +
                    "\n  data = " + data.getData() +
                    "\n  type = " + data.getType() +
                    "\n  extras = " + StringUtil.toString(data.getExtras()) +
                    "\n]");
        }

        //++ [[START] File Chooser]
        if (RequestCode.REQUEST_FILE_CHOOSER_NORMAL == requestCode) {
            Logger.i(TAG, "[ACTIVITY] onActivityResult(): REQUEST_FILE_CHOOSER_NORMAL");
            this.webviewFileChooser.onActivityResultFileChooserNormal(requestCode, resultCode, data);
        } else if (RequestCode.REQUEST_FILE_CHOOSER_LOLLIPOP == requestCode) {
            Logger.i(TAG, "[ACTIVITY] onActivityResult(): REQUEST_FILE_CHOOSER_LOLLIPOP");
            this.webviewFileChooser.onActivityResultFileChooserLollipop(requestCode, resultCode, data);
        }
        //-- [[E N D] File Chooser]

        //++ [[START] Take a picture]
        if (RequestCode.REQUEST_TAKE_A_PICTURE == requestCode) {
            Logger.i(TAG, "[ACTIVITY] onActivityResult(): REQUEST_TAKE_A_PICTURE");
            AndroidBridgeProcessActivityResult.onActivityResultTakePicture(this.webview, requestCode, resultCode, data);
        }
        //++ [[E N D] Take a picture]

        super.onActivityResult(requestCode, resultCode, data);
    }

}
