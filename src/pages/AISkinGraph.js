import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AIEyesGraph = () => {
  const [predictedData, setPredictedData] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/admin/skinLog', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        if (response.status === 200) {
          console.log(response.status);
          console.log(response.data);

          setPredictedData(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [token]);
  // ...

  return (
    <div className="container" style={{ position: "relative" }}>
      <div className="row py-5">
        <div className="col-12">
          <table id="example" className="table table-hover responsive nowrap" style={{ width: "100%" }}>
            <thead>
              <tr style={{ borderBottom: "solid 1px black" }}>
                <th>날짜</th>
                <th>메시지</th>
                <th>Info</th>
              </tr>
            </thead>
            <tbody>
              {predictedData.slice().reverse().map((log, index) => { // predictedData 배열을 복사하고 뒤집기
                const dateTime = log.split(' ');
                const date = dateTime.slice(0, 2).join(' ');
                const message = dateTime.slice(2, 5).join(' ');
                const info = dateTime.slice(5, 7).join(' ');
                const breed = dateTime.slice(7).join(' ');

                return (
                  <tr key={index}>
                    <td>{date}</td>
                    <td>{breed}</td>
                    <td>{message}</td>
                    <td>{info}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default AIEyesGraph;