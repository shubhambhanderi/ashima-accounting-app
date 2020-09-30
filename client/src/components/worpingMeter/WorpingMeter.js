import React, { useState, useEffect } from 'react';
import UserService from "../../services/user.service";
import {
  Table,
  Container, Card
} from "reactstrap";

function WorpingMeter() {
  const [WMdetail, setWMDetail] = useState();
  const [beam, setBeam] = useState()
  const [sub1, setSub1] = useState();
  const [sub2, setSub2] = useState();
  const [sub3, setSub3] = useState()

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


  useEffect(() => {
    const date = localStorage.getItem('date');
    setSub1(date.substring(6, 8));
    setSub2(date.substring(8, 10));
    setSub3(date.substring(10, 12));

    setBeam(JSON.parse(localStorage.getItem("beam")));
    setWMDetail(JSON.parse(localStorage.getItem("WMDetail")));
    // UserService.getBeamStock().then(
    //   (response) => {
    //     var temp = {};
    //     response.data.forEach((e, i) => {
    //       temp[e.QualityCode] = e.beamStockData.reduce((T, c) => (T + Number(c.Meter)), 0)
    //     })
    //     // console.log(temp)
    //     setBeam(temp);
    //     UserService.getWorpingMeter().then(
    //       (response) => {
    //         // console.log("--->", response.data)
    //         setWMDetail(response.data.sort((a, b) => (a.quality.localeCompare(b.quality))));
    //       },
    //       (error) => {
    //         const _content =
    //           (error.response &&
    //             error.response.data &&
    //             error.response.data.message) ||
    //           error.message ||
    //           error.toString();
    //         setWMDetail(_content);
    //       })
    //   },
    //   (error) => {
    //     const _content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //     setBeam(_content);
    //   })

  }, []);

  return (
    <>
      <div className="profile-page">
        <div className="wrapper" >
          <div style={{ height: "150px" }}>
          </div>
          <div style={{ minHeight: "calc(100vh - 150px)" }}>
            <Container>
              <div style={{ color: "white", fontWeight: "bold" }} className="pt-5">
                Backup : {sub1}-{sub2}-{sub3}
              </div>
              {/* <div className="d-none d-md-block"> */}
              <div className="pt-5">
                <Table responsive >
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
                    {WMdetail && WMdetail.map((data, index) => (
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
              </div>
            </Container>
          </div>
        </div>
      </div >
    </>
  )
}

export default WorpingMeter
