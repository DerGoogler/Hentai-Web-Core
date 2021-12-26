package com.dergoogler.hentai.zero.util;

import android.content.Context;
import android.os.Environment;

import com.dergoogler.hentai.BuildConfig;

import java.io.File;

/**
 * Environment Utilities
 *
 * @author mcharima5@gmail.com
 * @since 2018
 */
public class EnvUtil {

    @Deprecated
    public static File getExternalStorageDirectory() {
        return Environment.getExternalStorageDirectory();
    }

    public static File getExternalFilesDir(Context context) {
        if (BuildConfig.FEATURE_EXTERNAL_STORAGE_DIR) {
            return getExternalStorageDirectory();
        }
        return context.getExternalFilesDir(null);
    }

    public static File getMediaDir(Context context, String type) {
        File storageDir = getExternalFilesDir(context);

        if ("image".equalsIgnoreCase(type) || "video".equalsIgnoreCase(type)) {
            return new File(new File(storageDir, Environment.DIRECTORY_DCIM), "Camera");
        }
        else if ("audio".equalsIgnoreCase(type)) {
            return new File(storageDir, "Voice Recorder");
        }
        return null;
    }

    public static boolean isFilesDir(Context context, File file) {
        File dir = context.getExternalFilesDir(null);
        return file.getAbsolutePath().startsWith(dir.getAbsolutePath());
    }
}
