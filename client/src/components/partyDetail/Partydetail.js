import React, { useState, useEffect } from 'react'
import UserService from "../../services/user.service";
// import AuthService from "../../services/auth.service";

function Partydetail({ partyObject }) {

  const [detail, setDetail] = useState();

  useEffect(() => {
    // partyObject && axios.get(`http://localhost:5000/api/v1/as2020/partydata/${partyObject.partyName}/${partyObject.brokerName}`)
    //   .then(res => {
    //     setDetail(res.data);
    //   }).catch(err => {
    //     console.err(err);
    //   })
    partyObject && UserService.getPartydata(partyObject.partyName, partyObject.brokerName).then(
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

  }, [partyObject]);

  return (
    <div>
      {JSON.stringify(detail)}
    </div>
  )
}

export default Partydetail
