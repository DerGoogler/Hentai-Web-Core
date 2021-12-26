package com.dergoogler.hentai.zero.log;

import android.util.Log;

/**
 * Log Utilities
 *
 * @author mcharima5@gmail.com
 * @since 2018
 */
@SuppressWarnings({"unused", "RedundantSuppression"})
public class Logger {
    private static String sPrefix = "";

    public static void setPrefix(String prefix) {
        sPrefix = prefix;
    }

    public static void d(String tag, Object...msg) {
        try {
            Log.d(tag, sPrefix + getMessage(msg));
        } catch (Exception e) {
            systemOut(sPrefix + getMessage(msg));
        }
    }

    public static void i(String tag, Object...msg) {
        try {
            Log.i(tag, sPrefix + getMessage(msg));
        } catch (Exception e) {
            systemOut(sPrefix + getMessage(msg));
        }
    }

    public static void v(String tag, Object...msg) {
        try {
            Log.v(tag, sPrefix + getMessage(msg));
        } catch (Exception e) {
            systemOut(sPrefix + getMessage(msg));
        }
    }

    public static void w(String tag, Object...msg) {
        try {
            Log.w(tag, sPrefix + getMessage(msg));
        } catch (Exception e) {
            systemOut(sPrefix + getMessage(msg));
        }
    }

    public static void e(String tag, Object...msg) {
        try {
            Log.e(tag, sPrefix + getMessage(msg));
        } catch (Exception e) {
            systemOut(sPrefix + getMessage(msg));
        }
    }

    private static String getMessage(Object...msg) {
        StringBuilder sb = new StringBuilder();
        for (Object o : msg) {
            sb.append(getMessage(o)).append('\n');
        }
        if (sb.length() > 0) {
            sb.deleteCharAt(sb.length() - 1);
        }
        return sb.toString();
    }

    private static String getMessage(Object msg) {
        if (null == msg) {
            return "";
        }
        if (msg instanceof Throwable) {
            return Log.getStackTraceString((Throwable) msg);
        }
        return msg.toString();
    }

    private static void systemOut(String msg) {
        System.out.println(getMessage(msg));
    }

}
