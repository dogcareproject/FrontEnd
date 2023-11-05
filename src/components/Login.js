import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "./AuthContext";

const Login = () => {
  const { login } = useAuth();

  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const onUserIdHandler = (e) => {
    setUserId(e.currentTarget.value);
  }
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    login();

    if (userId === "" || password === "") {
      window.alert("아이디 또는 비밀번호를 입력해주세요.")
      setLoginFailed(true);
      return;
    }
    axios.post('/login', {
      account: userId,
      password: password,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(response => {
        if (response.status === 200) {
          const accessToken = response.data.token;
          localStorage.setItem('token', accessToken);
          console.log(response);
          setLoginSuccess(true);
          setLoginFailed(false);
          navigation('/');
        } else {
          setLoginFailed(true);
          window.alert("로그인에 실패하였습니다. 아이디와 비밀번호를 확인하세요.");
          setLoading(false);
        }
      })
      .catch(error => {
        console.error(error);
        setLoginFailed(true);
        setErrorMessage("서버 오류가 발생했습니다. 나중에 다시 시도하세요.");
        setLoading(false);
        navigation('/login');
      });
  }

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <form onSubmit={onSubmitHandler}>
                          <div className="form-group">
                            <input
                              type="text"
                              name="logemail"
                              className="form-style"
                              placeholder="Your ID"
                              id="logemail"
                              autoComplete="off"
                              onChange={onUserIdHandler} />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autoComplete="off"
                              onChange={onPasswordHandler} />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn mt-4">로그인</button>
                        </form>
                        <p className="mb-0 mt-4 text-center">
                          <a href="/findInfo" className="link">Forgot your info?</a>
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
