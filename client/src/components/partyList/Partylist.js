import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Container, Row
} from "reactstrap";
// import Partydetail from '../partyDetail/Partydetail';
import UserService from "../../services/user.service";
import { Redirect } from 'react-router-dom';
import htmlStrPartylist from '../htmlStringGenerator/htmlStrPartylist';
import { saveAs } from 'file-saver';
import { useSnackbar } from 'notistack';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

const HotpinkRadio = withStyles({
  root: {
    color: pink[400],
    '&$checked': {
      color: pink[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function Partylist(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [partyName, setPartyName] = useState();
  const [uniquepartyName, setUniquepartyName] = useState();
  const [OYN, setOYN] = useState("N");
  const [parties, setParties] = useState();
  const [partyObject, setpartyObject] = props.partyState;
  // const [redi, setredire] = useState(null);
  const [redirectFlag, setRedirectFlag] = useState(false);
  const [redirectComp, setRedirectComp] = useState(null);
  // const [OYNTrue, setOYNTrue] = useState(false);
  const [search, setSearch] = useState("");
  const [sub1, setSub1] = useState();
  const [sub2, setSub2] = useState();
  const [sub3, setSub3] = useState();
  const [selectedValue, setSelectedValue] = useState('pending');
  const [root, setRoot] = useState(false);


  const handleClickDetail = (e, party, broker) => {
    // console.log(party, broker)
    props.history.push('/partylist');
    setpartyObject({ party, broker, OYN });
    setRedirectComp(<Redirect to={"/partydetail"} />);
    setRedirectFlag(true);
    // window.location.reload();
  };

  const handleClickDetailALL = (e, party, broker) => {
    // console.log(party, broker)
    props.history.push('/partylist');
    setpartyObject({ party, broker });
    setRedirectComp(<Redirect to={"/partydetail"} />);
    setRedirectFlag(true);
    // window.location.reload();
  };

  useEffect(() => {
    const date = localStorage.getItem('date');
    setSub1(date.substring(6, 8));
    setSub2(date.substring(8, 10));
    setSub3(date.substring(10, 12));

    setPartyName(JSON.parse(localStorage.getItem("partyName")))

    let resArr = [];
    let temp = JSON.parse(localStorage.getItem("partyName"));
    temp.forEach(function (item) {
      let i = resArr.findIndex(x => ((x._id.partyName == item._id.partyName) && (x._id.brokerName == item._id.brokerName)));
      // let j = resArr.findIndex(x => x._id.brokerName == item._id.brokerName);
      if (i <= -1) {
        resArr.push({ _id: { partyName: item._id.partyName, brokerName: item._id.brokerName } });
      }
      return null;
    });
    setUniquepartyName(resArr)
  }, []);

  useEffect(() => {
    setParties(JSON.parse(localStorage.getItem("parties")));
  }, []);

  function createAndDownloadPDF(partyName, brokerName) {
    const postRequestData = parties.filter(e => (e.partyName === partyName && e.brokerName === brokerName && e.OYN === OYN));
    // console.log(postRequestData);
    const str = htmlStrPartylist(postRequestData, partyName, brokerName);
    enqueueSnackbar("PDF Generation in progress...", {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      variant: 'success',
    });
    UserService.pythonPDFSerivce({ data: str })
      .then((res) => {
        // console.log("success", res.data);
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'new.pdf');
        closeSnackbar();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        enqueueSnackbar(resMessage, {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          variant: 'error',
        });
        console.log(error);
      }
      )
  }

  function createAndDownloadPDFALL(partyName, brokerName) {
    const postRequestData = parties.filter(e => (e.partyName === partyName && e.brokerName === brokerName));
    // console.log(postRequestData);
    const str = htmlStrPartylist(postRequestData, partyName, brokerName);
    enqueueSnackbar("PDF Generation in progress...", {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      variant: 'success',
    });
    UserService.pythonPDFSerivce({ data: str })
      .then((res) => {
        // console.log("success", res.data);
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'new.pdf');
        closeSnackbar();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        enqueueSnackbar(resMessage, {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          variant: 'error',
        });
        console.log(error);
      }
      )
  }

  function dateToStr(e) {
    return e?.getDate() + "/" + (e?.getMonth() + 1) + "/" + e?.getFullYear()
  }

  // const handleChange = (event) => {
  //   setOYNTrue(event.target.checked);
  //   setOYN(event.target.checked ? 'Y' : 'N')
  // };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value === 'all') {
      setRoot(true);
    } else if (event.target.value === 'pending') {
      setRoot(false);
      setOYN('N');
    } else if (event.target.value === 'completed') {
      setRoot(false);
      setOYN('Y');
    }
  };

  return (
    <>
      {redirectFlag && redirectComp}
      <div className="profile-page">
        <div className="wrapper" >
          <div style={{ height: "150px" }}>
          </div>
          <div style={{ minHeight: "calc(100vh - 150px)" }}>
            <Container>
              <div style={{ color: "white", fontWeight: "bold" }} >
                Backup : {sub1}-{sub2}-{sub3}
              </div>
              <div className="pt-5">
                <label for="search" style={{ fontWeight: "bold", color: "white" }}>Search : </label>
                <input id="search" type="text" style={{ width: "100%" }} onChange={e => setSearch(e.target.value.toString().toLowerCase())} />
              </div>
              <div style={{ color: "white", fontWeight: "bold" }} className="pt-5">
                All :
                <HotpinkRadio
                  checked={selectedValue === 'all'}
                  onChange={handleRadioChange}
                  value="all"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'All' }}
                />
                Pending :
                <HotpinkRadio
                  checked={selectedValue === 'pending'}
                  onChange={handleRadioChange}
                  value="pending"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'pending' }}
                />
                Completed :
                <HotpinkRadio
                  checked={selectedValue === 'completed'}
                  onChange={handleRadioChange}
                  value="completed"
                  color="primary"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'Completed' }}
                />
              </div>
              {/* <div style={{ color: "white", fontWeight: "bold" }} className="pt-5">
                {OYNTrue ? "Completed" : "Pending"}

                <Switch
                  // checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </div> */}
              {root ? (uniquepartyName && uniquepartyName.filter((e, i) => (e._id.partyName?.toString().toLowerCase().includes(search))).map((party, index) => (
                <div className="pt-5" id="pdfdiv">
                  <div>
                    <Row>
                      <h4><b style={{ color: 'hotpink' }}> PARTY: </b>{party._id.partyName} <br /> <b style={{ color: 'hotpink' }}>BROKER: </b>{party._id.brokerName}</h4>
                      <Button className="btn-icon ml-auto" onClick={e => handleClickDetailALL(e, party._id.partyName, party._id.brokerName)} color="info" size="sm">
                        <i className="fa fa-user"></i>
                      </Button>{` `}
                      <Button className="btn-icon ml-5" onClick={e => createAndDownloadPDFALL(party._id.partyName, party._id.brokerName)} color="info" size="sm">
                        <i className="tim-icons icon-paper"></i>
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
                              <td className="text-center">{dateToStr(new Date(a.orderDate))}</td>
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
              ))) : (partyName && partyName.filter((e, i) => (e._id.partyName?.toString().toLowerCase().includes(search))).filter((e, i) => (e._id.OYN === OYN)).map((party, index) => (
                <div className="pt-5" id="pdfdiv">
                  <div>
                    <Row>
                      <h4><b style={{ color: 'hotpink' }}> PARTY: </b>{party._id.partyName} <br /> <b style={{ color: 'hotpink' }}>BROKER: </b>{party._id.brokerName}</h4>
                      <Button className="btn-icon ml-auto" onClick={e => handleClickDetail(e, party._id.partyName, party._id.brokerName)} color="info" size="sm">
                        <i className="fa fa-user"></i>
                      </Button>{` `}
                      <Button className="btn-icon ml-5" onClick={e => createAndDownloadPDF(party._id.partyName, party._id.brokerName)} color="info" size="sm">
                        <i className="tim-icons icon-paper"></i>
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
                      {parties && parties.filter((e, i) => (e.OYN === OYN)).map((a, key) => {
                        if (a.partyName === party._id.partyName && a.brokerName === party._id.brokerName) {
                          return (
                            <tr key={key}>
                              <td className="text-center">{key}</td>
                              <td className="text-center">{dateToStr(new Date(a.orderDate))}</td>
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
              )))}
            </Container>
          </div>
        </div>
      </div>
    </>
  )
}

export default Partylist;