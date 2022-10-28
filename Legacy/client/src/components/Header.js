import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { logout } from '../modules/authManager';

export default function Header({ isLoggedIn, isBroker }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Legacy</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
            <>
              <NavItem>
                <NavLink tag={RRNavLink} to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/carrier">Carriers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/product">Products</NavLink>
              </NavItem>
              <NavItem>
              {isBroker === true ?
                <NavLink tag={RRNavLink} to="/profiles">Clients</NavLink>
              : <NavLink tag={RRNavLink} to="/profiles">Brokers</NavLink> }
              </NavItem>
              <NavItem>
                {isBroker === true ? "" :
                <NavLink tag={RRNavLink} to="/profiles/health">HealthForm</NavLink>}
              </NavItem>

              
              </>
            }
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
                
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>

              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
