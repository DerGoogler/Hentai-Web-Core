package com.dergoogler.hentai.zero.webview;

import androidx.annotation.NonNull;
import androidx.annotation.RawRes;

public class CSWebViewInjector {

    private final CSWebViewInjections injections;

    public CSWebViewInjector(@NonNull CSWebViewInjections injections) {
        this.injections = injections;
    }

    public void injectCSS(@NonNull String code) {
        injections.css(code);
    }

    public void injectCSS(@RawRes int codeResource) {
        injections.css(codeResource);
    }

    public void injectJS(@NonNull String code) {
        injections.js(code);
    }

    public void injectJS(@RawRes int codeResource) {
        injections.js(codeResource);
    }
}
