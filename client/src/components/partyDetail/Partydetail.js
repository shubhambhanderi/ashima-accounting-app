import React, { useState, useEffect } from 'react'
import UserService from "../../services/user.service";
import {
  Table,
  Container, Row, Button,
} from "reactstrap";
import { saveAs } from 'file-saver';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import htmlStr from '../htmlStringGenerator/htmlStr';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: 'transparent !important'
  },
});

function Partydetail(props) {
  const classes = useStyles();
  const [partyObject, setpartyObject] = props.partyState;

  if (partyObject !== undefined) {
    localStorage.setItem("ps", JSON.stringify(partyObject));
  }
  const [detail, setDetail] = useState();
  const ps = JSON.parse(localStorage.getItem('ps'));

  useEffect(() => {
    UserService.getPartydata(ps.party, ps.broker).then(
      (response) => {
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

  function createAndDownloadPDF() {
    let str = htmlStr(detail, ps.party, ps.broker);
    UserService.pythonPDFSerivce({ data: str })
      .then((res) => {
        console.log("success", res.data);
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'new.pdf');
      })
      .catch((err) =>
        console.log(err)
      )
  }

  return (
    <>
      <div className="profile-page">
        <div className="wrapper" >
          <div style={{ height: "150px" }}>
          </div>
          <div style={{ minHeight: "calc(100vh - 150px)" }}>
            <Container>
              <Row>
                <h4><b style={{ color: 'hotpink' }}> PARTY: </b>{ps.party} <br /> <b style={{ color: 'hotpink' }}>BROKER: </b>{ps.broker}</h4>
                <Button className="btn-icon ml-auto" onClick={() => createAndDownloadPDF()} color="info" size="sm">
                  <i className="fa fa-edit"></i>
                </Button>{` `}
              </Row>
              <div className="d-md-block d-none">
                <Table hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-center">Order Date</th>
                      <th className="text-center">Q Code</th>
                      <th className="text-center">Ord. No</th>
                      <th className="text-center">Ord. Quantity</th>
                      {/* <th className="text-center">Ord. Rate</th> */}
                      <th className="text-center">Supply Date</th>
                      <th className="text-center">BL/CH No.</th>
                      <th className="text-center">Supply Quan.</th>
                      <th className="text-center">No. Taka</th>
                      <th className="text-center">Supply Rate</th>
                      <th className="text-center">Balance Quan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail && detail.map((data, index) => (
                      <tr key={index} >
                        <td>{index + 1}</td>
                        {/* {console.log(data)} */}
                        <td className="text-center">{data.orderDate.toString().slice(0, 10)}</td>
                        <td className="text-center">{data.itemName}</td> {/** QCode */}
                        <td className="text-center">{data.orderNo}</td> {/** Order no. */}
                        <td className="text-center">{data.orderQuantity}</td> {/** order qnty*/}
                        {/* <td className="text-center">{data.orderRate}</td> */}
                        <td className="text-center">
                          {data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
                            <p>{detail.DATE.toString().slice(0, 10)}</p>
                          ))}
                        </td>
                        <td className="text-center">
                          {data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
                            <p>{detail.NO}</p>
                          ))}<b style={{ color: 'hotpink' }}>{data?.FCHDetails?.map((e) => e.NO)?.reduce((a, b) => (parseFloat(a) + parseFloat(b)), 0)}</b>
                        </td>
                        <td className="text-center" >
                          {data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
                            <p>{detail.TQNTY}</p>
                          ))}<b style={{ color: "hotpink" }}>{data.supplyQuantity}</b>
                        </td>
                        <td className="text-center">
                          {data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
                            <p>{detail.TBOX}</p>
                          ))}

                        </td>
                        <td className="text-center">
                          {data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
                            <p>{detail.CRATE}</p>
                          ))}
                        </td>
                        <td className="text-center"><b style={{ color: 'hotpink' }}>{data.balanceQuantity}</b></td>
                      </tr>
                    ))
                    }
                  </tbody>
                </Table>
              </div>
              <div className="d-block d-md-none">
                {detail && detail.map((data, index) => (
                  <Card className={classes.root} style={{ paddingTop: '20px' }} variant="outlined">
                    <Table hover>
                      <thead>
                        <th className="text-center" style={{ color: "white", backgroundColor: "hotpink" }}>Attributes</th>
                        <th className="text-center" style={{ color: "white", backgroundColor: "hotpink" }}>Values</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">#</td>
                          <td className="text-center">{index + 1}</td>
                        </tr>
                        <tr>
                          <td className="text-center">Order Date</td>
                          <td className="text-center">{data.orderDate.toString().slice(0, 10)}</td>
                        </tr>
                        <tr>
                          <td className="text-center">Q Code</td>
                          <td className="text-center">{data.itemName}</td>

                        </tr>
                        <tr>
                          <td className="text-center">Ord. No</td>
                          <td className="text-center">{data.orderNo}</td>
                        </tr>
                        <tr>
                          <td className="text-center">Ord. Quantity</td>
                          <td className="text-center">{data.orderQuantity}</td>
                        </tr>
                        {/* <tr>
                          <td className="text-center">Ord. Rate</td>
                        </tr> */}
                        <tr>
                          <td className="text-center">Supply Date</td>
                          <td className="text-center">
                            {data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
                              <p>{detail.DATE.toString().slice(0, 10)}</p>
                            ))}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">BL/CH No.</td>
                          <td className="text-center">
                            {data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
                              <p>{detail.NO}</p>
                            ))}<b style={{ color: 'hotpink' }}>{data?.FCHDetails?.map((e) => e.NO)?.reduce((a, b) => (parseFloat(a) + parseFloat(b)), 0)}</b>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">Supply Quan.</td>
                          <td className="text-center" >
                            {data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
                              <p>{detail.TQNTY}</p>
                            ))}<b style={{ color: "hotpink" }}>{data.supplyQuantity}</b></td>
                        </tr>
                        <tr>
                          <td className="text-center">No. TAKA</td>
                          <td className="text-center">
                            {data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
                              <p>{detail.TBOX}</p>
                            ))}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">Supply Rate</td>
                          <td className="text-center">
                            {data && data.FCHDetails && data.FCHDetails.map((detail, index) => (
                              <p>{detail.CRATE}</p>
                            ))}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">Balance Quan</td>
                          <td className="text-center"><b style={{ color: 'hotpink' }}>{data.balanceQuantity}</b></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                ))}
              </div>
            </Container>
          </div>
        </div>
      </div >
    </>
  )
}

export default Partydetail;
