package com.dergoogler.hentai.zero.util;

import android.content.ContentResolver;
import android.content.Context;

/**
 * Media Utilities
 *
 * @author mcharima5@gmail.com
 * @since 2020
 */
public class MediaUtil {

    public static ContentResolver getContentResolver(Context context) {
        return context.getApplicationContext().getContentResolver();
    }
}
