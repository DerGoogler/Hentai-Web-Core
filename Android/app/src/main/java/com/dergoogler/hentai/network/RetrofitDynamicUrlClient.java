package com.dergoogler.hentai.network;

import android.net.Uri;

import com.dergoogler.hentai.zero.log.Logger;

import org.jetbrains.annotations.NotNull;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

/**
 * Retrofit Client
 *
 * @author mcharima5@gmail.com
 * @since 2020
 */
public class RetrofitDynamicUrlClient {
    private static final String TAG = RetrofitDynamicUrlClient.class.getSimpleName();

    public static void get(String urlString, Callback<ResponseBody> listener) {
        Uri uri = Uri.parse(filter(urlString));

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(uri.getScheme() + "://" + uri.getAuthority())   // Base URL required.
                .build();

        DynamicUrlService service = retrofit.create(DynamicUrlService.class);

        Logger.i(TAG, "[Retrofit GET] ", "Request = " + urlString);
        Call<ResponseBody> call = service.get(urlString);

        callAsync(call, listener);
    }

    private static <T> void callAsync(Call<T> call, Callback<T> listener) {
        call.enqueue(new Callback<T>() {
            @Override
            public void onResponse(@NotNull Call<T> call, @NotNull Response<T> response) {
                Logger.i(TAG, "[Retrofit] ", "onResponse() = response code is " + response.code());

                if (null != listener) {
                    listener.onResponse(call, response);
                }
            }

            @Override
            public void onFailure(@NotNull Call<T> call, @NotNull Throwable t) {
                Logger.e(TAG, "[Retrofit] ", "onFailure() = " + t);

                if (null != listener) {
                    listener.onFailure(call, t);
                }
            }
        });
    }

    private static String filter(String urlString) {
        Uri uri = Uri.parse(urlString);
        return uri.getScheme().replaceAll("[^a-zA-Z:/]", "") + "://" +
                uri.getAuthority() +
                uri.getPath() +
                ((null != uri.getQuery()) ? "?" + uri.getQuery() : "") +
                ((null != uri.getFragment()) ? "?" + uri.getFragment() : "");
    }
}
