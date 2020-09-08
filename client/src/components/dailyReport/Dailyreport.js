import React, { useState, useEffect } from 'react'
import UserService from "../../services/user.service";
import {
  Table,
  Container, Row, Button,
} from "reactstrap";

function Dailyreport() {
  const [detail, setDetail] = useState();

  useEffect(() => {
    UserService.getDailyReport().then(
      (response) => {
        console.log("--->", response.data)
        setDetail(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setDetail(_content);
      })
  }, []);

  return (
    <>
      <div className="profile-page">
        <div className="wrapper" >
          <div style={{ height: "150px" }}>
          </div>
          <div style={{ minHeight: "calc(100vh - 150px)" }}>
            <Container>
              <div>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-center">Quality Code</th>
                      <th className="text-center">Machine No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail && detail.map((data, index) => (
                      <tr key={index} >
                        <td>{index + 1}</td>
                        <td className="text-center">{data.key}</td>
                        <td className="text-center">
                          {data && data.value && data.value.map((detail, index) => (
                            <p>{detail}</p>
                          ))}
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </Table>
              </div>
            </Container>
          </div>
        </div>
      </div >
    </>
  )
}

export default Dailyreport
