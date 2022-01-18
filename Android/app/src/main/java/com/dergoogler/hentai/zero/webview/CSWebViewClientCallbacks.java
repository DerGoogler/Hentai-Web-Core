package com.dergoogler.hentai.zero.webview;

import androidx.annotation.CallSuper;
import androidx.annotation.NonNull;

public interface CSWebViewClientCallbacks {

    void onPageFinished(CSWebView view, String url);

    void onReadyToInject(@NonNull CSWebViewInjector injector, @NonNull String page);

}
