import React, { useState, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const setRedirect = () => {
    localStorage.clear();
    props.history.push("/");
  };
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Task Management</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {localStorage.getItem("authToken") ? (
              <Fragment>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <Button variant="outline-success" onClick={setRedirect}>
                  logout
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
              </Fragment>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
