package com.example.dogcare;

import com.google.gson.annotations.SerializedName;

public class RegisterResponse {
    @SerializedName("result_code")
    private int result_code;
    @SerializedName("result_req")
    private String result_req;

    public int getResult_code() {
        return result_code;
    }

    public String getResult_req() {
        return result_req;
    }
}
