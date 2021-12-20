package com.dergoogler.hentai;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.net.http.SslError;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.speech.tts.TextToSpeech;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.DownloadListener;
import android.webkit.JavascriptInterface;
import android.webkit.SslErrorHandler;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.security.GeneralSecurityException;
import java.util.Objects;

public class MainActivity extends AppCompatActivity {
    WebView webView;
    String langSetting = "?lang=";
    String urlCore = "https://dergoogler.com/hentai-web/" + langSetting;
    String urlCore_ = "192.168.178.81:5500" + langSetting; // For debugging
    String mainURL = urlCore; // Main url

    @RequiresApi(api = Build.VERSION_CODES.M)
    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        getWindow().setStatusBarColor(0xFF4A148C);

        Objects.requireNonNull(getSupportActionBar()).hide();

        webView = findViewById(R.id.web);

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setSupportZoom(false);
        webView.getSettings().setDomStorageEnabled(true);
        webView.setWebViewClient(new Client());
        webView.getSettings().setUserAgentString("HENTAI_WEB_AGENT");
        webView.setDownloadListener((url, userAgent, contentDisposition, mimetype, contentLength) -> {
            DownloadManager.Request request = new DownloadManager.Request(
                    Uri.parse(url));

            request.allowScanningByMediaScanner();
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED); // Notify client once download is completed!
            request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "Hentai-Web");
            DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
            dm.enqueue(request);
            Toast.makeText(getApplicationContext(), "Downloading File", // To notify the Client that the file is being downloaded
                    Toast.LENGTH_LONG).show();

        });
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
            public String BuildMANUFACTURER() {
                return Build.MANUFACTURER;
            }

            @JavascriptInterface
            public String BuildMODEL() {
                return Build.MODEL;
            }

            @JavascriptInterface
            public void reload() {
                Intent i = new Intent(MainActivity.this, MainActivity.class);
                finish();
                overridePendingTransition(0, 0);
                startActivity(i);
                overridePendingTransition(0, 0);
            }

            @JavascriptInterface
            public void copyToClipboard(String content) {
                ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                ClipData clip = ClipData.newPlainText("copy", content);
                clipboard.setPrimaryClip(clip);
            }
        }, "Android");
        webView.loadUrl(mainURL + getResources().getString(R.string.lang));
    }

    public class Client extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            if (url.contains(mainURL + getResources().getString(R.string.lang)) || url.contains(mainURL)) {
                view.loadUrl(url);
            } else {
                Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                startActivity(i);
            }
            return true;
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {

        if ((keyCode == KeyEvent.KEYCODE_BACK) && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
