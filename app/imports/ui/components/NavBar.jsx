import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ComponentIDs } from '../utilities/ids';
import { Users } from '../../api/users/users';
import { Roles } from 'meteor/alanning:roles';

const NavBar = () => {
  // Subscribe to the user data and access the necessary fields
  const { currentUser, loggedIn, canAddRestaurant } = useTracker(() => {
    const handle = Meteor.subscribe(Users.userPublicationName);
    const user = Meteor.user();
    const isVendor = user && user.profile && user.profile.title === 'Vendor';
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
    return {
      currentUser: user ? user.username : '',
      loggedIn: !!user,
      canAddRestaurant: isVendor || isAdmin  // Checking if the title is 'Vendor'
    };
  }, []);

  return (
    <Navbar expand="lg" className="navbar-custom" style={{ marginBottom: '0px', backgroundColor: '#124216', color: 'white' }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px' }}><Image src="/images/logo.png" width={50} style={{ marginBottom: 3 }} /> Foodie Finders</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">

            <Nav.Link as={NavLink} id="navbar-about-us" to="/aboutus" key="profiles">About Us</Nav.Link>
            <Nav.Link as={NavLink} id="list-restaurant-nav" to="/restaurants-list" key="projects">Our Vendors</Nav.Link>
            <Nav.Link as={NavLink} id="top-picks-nav" to="/top-picks" key="top-picks">What's Hot</Nav.Link>
            {canAddRestaurant && [
              <Nav.Link as={NavLink} id="add-restaurant-nav" to="/add-restaurant" key="add-restaurant">Add Restaurant</Nav.Link>
            ]}

          </Nav>
          <Nav className="justify-content-end">
            {!loggedIn ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="signin-button" as={NavLink} to="/signin">

                  <PersonFill style={{ marginRight: '5px' }} />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up"  as={NavLink} to="/signup">
                  <PersonPlusFill style={{ marginRight: '5px' }} />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight style={{ marginRight: '5px' }} />
                  Sign out
                </NavDropdown.Item>
                <NavDropdown.Item id="navbar-user" as={NavLink} to="/user">
                  <BoxArrowRight style={{ marginRight: '5px' }} />
                  {' '}
                  My
                  Profile
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
