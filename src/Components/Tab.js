import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavbarBrand, NavLink, NavItem, } from 'reactstrap';
function Tab() {
  return (
      <div>
          <Nav tabs className='mb-3'>
              <NavbarBrand>
                  <h1>Restaurant</h1>
              </NavbarBrand>
              <NavItem>
                  <NavLink href='/retrievemenu'>
                      Menu
                  </NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href='/retrievetable'>Tables</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href='/inserttable'>Insert Table</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href='/insertmenu'>Insert Menu</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink onClick={() => {
                      localStorage.setItem('resemail', '');
                      window.location = 'http://localhost:3000/';
                  }}>
                      Logout
                  </NavLink>
              </NavItem>
          </Nav>
      </div>
  )
}

export default Tab