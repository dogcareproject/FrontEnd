import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const UserStateContext = React.createContext();

const UserItem = ({ id, account, name, email }) => {
  const navigation = useNavigate();

  const goUserDetail = (e) => {
    e.preventDefault();
    navigation(`/userDetail/${id}`);
  }

  const onUserDeleteHandler = () => {
    axios.delete('/user/withdrawal')
  }

  return <UserStateContext.Provider value={[id, account, name, email]}>
    <div className="UserItem">
      <div className="login-box">
        <h2>{account}</h2>
        <form>
          <div onClick={goUserDetail}>
            <div className="user-box">
              <b>아이디</b>
              <input type="text" value={account} required="" disabled />
            </div>
            <div className="user-box">
              <b>이름</b>
              <input type="text" value={name} required="" disabled />
            </div>
            <div className="user-box">
              <b>이메일</b>
              <input type="text" value={email} required="" disabled />
            </div>
          </div>
          <div>
            <a href={`/userEdit/${id}`}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              수정하기
            </a>
            <a href={`/userDelete/${id}`} onClick={onUserDeleteHandler}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              회원 탈퇴
            </a>
          </div>
        </form>
      </div>
    </div>
  </UserStateContext.Provider>
};

export default UserItem;