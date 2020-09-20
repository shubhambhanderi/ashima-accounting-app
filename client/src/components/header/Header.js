import React, { useState, useEffect } from "react";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";
import AuthService from "../../services/auth.service";


function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("navbar-transparent");

  useEffect(() => {
    window.addEventListener("scroll", (e) => changeColor(e));
    window.removeEventListener("scroll", (e) => changeColor(e));
  }, [color]);
  const changeColor = (event) => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-primary");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };

  const toggle = () => setIsOpen(!isOpen);
  const logOut = () => {
    AuthService.logout();
    // props.history.push("/login");
    window.location.reload("/login");
  };

  return (
    <>
      <Navbar className={"fixed-top " + color} expand="lg">
        <Container>
          <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
            <strong>ASHIMA FABRICS</strong>
          </NavbarBrand>
          {/* <button className="navbar-toggler" id="navbarNav" type="button" onClick={toggle} onBlur={e => setIsOpen(false)}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button> */}
          {/* <Collapse navbar toggler="#navbarNav" isOpen={isOpen}> */}
          <Nav className="ml-auto" navbar>
            <NavItem className="active">
              <NavLink href="#pablo" onClick={logOut}>
                Logout
                  </NavLink>
            </NavItem>
          </Nav>
          {/* </Collapse> */}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;