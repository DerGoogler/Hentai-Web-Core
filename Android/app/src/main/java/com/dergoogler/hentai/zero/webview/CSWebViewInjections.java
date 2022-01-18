package com.dergoogler.hentai.zero.webview;

import androidx.annotation.NonNull;
import androidx.annotation.RawRes;

public interface CSWebViewInjections {

    void css(@NonNull String code);
    void css(@RawRes int codeResource);
    void js(@NonNull String code);
    void js(@RawRes int codeResource);

}
