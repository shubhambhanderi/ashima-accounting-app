import React, { useState, useEffect } from 'react'
import UserService from "../../services/user.service";
import {
  Table,
  Container,
} from "reactstrap";

function Beamstock() {

  const [detail, setDetail] = useState();
  const [sub1, setSub1] = useState();
  const [sub2, setSub2] = useState();
  const [sub3, setSub3] = useState();

  useEffect(() => {
    const date = localStorage.getItem('date');
    setSub1(date.substring(6, 8));
    setSub2(date.substring(8, 10));
    setSub3(date.substring(10, 12));

    UserService.getBeamStock().then(
      (response) => {
        // console.log(response.data)
        setDetail(response.data.sort((a, b) => (a.QualityCode.localeCompare(b.QualityCode))));
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
              <div style={{ color: "white", fontWeight: "bold" }} className="pt-5">
                Backup : {sub1}-{sub2}-{sub3}
              </div>
              <div className="pt-5">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-center">Quality Code</th>
                      <th className="text-center">Beam No.</th>
                      <th className="text-center">Date</th>
                      <th className="text-center">ENDS</th>
                      <th className="text-center">Mtr.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail && detail.map((data, index) => (
                      <tr key={index} >
                        <td>{index + 1}</td>
                        <td className="text-center" style={{ width: '20px' }}>{data.QualityCode}</td>
                        <td className="text-center">
                          {data && data.beamStockData && data.beamStockData.map((detail, index) => (
                            <p key={index}>{detail.BeamNumber}</p>
                          ))}
                        </td>
                        <td className="text-center">
                          {data && data.beamStockData && data.beamStockData.map((detail, index) => (
                            <p key={index}>{detail.Date.toString().slice(0, 10)}</p>
                          ))}
                        </td>
                        <td className="text-center">
                          {data && data.beamStockData && data.beamStockData.map((detail, index) => (
                            <p key={index}>{detail.Ends}</p>
                          ))}
                        </td>
                        <td className="text-center">
                          {data && data.beamStockData && data.beamStockData.map((detail, index) => (
                            <p key={index}>{detail.Meter}</p>
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

export default Beamstock
