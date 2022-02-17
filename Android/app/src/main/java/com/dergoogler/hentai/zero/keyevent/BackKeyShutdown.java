package com.dergoogler.hentai.zero.keyevent;

import android.os.Handler;
import android.os.Looper;
import android.view.KeyEvent;

public class BackKeyShutdown {

    private static final int PRESS_BACK_KEY_INTERVAL = 2000;

    private static final Handler handler = new Handler(Looper.getMainLooper());

    private static int backKeyPressedCount = 0;
    private static final Runnable callbackBackKeyCancel = () -> backKeyPressedCount = 0;

    public static boolean isFirstBackKeyPress(int keyCode, KeyEvent event) {
        if (KeyEvent.ACTION_DOWN == event.getAction()) {
            // press back key
            if (KeyEvent.KEYCODE_BACK == keyCode) {
                // first time
                if (backKeyPressedCount <= 0) {
                    backKeyPressedCount = 1;

                    handler.removeCallbacks(callbackBackKeyCancel);
                    handler.postDelayed(callbackBackKeyCancel, PRESS_BACK_KEY_INTERVAL);
                    return true;
                }
            }
        }
        return false;
    }

}
