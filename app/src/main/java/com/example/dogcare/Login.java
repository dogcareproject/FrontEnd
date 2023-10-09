package com.example.dogcare;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class Login extends Fragment {
    private Button loginToHomeBtn;
    private TextView forgotPwd;
    private TextView mAccountView;
    private EditText mPasswordView;
    private TextView mForgotPwdView;
    private Button mLoginToHomeBtn;
    private ApiService service;
    private LoginData data;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_login, container, false);
        loginToHomeBtn = view.findViewById(R.id.loginToHomeBtn);
        loginToHomeBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                FragmentTransaction fragmentTransaction = requireActivity().getSupportFragmentManager().beginTransaction();
                Fragment mainHomeFragment = new MainHome();
                fragmentTransaction.replace(R.id.fragmentContainerView, mainHomeFragment);
                fragmentTransaction.addToBackStack(null);
                fragmentTransaction.commit();
            }
        });

        forgotPwd = view.findViewById(R.id.forgotPwd);
        forgotPwd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                FragmentTransaction fragmentTransaction = requireActivity().getSupportFragmentManager().beginTransaction();
                Fragment forgotPwdFragment = new ForgotPwd();
                fragmentTransaction.replace(R.id.fragmentContainerView, forgotPwdFragment);
                fragmentTransaction.addToBackStack(null);
                fragmentTransaction.commit();
            }
        });

        mAccountView = view.findViewById(R.id.loginID);
        mPasswordView = view.findViewById(R.id.loginPassword);
        mForgotPwdView = view.findViewById(R.id.forgotPwd);
        mLoginToHomeBtn = view.findViewById(R.id.loginToHomeBtn);

        service = RetrofitCliemt.getClient().create(ApiService.class);

        mLoginToHomeBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                attemptLogin();;
            }
        });

        return view;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    private void attemptLogin() {
        mAccountView.setError(null);
        mPasswordView.setError(null);

        String account = mAccountView.getText().toString();
        String password = mPasswordView.getText().toString();

        SharedPreferences loginAccount = getActivity().getSharedPreferences("account", Activity.MODE_PRIVATE);
        SharedPreferences.Editor editor = loginAccount.edit();

        editor.putString("loginAccount", account);
        editor.commit();

        boolean cancel = false;
        View focusView = null;

        if (account.isEmpty()) {
            mAccountView.setError("아이디를 입력해주세요.");
            focusView = mAccountView;
            cancel = true;
        }

        if (password.isEmpty()) {
            mPasswordView.setError("비밀번호를 입력해주세요.");
            focusView = mPasswordView;
            cancel = true;
        } else if (!isPasswordValid(password)) {
            mPasswordView.setError("6자 이상의 비밀번호를 입력하세요.");
            focusView = mPasswordView;
            cancel = true;
        }

        if (cancel) {
            focusView.requestFocus();
        } else {
            startLogin(new LoginData(account, password));

        }
    }

    private void startLogin(LoginData data) {
        service.userLogin(data).enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                LoginResponse result = response.body();
                Toast.makeText(getActivity(), result.getResult_req(), Toast.LENGTH_SHORT).show();
//                showProgress(false);

                if (result.getResult_code() == 200) {
                    Intent intent = new Intent(getActivity(), Login.class);
                    startActivity(intent);
                }

            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                Toast.makeText(getActivity(), "로그인 에러 발생", Toast.LENGTH_SHORT).show();
//                showProgress(false);
            }
        });
    }

    private boolean isPasswordValid(String password) {
        return password.length() >= 6;
    }

//    private void showProgress(boolean show) {
//        mProgressView.setVisibility(show ? View.VISIBLE : View.GONE);
//    }
}