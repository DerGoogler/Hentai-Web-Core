package com.dergoogler.hentai.webview;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.dergoogler.hentai.BuildConfig;

import com.dergoogler.hentai.zero.permission.RPermission;
import com.dergoogler.hentai.zero.permission.RPermissionListener;
import com.dergoogler.hentai.zero.util.PackageUtil;
import com.dergoogler.hentai.zero.log.Logger;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class WebViewHelper {
    private static final String TAG = WebViewHelper.class.getSimpleName();

    private static final String SCHEME_HTTP = "http://";
    private static final String SCHEME_HTTPS = "https://";
    private static final String SCHEME_FILE = "file://";
    private static final String SCHEME_ASSET = "file:///android_asset";
    private static final String SCHEME_ASSET_API30 = SCHEME_HTTPS + BuildConfig.ASSET_BASE_DOMAIN + BuildConfig.ASSET_PATH;
    private static final String SCHEME_RES = "file:///android_res";
    private static final String SCHEME_RES_API30 = SCHEME_HTTPS + BuildConfig.ASSET_BASE_DOMAIN + BuildConfig.RES_PATH;

    public static WebView addWebView(Context context, ViewGroup parentView) {
        WebView webView = newWebView(context);
        parentView.addView(webView);
        return webView;
    }

    public static void removeWebView(WebView webView) {
        if (null != webView) {
            webView.setWebChromeClient(null);
            webView.setWebViewClient(null);
            webView.destroy();
        }
    }

    private static WebView newWebView(Context context) {
        WebView webView = new WebView(context);
        ViewGroup.LayoutParams params = new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT);
        webView.setLayoutParams(params);
        //webView.setBackgroundColor(Color.TRANSPARENT);
        //webView.setBackgroundResource(android.R.color.white);

        // setup
        setup(webView);

        return webView;
    }

    @SuppressLint({"SetJavaScriptEnabled", "JavascriptInterface", "AddJavascriptInterface"})
    private static void setup(WebView webView) {
        WebSettings settings = webView.getSettings();

        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webView.setScrollbarFadingEnabled(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            webView.setRendererPriorityPolicy(WebView.RENDERER_PRIORITY_BOUND, true);
        }
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setBlockNetworkImage(false);
        settings.setBlockNetworkLoads(false);
        settings.setRenderPriority(WebSettings.RenderPriority.HIGH);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            settings.setSafeBrowsingEnabled(false);
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            settings.setDisabledActionModeMenuItems(WebSettings.MENU_ITEM_NONE);
        }
        settings.setJavaScriptEnabled(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(false);
        if (Build.VERSION.SDK_INT < 30) {  // Build.VERSION_CODES.R
            settings.setAppCacheEnabled(false);
        }
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        settings.setDatabaseEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setLoadWithOverviewMode(true);
        settings.setOffscreenPreRaster(false);
        settings.setSupportMultipleWindows(true);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);
        settings.setGeolocationEnabled(true);
        settings.setLoadWithOverviewMode(true);
        settings.setMediaPlaybackRequiresUserGesture(true);    // The default is true. Added in API level 17

        settings.setUserAgentString(makeUserAgent(webView));
    }

    public static String makeUserAgent(WebView webView) {
        String ua = webView.getSettings().getUserAgentString();
        try {
            ua += !ua.endsWith(" ") ? " " : "";
            ua += PackageUtil.getApplicationName(webView.getContext());
            ua += "/" + PackageUtil.getPackageVersionName(webView.getContext());
            ua += "." + PackageUtil.getPackageVersionCode(webView.getContext());
            return ua;
        } catch (PackageManager.NameNotFoundException e) {
            Logger.e(TAG, e);
        }
        return ua;
    }

    public static void setUserAgentString(final WebView webView, final String ua) {
        webView.getSettings().setUserAgentString(ua);
    }

    public static String getLocalBaseUrl(String type) {
        if ("assets".equals(type)) {
            if (BuildConfig.FEATURE_WEBVIEW_ASSET_LOADER) {
                return SCHEME_ASSET_API30;
            }
            return SCHEME_ASSET;
        } else if ("res".equals(type)) {
            if (BuildConfig.FEATURE_WEBVIEW_ASSET_LOADER) {
                return SCHEME_RES_API30;
            }
            return SCHEME_RES;
        }
        return "";
    }

    public static void loadHTML(final WebView webView, final String htmlString) {
        webView.loadData(htmlString, "text/html", "UTF-8");
    }

    public static void loadUrl(final WebView webView, final String uriString) {
        final Map<String, String> extraHeaders = new HashMap<>();
        //extraHeaders.put("Platform", "A");

        if (uriString.startsWith(SCHEME_HTTP) || uriString.startsWith(SCHEME_HTTPS)
                || uriString.startsWith(SCHEME_ASSET) || uriString.startsWith(SCHEME_ASSET_API30)) {
            webView.loadUrl(uriString, extraHeaders);
        } else if (uriString.startsWith(SCHEME_FILE)) {
            List<String> permissions = new ArrayList<>();
            // Dangerous Permission (yeah i know lol)
            permissions.add(Manifest.permission.READ_EXTERNAL_STORAGE);

            RPermission.with(webView.getContext())
                    .setPermissionListener(new RPermissionListener() {
                        @Override
                        public void onPermissionGranted() {
                            Logger.i(TAG, "[WEBVIEW] onPermissionGranted()");
                            webView.loadUrl(uriString, extraHeaders);
                        }

                        @Override
                        public void onPermissionDenied(List<String> deniedPermissions, int status) {
                            Logger.e(TAG, "[WEBVIEW] onPermissionDenied()..." + deniedPermissions.toString());
                        }
                    })
                    .setPermissions(permissions)
                    .check();
        }
    }
}
