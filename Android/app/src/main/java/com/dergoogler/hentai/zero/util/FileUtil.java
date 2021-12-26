package com.dergoogler.hentai.zero.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

/**
 * File Utilities
 *
 * @author mcharima5@gmail.com
 * @since 2018
 */
public class FileUtil {

    private static boolean mkdirs(File dir) {
        if (null == dir) {
            return false;
        }
        if (dir.exists()) {
            return true;
        }
        return dir.mkdirs();
    }

    @SuppressWarnings("BooleanMethodIsAlwaysInverted")
    public static boolean delete(File file) {
        if (null == file || !file.exists()) {
            return false;
        }
        return file.delete();
    }

    public static boolean exists(File file) {
        return file.exists();
    }

    public static String newFilename(String extension) {
        String name = DateTimeUtil.formatDate(new Date(), "yyyyMMdd_HHmmss");
        return name + "."  + extension;
    }

    public static File createFile(File dir, String...pathAndFilename) throws IOException {
        File file = dir;
        for (String path : pathAndFilename) {
            file = new File(file, path);
        }
        if (!mkdirs(file.getParentFile())) {
            throw new IOException("mkdirs failed...!!!!! " + dir);
        }
        if (exists(file)) {
            if (!delete(file)) {
                throw new IOException("delete failed...!!!!! " + file);
            }
        }
        if (file.createNewFile()) {
            return file;
        }
        return null;
    }

    public static void write(FileInputStream fin, FileOutputStream fos) throws IOException {
        try {
            byte[] buff = new byte[1024 * 4];	// 1MB = 1048576 = 1024 * 1024, 10KB = 10240 = 10 * 1024
            while (true) {
                int len = fin.read(buff);
                if (-1 == len) {
                    break;
                }
                fos.write(buff, 0, len);
            }
        }
        finally {
            IOUtil.closeQuietly(fin);
            IOUtil.closeQuietly(fos);
        }
    }

}
