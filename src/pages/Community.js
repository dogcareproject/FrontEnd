import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import axios from "axios";

export const PostStateContext = React.createContext();

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

  return (
    <PostStateContext.Provider value={data}>
      <div>
        {loading ? (
          <p>데이터를 불러오는 중...</p>
        ) : (
          < PostList postList={data} />
        )}
      </div>
    </PostStateContext.Provider>
  )
};

export default Community;