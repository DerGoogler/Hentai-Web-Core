package com.dergoogler.hentai.zero.webview;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.os.Message;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.ConsoleMessage;
import android.webkit.GeolocationPermissions;
import android.webkit.JsResult;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.FrameLayout;

import com.dergoogler.hentai.zero.permission.RPermission;
import com.dergoogler.hentai.zero.permission.RPermissionListener;
import com.dergoogler.hentai.zero.webview.listener.FileChooserListener;
import com.dergoogler.hentai.webview.WebViewHelper;
import com.dergoogler.hentai.zero.dialog.DialogBuilder;
import com.dergoogler.hentai.zero.log.Logger;
import com.dergoogler.hentai.zero.util.StringUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Custom WebChrome Client
 *
 * @author mcharima5@gmail.com
 * @since 2018
 */
public class CSWebChromeClient extends WebChromeClient {
    private static final String TAG = CSWebChromeClient.class.getSimpleName();

    private final Context context;
    private FileChooserListener fileChooserListener;

    // constructor
    public CSWebChromeClient(Context context) {
        this.context = context;
    }


    //++ [[START] File Chooser]
    public void setFileChooserListener(FileChooserListener listener) {
        this.fileChooserListener = listener;
    }

    // For Android 4.1+
    @SuppressWarnings({"unused", "RedundantSuppression"})
    public void openFileChooser(ValueCallback<Uri> uploadMsg, String acceptType, String capture) {
        Logger.i(TAG, "[WEBVIEW] openFileChooser()  For Android 4.1+ \n:: uploadMsg[" + uploadMsg + "]  acceptType[" + acceptType + "]  capture[" + capture + "]");

        List<String> permissions = new ArrayList<>();
        permissions.add(Manifest.permission.CAMERA);
        permissions.add(Manifest.permission.READ_EXTERNAL_STORAGE);

        RPermission.with(this.context)
                .setPermissionListener(new RPermissionListener() {
                    @Override
                    public void onPermissionGranted() {
                        Logger.i(TAG, "[WEBVIEW] onPermissionGranted()");

                        if (null != fileChooserListener) {
                            fileChooserListener.onOpenFileChooserNormal(null, uploadMsg, acceptType);
                        }
                    }

                    @Override
                    public void onPermissionDenied(List<String> deniedPermissions, int status) {
                        Logger.e(TAG, "[WEBVIEW] onPermissionDenied()..." + deniedPermissions.toString());
                    }
                })
                .setPermissions(permissions)
                .check();
    }

    // For Android 5.0+
    public boolean onShowFileChooser(final WebView webView, final ValueCallback<Uri[]> filePathCallback, final WebChromeClient.FileChooserParams fileChooserParams) {
        Logger.i(TAG, "[WEBVIEW] openFileChooser()  For Android 5.0+ \n:: filePathCallback[" + filePathCallback + "]  fileChooserParams[" + fileChooserParams + "]");

        List<String> permissions = new ArrayList<>();
        permissions.add(Manifest.permission.CAMERA);
        permissions.add(Manifest.permission.READ_EXTERNAL_STORAGE);

        RPermission.with(this.context)
                .setPermissionListener(new RPermissionListener() {
                    @Override
                    public void onPermissionGranted() {
                        Logger.i(TAG, "[WEBVIEW] onPermissionGranted()");

                        String[] acceptType;
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                            acceptType = fileChooserParams.getAcceptTypes();
                        } else {
                            acceptType = new String[]{""};
                        }

                        if (null != fileChooserListener) {
                            fileChooserListener.onOpenFileChooserLollipop(webView, filePathCallback, acceptType);
                        }
                    }

                    @Override
                    public void onPermissionDenied(List<String> deniedPermissions, int status) {
                        Logger.e(TAG, "[WEBVIEW] onPermissionDenied()..." + deniedPermissions.toString());
                    }
                })
                .setPermissions(permissions)
                .check();
        return true;
    }
    //-- [[E N D] File Chooser]


    //++ [[START] Geolocation, Record Video/Audio]
    @Override
    public void onPermissionRequest(final PermissionRequest request) {
        Logger.i(TAG, "[WEBVIEW] onPermissionRequest: request[" + request + "]");

        // RECORD AUDIO, RECORD VIDEO
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            final Uri origin = request.getOrigin();

            for (String permission : request.getResources()) {
                switch (permission) {
                    case PermissionRequest.RESOURCE_AUDIO_CAPTURE: {
                        RPermission.with(this.context)
                                .setPermissionListener(new RPermissionListener() {
                                    @Override
                                    public void onPermissionGranted() {
                                        Logger.i(TAG, "[WEBVIEW] onPermissionGranted() : android.webkit.resource.AUDIO_CAPTURE :: origin[" + origin + "] request[" + request + "]");
                                        request.grant(request.getResources());
                                    }

                                    @Override
                                    public void onPermissionDenied(List<String> deniedPermissions, int status) {
                                        Logger.e(TAG, "[WEBVIEW] onPermissionDenied() : android.webkit.resource.AUDIO_CAPTURE :: origin[" + origin + "] request[" + request + "]");
                                        request.deny();
                                    }
                                })
                                .setPermissions(new String[]{
                                        // Dangerous Permission
                                        Manifest.permission.RECORD_AUDIO,
                                })
                                .check();
                        return;
                    }

                    case PermissionRequest.RESOURCE_VIDEO_CAPTURE: {
                        RPermission.with(this.context)
                                .setPermissionListener(new RPermissionListener() {
                                    @Override
                                    public void onPermissionGranted() {
                                        Logger.i(TAG, "[WEBVIEW] onPermissionGranted() : android.webkit.resource.VIDEO_CAPTURE :: origin[" + origin + "] request[" + request + "]");
                                        request.grant(request.getResources());
                                    }

                                    @Override
                                    public void onPermissionDenied(List<String> deniedPermissions, int status) {
                                        Logger.e(TAG, "[WEBVIEW] onPermissionDenied() : android.webkit.resource.VIDEO_CAPTURE :: origin[" + origin + "] request[" + request + "]");
                                        request.deny();
                                    }
                                })
                                .setPermissions(new String[]{
                                        // Dangerous Permission
                                        Manifest.permission.CAMERA,
                                        Manifest.permission.RECORD_AUDIO,
                                })
                                .check();
                        return;
                    }
                }
            }
        }
        super.onPermissionRequest(request);
    }

    @Override
    public void onPermissionRequestCanceled(PermissionRequest request) {
        Logger.i(TAG, "[WEBVIEW] onPermissionRequestCanceled: request[" + request + "]");
        super.onPermissionRequestCanceled(request);
    }
    //-- [[E N D] Geolocation, Record Video/Audio]


    //++ [[START] Geolocation]
    @Override
    public void onGeolocationPermissionsHidePrompt() {
        Logger.i(TAG, "[WEBVIEW] onGeolocationPermissionsHidePrompt");
        super.onGeolocationPermissionsHidePrompt();
    }

    @Override
    public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
        Logger.i(TAG, "[WEBVIEW] onGeolocationPermissionsShowPrompt : origin[" + origin + "] callback[" + callback + "]");

        RPermission.with(this.context)
                .setPermissionListener(new RPermissionListener() {
                    @Override
                    public void onPermissionGranted() {
                        Logger.i(TAG, "[WEBVIEW] onGeolocationPermissionsShowPrompt : onPermissionGranted() : origin[" + origin + "] callback[" + callback + "]");
                        callback.invoke(origin, true, false);
                    }

                    @Override
                    public void onPermissionDenied(List<String> deniedPermissions, int status) {
                        Logger.e(TAG, "[WEBVIEW] onGeolocationPermissionsShowPrompt : onPermissionDenied() : origin[" + origin + "] callback[" + callback + "]");
                        callback.invoke(origin, false, false);
                    }
                })
                .setPermissions(new String[]{
                        // Dangerous Permission
                        Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.ACCESS_COARSE_LOCATION,
                })
                .check();

        super.onGeolocationPermissionsShowPrompt(origin, callback);
    }
    //-- [[E N D] Geolocation]


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

    //++ [[START] Video Player (for fullscreen]
    private ViewGroup fullscreenContainer;
    private CustomViewCallback customViewCallback;

    public boolean isVideoPlayingInFullscreen() {
        return null != fullscreenContainer;
    }

    @Override
    public void onShowCustomView(View view, CustomViewCallback callback) {
        Logger.i(TAG, "[WEBVIEW] onShowCustomView() - view[" + view + "], callback[" + callback + "]");

        // background
        if (null == fullscreenContainer) {
            fullscreenContainer = new FrameLayout(view.getContext());
            fullscreenContainer.setLayoutParams(new FrameLayout.LayoutParams(
                    FrameLayout.LayoutParams.MATCH_PARENT,
                    FrameLayout.LayoutParams.MATCH_PARENT));
            fullscreenContainer.setBackgroundResource(android.R.color.black);
            fullscreenContainer.setVisibility(View.GONE);

            ViewGroup decor = ((Activity) this.context).getWindow().getDecorView().findViewById(android.R.id.content);
            decor.addView(fullscreenContainer, -1);
        }

        customViewCallback = callback;

        Logger.i(TAG, "[WEBVIEW] onShowCustomView() - view class name = " + view.getClass().getName());

        // add video view
        fullscreenContainer.addView(view, new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
        fullscreenContainer.setVisibility(View.VISIBLE);

        super.onShowCustomView(view, callback);
    }

    @Override
    public void onHideCustomView() {
        Logger.i(TAG, "[WEBVIEW] onHideCustomView()");
        super.onHideCustomView();

        if (null != fullscreenContainer) {
            ViewGroup decor = ((Activity) this.context).getWindow().getDecorView().findViewById(android.R.id.content);
            decor.removeView(fullscreenContainer);
        }

        if (null != customViewCallback) {
            customViewCallback.onCustomViewHidden();
        }

        customViewCallback = null;
        fullscreenContainer = null;
    }
    //-- [[E N D] Video Player (for fullscreen]


    //++ [[START] Support Multiple Windows]
    private WebView newWebView;
    private int scrollX;
    private int scrollY;

    public WebView getNewWebView() {
        return newWebView;
    }

    public void closeNewWebView() {
        WebView webView = ((WebView) newWebView.getParent());
        webView.removeView(newWebView);
        newWebView.destroy();
        newWebView = null;

        webView.scrollTo(scrollX, scrollY);
    }

    public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
        Logger.i(TAG, "[WEBVIEW] onCreateWindow():  view[" + view + "]  isDialog[" + isDialog + "]  isUserGesture[" + isUserGesture + "]  resultMsg[" + resultMsg + "]");

        this.newWebView = WebViewHelper.addWebView(view.getContext(), view);
        view.bringChildToFront(this.newWebView);

        CSWebChromeClient webChromeClient = new CSWebChromeClient(view.getContext());
        this.newWebView.setWebChromeClient(webChromeClient);

        CSWebViewClient webviewClient = new CSWebViewClient(view.getContext());
        this.newWebView.setWebViewClient(webviewClient);

        scrollX = view.getScrollX();
        scrollY = view.getScrollY();
        view.scrollTo(0, 0);

        WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
        transport.setWebView(this.newWebView);
        resultMsg.sendToTarget();

        return true;
        //return super.onCreateWindow(view, isDialog, isUserGesture, resultMsg);
    }

    public void onCloseWindow(WebView window) {
        super.onCloseWindow(window);
        this.newWebView = null;
        Logger.i(TAG, "[WEBVIEW] onCloseWindow()");
    }
    //-- [[E N D] Support Multiple Windows]

}
