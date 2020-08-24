import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Container, Row
} from "reactstrap";
// import Partydetail from '../partyDetail/Partydetail';
import UserService from "../../services/user.service";
import { Redirect } from 'react-router-dom';

function Partylist(props) {
  const [partyName, setPartyName] = useState();
  const [parties, setParties] = useState();
  const [partyObject, setpartyObject] = props.partyState;
  // const [redi, setredire] = useState(null);
  const [redirectFlag, setRedirectFlag] = useState(false);
  const [redirectComp, setRedirectComp] = useState(null);

  // const handleClickSummary = (e, party, broker) => {
  //   // console.log(party, broker)
  //   props.history.push('/partylist');
  //   setpartyObject({ party, broker });
  //   setRedirectComp(<Redirect to={"/partysummary"} />);
  //   setRedirectFlag(true);
  //   // window.location.reload();
  // };
  const handleClickDetail = (e, party, broker) => {
    // console.log(party, broker)
    props.history.push('/partylist');
    setpartyObject({ party, broker });
    setRedirectComp(<Redirect to={"/partydetail"} />);
    setRedirectFlag(true);
    // window.location.reload();
  };

  useEffect(() => {
    UserService.getPartylist().then(
      (response) => {
        // console.log(JSON.stringify(response.data))
        setPartyName(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setPartyName(_content);
      }
    );
  }, []);

  useEffect(() => {
    UserService.getAllPartiesdata().then(
      (response) => {
        console.log("--->", JSON.stringify(response.data))
        setParties(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setParties(_content);
      }
    );
  }, [])

  return (
    <>
      {redirectFlag && redirectComp}
      <div className="profile-page">
        <div className="wrapper" >
          <div style={{ height: "150px" }}>
          </div>
          <div style={{ minHeight: "calc(100vh - 150px)" }}>
            <Container>
              {partyName && partyName.map((party, index) => (
                <div className="pt-5">
                  <div>
                    <Row>
                      <h4><b style={{ color: 'hotpink' }}> PARTY: </b>{party._id.partyName} <br /> <b style={{ color: 'hotpink' }}>BROKER: </b>{party._id.brokerName}</h4>
                      <Button className="btn-icon ml-auto" onClick={e => handleClickDetail(e, party._id.partyName, party._id.brokerName)} color="info" size="sm">
                        <i className="fa fa-user"></i>
                      </Button>{` `}
                    </Row>
                  </div>
                  <Table responsive>
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
                      {parties && parties.map((a, key) => {
                        if (a.partyName === party._id.partyName && a.brokerName === party._id.brokerName) {
                          return (
                            <tr key={key}>
                              <td className="text-center">{key}</td>
                              <td className="text-center">{a.orderDate.toString().slice(0, 10)}</td>
                              <td className="text-center">{a.itemName}</td>
                              <td className="text-center">{a.orderNo}</td>
                              <td className="text-center">{a.orderQuantity}</td>
                              <td className="text-center">{a.orderRate}</td>
                              <td className="text-center">{a.supplyQuantity}</td>
                              <td className="text-center">{a.balanceQuantity}</td>
                            </tr>
                          )
                        }
                      })}
                    </tbody>
                  </Table>
                </div>
              ))}
            </Container>
          </div>
        </div>
      </div>
    </>
  )
}

export default Partylist;