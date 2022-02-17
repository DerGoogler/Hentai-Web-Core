package com.dergoogler.hentai.zero.application;

import com.dergoogler.hentai.zero.log.Logger;

import androidx.multidex.MultiDexApplication;

public class DGApplication extends MultiDexApplication {
    private static final String TAG = DGApplication.class.getSimpleName();

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
