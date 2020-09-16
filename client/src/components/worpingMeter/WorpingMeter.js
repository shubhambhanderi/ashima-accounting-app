import React, { useState, useEffect } from 'react';
import UserService from "../../services/user.service";
import {
  Table,
  Container, Card
} from "reactstrap";

function WorpingMeter() {
  const [detail, setDetail] = useState();
  const [beam, setBeam] = useState()

  function getFactor(qcode) {
    if (qcode.indexOf('(') !== -1) {
      const start = qcode.indexOf('/') + 1;
      const end = qcode.indexOf('/', start);
      const numberStr = qcode.substring(start, end);
      const number = Number(numberStr);
      if (number > 60) {
        return 1.1;
      } else if (number <= 60) {
        return 1.08;
      }
    }
    return 1;
  }

  getFactor('1222(12/32/12")');

  useEffect(() => {
    UserService.getBeamStock().then(
      (response) => {
        var temp = {};
        response.data.forEach((e, i) => {
          temp[e.QualityCode] = e.beamStockData.reduce((T, c) => (T + Number(c.Meter)), 0)
        })
        console.log(temp)
        setBeam(temp);
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
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setBeam(_content);
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
                    <th className="text-center">Supply Quantity</th>
                    <th className="text-center">Beamstock</th>
                    <th className="text-center">Warping Meter</th>
                    <th className="text-center">Final WM</th>
                  </tr>
                </thead>
                <tbody>
                  {detail && detail.map((data, index) => (
                    <tr key={index} >
                      <td>{index + 1}</td>
                      <td className="text-center">{data.quality}</td>
                      <td className="text-center">{data.order}</td>
                      <td className="text-center">{data.onLoom}</td>
                      <td className="text-center">{data.stock}</td>
                      <td className="text-center">{data.SupplyQty}</td>
                      <td className="text-center">{beam ? beam[data.quality] : " "}</td>
                      <td className="text-center">{Number(data.worpingMeter) - parseFloat(beam[data.quality] ? beam[data.quality] : "0")}</td>
                      <td className="text-center">{((Number(data.worpingMeter) - parseFloat(beam[data.quality] ? beam[data.quality] : "0")) * getFactor(data.quality)).toFixed(3)}</td>
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
