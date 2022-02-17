package com.dergoogler.hentai.zero.webview;

import android.app.Activity;
import android.net.Uri;
import android.util.Log;
import android.webkit.DownloadListener;

import com.dergoogler.hentai.zero.download.CSDownloadManager;

import java.io.File;
import java.net.URLDecoder;
import java.security.InvalidParameterException;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;

public class CSDownloadListener implements DownloadListener {
    private static final String TAG = CSDownloadListener.class.getSimpleName();

    private final Activity activity;

    public CSDownloadListener(Activity activity) {
        this.activity = activity;
    }

    @Override
    public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimeType, long contentLength) {
        String fileName = getFilenameFromDownloadContent(url, contentDisposition);
        if (null == fileName) {
            return;
        }

        CSDownloadManager dm = new CSDownloadManager();
        dm.download(this.activity, url);
    }

    private String getFilenameFromDownloadContent(String urlString, String contentDisposition) {
        try {
            Uri uri = Uri.parse(urlString);

            String fileName = uri.getQueryParameter("clientFileName");
            if (null == fileName) {
                fileName = uri.getQueryParameter("filename");
            }
            if (null == fileName) {
                for (String str : contentDisposition.split(";")) {
                    if (str.contains("filename=")) {
                        fileName = contentDisposition.split("filename=")[1];
                    }
                    else if (str.contains("fileName=")) {
                        fileName = contentDisposition.split("fileName=")[1];
                    }
                }
            }
            if (null == fileName) {
                Set<String> set = getQueryParameterNames(uri);
                if (null == set || set.size() == 0) {
                    File file = new File(urlString);
                    fileName = file.getName();
                }
            }
            if (null == fileName || fileName.length() == 0) {
                return null;
            }
            return URLDecoder.decode(fileName, "UTF-8");

        } catch (Exception e) {
            Log.e(TAG, Log.getStackTraceString(e));
            return null;
        }
    }

    private Set<String> getQueryParameterNames(Uri uri) {
        if (null == uri) {
            throw new InvalidParameterException("Can't get parameter from a null Uri");
        }
        if (uri.isOpaque()) {
            throw new UnsupportedOperationException("This isn't a hierarchical URI.");
        }

        String query = uri.getEncodedQuery();
        if (null == query) {
            return Collections.emptySet();
        }

        Set<String> names = new LinkedHashSet<>();
        int start = 0;
        do {
            int next = query.indexOf('&', start);
            int end = (next == -1) ? query.length() : next;

            int separator = query.indexOf('=', start);
            if (separator > end || separator == -1) {
                separator = end;
            }

            String name = query.substring(start, separator);
            names.add(Uri.decode(name));

            start = end + 1;
        } while (start < query.length());

        return Collections.unmodifiableSet(names);
    }

}
