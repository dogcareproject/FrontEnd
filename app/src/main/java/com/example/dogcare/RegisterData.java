package com.example.dogcare;

import com.google.gson.annotations.SerializedName;

public class RegisterData {
    @SerializedName("Account")
    private String account;
    @SerializedName("Password")
    private String password;
    @SerializedName("Name")
    private String name;
    @SerializedName("Email")
    private String email;
    @SerializedName("Doctor_check")
    private String doctor_check;

    public RegisterData(String account, String password, String name, String email, String doctor_check) {
        this.account = account;
        this.password = password;
        this.name = name;
        this.email = email;
        this.doctor_check = doctor_check;
    }
}
