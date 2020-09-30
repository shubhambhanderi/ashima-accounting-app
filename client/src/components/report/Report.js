import React, { useState, useEffect } from 'react'
import UserService from "../../services/user.service";
import {
  Table,
  Container,
} from "reactstrap";
import Switch from '@material-ui/core/Switch';

const code180 = ["01", "02", "04", "24", "25", "26", "27", "28", "31", "32", "35", "36"];
const code190 = ["05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"];
const code230 = ["03", "06", "29", "30", "33", "34", "37", "38", "39", "40", "41", "42"];

function Report() {
  const [MRDetail, setMRDetail] = useState();
  const [OYN, setOYN] = useState(false);
  const [OYNTrue, setOYNTrue] = useState(false);
  const [sub1, setSub1] = useState();
  const [sub2, setSub2] = useState();
  const [sub3, setSub3] = useState();

  useEffect(() => {
    const date = localStorage.getItem('date');
    setSub1(date.substring(6, 8));
    setSub2(date.substring(8, 10));
    setSub3(date.substring(10, 12));

    setMRDetail(JSON.parse(localStorage.getItem('MRDetail')))
    // UserService.getReport().then(
    //   (response) => {
    //     // console.log("--->", response.data)
    //     setDetail(response.data);
    //   },
    //   (error) => {
    //     const _content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //     setDetail(_content);
    //   });
  }, []);

  function getNumber(qcode) {
    const start = qcode.indexOf('/') + 1;
    const middle = qcode.indexOf('/', start) + 1;
    const end = qcode.indexOf('"', middle);
    const numberStr = qcode.substring(middle, end);
    const number = Number(numberStr);
    return number;
  }
  const handleChange = (event) => {
    setOYNTrue(event.target.checked);
    setOYN(event.target.checked ? true : false)
  };
  return (
    <>
      <div className="profile-page">
        <div className="wrapper" >
          <div style={{ height: "150px" }}>
          </div>
          <div style={{ minHeight: "calc(100vh - 150px)" }}>
            <Container>
              <div style={{ color: "white", fontWeight: "bold" }}>
                Backup : {sub1}-{sub2}-{sub3}
              </div>
              <div style={{ color: "white", fontWeight: "bold" }} className="pt-5">
                {OYNTrue ? "Completed" : "Pending"}
                <Switch
                  // checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </div>
              {/* <div className="d-none d-md-block"> */}
              {OYN ? (<Table responsive>
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th className="text-center">Machine No.</th>
                    <th className="text-center">Quality Code</th>
                    <th className="text-center">Meter</th>
                    <th className="text-center">Received meter</th>
                    <th className="text-center">Remaining meter</th>
                  </tr>
                </thead>
                <tbody>
                  {MRDetail && MRDetail.sort((a, b) => (a.mcno.localeCompare(b.mcno))).map((data, index) => {
                    if (data.fMinusP > 1500) {
                      return (
                        <tr className="text-center">
                          <td>{index + 1}</td>
                          <td className="text-center">{data.mcno}</td>
                          <td className="text-center">{data.qualityCode}</td>
                          <td className="text-center">{data.f}</td>
                          <td className="text-center">{data.p}</td>
                          <td className="text-center">{data.fMinusP}</td>
                        </tr>
                      )
                    }
                  })}
                </tbody>
              </Table>)
                :
                (<Table responsive>
                  <thead>
                    <tr>
                      <th className="text-center">Codes</th>
                      <th className="text-center">Machine No.</th>
                      <th className="text-center">Quality Code</th>
                      <th className="text-center">Remaining meter</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="text-center">180</td>
                      <td className="text-center">
                        {MRDetail && MRDetail.map((data, index) => {
                          // let code = getNumber(data.qualityCode);
                          // console.log(code180.includes(data.mcno), data.mcno);
                          if (data.fMinusP < 1500 && code180.includes(data.mcno)) {
                            return (
                              <p>{data.mcno}</p>
                            )
                          }
                        })}
                      </td>
                      <td className="text-center">
                        {MRDetail && MRDetail.map((data, index) => {
                          // let code = getNumber(data.qualityCode);
                          if (data.fMinusP < 1500 && code180.includes(data.mcno)) {
                            return (
                              <p>{data.qualityCode}</p>
                            )
                          }
                        })}
                      </td>
                      <td className="text-center">
                        {MRDetail && MRDetail.map((data, index) => {
                          // let code = getNumber(data.qualityCode);
                          if (data.fMinusP < 1500 && code180.includes(data.mcno)) {
                            return (
                              <p>{data.fMinusP}</p>
                            )
                          }
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">190</td>
                      <td className="text-center">
                        {MRDetail && MRDetail.map((data, index) => {
                          // let code = getNumber(data.qualityCode);
                          if (data.fMinusP < 1500 && code190.includes(data.mcno)) {
                            return (
                              <p>{data.mcno}</p>
                            )
                          }
                        })}
                      </td>
                      <td className="text-center">
                        {MRDetail && MRDetail.map((data, index) => {
                          // let code = getNumber(data.qualityCode);
                          if (data.fMinusP < 1500 && code190.includes(data.mcno)) {
                            return (
                              <p>{data.qualityCode}</p>
                            )
                          }
                        })}
                      </td>
                      <td className="text-center">
                        {MRDetail && MRDetail.map((data, index) => {
                          // let code = getNumber(data.qualityCode);
                          if (data.fMinusP < 1500 && code190.includes(data.mcno)) {
                            return (
                              <p>{data.fMinusP}</p>
                            )
                          }
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">230</td>
                      <td className="text-center">
                        {MRDetail && MRDetail.map((data, index) => {
                          // let code = getNumber(data.qualityCode);
                          if (data.fMinusP < 1500 && code230.includes(data.mcno)) {
                            return (
                              <p>{data.mcno}</p>
                            )
                          }
                        })}
                      </td>
                      <td className="text-center">
                        {MRDetail && MRDetail.map((data, index) => {
                          // let code = getNumber(data.qualityCode);
                          if (data.fMinusP < 1500 && code230.includes(data.mcno)) {
                            return (
                              <p>{data.qualityCode}</p>
                            )
                          }
                        })}
                      </td>
                      <td className="text-center">
                        {MRDetail && MRDetail.map((data, index) => {
                          // let code = getNumber(data.qualityCode);
                          if (data.fMinusP < 1500 && code230.includes(data.mcno)) {
                            return (
                              <p>{data.fMinusP}</p>
                            )
                          }
                        })}
                      </td>
                    </tr>
                    {/* <tr>
                      <td className="text-center">260</td>
                      <td className="text-center">
                        {MRDetail && MRDetail.map((data, index) => {
                          let code = getNumber(data.qualityCode);
                          if (data.fMinusP < 1500 && code > 89 && code < 101) {
                            return (
                              <p>{data.mcno}</p>
                            )
                          }
                        })}
                      </td>
                      <td className="text-center">
                        {MRDetail && MRDetail.map((data, index) => {
                          let code = getNumber(data.qualityCode);
                          if (data.fMinusP < 1500 && code > 89 && code < 101) {
                            return (
                              <p>{data.qualityCode}</p>
                            )
                          }
                        })}
                      </td>
                      <td className="text-center">
                        {MRDetail && MRDetail.map((data, index) => {
                          let code = getNumber(data.qualityCode);
                          if (data.fMinusP < 1500 && code > 89 && code < 101) {
                            return (
                              <p>{data.fMinusP}</p>
                            )
                          }
                        })}
                      </td>
                    </tr> */}
                  </tbody>
                </Table>)}
            </Container>
          </div>
        </div>
      </div >
    </>
  )
}

export default Report
