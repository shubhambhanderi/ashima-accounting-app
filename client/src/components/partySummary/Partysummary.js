import React, { useState, useEffect } from 'react'
import UserService from "../../services/user.service";
import {
  Table,
  Button,
  Container
} from "reactstrap";
// import AuthService from "../../services/auth.service";

function Partysummary(props) {

  const [partyObject, setpartyObject] = props.partyState;
  if (partyObject !== undefined) {
    localStorage.setItem("ps", JSON.stringify(partyObject));
  }
  const [detail, setDetail] = useState();
  const ps = JSON.parse(localStorage.getItem('ps'));
  console.log(ps)
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

        setDetail(_content)
      })

  }, []);

  return (
    <>
      {console.log(JSON.stringify(detail))}
      <div className="profile-page">
        <div className="wrapper" >
          <div style={{ height: "150px" }}>
          </div>
          <div style={{ minHeight: "calc(100vh - 150px)", overflow: "scroll" }}>
            <Container>
              <h4><b style={{ color: 'hotpink' }}> PARTY: </b>{ps.party} <br /> <b style={{ color: 'hotpink' }}>BROKER: </b>{ps.broker}</h4>
              <Table role="table" hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="text-center">Order Date</th>
                    <th className="text-center">Q Code</th>
                    <th className="text-center">Ord. No</th>
                    <th className="text-center">Ord. Quantity</th>
                    <th className="text-center">Ord. Rate</th>
                    <th className="text-center">Supply Date</th>
                    <th className="text-center">Supply No</th>
                    <th className="text-center">Supply Quan.</th>
                    <th className="text-center">Supply NOs</th>
                    <th className="text-center">Supply Rate</th>
                    <th className="text-center">Balance Quan</th>
                  </tr>
                </thead>
                <tbody>
                  {detail && detail.map((data, index) => (
                    <tr key={index} >
                      <td>{index}</td>
                      {/* {console.log(data)} */}
                      <td className="text-center">{data.orderDate.toString().slice(0, 10)}</td>
                      <td className="text-center">{data.itemName}</td> {/** QCode */}
                      <td className="text-center">{data.orderNo}</td> {/** Order no. */}
                      <td className="text-center">{data.orderQuantity}</td> {/** order qnty*/}
                      <td className="text-center">{data.orderRate}</td>
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
                        ))}<b style={{ color: "hotpink" }}>{data.supplyQuantity}</b></td>
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
            </Container>
          </div>
        </div>
      </div >
    </>
  )
}

export default Partysummary;
