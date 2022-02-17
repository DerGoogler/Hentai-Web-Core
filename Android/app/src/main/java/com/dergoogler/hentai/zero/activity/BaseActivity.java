package com.dergoogler.hentai.zero.activity;

import android.app.Activity;
import android.content.Context;
import androidx.appcompat.app.AppCompatActivity;

public abstract class BaseActivity extends AppCompatActivity {

    protected Context getContext() {
        return this;
    }

    protected Activity getActivity() {
        return this;
    }

}
