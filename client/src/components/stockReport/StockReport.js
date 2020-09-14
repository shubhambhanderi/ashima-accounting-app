import React, { useState, useEffect } from 'react'
import UserService from "../../services/user.service";
import {
  Table,
  Container,
} from "reactstrap";

function StockReport() {

  const [detail, setDetail] = useState();

  useEffect(() => {
    UserService.getStockReport().then(
      (response) => {
        console.log(response.data)
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
                      <th className="text-center">TAKA</th>
                      <th className="text-center">Meters</th>
                      <th className="text-center">Weights</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail && detail.map((data, index) => (
                      <tr key={index} >
                        <td>{index + 1}</td>
                        <td className="text-center" >{data.qualityCode}</td>
                        <td className="text-center" >{data.taka}</td>
                        <td className="text-center" >{data.mtr}</td>
                        <td className="text-center" >{data.wt.toFixed(3)}</td>
                      </tr>
                    ))
                    }
                    <tr style={{ backgroundColor: "hotpink" }}>
                      <td style={{ fontWeight: "bold" }}>Grand Total</td>
                      <td className="text-center"></td>
                      <td className="text-center" style={{ fontWeight: "bold" }}>{detail?.map((e) => e.taka)?.reduce((a, b) => (parseFloat(a) + parseFloat(b)), 0)}</td>
                      <td className="text-center" style={{ fontWeight: "bold" }}>{detail?.map((e) => e.mtr)?.reduce((a, b) => (parseFloat(a) + parseFloat(b)), 0)}</td>
                      <td className="text-center" style={{ fontWeight: "bold" }}>{detail?.map((e) => e.wt.toFixed(3))?.reduce((a, b) => (parseFloat(a) + parseFloat(b)), 0)}</td>
                    </tr>
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

export default StockReport
