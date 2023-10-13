import { useEffect, useState } from "react";
import PostList from "../components/PostList";
import axios from "axios";

const url = "";

const Community = () => {
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
      < PostList postList={data} />
    )}
  </div>
};

export default Community;