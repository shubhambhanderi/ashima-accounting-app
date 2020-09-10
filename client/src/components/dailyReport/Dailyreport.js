import React, { useState, useEffect } from 'react'
import UserService from "../../services/user.service";
import {
  Table,
  Container, Card
} from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    background: 'transparent !important'
  },
}));

function Dailyreport() {
  const [detail, setDetail] = useState();
  const classes = useStyles();

  useEffect(() => {
    UserService.getDailyReport().then(
      (response) => {
        console.log("--->", response.data)
        setDetail(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setDetail(_content);
      })
  }, []);

  return (
    <>
      <div className="profile-page">
        <div className="wrapper" >
          <div style={{ height: "150px" }}>
          </div>
          <div style={{ minHeight: "calc(100vh - 150px)" }}>
            <Container>
              {/* <div className="d-none d-md-block"> */}
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="text-center">Quality Code</th>
                    <th className="text-center">Machine No.</th>
                    <th className="text-center">Total Machine</th>
                  </tr>
                </thead>
                <tbody>
                  {detail && detail.map((data, index) => (
                    <tr key={index} >
                      <td>{index + 1}</td>
                      <td className="text-center">{data.key}</td>
                      <td className="text-center" style={{ width: '100px' }}>
                        {data && data.value && data.value.map((detail, index) => (
                          <span> {detail},</span>
                        ))}
                      </td>
                      <td className="text-center">
                        {data && data.value.length}
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </Table>
              {/* </div> */}
              {/* <div className="d-block d-md-none">
                {detail && detail.map((data, index) => (
                  <Card className={classes.root} style={{ paddingTop: '20px' }} variant="outlined">
                    <Table hover>
                      <thead>
                        <th className="text-center" style={{ color: "white", backgroundColor: "hotpink" }}>Attributes</th>
                        <th className="text-center" style={{ color: "white", backgroundColor: "hotpink" }}>Values</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">#</td>
                          <td className="text-center">{index + 1}</td>
                        </tr>
                        <tr>
                          <td className="text-center">Quality Code</td>
                          <td className="text-center">{data.key}</td>
                        </tr>
                        <tr>
                          <td className="text-center" >Machine No.</td>
                          <td className="text-center" style={{ width: '100px' }}>
                            {data && data.value && data.value.map((detail, index) => (
                              <span> {detail},</span>
                            ))}
                          </td>
                        </tr>
                        <tr>
                          <th className="text-center" style={{ color: "white", backgroundColor: "hotpink" }}>Total Machine</th>
                          <td className="text-center">
                            {data && data.value.length}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                ))}
              </div> */}
            </Container>
          </div>
        </div>
      </div >
    </>
  )
}

export default Dailyreport
