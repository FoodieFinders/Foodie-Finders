import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ComponentIDs } from '../utilities/ids';
import { Users } from '../../api/users/users';  // Assuming the path to Users import is correct

const NavBar = () => {
  // Subscribe to the user data and access the necessary fields
  const { currentUser, loggedIn, isVendor } = useTracker(() => {
    const handle = Meteor.subscribe(Users.userPublicationName);
    const user = Meteor.user();
    return {
      currentUser: user ? user.username : '',
      loggedIn: !!user,
      isVendor: user && user.profile && user.profile.title === 'Vendor'  // Checking if the title is 'Vendor'
    };
  }, []);

  return (
    <Navbar expand="lg" className="navbar-custom" style={{ marginBottom: '0px', backgroundColor: '#124216', color: 'white' }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px' }}><Image src="/images/logo.png" width={50} style={{ marginBottom: 3 }} /> Foodie Finders</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={ComponentIDs.basicNavbarNav} />
        <Navbar.Collapse id={ComponentIDs.basicNavbarNav}>
          <Nav className="me-auto justify-content-start">

            <Nav.Link as={NavLink} id={ComponentIDs.profilesMenuItem} to="/aboutus" key="profiles">About Us</Nav.Link>
            <Nav.Link as={NavLink} id={ComponentIDs.projectsMenuItem} to="/restaurants-list" key="projects">Our Vendors</Nav.Link>
            <Nav.Link as={NavLink} id={ComponentIDs.interestsMenuItem} to="/top-picks" key="top-picks">What's Hot</Nav.Link>
            {isVendor && [
              <Nav.Link as={NavLink} id={ComponentIDs.addRestaurantMenuItem} to="/add-restaurant" key="add-restaurant">Add Restaurant</Nav.Link>
            ]}

          </Nav>
          <Nav className="justify-content-end">
            {!loggedIn ? (
              <NavDropdown id={ComponentIDs.loginDropdown} title="Login">
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignIn} as={NavLink} to="/signin">

                  <PersonFill style={{ marginRight: '5px' }} />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignUp} as={NavLink} to="/signup">
                  <PersonPlusFill style={{ marginRight: '5px' }} />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={ComponentIDs.currentUserDropdown} title={currentUser}>
                <NavDropdown.Item id={ComponentIDs.currentUserDropdownSignOut} as={NavLink} to="/signout">
                  <BoxArrowRight style={{ marginRight: '5px' }} />
                  Sign out
                </NavDropdown.Item>
                <NavDropdown.Item id={ComponentIDs.currentUserDropdownSignOut} as={NavLink} to="/user">
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
