package com.dergoogler.hentai.zero.json;

import android.text.TextUtils;

import com.dergoogler.hentai.zero.log.Logger;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * JSONObject Helper
 *
 * @author mcharima5@gmail.com
 * @since 2018
 */
public class JSONHelper {
    private static final String TAG = JSONHelper.class.getSimpleName();

    public static String getString(JSONObject jsonObject, String key, String defaultValue) {
        if (isNull(jsonObject, key) || !has(jsonObject, key)) {
            return defaultValue;
        }
        return jsonObject.optString(key, defaultValue);
    }

    public static JSONObject getJSONObject(JSONObject jsonObject, String key, JSONObject defaultValue) {
        if (isNull(jsonObject, key) || !has(jsonObject, key)) {
            return defaultValue;
        }

        return jsonObject.optJSONObject(key);
    }

    public static void put(JSONObject jsonObject, String key, String value) {
        try {
            jsonObject.put(key, value);
        } catch (JSONException e) {
            Logger.e(TAG, e);
        }
    }

    private static boolean has(JSONObject jsonObject, String key) {
        if (null == jsonObject || null == key || key.length() <= 0) {
            return true;
        }
        return jsonObject.has(key);
    }

    private static boolean isNull(JSONObject jsonObject, String key) {
        if (null == jsonObject || TextUtils.isEmpty(key)) {
            return false;
        }
        return jsonObject.isNull(key);
    }
}
