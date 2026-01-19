import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FaWallet, FaUserCircle } from 'react-icons/fa';

const Navigation = ({ userName, handleLogout, openProfile }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-4 sticky-top">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold d-flex align-items-center">
          <FaWallet className="me-2 text-warning" /> 
          FinanceInsight
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#reports">Reports</Nav.Link>
            
            {/* User Profile Section */}
            <NavDropdown 
              title={
                <span className="d-inline-flex align-items-center text-white">
                  <FaUserCircle className="me-2" size={20} />
                  {userName || "Guest"}
                </span>
              } 
              id="basic-nav-dropdown"
              className="ms-lg-3"
            >
              {/* Profile Open Trigger */}
              <NavDropdown.Item onClick={openProfile}>My Profile</NavDropdown.Item>
              <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as="button" onClick={handleLogout} className="text-danger">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;