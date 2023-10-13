import { Link } from 'react-router-dom';
import React from 'react';

import '../App.css';

const Nav = () => {
  return <div>
    <div className="navbar">
      <Link className="navbarMenu" to={'/userList'}><b>사용자 목록</b></Link>
      <Link className="navbarMenu" to={'/community'}><b>커뮤니티</b></Link>
      <Link className="navbarMenu" to={'/aiModel'}><b>AI Model</b></Link>
    </div>
  </div>
};


export default Nav;