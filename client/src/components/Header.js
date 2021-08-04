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

export default function Header({ isLoggedIn }) {
  const [ isOpen, setIsOpen ] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="nav-margin">
      <Navbar className="biblio-nav" color="dark" dark expand="md" fixed="top">
        <NavbarBrand tag={ RRNavLink } to="/">bibliotech</NavbarBrand>
        <NavbarToggler onClick={ toggle } />
        <Collapse isOpen={ isOpen } navbar>
          <Nav className="ms-auto biblio-nav_links" navbar>
            { isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={ RRNavLink } to="/bookshelf">Bookshelf</NavLink>
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
