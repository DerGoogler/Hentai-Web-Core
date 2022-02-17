package com.dergoogler.hentai.zero.dialog;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Bitmap;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.Toast;

import com.dergoogler.hentai.zero.log.Logger;

public class DialogHelper {

    public static void alert(Activity activity, String message) {
        alert(activity, "", message, android.R.string.ok,
                (dialog, which) -> {

                });
    }

    public static void alert(Activity activity, String title, String message, int resId, DialogInterface.OnClickListener listener) {
        try {
            AlertDialog.Builder builder = new AlertDialog.Builder(activity);
            builder.setTitle(title);
            builder.setMessage(message);
            builder.setView(null);
            builder.setNegativeButton(activity.getResources().getString(resId), listener);
            builder.setCancelable(true);

            Dialog dialog = builder.show();
            dialog.setCanceledOnTouchOutside(false);

        } catch (android.view.WindowManager.BadTokenException e) {
            Logger.e(activity.getClass().getSimpleName(), e);
        }
    }

    public static void alert(Activity activity, View view) {
        try {
            AlertDialog.Builder builder = new AlertDialog.Builder(activity);
            builder.setView(view);
            builder.setNegativeButton(activity.getResources().getString(android.R.string.ok), (dialog, which) -> {

            });
            builder.setCancelable(true);

            Dialog dialog = builder.show();
            dialog.setCanceledOnTouchOutside(false);

        } catch (android.view.WindowManager.BadTokenException e) {
            Logger.e(activity.getClass().getSimpleName(), e);
        }
    }

    public static void alert(Context context, Bitmap bitmap) {
        ImageView iv = new ImageView(context);
        ViewGroup.LayoutParams params = iv.getLayoutParams();
        if (null == params) {
            params = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        }
        iv.setLayoutParams(params);
        iv.setImageBitmap(bitmap);

        DialogHelper.alert((Activity) context, iv);
    }

    public static void toast(Context context, String message) {
        try {
            if (context instanceof Activity) {
                if (((Activity) context).isFinishing()) {
                    return;
                }
            }
            Toast toast = Toast.makeText(context, message, Toast.LENGTH_SHORT);
            toast.show();

        } catch (Exception e) {
            Logger.w(context.getClass().getSimpleName(), e);
        }
    }

}