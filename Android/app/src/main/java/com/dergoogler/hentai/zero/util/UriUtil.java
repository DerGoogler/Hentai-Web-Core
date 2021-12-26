package com.dergoogler.hentai.zero.util;

import android.content.Context;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;

import java.io.File;

import androidx.core.content.FileProvider;

/**
 * Uri Utilities
 *
 * @author mcharima5@gmail.com
 * @since 2018
 */
public class UriUtil {
    //private static final String TAG = UriUtil.class.getSimpleName();

    public static Uri fromFile(Context context, File file) throws PackageManager.NameNotFoundException {
        final Uri newUri;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            newUri = FileProvider.getUriForFile(context, PackageUtil.getPackageName(context) + ".fileprovider", file);
        } else {
            newUri = Uri.fromFile(file);
        }
        return newUri;
    }

}
