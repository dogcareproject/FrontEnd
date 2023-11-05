import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

const InquiryAnswer = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [answer, setAnswer] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const answerhandler = (e) => {
    setAnswer(e.currentTarget.value);
  }

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

  const inquiryAnswerHandelr = (e) => {
    console.log("check");

    e.preventDefault()
    axios.post('/admin/inquiryAnswer', {
      memberId: id
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        if (response.data === 200) {
          console.log(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      })
  };


  return <div>
    <form onSubmit={inquiryAnswerHandelr}>
      <div className="frame">
        <div className="">
          <input id="input1" type="text" value={data} onChange={answerhandler} />
        </div>
        <button type="submit" className="custom-btn btn-4">답변 보내기</button>
      </div>
    </form>
  </div>
}

export default InquiryAnswer;