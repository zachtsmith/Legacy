import React, { useEffect, useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';
import { logout } from '../modules/authManager';
import img1 from "../images/legacyLogo.png"
import { getCurrentUserByFirebaseId } from '../modules/userProfileManager';


export default function Header({ isLoggedIn, isBroker, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [userProfile, setUserProfile] = useState({
    id: 0,
    name: "",
    firebaseUserId: "",
    email: "",
    imageLocation: "",
    userTypeId: 0,
    userType: "",
    weight: 0,
    age: 0,
    isDiabetic: "",
    isSmoker: "",
    medications: ""
})
 

    useEffect(() => {
        setUserProfile(user);
    }, []);

  return (
    <div>
      <Navbar  color="dark" light expand="md" width="100%">
        <NavbarBrand   height={100} tag={RRNavLink} to="/"><img src={img1} alt="logoLegacy" height={"100px"} width={"200px"} /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
            <>
           
              <NavItem>
                <NavLink tag={RRNavLink} to="/"><span className="white-text">Home</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/carrier"><span className="white-text">Carriers</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/product"><span className="white-text">All Products</span></NavLink>
              </NavItem>
              <NavItem>
              {isBroker === true ?
                <NavLink tag={RRNavLink} to="/profiles"><span className="white-text">Clients</span></NavLink>
              : <NavLink tag={RRNavLink} to="/profiles"><span className="white-text">Brokers</span></NavLink> }
              </NavItem>
              <NavItem>
                {isBroker === true ? "" :
                <NavLink tag={RRNavLink} to="/profiles/health"><span className="white-text">HealthForm</span></NavLink>}
              </NavItem>
              
              
              </>
            }
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}><span className="white-text">Logout</span></a>
                </NavItem>
                
                
              </>
                  
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login"><span className="white-text">Login</span></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register"><span className="white-text">Register</span></NavLink>
                </NavItem>

              </>
            }
          </Nav>
        </Collapse>
        {/* <NavItem>{isLoggedIn ?
        <span className='white-text-end'  style={{ width:"700px" }}>Logged in as {user.name}</span> : ""}
        </NavItem> */}
        
      </Navbar>
    </div>
  );
}
