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
import com.dergoogler.hentai.zero.util.StringUtil;

public class DialogBuilder {
	private static final String TAG = DialogBuilder.class.getSimpleName();

	public static DialogBuilder with(Context context) {
		return new DialogBuilder((Activity) context);
	}

	public static DialogBuilder with(Activity activity) {
		return new DialogBuilder(activity);
	}

	private final Activity activity;
	private String title;
	private String message;
	private View view;
	private Bitmap bitmap;
	private CharSequence positiveButtonText;
	private DialogInterface.OnClickListener positiveButtonListener;
	private CharSequence negativeButtonText;
	private DialogInterface.OnClickListener negativeButtonListener;
	private CharSequence neutralButtonText;
	private DialogInterface.OnClickListener neutralButtonListener;

	public DialogBuilder(Activity activity) {
		this.activity = activity;
	}

	public DialogBuilder setTitle(String title) {
		this.title = title;
		return this;
	}

	public DialogBuilder setMessage(String message) {
		this.message = message;
		return this;
	}

	public DialogBuilder setView(View view) {
		this.view = view;
		return this;
	}

	public DialogBuilder setBitmap(Bitmap bitmap) {
		this.bitmap = bitmap;
		return this;
	}

	public DialogBuilder setPositiveButton(CharSequence text, final DialogInterface.OnClickListener listener) {
		this.positiveButtonText = text;
		this.positiveButtonListener = listener;
		return this;
	}
	public DialogBuilder setPositiveButton(int resId, final DialogInterface.OnClickListener listener) {
		setPositiveButton(activity.getResources().getString(resId), listener);
		return this;
	}

	public DialogBuilder setNegativeButton(CharSequence text, final DialogInterface.OnClickListener listener) {
		this.negativeButtonText = text;
		this.negativeButtonListener = listener;
		return this;
	}
	public DialogBuilder setNegativeButton(int resId, final DialogInterface.OnClickListener listener) {
		setNegativeButton(activity.getResources().getString(resId), listener);
		return this;
	}

	@SuppressWarnings("UnusedReturnValue")
	public DialogBuilder setNeutralButton(CharSequence text, final DialogInterface.OnClickListener listener) {
		this.neutralButtonText = text;
		this.neutralButtonListener = listener;
		return this;
	}
	public DialogBuilder setNeutralButton(int resId, final DialogInterface.OnClickListener listener) {
		setNeutralButton(activity.getResources().getString(resId), listener);
		return this;
	}

	public void toast() {
		try {
			Toast toast = Toast.makeText(activity, StringUtil.nvl(message, ""), Toast.LENGTH_SHORT);
			toast.show();

		} catch (Exception e) {
			Logger.w(TAG, e);
		}
	}

	public void show() {
		try {
			if (activity.isFinishing()) {
				Logger.e(TAG, "activity is finished.");
				return;
			}

			AlertDialog.Builder builder = new AlertDialog.Builder(activity);
			if (null != title) {
				builder.setTitle(title);
			}
			if (null != message) {
				builder.setMessage(message);
			}
			if (null != view) {
				builder.setView(view);
			}
			if (null != bitmap) {
				ImageView iv = new ImageView(this.activity);
				ViewGroup.LayoutParams params = iv.getLayoutParams();
				if (null == params) {
					params = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
				}
				iv.setLayoutParams(params);
				iv.setImageBitmap(bitmap);
				builder.setView(iv);
			}
			if (null != positiveButtonListener) {
				builder.setPositiveButton(positiveButtonText, positiveButtonListener);
			}
			if (null != negativeButtonListener) {
				builder.setNegativeButton(negativeButtonText, negativeButtonListener);
			}
			if (null != neutralButtonListener) {
				builder.setNeutralButton(neutralButtonText, neutralButtonListener);
			}
			if (null == positiveButtonListener && null == negativeButtonListener && null == neutralButtonListener) {
				builder.setNegativeButton(android.R.string.ok, (dialog, which) -> {

				});
			}

			builder.setCancelable(false);

			Dialog dialog = builder.show();
			dialog.setCanceledOnTouchOutside(false);

		} catch (android.view.WindowManager.BadTokenException e) {
			Logger.e(activity.getClass().getSimpleName(), e);
		}
	}

}
