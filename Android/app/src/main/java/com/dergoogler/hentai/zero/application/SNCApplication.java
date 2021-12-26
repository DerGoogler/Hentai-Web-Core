package com.dergoogler.hentai.zero.application;

import com.dergoogler.hentai.zero.log.Logger;

import androidx.multidex.MultiDexApplication;

/**
 * Application
 *
 * @author mcharima5@gmail.com
 * @since 2018
 */
public class SNCApplication extends MultiDexApplication {
    private static final String TAG = SNCApplication.class.getSimpleName();

    @Override
    public void onCreate() {
        Logger.i(TAG, ">>>>>>>>>> onCreate <<<<<<<<<<");
        super.onCreate();
    }

    @Override
    public void onLowMemory() {
        Logger.i(TAG, ">>>>>>>>>> onLowMemory <<<<<<<<<<");
        super.onLowMemory();
    }

    @Override
    public void onTrimMemory(int level) {
        Logger.i(TAG, ">>>>>>>>>> onTrimMemory(" + level + ") <<<<<<<<<<");
        super.onTrimMemory(level);
    }

}
