import React from "react"
import { Link, graphql, useStaticQuery, navigate } from "gatsby"

import { getUser, isLoggedIn, logout } from "../services/auth"
import headerStyles from "./header.module.scss"
import { Nav, Navbar, Row, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap'

const Header = () => {
  return (
    <Container fluid>
      <Navbar bg="primary" variant="dark" fixed="top" expand="md">
        <Navbar.Brand>
          <img
            alt=""
            src={require("../../static/logo_findingpro.png")}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Navbar.Text>
              <Link
                className={headerStyles.navItem}
                activeClassName={headerStyles.activeNavItem}
                to="/search"
              >Search</Link>
            </Navbar.Text>
          </Nav>
          <Nav>
            {
              isLoggedIn() ?
                ( <div>
                
                  <Navbar.Text>
                    <Link
                      className={headerStyles.navItem}
                      activeClassName={headerStyles.activeNavItem}
                      to="/app/help">
                      Help
                  </Link>
                  </Navbar.Text>
                <Navbar.Text paddingSize="5px">
                <div style={{padding:"0px 10px 0px 0px"}}>
                  <a href={"mailto:findingMro@forloop.com.au?subject= FindingMRO -User Request By ("+ getUser().user.email+")"}>
                    <img src={require("../../static/mail_icon.svg")} />
                    </a>
                   </div> 

                </Navbar.Text>
                    <Navbar.Text>
                      <a
                        className={headerStyles.navItem}
                        activeClassName={headerStyles.activeNavItem}
                        href="/"
                        onClick={event => {
                          event.preventDefault()
                          logout(() => {
                            localStorage.removeItem("token");
                            navigate(`/`);})
                        }}
                      >
                        Logout
                          </a>
                    </Navbar.Text>
                  </div>
                ) :
                (
                 <div>
                 </div>
                )
                
            }
               
            
          </Nav>
        </Navbar.Collapse>
      </Navbar >
    </Container>
  )
}

export default Header
