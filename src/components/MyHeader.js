import { useState } from "react";
import { Link } from "react-router-dom";

const MyHeader = () => {
  const [loginOut, setLoginOut] = useState(true);

  const handleLogout = () => {
    setLoginOut(false);
  };

  return (
    <div className="MyHeader">
      <h1><Link className="navbarMain" to={'/'}>멍멍케어</Link></h1>
      <div className="logBtn">
        {loginOut ? (
          <Link to={'/login'}>
            <button>로그인</button>
          </Link>
        ) : (
          <button onClick={handleLogout}>로그아웃</button>
        )}
      </div >
    </div >
  )
};

export default MyHeader;