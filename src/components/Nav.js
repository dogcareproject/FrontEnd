import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

const Nav = () => {
  const navigation = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const [selectedUserPets, setSelectedUserPets] = useState("");

  const handleLogout = () => {
    const confirmed = window.confirm("로그아웃하시겠습니까?");
    if (confirmed) {
      logout();
      localStorage.clear();
      navigation('/');
    }
  };

  const onChangePwdHandler = () => {
    if (!selectedUserPets) {
      return <p>로딩 중...</p>;
    }

    if (selectedUserPets.length === 0) {
      return <p>해당 사용자의 펫 정보가 없습니다.</p>;
    }

    return (
      <div>
        <ol class="large-numbers">
          {selectedUserPets.map((pet) => (
            <li key={pet.id}>
              <p>이름: {pet.name}</p>
              <p>나이: {pet.age}</p>
              <p>몸무게: {pet.weight}</p>
              <p>견종: {pet.breed}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <div>
      <nav>
        <ul class="menu">
          <li>
            <Link to={isLoggedIn ? '/userList' : '/login'}><i class="fa fa-user"></i>사용자 목록</Link>
          </li>
          <li>
            <Link to={isLoggedIn ? '/graph' : '/login'}><i class="fa fa-camera"></i>데이터 관리</Link>
          </li>
          <li>
            <Link to={!isLoggedIn && '/login'}><i class="fa fa-tags"></i>AI Model</Link>
            <ul class="sub-menu">
              <li>
                <Link to={isLoggedIn ? '/aigraph' : '/login'}>AI Graph</Link>
              </li>
              <li>
                <Link to={isLoggedIn ? '/aigraph' : '/login'}>Sub-Menu 2</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={isLoggedIn ? '/inquiryList' : '/login'}><i class="fa fa-bullhorn"></i>문의 하기</Link>
          </li>
        </ul>
      </nav>
      <div className="logBtn">
        {isLoggedIn && <button onClick={onChangePwdHandler}>비밀번호 변경 |</button>}
        {isLoggedIn ? (

          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <Link to={'/login'}>
            <button>로그인</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
