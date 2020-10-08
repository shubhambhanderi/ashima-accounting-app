import React from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
// import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import UserService from "../../services/user.service";
import { Button } from '@material-ui/core';

// let ps = null;

class Menulist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pills: 1,
      datafetched: false,
      loading: false,
      // sub1: null,
      // sub2: null,
      // sub3: null
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      // let tables = document.querySelectorAll(".table-responsive");
      // for (let i = 0; i < tables.length; i++) {
      //   ps = new PerfectScrollbar(tables[i]);
      // }
    }
    document.body.classList.toggle("profile-page");

    if (!!localStorage.getItem("DRdetail") && !!localStorage.getItem("partyName") && !!localStorage.getItem("parties") && !!localStorage.getItem("beam") && !!localStorage.getItem("WMDetail") && !!localStorage.getItem("SRDetail") && !!localStorage.getItem("MRDetail")) {
      this.setState({
        datafetched: true
      })
    }

    // const date = localStorage.getItem('date');
    // this.setState({
    //   sub1: date.substring(6, 8),
    //   sub2: date.substring(8, 10),
    //   sub3: date.substring(10, 12)
    // });
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      // ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    document.body.classList.toggle("profile-page");
  }
  toggleTabsDailyReport = (e, stateName, index) => {
    e.preventDefault();
    if (!this.state.datafetched) {
      return
    }
    this.setState({
      [stateName]: index
    });
    this.props.history.push("/dailyreport");
    window.location.reload();
  };
  toggleTabsSales = (e, stateName, index) => {
    e.preventDefault();
    if (!this.state.datafetched) {
      return
    }
    this.setState({
      [stateName]: index
    });
    this.props.history.push("/partylist");
    window.location.reload();
  };
  toggleTabsBeamStock = (e, stateName, index) => {
    e.preventDefault();
    if (!this.state.datafetched) {
      return
    }
    this.setState({
      [stateName]: index
    });
    this.props.history.push("/beamstock");
    window.location.reload();
  };

  toggleTabsWorpingReport = (e, stateName, index) => {
    e.preventDefault();
    if (!this.state.datafetched) {
      return
    }
    this.setState({
      [stateName]: index
    });
    this.props.history.push("/warpingmeter");
    window.location.reload();
  };

  toggleTabsStockReport = (e, stateName, index) => {
    e.preventDefault();
    if (!this.state.datafetched) {
      return
    }
    this.setState({
      [stateName]: index
    });
    this.props.history.push("/stockreport");
    window.location.reload();
  };

  toggleTabsReport = (e, stateName, index) => {
    e.preventDefault();
    if (!this.state.datafetched) {
      return
    }
    this.setState({
      [stateName]: index
    });
    this.props.history.push("/report");
    window.location.reload();
  };


  render() {
    const updateFetchState = (f, t) => {
      this.setState({
        datafetched: f,
        loading: t
      })
    }
    console.log(this.state)
    async function apidata(e) {
      try {
        updateFetchState(false, true);
        const msg = await UserService.getData();
        updateFetchState(true, false);
      } catch (error) {
        console.log(error)
        updateFetchState(false)
      }
    };

    return (
      <>
        <div className="wrapper">
          <div className="page-header">
            <img
              alt="..."
              className="dots"
              src={require("../../assets/img/dots.png")}
            />
            <img
              alt="..."
              className="path"
              src={require("../../assets/img/path4.png")}
            />
            <Container className="align-items-center">
              {/* <div>
                Date : {this.state.sub1}-{this.state.sub2}-{this.state.sub3}
              </div> */}
              <div>
                <center>
                  <Button variant="contained" color="primary" onClick={e => apidata(e)}>Load Latest Data</Button>
                  {
                    this.state.loading && <p><br /><br />Loading...</p>
                  }
                </center>
              </div>
              <Row className="pt-5">
                <Col md="6" className="ml-auto mr-auto">
                  <Nav className="justify-content-center nav-pills-info nav-pills-icons" pills>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          "active show": this.state.datafetched ? 1 : 0
                        })}
                        onClick={e => this.toggleTabsDailyReport(e, "pills", 1)}
                        href="#pablo"
                      >
                        <i className="tim-icons icon-notes" />
                    Daily Report
                  </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          "active show": this.state.datafetched ? 1 : 0
                        })}
                        onClick={e => this.toggleTabsSales(e, "pills", 2)}
                        href="#pablo"
                      >
                        <i className="tim-icons icon-paper" />
                    Sales Order
                  </NavLink>
                    </NavItem>
                    <NavItem >
                      <NavLink
                        className={classnames({
                          "active show": this.state.datafetched ? 1 : 0
                        })}
                        onClick={e => this.toggleTabsWorpingReport(e, "pills", 1)}
                        href="#pablo"
                      >
                        <i className="tim-icons icon-chart-bar-32" />
                    Warping Report
                  </NavLink>
                    </NavItem>
                    <NavItem >
                      <NavLink
                        className={classnames({
                          "active show": this.state.datafetched ? 1 : 0
                        })}
                        onClick={e => this.toggleTabsBeamStock(e, "pills", 1)}
                        href="#pablo"
                      >
                        <i className="tim-icons icon-cart" />
                    BEAM Stock
                  </NavLink>
                    </NavItem>
                    <NavItem >
                      <NavLink
                        className={classnames({
                          "active show": this.state.datafetched ? 1 : 0
                        })}
                        onClick={e => this.toggleTabsStockReport(e, "pills", 1)}
                        href="#pablo"
                      >
                        <i className="tim-icons icon-coins" />
                    Stock Report
                  </NavLink>
                    </NavItem>
                    <NavItem >
                      <NavLink
                        className={classnames({
                          "active show": this.state.datafetched ? 1 : 0
                        })}
                        onClick={e => this.toggleTabsReport(e, "pills", 1)}
                        href="#pablo"
                      >
                        <i className="tim-icons icon-coins" />
                    Machine Report
                  </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default Menulist;
