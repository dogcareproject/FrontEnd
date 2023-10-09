package com.example.dogcare;

import com.google.gson.annotations.SerializedName;

public class LoginResponse {
    @SerializedName("result_code")
    private int result_code;
    @SerializedName("result_req")
    private String result_req;
    @SerializedName("Accout")
    private String account;
    @SerializedName("Password")
    private String password;

    public int getResult_code() {
        return result_code;
    }

    public String getResult_req() {
        return result_req;
    }

    public String getAccount() {
        return account;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
