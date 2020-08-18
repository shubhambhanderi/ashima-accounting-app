import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [partyName, setpartyName] = useState();
  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/as2020/listofparties')
      .then(res => {
        console.log(res.data);
        setpartyName(res.data);
      })
      .catch(err => {
        console.error(err);
      })

  }, [])
  return (
    <div className="App">
      {partyName && partyName.map((party, index) => (
        <center>
          <p>{party.partyName.MST_NAME} <span>**** {party.brockerName}</span> <span>**** {party._id}</span></p>
        </center>
      ))};
    </div>
  );
}

export default App;
