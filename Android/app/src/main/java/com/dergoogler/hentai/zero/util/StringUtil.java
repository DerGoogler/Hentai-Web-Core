package com.dergoogler.hentai.zero.util;

import android.os.Bundle;

import java.util.Iterator;

public class StringUtil {

    public static String nvl(Object str, String defaultValue) {
        if (null == str) {
            return defaultValue;
        }
        return str.toString();
    }

    public static boolean isEmpty(Object obj) {
        if (null == obj) {
            return true;
        }

        if (obj instanceof String) {
            String str = (String) obj;
            return str.length() <= 0 || str.trim().length() <= 0;
        }
        if (obj instanceof String[]) {
            String[] arrStr = (String[]) obj;
            return arrStr.length <= 0;
        }
        return false;
    }

    public static boolean isNotEmpty(Object obj) {
        return !isEmpty(obj);
    }

    public static String toString(Bundle bundle) {
        if (null == bundle) {
            return "";
        }
        StringBuilder buff = new StringBuilder();
        Iterator<String> keys = bundle.keySet().iterator();
        while (keys.hasNext()) {
            String key = keys.next();
            buff.append((0 != buff.length()) ? "\n" : "");
            buff.append(key).append("=").append(bundle.get(key));
            buff.append(keys.hasNext() ? "," : "");
        }
        buff.insert(0, "{\n");
        buff.append("\n}");
        return buff.toString();
    }

}
