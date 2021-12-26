package com.dergoogler.hentai.bridge.process;

import android.Manifest;
import android.net.Uri;
import android.webkit.WebView;

import com.dergoogler.hentai.bridge.AndroidBridge;
import com.dergoogler.hentai.zero.dialog.DialogBuilder;
import com.dergoogler.hentai.zero.json.JSONHelper;
import com.dergoogler.hentai.zero.requetcode.RequestCode;
import com.dergoogler.hentai.zero.log.Logger;
import com.dergoogler.hentai.zero.permission.RPermissionListener;
import com.dergoogler.hentai.zero.permission.RPermission;
import com.dergoogler.hentai.zero.util.EnvUtil;
import com.dergoogler.hentai.zero.util.FileUtil;
import com.dergoogler.hentai.zero.util.IntentUtil;
import com.dergoogler.hentai.zero.util.UriUtil;

import org.json.JSONObject;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * WebView JavaScript Interface Process
 *
 * @author mcharima5@gmail.com
 * @since 2018
 */
@SuppressWarnings({"InstantiationOfUtilityClass", "unused", "RedundantSuppression"})
public class AndroidBridgeProcess {
    private static final String TAG = AndroidBridgeProcess.class.getSimpleName();

    private static final AndroidBridgeProcess mInstance = new AndroidBridgeProcess();
    public static AndroidBridgeProcess getInstance() {
        return mInstance;
    }

    private AndroidBridgeProcess() {

    }

    // async process...good
    public static void apiRecommended(final WebView webview, final JSONObject args, final String callback) {
        Logger.i(TAG, "[WEBVIEW] apiRecommended(): args[" + args + "], callback[" + callback + "]");

        new Thread(() -> {
            String result = "success";
            // test code...
            try {
                Thread.sleep(1000);
            } catch (Exception e) {
                Logger.e(TAG, e);
            }
            //--

            // send result
            AndroidBridge.callJSFunction(webview, callback, result);
        }).start();
    }

    public static void apiRecommended2(final WebView webview, final JSONObject args, final String cbId) {
        Logger.i(TAG, "[WEBVIEW] apiRecommended2(): args[" + args + "], cbId[" + cbId + "]");

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

    // sync process...bad
    public static void apiNotRecommended(final WebView webview, final JSONObject args, final String callback) {
        Logger.i(TAG, "[WEBVIEW] apiNotRecommended(): args[" + args + "], callback[" + callback + "]");

        // sync
        // test code...
        String result = "success";
        try {
            Thread.sleep(1000);
        } catch (Exception e) {
            Logger.e(TAG, e);
        }
        //--

        // send result
        AndroidBridge.callJSFunction(webview, callback, result);
    }

    public static void apiTakePicture(final WebView webview, final JSONObject args, final String callback) {
        Logger.i(TAG, "[WEBVIEW] apiTakePicture(): args[" + args + "], callback[" + callback + "]");

        List<String> permissions = new ArrayList<>();
        permissions.add(Manifest.permission.CAMERA);
        permissions.add(Manifest.permission.READ_EXTERNAL_STORAGE);
        permissions.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);

        // check permission
        RPermission.with(webview.getContext())
                .setPermissionListener(new RPermissionListener() {
                    @Override
                    public void onPermissionGranted() {
                        Logger.i(TAG, "[WEBVIEW] onPermissionGranted()");
                        try {
                            AndroidBridge.setCallbackJSFunctionName(RequestCode.REQUEST_TAKE_A_PICTURE, callback);

                            File storageDir = EnvUtil.getMediaDir(webview.getContext(), "image");
                            String filename = FileUtil.newFilename("jpg");
                            File file = FileUtil.createFile(storageDir, filename);
                            if (null == file) {
                                throw new NullPointerException();
                            }

                            Uri output = UriUtil.fromFile(webview.getContext(), file);

                            if (!FileUtil.delete(file)) {
                                Logger.e(TAG, "[WEBVIEW] delete failed...");
                            }

                            AndroidBridge.setExtraOutput(file);
                            IntentUtil.imageCaptureWithExtraOutput(webview.getContext(), RequestCode.REQUEST_TAKE_A_PICTURE, output);

                        } catch (Exception e) {
                            Logger.e(TAG, e);
                            DialogBuilder.with(webview.getContext())
                                    .setMessage(e.toString())
                                    .show();
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

}
