package com.dergoogler.hentai.bridge.plugin;

import android.webkit.WebView;

import com.dergoogler.hentai.zero.dialog.DialogBuilder;
import com.dergoogler.hentai.zero.json.JSONHelper;
import com.dergoogler.hentai.zero.log.Logger;
import com.dergoogler.hentai.zero.reflect.ReflectHelper;

import org.json.JSONObject;

import java.lang.reflect.Method;

/**
 * WebView JavaScript Interface Process
 *
 * @author mcharima5@gmail.com
 * @since 2022
 */
public class AndroidBridgePlugin {
    private static final String TAG = AndroidBridgePlugin.class.getSimpleName();

    /////////////////////////////////////////////////
    // Plugins

    private static final String PLUGIN_API = "api";
    private static final String PLUGIN_CAMERA = "camera";


    /////////////////////////////////////////////////
    // Method

    public static boolean execute(WebView webView, JSONObject jsonObject) {
        //final String hostCommand = JSONHelper.getString(jsonObject, "hostCommand", "");
        final String pluginName = JSONHelper.getString(jsonObject, "plugin", "");
        final String methodName = JSONHelper.getString(jsonObject, "method", "");
        final JSONObject args = JSONHelper.getJSONObject(jsonObject, "args", new JSONObject());
        final String callback = JSONHelper.getString(jsonObject, "callback", "");
        final String cbId = JSONHelper.getString(jsonObject, "cbId", "");

        Logger.i(TAG, "[WEBVIEW] callNativeMethod: execute() :  plugin = " + pluginName + ", method = " + methodName + ",  args = " + args + ",  callback = " + callback);

        try {
            Plugin plugin = null;
            if (PLUGIN_API.equals(pluginName)) {
                plugin = PluginAPI.getInstance();
            }

            if (null == plugin) {
                Logger.e(TAG, "[WEBVIEW] plugin is null");
                throw new Exception("plugin is null");
            }

            Method method = ReflectHelper.getMethod(plugin, methodName);
            if (null == method) {
                Logger.e(TAG, "[WEBVIEW] method is null");
                throw new Exception("method is null");
            }

            ReflectHelper.invoke(plugin, method, webView, args, cbId);
            return true;

        } catch (Exception e) {
            Logger.e(TAG, e);
            DialogBuilder.with(webView.getContext())
                    .setMessage(e.toString())
                    .show();
        }
        return false;
    }

}
