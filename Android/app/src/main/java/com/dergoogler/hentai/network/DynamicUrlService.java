package com.dergoogler.hentai.network;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Url;

/**
 * Dynamic URLs for Requests
 *
 * @author mcharima5@gmail.com
 * @since 2020
 */
public interface DynamicUrlService {

    @GET
    Call<ResponseBody> get(@Url String url);

}
