import React from "react";
import classnames from "classnames";
import './Menulist.css'
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

// let ps = null;

class Menulist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pills: 1
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
    this.setState({
      [stateName]: index
    });
    this.props.history.push("/dailyreport");
    window.location.reload();
  };
  toggleTabsSales = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
    this.props.history.push("/partylist");
    window.location.reload();
  };
  render() {
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
              <Row>
                <Col md="6" className="ml-auto mr-auto">
                  <Nav className="justify-content-center nav-pills-info nav-pills-icons" pills>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          "active show": 1
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
                          "active show": 1
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
                          "active show": 1
                        })}
                        // onClick={e => this.toggleTabsDailyReport(e, "pills", 1)}
                        href="#pablo"
                      >
                        <i className="tim-icons icon-chart-bar-32" />
                    Stock Report
                  </NavLink>
                    </NavItem>
                    <NavItem >
                      <NavLink
                        className={classnames({
                          "active show": 1
                        })}
                        // onClick={e => this.toggleTabsDailyReport(e, "pills", 1)}
                        href="#pablo"
                      >
                        <i className="tim-icons icon-cart" />
                    BEAM Stock
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
