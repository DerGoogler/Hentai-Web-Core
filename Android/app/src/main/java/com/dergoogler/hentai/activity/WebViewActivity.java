package com.dergoogler.hentai.activity;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;

import androidx.biometric.BiometricPrompt;

import android.os.Build;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.content.ContextCompat;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.dergoogler.hentai.BuildConfig;
import com.dergoogler.hentai.R;
import com.dergoogler.hentai.bridge.NodeBridge;
import com.dergoogler.hentai.tools.Lib;
import com.dergoogler.hentai.zero.activity.BaseActivity;
import com.dergoogler.hentai.zero.dialog.DialogBuilder;
import com.dergoogler.hentai.zero.keyevent.BackKeyShutdown;
import com.dergoogler.hentai.zero.requetcode.RequestCode;
import com.dergoogler.hentai.zero.util.FileUtil;
import com.dergoogler.hentai.zero.util.PackageUtil;
import com.dergoogler.hentai.zero.util.StringUtil;
import com.dergoogler.hentai.zero.webview.CSDownloadListener;
import com.dergoogler.hentai.zero.webview.CSFileChooserListener;
import com.dergoogler.hentai.zero.webview.CSWebChromeClient;
import com.dergoogler.hentai.zero.webview.CSWebViewClient;
import com.dergoogler.hentai.bridge.AndroidBridge;
import com.dergoogler.hentai.zero.log.Logger;
import com.dergoogler.hentai.webview.WebViewHelper;

import java.io.File;
import java.util.Objects;
import java.util.concurrent.Executor;

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
    private String urlCore = Lib.getReleaseURl();
    private String urlCore_ = Lib.getDebugURl(); // For debugging
    private String mainURL = urlCore_; // Main url

    @RequiresApi(api = Build.VERSION_CODES.P)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        nativaeLocalstorage = this.getSharedPreferences(Lib.getStorageKey(), Activity.MODE_PRIVATE);
        Executor executor = ContextCompat.getMainExecutor(this);
        BiometricPrompt biometricPrompt = new BiometricPrompt(WebViewActivity.this,
                executor, new BiometricPrompt.AuthenticationCallback() {
            @Override
            public void onAuthenticationError(int errorCode,
                                              @NonNull CharSequence errString) {
                super.onAuthenticationError(errorCode, errString);
                Toast.makeText(getApplicationContext(),
                        "Authentication error: " + errString + "(" + errorCode + ")", Toast.LENGTH_SHORT)
                        .show();
            }

            @Override
            public void onAuthenticationSucceeded(
                    @NonNull BiometricPrompt.AuthenticationResult result) {
                super.onAuthenticationSucceeded(result);
                init();
            }

            @Override
            public void onAuthenticationFailed() {
                super.onAuthenticationFailed();
                Toast.makeText(getApplicationContext(), "Authentication failed",
                        Toast.LENGTH_SHORT)
                        .show();
            }
        });

        BiometricPrompt.PromptInfo promptInfo = new BiometricPrompt.PromptInfo.Builder()
                .setTitle("Biometric login for Hentai Web")
                .setSubtitle("Log in using your biometric credential")
                .setNegativeButtonText("Use password")
                .build();

        if (nativaeLocalstorage.getString("useFingerPrintToLogin", "").equals("true")) {
            biometricPrompt.authenticate(promptInfo);
        } else {
            init();
        }

        if (BuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
    }

    @SuppressLint("AddJavascriptInterface")
    private void init() {
        WebView contentView = findViewById(R.id.contentView);

        if (null == contentView) {
            DialogBuilder.with(getActivity())
                    .setMessage("The contentView does not exist.")
                    .setPositiveButton(android.R.string.ok, (dialog, which) -> finish())
                    .show();
            return;
        }

        this.webview = WebViewHelper.addWebView(getContext(), contentView);

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
        this.webview.addJavascriptInterface(new AndroidBridge(webview), Lib.getInterfaceName());

        // add download listener
        this.webview.setDownloadListener(new CSDownloadListener(getActivity()));

        Objects.requireNonNull(getSupportActionBar()).hide();

        WebViewHelper.loadUrl(this.webview, mainURL);
        WebViewHelper.setUserAgentString(this.webview, Lib.getUserAgent());
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

        super.onActivityResult(requestCode, resultCode, data);
    }
}

