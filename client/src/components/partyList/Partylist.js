import React, { useState, useEffect } from 'react';
import { Container, makeStyles, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import axios from 'axios';
import Partydetail from '../partyDetail/Partydetail';

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(5),
    minWidth: 120,
  }
}));

function Partylist() {
  const classes = useStyles();
  const [partyName, setpartyName] = useState();
  const [partyObject, setpartyObject] = useState();
  const [currentParty, setCurrentParty] = useState('');
  const handleChange = (e) => {
    // console.log(e.target.value);
    setCurrentParty(e.target.value);
    setpartyObject(partyName[e.target.value]._id);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/as2020/listofparties')
      .then(res => {
        console.log(res.data);
        setpartyName(res.data);
      })
      .catch(err => {
        console.error(err);
      })

  }, []);

  return (
    <Container>
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
