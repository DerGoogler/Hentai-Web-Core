package com.dergoogler.hentai.zero.download;

import android.Manifest;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.webkit.MimeTypeMap;

import com.dergoogler.hentai.zero.dialog.DialogBuilder;
import com.dergoogler.hentai.zero.log.Logger;
import com.dergoogler.hentai.zero.permission.RPermissionListener;
import com.dergoogler.hentai.zero.permission.RPermission;

import java.util.ArrayList;
import java.util.List;

public class CSDownloadManager {
    private static final String TAG = CSDownloadManager.class.getSimpleName();

    private long mDownloadId;

    public void download(Context context, String urlString) {
        List<String> permissions = new ArrayList<>();

        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.P) {
            permissions.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);    // android:maxSdkVersion="28"
        }

        if (RPermission.isGranted(permissions.toArray(new String[] {}))) {
            downloadIt(context, urlString);
            return;
        }

        // check permission
        RPermission.with(context)
                .setPermissionListener(new RPermissionListener() {
                    @Override
                    public void onPermissionGranted() {
                        Logger.i(TAG, "[CSDownloadManager] onPermissionGranted()");
                        downloadIt(context, urlString);
                    }

                    @Override
                    public void onPermissionDenied(List<String> deniedPermissions, int status) {
                        Logger.e(TAG, "[CSDownloadManager] onPermissionDenied()..." + deniedPermissions.toString());

                        DialogBuilder.with(context)
                                .setMessage("Permission denied !!!")
                                .toast();
                    }
                })
                .setPermissions(permissions)
                .check();
    }

    private void downloadIt(Context context, String urlString) {
        try {
            DownloadManager.Request request = new DownloadManager.Request(Uri.parse(urlString));
            //request.allowScanningByMediaScanner();    // Deprecated
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);

            int lastIdx = urlString.lastIndexOf("/");
            String fileName = urlString.substring(lastIdx);
            request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName);
            request.setMimeType(getMimeFromFileName(fileName));

            registerDownloadReceiver(context);

            DownloadManager manager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
            mDownloadId = manager.enqueue(request);

        } catch (Exception e) {
            Logger.e(TAG, e);

            DialogBuilder.with(context)
                    .setMessage(e.toString())
                    .show();
        }
    }
    public static String getMimeFromFileName(String fileName) {
        MimeTypeMap map = MimeTypeMap.getSingleton();
        String ext = MimeTypeMap.getFileExtensionFromUrl(fileName);
        return map.getMimeTypeFromExtension(ext);
    }

    private void registerDownloadReceiver(Context context) {
        try {
            DownloadManager manager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
            IntentFilter intentFilter = new IntentFilter();
            intentFilter.addAction(DownloadManager.ACTION_DOWNLOAD_COMPLETE);
            context.registerReceiver(new BroadcastReceiver() {
                @Override
                public void onReceive(final Context context, final Intent intent) {
                    if (DownloadManager.ACTION_DOWNLOAD_COMPLETE.equals(intent.getAction())) {
                        long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
                        if (mDownloadId == id) {
                            DownloadManager.Query query = new DownloadManager.Query();
                            query.setFilterById(id);
                            Cursor cursor = manager.query(query);
                            if (!cursor.moveToFirst()) {
                                return;
                            }

                            int columnIndex = cursor.getColumnIndex(DownloadManager.COLUMN_STATUS);
                            int status = cursor.getInt(columnIndex);
                            if (status == DownloadManager.STATUS_SUCCESSFUL) {
                                DialogBuilder.with(context)
                                        .setMessage("download success")
                                        .toast();
                            } else if (status == DownloadManager.STATUS_FAILED) {
                                DialogBuilder.with(context)
                                        .setMessage("download failed")
                                        .toast();
                            }

                            unregisterDownloadReceiver(context, this);
                        }
                    }
                }
            }, intentFilter);

        } catch (Exception e) {
            Logger.e(TAG, e);
        }
    }

    private void unregisterDownloadReceiver(Context context, BroadcastReceiver receiver) {
        context.unregisterReceiver(receiver);
    }

}