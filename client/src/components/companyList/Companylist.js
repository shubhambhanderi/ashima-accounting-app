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

// let ps = null;

class Companylist extends React.Component {
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
  toggleTabsAshima = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
    this.props.history.push("/menulist");
    window.location.reload();
  };
  toggleTabsSSF = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
    // this.props.history.push("/menulist");
    // window.location.reload();
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
                        onClick={e => this.toggleTabsAshima(e, "pills", 1)}
                        href="#pablo"
                      >
                        <i className="tim-icons icon-bank" />
                    Ashima Fabrics
                  </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          "active show": 1
                        })}
                        onClick={e => this.toggleTabsSSF(e, "pills", 2)}
                        href="#pablo"
                      >
                        <i className="tim-icons icon-bank" />
                    Shree Sai Fashion Fab
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

export default Companylist;
