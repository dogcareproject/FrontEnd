import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, Pagination } from 'antd';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const count = 5; // 한 페이지에 표시할 항목 수

const UserList = () => {
  const navigation = useNavigate();

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [dayCount, setDayCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem('token');

  const dayCountChange = (e) => {
    setDayCount(e.currentTarget.value);
  }

  const onUserBanHandler = (id) => {
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
          navigation('/');
        }
      })
      .catch(error => {
        console.error(error);
        console.log(id);
      })
  }

  const onUserDeleteHandler = (id) => {
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
            navigation('/');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/getMemberList', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setInitLoading(false);
        setData(response.data);
        setList(response.data);
      })
      .catch(error => {
        console.error(error);
        setInitLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const filteredData = data.filter((item) => {
      return item.account.includes(searchTerm);
    });
    setSearchResult(filteredData);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * count;
  const endIndex = startIndex + count;

  const displayList = searchResult.length > 0 ? searchResult.slice(startIndex, endIndex) : list.slice(startIndex, endIndex);

  return (
    <div>
      <div className='search-input'>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}><i class="bi bi-search"></i>&nbsp;&nbsp;검색</button>
      </div>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={displayList}
        renderItem={(item) => (
          <List.Item
            actions={[
              <div>
                <div>
                  <input id="input12" type="text" placeholder="정지 일수" onChange={dayCountChange} />
                  <span>&nbsp;&nbsp;</span>
                  <button onClick={() => onUserBanHandler(item.id)}><i class="bi bi-x-circle"></i>&nbsp;&nbsp;회원 정지</button>&nbsp; |
                  <span>&nbsp;&nbsp;</span>
                  <button onClick={() => onUserDeleteHandler(item.id)}><i class="bi bi-trash"></i>&nbsp;&nbsp;회원 강제 탈퇴</button>
                </div>
              </div>
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name?.last}</a>}
                description={`아이디: ${item.account}, 이메일: ${item.email}`}
              />
            </Skeleton>
          </List.Item>
        )}
      />
      <Pagination
        className='pagination'
        current={currentPage}
        total={searchResult.length > 0 ? searchResult.length : list.length}
        pageSize={count}
        onChange={onPageChange}
      />
    </div>
  );
};

export default UserList;


// import React, { useEffect, useState } from 'react';
// import { Pagination } from 'antd';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

// const count = 10;

// const renderPetInfo = (pet) => {
//   if (pet) {
//     return (
//       <div>
//         <p className='table-row__policy'>{pet.name}</p>
//         <span className='table-row__small'>{pet.age}</span>
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <p className='table-row__policy'>N/A</p>
//         <span className='table-row__small'>N/A</span>
//       </div>
//     );
//   }
// };

// const UserList = () => {
//   const navigation = useNavigate();

//   const [initLoading, setInitLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [petData, setPetData] = useState([]);
//   const [memberId, setMemberId] = useState([]);
//   const [list, setList] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [dayCount, setDayCount] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const token = localStorage.getItem('token');

//   const dayCountChange = (e) => {
//     setDayCount(e.currentTarget.value);
//   }

//   const onUserBanHandler = (id) => {
//     axios.post('/admin/banMember', {
//       id: id,
//       bantime: dayCount,
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//       .then(response => {
//         if (response.status === 200) {
//           console.log(response.status);
//           navigation('/');
//         }
//       })
//       .catch(error => {
//         console.error(error);
//         console.log(id);
//       })
//   }

//   const onUserDeleteHandler = (id) => {
//     if (window.confirm('확인을 누르면 회원이 탈퇴됩니다.')) {
//       axios.post('/admin/withdrawal', {
//         id: id,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       })
//         .then(response => {
//           if (response.status === 200) {
//             console.log(response.status);
//             navigation('/userList');
//           }
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }
//   }

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     axios.get('/getMemberList', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//       .then(response => {
//         setInitLoading(false);
//         setData(response.data);

//         const memberIds = response.data.map(member => member.id);
//         console.log(memberIds);
//         setMemberId(memberIds);
//         setList(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//         setInitLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (memberId && memberId.length > 0) {
//       const token = localStorage.getItem('token');

//       const petRequests = memberId.map(userId => {
//         return axios.get('/user/pet/pets', {
//           params: {
//             memberId: userId,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           }
//         });
//       });

//       Promise.all(petRequests)
//         .then(responses => {
//           const petDataArray = responses.map(response => response.data);
//           setPetData(prevPetData => [...prevPetData, ...petDataArray]);
//           setInitLoading(false);
//         })
//         .catch(error => {
//           console.error(error);
//           setInitLoading(false);
//         });
//     }
//   }, [memberId, currentPage]);


//   console.log(petData);


//   const handleSearch = () => {
//     const filteredData = data.filter((item) => {
//       return item.account.includes(searchTerm);
//     });
//     setSearchResult(filteredData);
//   };

//   const onPageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const startIndex = (currentPage - 1) * count;
//   const endIndex = startIndex + count;

//   const displayList = searchResult.length > 0 ? searchResult.slice(startIndex, endIndex) : list.slice(startIndex, endIndex);

//   return (
//     <div className='container'>
//       <div className='row row--top-40'>
//         <div className='col-md-12'>
//           <h2 className='row__title'>users ({data.length})</h2>
//         </div>
//       </div>
//       <div className='row row--top-20'>
//         <div className='col-md-12'>
//           <div className='table-container'>
//             <table className='table'>
//               <thead className='table__thead'>
//                 <tr>
//                   <th className='table__th'>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;아이디
//                   </th>
//                   <th className='table__th'>반려견 이름</th>
//                   <th className='table__th'>반려견 나이</th>
//                   <th className='table__th'>반려견 몸무게</th>
//                   <th className='table__th'>견종</th>
//                   <th className='table__th'>회원 탈퇴</th>
//                 </tr>
//               </thead>
//               <tbody className='table__tbody'>
//                 {displayList.map((user, index) => (
//                   <tr key={index} className={`table-row table-row--${user.name}`}>
//                     <td className='table-row__td'>
//                       <div className='table-row__img'></div>
//                       <div className='table-row__info'>
//                         <p className='table-row__name'>{user.account}</p>
//                         <span className='table-row__small'>{user.name}</span>
//                       </div>
//                     </td>
//                     <td data-column='Policy' className='table-row__td'>
//                       {petData[index] && petData[index].map((pet, petIndex) => (
//                         <div key={petIndex}>
//                           <p className='table-row__policy'>{pet.name}</p>
//                         </div>
//                       ))}
//                     </td>
//                     <td data-column='Policy' className='table-row__td'>
//                       {petData[index] && petData[index].map((pet, petIndex) => (
//                         <div key={petIndex}>
//                           <p className='table-row__policy'>{pet.age}</p>
//                         </div>
//                       ))}
//                     </td>
//                     <td data-column='Policy' className='table-row__td'>
//                       {petData[index] && petData[index].map((pet, petIndex) => (
//                         <div key={petIndex}>
//                           <p className='table-row__policy'>{pet.weight}</p>
//                         </div>
//                       ))}
//                     </td>
//                     <td data-column='Policy' className='table-row__td'>
//                       {petData[index] && petData[index].map((pet, petIndex) => (
//                         <div key={petIndex}>
//                           <p className='table-row__policy'>{pet.breed}</p>
//                         </div>
//                       ))}
//                     </td>
//                     <td data-column='Policy' className='table-row__td'>
//                       <div>
//                         <button onClick={() => onUserDeleteHandler(user.id)}>
//                           <i className="bi bi-trash"></i>&nbsp;&nbsp;회원 강제 탈퇴
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <Pagination
//         className='pagination'
//         current={currentPage}
//         total={searchResult.length > 0 ? searchResult.length : list.length}
//         pageSize={count}
//         onChange={onPageChange}
//       />
//     </div>
//   );
// };

// export default UserList;
