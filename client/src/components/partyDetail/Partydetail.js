import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Partydetail({ partyObject }) {

  const [detail, setDetail] = useState();

  useEffect(() => {
    partyObject && axios.get(`http://localhost:5000/api/v1/as2020/partydata/${partyObject.partyName}/${partyObject.brokerName}`)
      .then(res => {
        setDetail(res.data);
      }).catch(err => {
        console.err(err);
      })

  }, [partyObject]);

  return (
    <div>
      {JSON.stringify(detail)}
    </div>
  )
}

export default Partydetail
