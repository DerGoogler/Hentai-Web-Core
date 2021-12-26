package com.dergoogler.hentai.zero.permission;

import android.app.Activity;
import android.content.Context;

import com.gun0912.tedpermission.PermissionListener;
import com.gun0912.tedpermission.normal.TedPermission;
import com.dergoogler.hentai.zero.log.Logger;

import java.util.List;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;

public class RPermission {
    private static final String TAG = RPermission.class.getSimpleName();

    public static final int SHOW_REQUEST_RATIONALE = 0;
    public static final int ALREADY_DENIED_PERMISSION = 1;

    public static RPermission with(Context context) {
        return new RPermission(context);
    }

    private final Context context;
    private String[] permissions;
    private RPermissionListener listener;

    public RPermission(Context context) {
        this.context = context;
    }

    public RPermission setPermissionListener(RPermissionListener listener) {
        this.listener = listener;
        return this;
    }

    public RPermission setPermissions(List<String> permissions) {
        this.permissions = permissions.toArray(new String[] {});
        return this;
    }

    public RPermission setPermissions(String[] permissions) {
        this.permissions = permissions;
        return this;
    }

    public void check() {
        TedPermission.create()
                .setPermissionListener(new PermissionListener() {
                    @Override
                    public void onPermissionGranted() {
                        //Toast.makeText(MainActivity.this, "Permission Granted", Toast.LENGTH_SHORT).show();
                        if (null != listener) {
                            listener.onPermissionGranted();
                        }
                    }

                    @Override
                    public void onPermissionDenied(List<String> deniedPermissions) {
                        //Toast.makeText(MainActivity.this, "Permission Denied\n" + deniedPermissions.toString(), Toast.LENGTH_SHORT).show();
                        if (null != listener) {
                            if (!shouldShowRequestPermissionRationale(deniedPermissions)) {
                                Logger.e(TAG, "거부한 적이 있는 권한 거절");
                                listener.onPermissionDenied(deniedPermissions, ALREADY_DENIED_PERMISSION);
                            } else {
                                Logger.e(TAG, "처음 거부하는 권한 거절");
                                listener.onPermissionDenied(deniedPermissions, SHOW_REQUEST_RATIONALE);
                            }
                        }
                    }
                })
                //.setDeniedMessage("If you reject permission,you can not use this service\n\nPlease turn on permissions at [Setting] > [Permission]")
                .setPermissions(permissions)
                .check();
    }

    public static boolean isGranted(@NonNull String... permissions) {
        return TedPermission.isGranted(permissions);
    }

    public boolean shouldShowRequestPermissionRationale(List<String> needPermissions) {
        if (null == needPermissions) {
            return false;
        }

        for (String permission : needPermissions) {
            if (!ActivityCompat.shouldShowRequestPermissionRationale((Activity) this.context, permission)) {
                return false;
            }
        }
        return true;
    }
}
