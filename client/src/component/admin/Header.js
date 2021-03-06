import React, { useState, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { startGetAccount } from "../../action/Account";
const Header = (props) => {
  props.dispatch(startGetAccount());
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
            <Fragment>
              <NavItem>
                <NavLink href="/admin">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/task">Tasks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/task/create">Post Tasks</NavLink>
              </NavItem>
              <Button variant="outline-success" onClick={setRedirect}>
                logout
              </Button>
            </Fragment>
          </Nav>
          <NavbarText>{props.account && props.account.username}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
export default connect(mapStateToProps)(Header);
