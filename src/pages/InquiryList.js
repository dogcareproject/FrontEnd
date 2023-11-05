import axios from "axios";
import { useEffect, useState } from "react";
import InquiryItem from "../components/InquiryItem";

const InquiryList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/admin/getInquiries', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
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
    <div className="InquiryList">
      {loading ? (
        <p>데이터를 불러오는 중...</p>
      ) : (
        <div>
          {data.map((inquiry, index) => (
            <div key={inquiry.inquiryId} className="">
              <InquiryItem {...inquiry} />
              {index % 3 === 2 && <div className="Clearfix" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InquiryList;