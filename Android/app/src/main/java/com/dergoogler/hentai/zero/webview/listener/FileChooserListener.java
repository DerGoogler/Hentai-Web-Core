package com.dergoogler.hentai.zero.webview.listener;

import android.net.Uri;
import android.webkit.ValueCallback;
import android.webkit.WebView;

/**
 * File Chooser Listener
 *
 * @author mcharima5@gmail.com
 * @since 2020
 */
public interface FileChooserListener {

    @SuppressWarnings({"unused", "RedundantSuppression"})
    void onOpenFileChooserNormal(WebView webView, ValueCallback<Uri> filePathCallback, String acceptType);

    @SuppressWarnings({"unused", "RedundantSuppression"})
    void onOpenFileChooserLollipop(WebView webView, ValueCallback<Uri[]> filePathCallback, String[] acceptType);

}