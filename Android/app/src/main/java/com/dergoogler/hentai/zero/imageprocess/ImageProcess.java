package com.dergoogler.hentai.zero.imageprocess;

import android.os.Build;

import com.dergoogler.hentai.zero.util.IOUtil;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Base64;

/**
 * Image Process
 * @author mcharima5@gmail.com
 * @since 2016
 */
public class ImageProcess {

    public static String toBase64String(File file) throws IOException {
        ByteArrayOutputStream bos;
        FileInputStream fis = null;
        try {
            fis = new FileInputStream(file);
            int fileLength = (int) file.length();
            bos = new ByteArrayOutputStream(fileLength);

            final byte[] buff = new byte[4096];
            while (true) {
                int len = fis.read(buff, 0, buff.length);
                if (len == -1) {
                    break;
                }
                bos.write(buff, 0, buff.length);
            }
            byte[] bytes = bos.toByteArray();

            byte[] encode;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                encode = Base64.getEncoder().encode(bytes);
            } else {
                encode = android.util.Base64.encode(bytes, android.util.Base64.DEFAULT);
            }
            return new String(encode);
        }
        catch (Exception e) {
            throw new IOException("Exception: " + e);
        }
        finally {
            IOUtil.closeQuietly(fis);
        }
    }

}
