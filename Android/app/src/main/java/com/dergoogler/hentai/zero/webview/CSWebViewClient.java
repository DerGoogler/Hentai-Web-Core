package com.dergoogler.hentai.zero.webview;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.Bitmap;
import android.net.Uri;
import android.net.http.SslError;
import android.os.Build;
import android.webkit.SslErrorHandler;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.dergoogler.hentai.BuildConfig;
import com.dergoogler.hentai.R;
import com.dergoogler.hentai.tools.Lib;
import com.dergoogler.hentai.zero.log.Logger;

import androidx.annotation.RequiresApi;
import androidx.browser.customtabs.CustomTabColorSchemeParams;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.core.content.ContextCompat;
import androidx.webkit.WebViewAssetLoader;

public class CSWebViewClient extends WebViewClient {
    private static final String TAG = WebViewClient.class.getSimpleName();

    private final WebViewAssetLoader assetLoader;

    public CSWebViewClient(Context context) {
        if (BuildConfig.FEATURE_WEBVIEW_ASSET_LOADER) {
            this.assetLoader = new WebViewAssetLoader.Builder()
                    .setDomain(BuildConfig.ASSET_BASE_DOMAIN)
                    .addPathHandler(BuildConfig.RES_PATH, new WebViewAssetLoader.ResourcesPathHandler(context))
                    .addPathHandler(BuildConfig.ASSET_PATH, new WebViewAssetLoader.AssetsPathHandler(context))
                    .build();
        }
    }

    @Override
    @Deprecated
    @SuppressWarnings({"unused", "RedundantSuppression"})
    // use the old one for compatibility with all API levels.
    public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
        Logger.d(TAG, "[WEBVIEW] shouldInterceptRequest(API 20 below):  url[" + url + "]");

        if (BuildConfig.FEATURE_WEBVIEW_ASSET_LOADER) {
            return this.assetLoader.shouldInterceptRequest(Uri.parse(url));
        }
        return super.shouldInterceptRequest(view, url);
    }

    @Override
    @RequiresApi(21)
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        Logger.d(TAG, "[WEBVIEW] shouldInterceptRequest(API 21 after):  url[" + request.getUrl() + "]");

        if (BuildConfig.FEATURE_WEBVIEW_ASSET_LOADER) {
            return this.assetLoader.shouldInterceptRequest(request.getUrl());
        }
        return null;    //return super.shouldInterceptRequest(view, request);
    }


    @Override
    public void onLoadResource(WebView view, final String url) {
        Logger.d(TAG, "[WEBVIEW] onLoadResource():  url[" + url + "]");
        super.onLoadResource(view, url);
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        if (url.contains(Lib.getReleaseURl()) || url.contains(Lib.getDebugURl())) {
            view.loadUrl(url);
        } else {
            Uri uri = Uri.parse(url);
            CustomTabsIntent.Builder intentBuilder = new CustomTabsIntent.Builder();
            CustomTabColorSchemeParams params = new CustomTabColorSchemeParams.Builder()
                    .setToolbarColor(ContextCompat.getColor(view.getContext(), R.color.colorPrimary))
                    .setSecondaryToolbarColor(ContextCompat.getColor(view.getContext(), R.color.colorPrimary))
                    .build();
            intentBuilder.setColorSchemeParams(CustomTabsIntent.COLOR_SCHEME_DARK, params);
            CustomTabsIntent customTabsIntent = intentBuilder.build();
            customTabsIntent.launchUrl(view.getContext(), uri);
        }
        return true;
    }

    @Override
    @TargetApi(Build.VERSION_CODES.N)
    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        Logger.i(TAG, "[WEBVIEW] shouldOverrideUrlLoading() API 24 after: " + request.getUrl());

        String url = Uri.decode(request.getUrl().toString());

        if (url.contains(Lib.getReleaseURl()) || url.contains(Lib.getDebugURl())) {
            view.loadUrl(url);
        } else {
            Uri uri = Uri.parse(url);
            CustomTabsIntent.Builder intentBuilder = new CustomTabsIntent.Builder();
            CustomTabColorSchemeParams params = new CustomTabColorSchemeParams.Builder()
                    .setToolbarColor(ContextCompat.getColor(view.getContext(), R.color.colorPrimary))
                    .setSecondaryToolbarColor(ContextCompat.getColor(view.getContext(), R.color.colorPrimary))
                    .build();
            intentBuilder.setColorSchemeParams(CustomTabsIntent.COLOR_SCHEME_DARK, params);
            CustomTabsIntent customTabsIntent = intentBuilder.build();
            customTabsIntent.launchUrl(view.getContext(), uri);
        }
        return true;
    }

    @Override
    public void onPageStarted(WebView view, String url, Bitmap favicon) {
        Logger.i(TAG, "[WEBVIEW] onPageStarted(): " + url);
        super.onPageStarted(view, url, favicon);
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        Logger.i(TAG, "[WEBVIEW] onPageFinished(): " + url);
        super.onPageFinished(view, url);
    }

    @Override
    public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
        Logger.e(TAG, "[WEBVIEW] onReceivedSslError(): url[" + view.getUrl() + "],  handler[" + handler + "],  error[" + error + "]");

        if (SslError.SSL_NOTYETVALID == error.getPrimaryError()) {
            handler.proceed();
        } else if (SslError.SSL_EXPIRED == error.getPrimaryError()) {
            handler.proceed();
        } else if (SslError.SSL_IDMISMATCH == error.getPrimaryError()) {
            handler.proceed();
        } else if (SslError.SSL_UNTRUSTED == error.getPrimaryError()) {
            handler.proceed();
        } else if (SslError.SSL_DATE_INVALID == error.getPrimaryError()) {
            handler.proceed();
        } else if (SslError.SSL_INVALID == error.getPrimaryError()) {
            handler.proceed();
        } else {
            handler.proceed();
        }

        //super.onReceivedSslError(view, handler, error);
    }

    @Override
    public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
        String url = view.getUrl();

        StringBuilder buff = new StringBuilder();
        buff.append("\n  encoding[").append(errorResponse.getEncoding()).append("]  ");
        buff.append("\n  mimeType[").append(errorResponse.getMimeType()).append("]  ");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            url = request.getUrl().toString();

            buff.append("\n  method[").append(request.getMethod()).append("]  ");
            buff.append("\n  statusCode[").append(errorResponse.getStatusCode()).append("]  ");
            buff.append("\n  responseHeaders[").append(errorResponse.getResponseHeaders()).append("]  ");
            buff.append("\n  reasonPhrase[").append(errorResponse.getReasonPhrase()).append("]  ");
        }

        Logger.e(TAG, "onReceivedHttpError : url[" + url + "],  errorResponse[" + buff.toString() + "]");
        super.onReceivedHttpError(view, request, errorResponse);
    }

    @Override
    @Deprecated
    public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
        Logger.e(TAG, "[WEBVIEW] onReceivedError(): url[" + view.getUrl() + "],  errorCode[" + errorCode + "],  description[" + description + "],  failingUrl[" + failingUrl + "]");

        boolean forwardErrorPage = ERROR_BAD_URL == errorCode || ERROR_FILE == errorCode;
        onReceivedError(view, errorCode, description, failingUrl, forwardErrorPage);
    }

    @Override
    @RequiresApi(api = Build.VERSION_CODES.M)
    public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
        Logger.e(TAG, "[WEBVIEW] onReceivedError(VERSION=M): url[" + view.getUrl() + "],  errorCode[" + error.getErrorCode() + "],  description[" + error.getDescription() + "]");

        int errorCode = error.getErrorCode();
        String description = error.getDescription().toString();
        boolean forwardErrorPage = ERROR_BAD_URL == errorCode || ERROR_FILE == errorCode;
        onReceivedError(view, errorCode, description, request.getUrl().toString(), forwardErrorPage);
    }

    private void onReceivedError(WebView view, int errorCode, String description, String failingUrl, boolean forwardErrorPage) {
        if (WebViewClient.ERROR_UNSUPPORTED_SCHEME == errorCode) {
            if ("about:blank".equals(failingUrl)) {
                return;
            }
        }
        if (WebViewClient.ERROR_TOO_MANY_REQUESTS == errorCode) {
            return;
        }
        if (WebViewClient.ERROR_FAILED_SSL_HANDSHAKE == errorCode) {
            return;
        }
        if (WebViewClient.ERROR_HOST_LOOKUP == errorCode
                || WebViewClient.ERROR_TIMEOUT == errorCode
                || WebViewClient.ERROR_UNKNOWN == errorCode
        ) {
            final String[] except = new String[]{
                    ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tif", ".tiff", ".ico",
                    ".eot", ".ttf", ".otf", ".eot", ".woff", ".woff2",
                    ".pdf",
            };
            for (String str : except) {
                if (failingUrl.endsWith(str)) {
                    return;
                }
            }
        }
        if (forwardErrorPage) {
            String errorPageUrl = "file:///android_asset/network_error.html";
            String qs = "errorCode=" + errorCode + "&description=" + description + "&failingUrl=" + failingUrl;
            view.loadUrl(errorPageUrl + "?" + qs);
        }
    }
}
