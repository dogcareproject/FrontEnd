package com.example.dogcare;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Register extends Fragment {

    private EditText mAccountView;
    private EditText mPasswordView;
    private EditText mCheckedPwd;
    private Button mCheckPasswordBtnView;
    private EditText mEmailView;
    private EditText mNameView;
    private EditText mDoctorCheckView;
    private CheckBox mDoctorCheckBox;
    private Button mRegisterBtn;
    private TextView mBackText;
    private ApiService service;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_register, container, false);
        mRegisterBtn = view.findViewById(R.id.registerBtn);
        mRegisterBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                FragmentTransaction fragmentTransaction = requireActivity().getSupportFragmentManager().beginTransaction();
                Fragment loginFragment = new Login();
                fragmentTransaction.replace(R.id.fragmentContainerView, loginFragment);
                fragmentTransaction.addToBackStack(null);
                fragmentTransaction.commit();
            }
        });

        mBackText = view.findViewById(R.id.backText);
        mBackText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                FragmentTransaction fragmentTransaction = requireActivity().getSupportFragmentManager().beginTransaction();
                Fragment homeFragment = new Home();
                fragmentTransaction.replace(R.id.fragmentContainerView, homeFragment);
                fragmentTransaction.addToBackStack(null);
                fragmentTransaction.commit();
            }
        });

        mCheckPasswordBtnView = view.findViewById(R.id.checkPasswordBtn);
        mCheckPasswordBtnView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String password = mPasswordView.getText().toString();
                String checkedPwd = mCheckedPwd.getText().toString();

                if (!checkedPwd.equals(password)) {
                    Toast.makeText(getActivity(), "비밀번호가 일치하지 않습니다.", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(getActivity(), "비밀번호가 일치합니다.", Toast.LENGTH_SHORT).show();
                }
            }
        });

        mDoctorCheckBox = view.findViewById(R.id.doctorCheckBox);
        mDoctorCheckBox.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (mDoctorCheckBox.isChecked()) {
                    mDoctorCheckView.setEnabled(true);
                } else {
                    mDoctorCheckView.setEnabled(false);
                }
            }
        });


        mAccountView = view.findViewById(R.id.signIDText);
        mPasswordView = view.findViewById(R.id.signPasswordText);
        mCheckedPwd = view.findViewById(R.id.checked_pwd);
        mCheckPasswordBtnView = view.findViewById(R.id.checkPasswordBtn);
        mEmailView = view.findViewById(R.id.emailText);
        mNameView = view.findViewById(R.id.signNameText);
        mDoctorCheckView = view.findViewById(R.id.vetNum);
        mDoctorCheckView.setEnabled(false);

        service = RetrofitCliemt.getClient().create(ApiService.class);

        mRegisterBtn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                attemptRegister();
            }

        });
        return view;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    private void attemptRegister() {
        mAccountView.setError(null);
        mPasswordView.setError(null);
        mCheckedPwd.setError(null);
        mCheckPasswordBtnView.setError(null);
        mEmailView.setError(null);
        mNameView.setError(null);
        mDoctorCheckView.setError(null);

        String account = mAccountView.getText().toString();
        String password = mPasswordView.getText().toString();
        String checkedPwd = mCheckedPwd.getText().toString();
        String email = mEmailView.getText().toString();
        String name = mNameView.getText().toString();
        String doctorCheck = mDoctorCheckView.getText().toString();

        boolean cancel = false;
        View focusView = null;

        if (account.isEmpty()) {
            mAccountView.setError("아이디를 입력해주세요.");
            focusView = mAccountView;
            cancel = true;
        }

        if (password.isEmpty()) {
            mPasswordView.setError("패스워드를 입력해주세요.");
            focusView = mPasswordView;
            cancel = true;
        } else if (!isPasswordValid(password)) {
            mPasswordView.setError("6자 이상의 비밀번호를 입력해주세요.");
            focusView = mPasswordView;
            cancel = true;
        }

        if (!checkedPwd.equals(password)) {
            mCheckedPwd.setError("비밀번호가 일치하지 않습니다.");
//            Toast.makeText(getActivity(), "비밀번호가 일치하지 않습니다.", Toast.LENGTH_SHORT).show();
            focusView = mCheckedPwd;
            cancel = true;
        }

        if (email.isEmpty()) {
            mEmailView.setError("이메일을 입력해주세요.");
            focusView = mEmailView;
            cancel = true;
        } else if (!isEmailValid(email)) {
            mEmailView.setError("@를 포함한 유효한 이메일을 입력하세요.");
            focusView = mEmailView;
            cancel = true;
        }

        if (name.isEmpty()) {
            mNameView.setError("이름를 입력해주세요.");
            focusView = mNameView;
            cancel = true;
        }

        if (doctorCheck.isEmpty()) {
            mDoctorCheckView.setError("수의사 면혀번호를 입력해주세요.");
            focusView = mDoctorCheckView;
            cancel = true;
        }

        if (cancel) {
            focusView.requestFocus();
        } else {
            startRegister(new RegisterData(account, password, name, email, doctorCheck));
        }
    }

    private void startRegister(RegisterData data) {
        service.userRegister(data).enqueue(new Callback<RegisterResponse>() {
            @Override
            public void onResponse(Call<RegisterResponse> call, Response<RegisterResponse> response) {
                RegisterResponse result = response.body();
                Toast.makeText(getActivity(), result.getResult_req(), Toast.LENGTH_SHORT).show();

                if (result.getResult_code() == 200) {
                    if (getActivity() != null) {
                        getActivity().finish();
                    }
                }
            }

            @Override
            public void onFailure(Call<RegisterResponse> call, Throwable t) {
                Toast.makeText(getActivity(), "회원가입 에러 발생", Toast.LENGTH_SHORT).show();
                Log.e("회원가입 에러 발생", t.getMessage());

            }
        });
    }

    private boolean isEmailValid(String email) {
        return email.contains("@");
    }

    private boolean isPasswordValid(String password) {
        return password.length() >= 6;
    }
}