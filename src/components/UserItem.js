import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const UserItem = ({ id, account, name, email }) => {
  const navigation = useNavigate();

  const [dayCount, setDayCount] = useState("");

  // const goUserDetail = (e) => {
  //   e.preventDefault();
  //   navigation(`/userDetail/${id}`);
  // }

  const dayCountChange = (e) => {
    setDayCount(e.currentTarget.value);
  }

  const token = localStorage.getItem('token');

  const onUserBanHandler = (e) => {
    e.preventDefault();
    axios.post('/admin/banMember', {
      id: id,
      bantime: dayCount,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        if (response.status === 200) {
          console.log(response.status);
        }
      })
      .catch(error => {
        console.error(error);
        console.log(id);
      })
  }

  const onUserDeleteHandler = (e) => {
    e.preventDefault();

    if (window.confirm('확인을 누르면 회원이 탈퇴됩니다.')) {
      axios.post('/admin/withdrawal', {
        id: id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(response => {
          if (response.status === 200) {
            console.log(response.status);
            // window.location.reload();
            navigation('/userList');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  return <div className="UserItem">
    <div class="card" style={{ width: '18rem' }}>
      <div class="card-header">
        {account}
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{account}</li>
        <li class="list-group-item">{name}</li>
        <li class="list-group-item">{email}</li>
      </ul>
      <div class="card-body">
        <a href={`/userEdit/${id}`} className="card-link">수정하기</a>
        <a onClick={onUserDeleteHandler} className="card-link">회원강제탈퇴</a>
      </div>
      <form onSubmit={onUserBanHandler}>
        <div className="frame">
          <div className="">
            <input id="input1" type="text" placeholder="정지 일수" onChange={dayCountChange} />
          </div>
          <button type="submit" className="custom-btn btn-4">회원 정지</button>
        </div>
      </form>
    </div>
  </div>
};

export default UserItem;