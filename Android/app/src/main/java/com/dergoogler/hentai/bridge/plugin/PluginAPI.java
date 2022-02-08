package com.dergoogler.hentai.bridge.plugin;

import android.webkit.WebView;

import com.dergoogler.hentai.bridge.AndroidBridge;
import com.dergoogler.hentai.zero.json.JSONHelper;
import com.dergoogler.hentai.zero.log.Logger;

import org.json.JSONObject;

/**
 * Plugin
 *
 * @author mcharima5@gmail.com
 * @since 2022
 */
@SuppressWarnings({"InstantiationOfUtilityClass", "unused", "RedundantSuppression"})
public class PluginAPI implements Plugin {
    private static final String TAG = PluginAPI.class.getSimpleName();

    private static final PluginAPI mInstance = new PluginAPI();
    public static PluginAPI getInstance() {
        return mInstance;
    }

    /////////////////////////////////////////////////

    public static void recommended(final WebView webview, final JSONObject args, final String cbId) {
        Logger.i(TAG, "[WEBVIEW] recommended : args[" + args + "], cbId[" + cbId + "]");

        new Thread(() -> {

            // test code...
            try {
                Thread.sleep(1000);
            } catch (Exception e) {
                Logger.e(TAG, e);
            }
            //--

            JSONObject jsonObject = new JSONObject();
            JSONHelper.put(jsonObject, "result", "success");

            // send result
            AndroidBridge.callFromNative(webview, cbId, "00000", jsonObject.toString());
        }).start();
    }
}
