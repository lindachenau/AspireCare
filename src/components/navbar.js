import React, { useState } from "react"
import {
  MDBContainer, MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, 
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn 
} from "mdbreact"
import { Link, navigate } from 'gatsby'
import CustomNavLink from './custom-link'
import Logo from "../images/AMCE.png"
import styles from  './navbar.module.scss'
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
                <MDBDropdownMenu className={`dropdown-default ${styles.dropdownMenu}`}>
                  <MDBDropdownItem className={`black-text nav-link ${styles.dropdownItem}`} onClick={() => navigate("/general-medicine")}>General medicine</MDBDropdownItem>
                  <MDBDropdownItem className={`black-text nav-link ${styles.dropdownItem}`} onClick={() => navigate("/physiotherapy")}>Physiotherapy</MDBDropdownItem>
                  <MDBDropdownItem className={`black-text nav-link ${styles.dropdownItem}`} onClick={() => navigate("/dietetics")}>Dietetics</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBBtn className="button-attention" size="sm" floating="true" onClick={() => navigate("/appointments")}>
                <MDBIcon icon="calendar-check" className="mr-3" />
                Book Appointment
              </MDBBtn> 
            </MDBNavItem>
          </MDBNavbarNav>         
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className={`dropdown-default ${styles.dropdownMenu}`}>
                  {loggedIn ? 
                    <>
                      <MDBDropdownItem className={`black-text nav-link ${styles.dropdownItem}`} onClick={() => navigate("/my-account")}>My account</MDBDropdownItem>
                      <MDBDropdownItem className={`black-text nav-link ${styles.dropdownItem}`} onClick={() => signout()}>Sign out</MDBDropdownItem>
                    </> :
                    <>
                      <MDBDropdownItem className={`black-text nav-link ${styles.dropdownItem}`} onClick={() => navigate("/signin")}>Sign in</MDBDropdownItem>
                      <MDBDropdownItem className={`black-text nav-link ${styles.dropdownItem}`} onClick={() => navigate("/signup")}>Create account</MDBDropdownItem>
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
