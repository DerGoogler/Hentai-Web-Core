package com.dergoogler.hentai.zero.log;

import android.util.Log;


public class Logger {

    public static final int VERBOSE = Log.VERBOSE;
    public static final int DEBUG = Log.DEBUG;
    public static final int INFO = Log.INFO;
    public static final int WARN = Log.WARN;
    public static final int ERROR = Log.ERROR;

    private static int sLogLevel = VERBOSE;

    private static String sPrefix = "";

    public static void setLogLevel(int level) {
        sLogLevel = level;
    }

    public static void setPrefix(String prefix) {
        sPrefix = prefix;
    }

    public static void v(String tag, Object...msg) {
        try {
            if (sLogLevel > VERBOSE) {
                return;
            }
            Log.v(tag, sPrefix + getMessage(msg));
        } catch (Exception e) {
            systemOut(sPrefix + getMessage(msg));
        }
    }

    public static void d(String tag, Object...msg) {
        try {
            if (sLogLevel > DEBUG) {
                return;
            }
            Log.d(tag, sPrefix + getMessage(msg));
        } catch (Exception e) {
            systemOut(sPrefix + getMessage(msg));
        }
    }

    public static void i(String tag, Object...msg) {
        try {
            if (sLogLevel > INFO) {
                return;
            }
            Log.i(tag, sPrefix + getMessage(msg));
        } catch (Exception e) {
            systemOut(sPrefix + getMessage(msg));
        }
    }

    public static void w(String tag, Object...msg) {
        try {
            if (sLogLevel > WARN) {
                return;
            }
            Log.w(tag, sPrefix + getMessage(msg));
        } catch (Exception e) {
            systemOut(sPrefix + getMessage(msg));
        }
    }

    public static void e(String tag, Object...msg) {
        try {
            if (sLogLevel > ERROR) {
                return;
            }
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