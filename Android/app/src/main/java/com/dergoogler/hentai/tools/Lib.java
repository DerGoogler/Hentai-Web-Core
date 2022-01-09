package com.dergoogler.hentai.tools;

public class Lib {
    static {
        System.loadLibrary("native-lib");
    }

    public static native String getReleaseURl();

    public static native String getDebugURl();

    public static native String getInterfaceName();

    public static native String getUserAgent();

    public static native String getStorageKey();
}
