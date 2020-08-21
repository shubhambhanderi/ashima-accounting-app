import React, { useState, useEffect } from 'react';
import { Container, makeStyles, InputLabel, MenuItem, FormControl, Button, Select } from '@material-ui/core';
import Partydetail from '../partyDetail/Partydetail';
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";


const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(5),
    minWidth: 120,
  },
  lgbtn: {
    marginTop: theme.spacing(10),
    display: 'flex',
    justifyContent: 'center',
    minWidth: 120
  }
}));

function Partylist(props) {
  const classes = useStyles();
  const [partyName, setPartyName] = useState();
  const [partyObject, setpartyObject] = useState();
  const [currentParty, setCurrentParty] = useState('');

  const handleChange = (e) => {
    setCurrentParty(e.target.value);
    setpartyObject(partyName[e.target.value]._id);
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

  const logOut = () => {
    AuthService.logout();
    props.history.push("/login");
    window.location.reload();
  };

  return (
    <Container>
      <center>
        <Button className={classes.lgbtn} variant="contained" onClick={logOut}>Logout</Button>
      </center>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">PartyList</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentParty}
          onChange={handleChange}
        >
          {
            partyName && partyName.map((party, index) => (
              <MenuItem key={index} value={index}>{party._id.partyName} {party._id.brokerName}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <Partydetail partyObject={partyObject} />
    </Container>
  )
}

export default Partylist;
