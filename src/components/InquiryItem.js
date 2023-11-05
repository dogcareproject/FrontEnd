import React from "react";
import { useNavigate } from "react-router-dom";


const InquiryItem = ({ inquiryId, account, title, content, email }) => {
  const navigation = useNavigate();

  const goDetail = () => {
    navigation(`/inquiryDetail/${inquiryId}`);
  }

  return (
    <div>
      <div className="InquiryItem position-relative">
        <blockquote className="default" onClick={goDetail}>
          <h3><span className="Cdefault">{title}</span> - {email}</h3>
          <p>{content}</p>
        </blockquote>
        <div className="frame position-absolute bottom-0 end-0">
          <button className="custom-btn btn-4" onClick={() => navigation(`/inquiryAnswer/${inquiryId}`)}>답변 달기</button>
        </div>
      </div>
    </div>
  )
};

export default InquiryItem;