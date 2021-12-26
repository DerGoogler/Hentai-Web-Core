package com.dergoogler.hentai.zero.mimetype;

import android.webkit.MimeTypeMap;

/**
 * MimeType
 *
 * @author mcharima5@gmail.com
 * @since 2020
 */
public class MimeType {

    public static String getMimeFromFileName(String fileName) {
        MimeTypeMap map = MimeTypeMap.getSingleton();
        String ext = MimeTypeMap.getFileExtensionFromUrl(fileName);
        return map.getMimeTypeFromExtension(ext);
    }
}
