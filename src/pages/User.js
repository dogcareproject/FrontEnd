import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserStateContext } from "../components/UserItem";


const User = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const userList = useContext(UserStateContext);

  const [data, setData] = useState();

  console.log(data);

  useEffect(() => {
    if (userList && userList.length >= 1) {
      const targetUser = userList.find((it) => parseInt(it.id) === parseInt(id));
      if (targetUser) {
        setData(targetUser);
      } else {
        alert('없는 사용자입니다.');
        navigation('/userList');
      }
    }
  }, [id, userList]);

  if (!data) {
    return <div className="User">로딩중입니다...</div>
  }

  return <div className="User">
    <div>
      <h2>사용자: {data.account}</h2>
      <h2>이름: {data.name}</h2>
      <h2>email: {data.email}</h2>
    </div>
    <button onClick={() => navigation(`/userEdit/${id}`)}>수정하기</button>
  </div>
};

export default User;