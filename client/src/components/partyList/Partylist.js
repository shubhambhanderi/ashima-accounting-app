import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Container
} from "reactstrap";
// import Partydetail from '../partyDetail/Partydetail';
import UserService from "../../services/user.service";
import { Redirect } from 'react-router-dom';

function Partylist(props) {
  const [partyName, setPartyName] = useState();
  const [partyObject, setpartyObject] = props.partyState;
  // const [redi, setredire] = useState(null);
  const [redirectFlag, setRedirectFlag] = useState(false);
  const [redirectComp, setRedirectComp] = useState(null);

  const handleClickSummary = (e, party, broker) => {
    // console.log(party, broker)
    props.history.push('/partylist');
    setpartyObject({ party, broker });
    setRedirectComp(<Redirect to={"/partysummary"} />);
    setRedirectFlag(true);
    // window.location.reload();
  };
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

  return (
    <>
      {redirectFlag && redirectComp}
      <div className="profile-page">
        <div className="wrapper" >
          <div style={{ height: "150px" }}>
          </div>
          <div style={{ minHeight: "calc(100vh - 150px)" }}>
            <Container>
              <Table hover>
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>List of Parties</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {partyName && partyName.map((party, index) => (
                    <tr key={index}>
                      <td className="text-center">{index}</td>
                      <td>{party._id.partyName}</td>
                      <td className="text-right">
                        <Button className="btn-icon" onClick={e => handleClickDetail(e, party._id.partyName, party._id.brokerName)} color="info" size="sm">
                          <i className="fa fa-user"></i>
                        </Button>{` `}
                        <Button className="btn-icon" onClick={e => handleClickSummary(e, party._id.partyName, party._id.brokerName)} color="success" size="sm">
                          <i className="fa fa-edit"></i>
                        </Button>{` `}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </div>
        </div>
      </div>
    </>
  )
}

export default Partylist;