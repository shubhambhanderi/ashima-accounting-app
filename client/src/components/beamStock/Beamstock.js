import React, { useState, useEffect } from 'react'
import UserService from "../../services/user.service";
import {
  Table,
  Container,
} from "reactstrap";

function Beamstock() {

  const [detail, setDetail] = useState();

  useEffect(() => {
    UserService.getBeamStock().then(
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
