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
import { logout } from "../modules/authManager";
import logo from '../images/bibliotech-logo.png'

export default function Header({ isLoggedIn }) {
  const [ isOpen, setIsOpen ] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="nav-margin">
      <Navbar className="biblio-nav" light expand="md" fixed="top">
        <NavbarBrand className='biblio-logo' tag={ RRNavLink } to="/"><img src={ logo } alt='Bibliotech' /></NavbarBrand>
        <NavbarToggler onClick={ toggle } />
        <Collapse isOpen={ isOpen } navbar>
          <Nav className="ms-auto biblio-nav_links" >
            { isLoggedIn &&
              <>
                <NavItem className='nav-test'>
                  <NavLink tag={ RRNavLink } activeClassName='selected' to="/bookshelf">Bookshelf</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ RRNavLink } to="/add">Add Book</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ RRNavLink } to="/loans">Loans</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ RRNavLink } to="/friends">Friends</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink aria-current="page" className="nav-link"
                    style={ { cursor: "pointer" } } onClick={ logout }>Logout</NavLink>
                </NavItem>
              </>
            }
            { !isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={ RRNavLink } to="/login">Login</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ RRNavLink } to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
