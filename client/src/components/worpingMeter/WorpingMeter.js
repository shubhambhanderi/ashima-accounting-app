import React, { useState, useEffect } from 'react';
import UserService from "../../services/user.service";
import {
  Table,
  Container, Card
} from "reactstrap";

function WorpingMeter() {
  const [detail, setDetail] = useState();

  useEffect(() => {
    UserService.getWorpingMeter().then(
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
              {/* <div className="d-none d-md-block"> */}
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="text-center">Quality Code</th>
                    <th className="text-center">Order</th>
                    <th className="text-center">onLoom</th>
                    <th className="text-center">Stock</th>
                    <th className="text-center">Warping Meter</th>
                  </tr>
                </thead>
                <tbody>
                  {detail && detail.map((data, index) => (
                    <tr key={index} >
                      <td>{index + 1}</td>
                      <td className="text-center">{data.quality}</td>
                      <td className="text-center">{data.order.toFixed(3)}</td>
                      <td className="text-center">{data.onLoom}</td>
                      <td className="text-center">{data.stock}</td>
                      <td className="text-center">{data.worpingMeter.toFixed(3)}</td>
                    </tr>
                  ))
                  }
                </tbody>
              </Table>
            </Container>
          </div>
        </div>
      </div >
    </>
  )
}

export default WorpingMeter
