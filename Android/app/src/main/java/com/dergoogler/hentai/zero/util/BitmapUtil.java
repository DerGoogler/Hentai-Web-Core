package com.dergoogler.hentai.zero.util;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.ImageDecoder;
import android.net.Uri;
import android.os.Build;

import com.dergoogler.hentai.zero.log.Logger;

import java.io.File;

/**
 * Bitmap Utilities
 *
 * @author mcharima5@gmail.com
 * @since 2018
 */
public class BitmapUtil {
    private static final String TAG = BitmapUtil.class.getSimpleName();

    public static Bitmap decodeBitmap(Context context, File file, int maxImageWidth) throws Exception {
        return decodeBitmap(context, UriUtil.fromFile(context, file), maxImageWidth);
    }

    public static Bitmap decodeBitmap(Context context, Uri uri, int maxImageWidth) throws Exception {
        try {
            return resizeBitmap(context, uri, true, maxImageWidth);
        } catch (Exception e) {
            Logger.e(TAG, e);
            throw e;
        }
    }

    public static Bitmap resizeBitmap(Context context, Uri uri, boolean resize, int maxImageWidth) throws Exception {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            ImageDecoder.Source source = ImageDecoder.createSource(context.getContentResolver(), uri);
            return ImageDecoder.decodeBitmap(source, (decoder, info, source1) -> {
                if (maxImageWidth <= 0) {
                    return;
                }

                int sampleSize = getSampleSize(info.getSize().getWidth(), info.getSize().getHeight(), maxImageWidth);
                decoder.setTargetSampleSize(sampleSize);
            });
        } else {
            //++
            BitmapFactory.Options bfo = new BitmapFactory.Options();
            bfo.inJustDecodeBounds = true;
            BitmapFactory.decodeStream(MediaUtil.getContentResolver(context).openInputStream(uri), null, bfo);
            bfo.inSampleSize = 1;
            if (resize) {
                bfo.inSampleSize = getSampleSize(bfo.outWidth, bfo.outHeight, maxImageWidth);
            }
            bfo.inJustDecodeBounds = false;
            //bfo.inDither = true;  // deprecated
            return BitmapFactory.decodeStream(context.getContentResolver().openInputStream(uri), null, bfo);
            //||
            //return MediaStore.Images.Media.getBitmap(context.getContentResolver(), uri);
            //--
        }
    }

    public static int getSampleSize(int outWidth, int outHeight, int maxImageWidth) {
        int inSampleSize = 1;
        if (outHeight > maxImageWidth || outWidth > maxImageWidth) {
            inSampleSize = (int) Math.pow(2,
                    (int) Math.round(
                            (Math.log(maxImageWidth / (double) Math.max(outHeight, outWidth)))
                                    / Math.log(0.5)
                    )
            );
        }
        return Math.max(inSampleSize, 1);
    }

}
