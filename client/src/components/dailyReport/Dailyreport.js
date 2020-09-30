import React, { useState, useEffect } from 'react'
import UserService from "../../services/user.service";
import {
  Table,
  Container, Card
} from "reactstrap";

function Dailyreport() {
  const [DRdetail, setDRdetail] = useState();
  const [search, setSearch] = useState("");
  const [sub1, setSub1] = useState();
  const [sub2, setSub2] = useState();
  const [sub3, setSub3] = useState();

  useEffect(() => {
    const date = localStorage.getItem('date');
    setSub1(date.substring(6, 8));
    setSub2(date.substring(8, 10));
    setSub3(date.substring(10, 12));

    setDRdetail(JSON.parse(localStorage.getItem("DRdetail")))
    // UserService.getDailyReport().then(
    //   (response) => {
    //     // console.log("--->", response.data)
    //     setDRdetail(response.data.sort((a, b) => (a.key.localeCompare(b.key))));
    //   },
    //   (error) => {
    //     const _content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //     setDRdetail(_content);
    //   })
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
              <div style={{ color: "white", fontWeight: "bold" }} >
                Backup : {sub1}-{sub2}-{sub3}
              </div>
              <div className="pt-5">
                <label for="search" style={{ fontWeight: "bold", color: "white" }}>Search : </label>
                <input id="search" type="text" style={{ width: "100%" }} onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="pt-5">
                <Table responsive >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-center">Quality Code</th>
                      <th className="text-center">Machine No.</th>
                      <th className="text-center">Total Machine</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DRdetail && DRdetail.filter((e, i) => {
                      if (search === "") {
                        return e
                      }
                      else {
                        return e.value.includes(search)
                      }
                    }).map((data, index) => (
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
                    <tr style={{ backgroundColor: "hotpink" }}>
                      <td style={{ fontWeight: "bold" }}>Total</td>
                      <td className="text-center"></td>
                      <td className="text-center"></td>
                      <td className="text-center" style={{ fontWeight: "bold" }}>{DRdetail?.map((e) => e.value.length)?.reduce((a, b) => (parseFloat(a) + parseFloat(b)), 0)}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
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
