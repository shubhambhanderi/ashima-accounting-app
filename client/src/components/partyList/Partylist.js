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
            {/* <img
            alt="..."
            className="dots"
            src={require("../../assets/img/dots.png")}
          />
          <img
            alt="..."
            className="path"
            src={require("../../assets/img/path4.png")}
          /> */}
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
                        <Button className="btn-icon" color="success" size="sm">
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

export default Partylist



// import React, {useState, useEffect} from 'react';
// import {Container, makeStyles, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';
// import Partydetail from '../partyDetail/Partydetail';
// import UserService from "../../services/user.service";

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginTop: theme.spacing(5),
//     minWidth: 120,
//   },
//   lgbtn: {
//     marginTop: theme.spacing(10),
//     display: 'flex',
//     justifyContent: 'center',
//     minWidth: 120
//   }
// }));

// function Partylist(props) {
//   const classes = useStyles();
//   const [partyName, setPartyName] = useState();
//   const [partyObject, setpartyObject] = useState();
//   const [currentParty, setCurrentParty] = useState('');

//   const handleChange = (e) => {
//     setCurrentParty(e.target.value);
//     setpartyObject(partyName[e.target.value]._id);
//   };

//   useEffect(() => {
//     UserService.getPartylist().then(
//       (response) => {
//         setPartyName(response.data);
//       },
//       (error) => {
//         const _content =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         setPartyName(_content);
//       }
//     );
//   }, []);

//   return (
//     <Container>
//       <FormControl className={classes.formControl}>
//         <InputLabel id="demo-simple-select-label">PartyList</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={currentParty}
//           onChange={handleChange}
//         >
//           {
//             partyName && partyName.map((party, index) => (
//               <MenuItem key={index} value={index}>{party._id.partyName} {party._id.brokerName}</MenuItem>
//             ))
//           }
//         </Select>
//       </FormControl>
//       <Partydetail partyObject={partyObject} />
//     </Container>
//   )
// }

// export default Partylist;
