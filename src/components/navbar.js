import React, { useState } from "react"
import {
  MDBContainer, MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, 
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn 
} from "mdbreact"
import { Link, navigate } from 'gatsby'
import CustomNavLink from './custom-link'
import Logo from "../images/AMCE.png"
import { dropdownMenu, dropdownItem } from  './navbar.module.scss'
import { isLoggedIn, logout } from './app-user'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())

  const toggleCollapse = () => {
    setIsOpen(!isOpen)
  }

  const signout = () => {
    logout()
    setLoggedIn(false)
    navigate("/")
  }

  return (
    <MDBNavbar light expand="md">
      <MDBContainer>
        <Link className="waves-effect waves-light" to='/' style={{display: 'flex', alignItems: 'center'}}>
          <img height={100} src={Logo} className="mr-3" alt="DiGi Transform logo" />
        </Link>
        <MDBNavbarToggler name="navbar-toggler" onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <CustomNavLink to="/">Home</CustomNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <CustomNavLink to="/our-team">Our team</CustomNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Services</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu className={`dropdown-default ${dropdownMenu}`}>
                  <MDBDropdownItem className={`black-text nav-link ${dropdownItem}`} onClick={() => navigate("/general-medicine")}>General Medicine</MDBDropdownItem>
                  <MDBDropdownItem className={`black-text nav-link ${dropdownItem}`} onClick={() => navigate("/physiotherapy")}>Physiotherapy</MDBDropdownItem>
                  <MDBDropdownItem className={`black-text nav-link ${dropdownItem}`} onClick={() => navigate("/dietitians")}>Dietitians</MDBDropdownItem>
                  <MDBDropdownItem className={`black-text nav-link ${dropdownItem}`} onClick={() => navigate("/pathology")}>Pathology</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Our Practice</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu className={`dropdown-default ${dropdownMenu}`}>
                  <MDBDropdownItem className={`black-text nav-link ${dropdownItem}`} onClick={() => navigate("/general-information")}>General Information</MDBDropdownItem>
                  <MDBDropdownItem className={`black-text nav-link ${dropdownItem}`} onClick={() => navigate("/open-hours")}>Open Hours</MDBDropdownItem>
                  <MDBDropdownItem className={`black-text nav-link ${dropdownItem}`} onClick={() => navigate("/location-contact")}>Location & Contact</MDBDropdownItem>
                  <MDBDropdownItem className={`black-text nav-link ${dropdownItem}`} onClick={() => navigate("/privacy-policy")}>Privacy Policy</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>            
          </MDBNavbarNav>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBBtn className="button-attention" size="sm" floating="true" onClick={() => navigate("/appointment-browser")}>
                <MDBIcon icon="calendar-check" className="mr-3" />
                Book Online
              </MDBBtn> 
            </MDBNavItem>
            <MDBNavItem>
              <MDBBtn className="button-attention" size="sm" floating="true" href="tel:+0298052803">
                <MDBIcon icon="phone-alt" className="mr-3"/>
                Call (02) 9805 2803
              </MDBBtn> 
            </MDBNavItem>            
          </MDBNavbarNav>         
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className={`dropdown-default ${dropdownMenu}`}>
                  {loggedIn ? 
                    <>
                      <MDBDropdownItem className={`black-text nav-link ${dropdownItem}`} onClick={() => navigate("/my-account")}>My account</MDBDropdownItem>
                      <MDBDropdownItem className={`black-text nav-link ${dropdownItem}`} onClick={() => signout()}>Sign out</MDBDropdownItem>
                    </> :
                    <>
                      <MDBDropdownItem className={`black-text nav-link ${dropdownItem}`} onClick={() => navigate("/signin")}>Sign in</MDBDropdownItem>
                      <MDBDropdownItem className={`black-text nav-link ${dropdownItem}`} onClick={() => navigate("/signup")}>Create account</MDBDropdownItem>
                     </>
                  }
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Navbar
