import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();

  // 임시로 아이디는 userId로
  const [userId, setUserId] = useState("");
  // 임시로 패스워드는 title로
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);




  const onUserIdHandler = (e) => {
    setUserId(e.currentTarget.value);
  }
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  const onSubmitHandler = (e) => {
    if (userId === "" || password === "") {
      window.alert("아이디와 비밀번호를 입력하세요.");
      return;
    }
    axios.post('http://ceprj.gachon.ac.kr:60003/login', {
      account: userId,
      password: password,
    })
      .then(response => {
        if (response.status === 200) {
          setLoginSuccess(true);
          setLoginFailed(false);
          navigation('/');
        } else {
          setLoginFailed(true);
          setLoginSuccess(false);
        }
      })
      .catch(error => {
        console.error(error);
        setLoginFailed(true);
        setLoading(false);
      });
  }


  return (
    <div className="Login">
      {loading ? (
        <p>Loading...</p>
      ) : loginSuccess ? (
        <p>Login successful! Welcome, {userId}</p>
      ) : loginFailed ? (
        <p>로그인 실패</p>
      ) : (
        <form style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={onSubmitHandler}
        >
          <label htmlFor="userId">ID</label>
          <input type='text' id="userId" value={userId} onChange={onUserIdHandler} />
          <label htmlFor="password">Password</label>
          <input type='password' id="password" value={password} onChange={onPasswordHandler} />
          <br />
          <button className="loginBtn" type="submit">
            Login
          </button>
          <button className="registerBtn" onClick={() => navigation('/register')}>
            회원가입
          </button>
        </form>
      )}
    </div>
  )
};

export default Login;
