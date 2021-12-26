package com.dergoogler.hentai.zero.util;

import com.dergoogler.hentai.zero.log.Logger;

import java.io.InputStream;
import java.io.OutputStream;

/**
 * IO Utilities
 *
 * @author mcharima5@gmail.com
 * @since 2016
 */
public class IOUtil {
    private static final String TAG = IOUtil.class.getSimpleName();

    public static void closeQuietly(InputStream input) {
        try {
            if (null != input) {
                input.close();
            }
        } catch (Exception e) {
            Logger.e(TAG, e);
        }
    }

    public static void closeQuietly(OutputStream output) {
        try {
            if (null != output) {
                output.flush();
            }
        } catch (Exception e) {
            Logger.e(TAG, e);
        }
        try {
            if (null != output) {
                output.close();
            }
        } catch (Exception e) {
            Logger.e(TAG, e);
        }
    }

}
