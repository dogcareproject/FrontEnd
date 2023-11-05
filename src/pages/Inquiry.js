import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Inquiry = () => {
  const token = localStorage.getItem('token');

  const { id } = useParams();
  const navigation = useNavigate();

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('/admin/getInquiries', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        const inquiryData = response.data.find(inquiry => parseInt(inquiry.inquiryId) === parseInt(id));
        if (inquiryData) {
          setDate(inquiryData.createTime);
          setTitle(inquiryData.title);
          setContent(inquiryData.content);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error(error);
      })
  }, []);


  return <div className="Inquiry">
    {loading ? (
      <p>데이터를 불러오는 중...</p>
    ) : (<div>
      <div className="Inquiry-detail">
        <div>
          <h4>{date}</h4>
          <input type="text" value={title} disabled />
        </div>
        <div>
          <textarea type="text" disabled>
            {content}
          </textarea>
        </div>
        <div className="frame">
          <button class="custom-btn btn-4" onClick={() => navigation(`/inquiryAnswer/${id}`)}>답변 달기</button>
        </div>
      </div>
    </div>
    )}
  </div>
}

export default Inquiry;