import { useEffect, useState } from "react";
import axios from "axios";


const UserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);


  return <div>
    {loading ? (
      <p>데이터를 불러오는 중...</p>
    ) : (
      <ul>
        {data.map((user) => (

          <li key={user.id}>
            <p>
              <b>작성자 :</b> {user.userId}
            </p>
            <p>
              <b>제목 : </b>{user.title}
            </p>
          </li>
        ))}
      </ul>
    )}
  </div >
};

export default UserList;