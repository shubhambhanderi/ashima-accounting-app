import React, { useState, useEffect } from 'react'
import UserService from "../../services/user.service";
import {
  Table,
  Button,
  Container
} from "reactstrap";
// import AuthService from "../../services/auth.service";

function Partydetail(props) {

  const [partyObject, setpartyObject] = props.partyState;
  if (partyObject !== undefined) {
    localStorage.setItem("po", JSON.stringify(partyObject));
  }
  const [detail, setDetail] = useState();
  const po = JSON.parse(localStorage.getItem('po'));
  console.log(po)
  useEffect(() => {
    UserService.getPartydata(po.party, po.broker).then(
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
          <div style={{ minHeight: "calc(100vh - 150px)" }}>
            <Container>
              <h4> Party:{po.party} Broker:{po.broker}</h4>
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="text-center">Order Date</th>
                    <th className="text-center">Q Code</th>
                    <th className="text-center">Ord. No</th>
                    <th className="text-center">Ord. Quantity</th>
                    <th className="text-center">Ord. Rate</th>
                    <th className="text-center">Supply Quan.</th>
                    <th className="text-center">Balance Quan</th>
                  </tr>
                </thead>
                <tbody>
                  {detail && detail.map((data, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td className="text-center">{data.orderDate.toString().slice(0, 10)}</td>
                      <td className="text-center">{data.itemName}</td>
                      <td className="text-center">{data.orderNo}</td>
                      <td className="text-center">{data.orderQuantity}</td>
                      <td className="text-center">{data.orderRate}</td>
                      <td className="text-center">{data.supplyQuantity}</td>
                      <td className="text-center">{data.balanceQuantity}</td>
                    </tr>
                  ))
                  }
                </tbody>
              </Table>
            </Container>
          </div>
        </div>
      </div>
    </>
  )
}

export default Partydetail
