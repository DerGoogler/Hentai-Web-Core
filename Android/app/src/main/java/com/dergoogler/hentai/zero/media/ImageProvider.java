package com.dergoogler.hentai.zero.media;

import android.content.ContentValues;
import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;

import com.dergoogler.hentai.zero.mimetype.MimeType;

import java.io.File;
import java.io.FileNotFoundException;

/**
 * Image Provider
 *
 * @author mcharima5@gmail.com
 * @since 2020
 */
public class ImageProvider extends MediaStoreProvider {

    public static Uri insert(Context context, File file) throws FileNotFoundException {
        ContentValues values = new ContentValues();
        values.put(MediaStore.Images.Media.DISPLAY_NAME, file.getName());
        values.put(MediaStore.Images.Media.MIME_TYPE, MimeType.getMimeFromFileName(file.getName()));
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            values.put(MediaStore.Images.Media.IS_PENDING, 1);
        }

        Uri uri;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            uri = MediaStore.Images.Media.getContentUri(MediaStore.VOLUME_EXTERNAL_PRIMARY);
        } else {
            uri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
        }

        return insert(context, uri, values, file, (contentResolver, values1, item1) -> {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                values1.clear();
                values1.put(MediaStore.Images.Media.IS_PENDING, 0);
                contentResolver.update(item1, values1, null, null);
            }
        });
    }
}
