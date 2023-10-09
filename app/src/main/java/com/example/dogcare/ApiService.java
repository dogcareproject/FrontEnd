package com.example.dogcare;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;


public interface ApiService {

    @POST("/user/login")
    Call<LoginResponse> userLogin(@Body LoginData data);
    @POST("user/register")
    Call<RegisterResponse> userRegister(@Body RegisterData data);


}
