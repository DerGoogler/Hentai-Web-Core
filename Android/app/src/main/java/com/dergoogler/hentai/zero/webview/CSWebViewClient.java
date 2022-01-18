package com.dergoogler.hentai.zero.webview;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.content.ActivityNotFoundException;
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
import com.dergoogler.hentai.zero.log.Logger;
import com.dergoogler.hentai.zero.util.FileUtil;
import com.dergoogler.hentai.zero.util.IntentUtil;

import java.net.URISyntaxException;

import androidx.annotation.CallSuper;
import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.webkit.WebViewAssetLoader;

/**
 * Custom WebView Client
 *
 * @author mcharima5@gmail.com
 * @since 2018
 */
public class CSWebViewClient extends WebViewClient implements CSWebViewClientCallbacks {
    private static final String TAG = CSWebViewClient.class.getSimpleName();

    private final WebViewAssetLoader assetLoader;

    private CSWebViewInjector injector;

    public void setInjector(CSWebViewInjector injector) {
        this.injector = injector;
    }

    public CSWebViewClient(Context context) {
        if (BuildConfig.FEATURE_WEBVIEW_ASSET_LOADER) {
            this.assetLoader = new WebViewAssetLoader.Builder()
                    .setDomain(BuildConfig.ASSET_BASE_DOMAIN)
                    .addPathHandler(BuildConfig.RES_PATH, new WebViewAssetLoader.ResourcesPathHandler(context))
                    .addPathHandler(BuildConfig.ASSET_PATH, new WebViewAssetLoader.AssetsPathHandler(context))
                    .build();
        }
    }

    @Deprecated
    @SuppressWarnings({"unused", "RedundantSuppression"})
    // use the old one for compatibility with all API levels.
    public WebResourceResponse shouldInterceptRequest(CSWebView view, String url) {
        Logger.d(TAG, "[WEBVIEW] shouldInterceptRequest(API 20 below):  url[" + url + "]");

        if (BuildConfig.FEATURE_WEBVIEW_ASSET_LOADER) {
            return this.assetLoader.shouldInterceptRequest(Uri.parse(url));
        }
        return super.shouldInterceptRequest(view, url);
    }

    @RequiresApi(21)
    public WebResourceResponse shouldInterceptRequest(CSWebView view, WebResourceRequest request) {
        Logger.d(TAG, "[WEBVIEW] shouldInterceptRequest(API 21 after):  url[" + request.getUrl() + "]");

        if (BuildConfig.FEATURE_WEBVIEW_ASSET_LOADER) {
            return this.assetLoader.shouldInterceptRequest(request.getUrl());
        }
        return null;    //return super.shouldInterceptRequest(view, request);
    }


    public void onLoadResource(CSWebView view, final String url) {
        Logger.d(TAG, "[WEBVIEW] onLoadResource():  url[" + url + "]");
        super.onLoadResource(view, url);
    }

    @Deprecated
    public boolean shouldOverrideUrlLoading(CSWebView view, String url) {
        Logger.i(TAG, "[WEBVIEW] shouldOverrideUrlLoading() API 23 below: " + url);

        if (url.startsWith("http://") || url.startsWith("https://")) {
            view.loadUrl(url);
            return true;
        }
        return intentProcessing(view, url);
    }

    @TargetApi(Build.VERSION_CODES.N)
    public boolean shouldOverrideUrlLoading(CSWebView view, WebResourceRequest request) {
        Logger.i(TAG, "[WEBVIEW] shouldOverrideUrlLoading() API 24 after: " + request.getUrl());

        String url = Uri.decode(request.getUrl().toString());

        if (url.startsWith("http://") || url.startsWith("https://")) {
            if (request.isRedirect()) {
                view.loadUrl(request.getUrl().toString());
                return true;
            }
            return false;
        }
        intentProcessing(view, request.getUrl().toString());
        return true;
    }

    private boolean intentProcessing(CSWebView view, String urlString) {
        String url = Uri.decode(urlString);

        if (url.startsWith("intent:")) {
            try {
                IntentUtil.intentScheme(view.getContext(), url);
                return true;
            } catch (URISyntaxException e) {
                Logger.e(TAG, e);
            } catch (ActivityNotFoundException e) {
                Logger.e(TAG, e);
            }
        }

        try {
            IntentUtil.view(view.getContext(), Uri.parse(url));
            return true;
        } catch (ActivityNotFoundException e) {
            Logger.e(TAG, e);
        }

        return false;
    }

    public void onPageStarted(CSWebView view, String url, Bitmap favicon) {
        Logger.i(TAG, "[WEBVIEW] onPageStarted(): " + url);
        super.onPageStarted(view, url, favicon);
    }

    @CallSuper
    @Override
    public void onPageFinished(CSWebView view, String url) {
        if (injector != null) {
            onReadyToInject(injector, url);
        }
        Logger.i(TAG, "[WEBVIEW] onPageFinished(): " + url);
        super.onPageFinished(view, url);
    }

    public void onReceivedSslError(CSWebView view, SslErrorHandler handler, SslError error) {
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

    public void onReceivedHttpError(CSWebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
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

    @Deprecated
    public void onReceivedError(CSWebView view, int errorCode, String description, String failingUrl) {
        Logger.e(TAG, "[WEBVIEW] onReceivedError(): url[" + view.getUrl() + "],  errorCode[" + errorCode + "],  description[" + description + "],  failingUrl[" + failingUrl + "]");

        boolean forwardErrorPage = ERROR_BAD_URL == errorCode || ERROR_FILE == errorCode;
        onReceivedError(view, errorCode, description, failingUrl, forwardErrorPage);
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    public void onReceivedError(CSWebView view, WebResourceRequest request, WebResourceError error) {
        Logger.e(TAG, "[WEBVIEW] onReceivedError(VERSION=M): url[" + view.getUrl() + "],  errorCode[" + error.getErrorCode() + "],  description[" + error.getDescription() + "]");

        int errorCode = error.getErrorCode();
        String description = error.getDescription().toString();
        boolean forwardErrorPage = ERROR_BAD_URL == errorCode || ERROR_FILE == errorCode;
        onReceivedError(view, errorCode, description, request.getUrl().toString(), forwardErrorPage);
    }

    private void onReceivedError(CSWebView view, int errorCode, String description, String failingUrl, boolean forwardErrorPage) {
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

    @Override
    public void onReadyToInject(@NonNull CSWebViewInjector injector, @NonNull String page) {
        injector.injectCSS("img{display:none}");
    }
}
