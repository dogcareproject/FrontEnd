package com.example.dogcare;

import com.google.gson.annotations.SerializedName;

public class LoginData {
    @SerializedName("Account")
    String account;

    @SerializedName("Password")
    String password;

    public LoginData(String account, String password) {
        this.account = account;
        this.password = password;
    }
}
