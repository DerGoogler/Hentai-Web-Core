package com.dergoogler.hentai;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.DownloadManager;
import android.app.ProgressDialog;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.net.http.SslError;
import android.os.AsyncTask;
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

import java.io.File;
import java.security.GeneralSecurityException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

public class MainActivity extends AppCompatActivity {
    private SharedPreferences nativaeLocalstorage;
    WebView webView;
    String urlCore = "https://dergoogler.com/hentai-web/";
    String urlCore_ = "192.168.178.81:5500"; // For debugging
    String mainURL = urlCore; // Main url

    @RequiresApi(api = Build.VERSION_CODES.M)
    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        nativaeLocalstorage = getSharedPreferences("localstorage", Activity.MODE_PRIVATE);
        // getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        if (nativaeLocalstorage.getString("darkMode", "").equals("true")) {
            getWindow().setStatusBarColor(0xFF000000);
        } else {
            getWindow().setStatusBarColor(0xFF4A148C);
        }

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

            @JavascriptInterface
            public void setPref(String key, String content) {
                nativaeLocalstorage.edit().putString(key, content).apply();
            }

            @JavascriptInterface
            public String getPref(String key) {
                return nativaeLocalstorage.getString(key, "");
            }

            @JavascriptInterface
            public void removePref(String key) {
                nativaeLocalstorage.edit().remove(key).apply();
            }

            @JavascriptInterface
            public void downloadImage(String filename, String downloadUrlOfImage) {
                // Need to give permission to read an write external storage
                if (Build.VERSION.SDK_INT >= 23) {
                    if (checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_DENIED) {
                        requestPermissions(new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, 1000);
                    } else {
                        downloadImageNew(filename, downloadUrlOfImage);
                    }
                } else {
                    downloadImageNew(filename, downloadUrlOfImage);
                }
            }
        }, "Android");
        webView.loadUrl(mainURL);
    }

    public class Client extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            if (url.contains(mainURL)) {
                view.loadUrl(url);
            } else {
                Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                startActivity(i);
            }
            return true;
        }
    }

    // Download images form hentai web to the storage
    private void downloadImageNew(String filename, String downloadUrlOfImage) {
        try {
            DownloadManager dm = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
            Uri downloadUri = Uri.parse(downloadUrlOfImage);
            DownloadManager.Request request = new DownloadManager.Request(downloadUri);
            request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI | DownloadManager.Request.NETWORK_MOBILE)
                    .setAllowedOverRoaming(false)
                    .setTitle(filename)
                    .setMimeType("image/jpeg") // Your file type. You can use this code to download other file types also.
                    .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                    .setDestinationInExternalPublicDir(Environment.DIRECTORY_PICTURES, File.separator + filename + ".jpg");
            dm.enqueue(request);
            Toast.makeText(this, "Image download started.", Toast.LENGTH_SHORT).show();
        } catch (Exception e) {
            Toast.makeText(this, "Image download failed." + e, Toast.LENGTH_SHORT).show();
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
