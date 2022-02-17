package com.dergoogler.hentai.zero.util;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;

public class PackageUtil {

    public static String getApplicationName(Context context) throws PackageManager.NameNotFoundException {
        return getPackageInfo(context).applicationInfo.loadLabel(context.getPackageManager()).toString();
    }

    public static String getPackageVersionName(Context context) throws PackageManager.NameNotFoundException {
        return getPackageInfo(context).versionName;
    }

    public static int getPackageVersionCode(Context context) throws PackageManager.NameNotFoundException {
        PackageInfo info = getPackageInfo(context);
        int packageVersionCode;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            packageVersionCode = (int) info.getLongVersionCode();
        } else {
            packageVersionCode = info.versionCode;
        }
        return packageVersionCode;
    }

    public static String getPackageName(Context context) throws PackageManager.NameNotFoundException {
        return getPackageInfo(context).packageName;
    }

    private static PackageInfo getPackageInfo(Context context) throws PackageManager.NameNotFoundException {
        return context.getPackageManager().getPackageInfo(context.getPackageName(), PackageManager.GET_META_DATA);
    }

}
