package com.dergoogler.hentai.zero.media;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.os.ParcelFileDescriptor;

import com.dergoogler.hentai.zero.util.FileUtil;
import com.dergoogler.hentai.zero.util.MediaUtil;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * MediaStore Provider
 *
 * @author mcharima5@gmail.com
 * @since 2020
 */
public class MediaStoreProvider {

    public static Uri insert(Context context, Uri contentUri, ContentValues values, File file, MediaInsertListener listener) throws FileNotFoundException {
        ContentResolver contentResolver = MediaUtil.getContentResolver(context);

        Uri item = contentResolver.insert(contentUri, values);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            ParcelFileDescriptor fileDesc = contentResolver.openFileDescriptor(item, "w", null);

            FileInputStream fis = new FileInputStream(file);
            FileOutputStream fos = new FileOutputStream(fileDesc.getFileDescriptor());
            try {
                FileUtil.write(fis, fos);
            } catch (IOException e) {
                return null;
            }
        }

        if (null != listener) {
            listener.onAfter(contentResolver, values, item);
        }

        return item;
    }

    public interface MediaInsertListener {
        void onAfter(ContentResolver contentResolver, ContentValues values, Uri item);
    }
}
