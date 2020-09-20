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

// let ps = null;

class Companylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pills: 1
    };
  }
  componentDidMount() {
    UserService.getDate().then(
      (response) => {
        const res = response.data[0].backupName;
        // const sub1 = res.substring(5, 7);
        // const sub2 = res.substring(7, 9);
        // const sub3 = res.substring(9, 11);
        localStorage.setItem("date", JSON.stringify(res));
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(_content);
      });

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
