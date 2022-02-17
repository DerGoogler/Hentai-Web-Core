package com.dergoogler.hentai.zero.webview;

import android.content.Context;
import android.net.Uri;
import android.webkit.ConsoleMessage;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

import com.dergoogler.hentai.zero.dialog.DialogBuilder;
import com.dergoogler.hentai.zero.log.Logger;
import com.dergoogler.hentai.zero.util.StringUtil;


/**
 * Custom WebChrome Client
 *
 * @author mcharima5@gmail.com
 * @since 2018
 */
public class CSWebChromeClient extends WebChromeClient {
    private static final String TAG = CSWebChromeClient.class.getSimpleName();

    private final Context context;

    // constructor
    public CSWebChromeClient(Context context) {
        this.context = context;
    }

    //++ [[START] Javascript Alert]
    public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
        Logger.i(TAG, "[WEBVIEW] onJsAlert(): url[" + view.getUrl() + "], message[" + message + "], JsResult[" + result + "]");

        //++
        // custom dialog
        String title = StringUtil.nvl(Uri.parse(url).getLastPathSegment(), "");

        DialogBuilder.with(context)
                .setTitle(title)
                .setMessage(message)
                .setPositiveButton(android.R.string.ok, (dialog, which) -> result.confirm())
                .show();
        return true;
        //||
        // default dialog
        //return super.onJsAlert(view, url, message, result);
        //--
    }
    //-- [[E N D] Javascript Alert]


    //++ [[START] Web Console Log]
    @Override
    public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
        Logger.i(TAG, "[WEBVIEW] " + consoleMessage.messageLevel() + ":CONSOLE] \"" + consoleMessage.message() + "\", source: " + consoleMessage.sourceId() + " (" + consoleMessage.lineNumber() + ")");
        return true;    // remove chromium log
        //return super.onConsoleMessage(consoleMessage);
    }
    //-- [[E N D] Web Console Log]

}
