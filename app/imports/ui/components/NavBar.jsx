import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ComponentIDs } from '../utilities/ids';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser, loggedIn } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    loggedIn: !!Meteor.user(),
  }), []);

  return (
    <Navbar expand="lg" className="navbar-custom" style={{marginBottom: '0px', backgroundColor: '#124216', color:'white'}} >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px' }}><Image src="/images/logo.png" width={50} style={{ marginBottom: 3 }} /> Foodie Finders</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={ComponentIDs.basicNavbarNav} />
        <Navbar.Collapse id={ComponentIDs.basicNavbarNav}>
          <Nav className="me-auto justify-content-start">
           {/* {currentUser ? (
              <Nav.Link as={NavLink} id={ComponentIDs.homeMenuItem} to="/home" key="home">Home</Nav.Link>
            ) : ''}*/}
            <Nav.Link as={NavLink} id={ComponentIDs.profilesMenuItem} to="/aboutus" key="profiles">About Us</Nav.Link>
            <Nav.Link as={NavLink} id={ComponentIDs.projectsMenuItem} to="/restaurants-list" key="projects">Our Vendors</Nav.Link>
            <Nav.Link as={NavLink} id={ComponentIDs.interestsMenuItem} to="/top-picks" key="top-picks">What's Hot</Nav.Link>
            {/*<Nav.Link as={NavLink} id={ComponentIDs.interestsMenuItem} to="/interests" key="interests">Contact Us</Nav.Link>*/}
            {currentUser ? (
              [<Nav.Link as={NavLink} id={ComponentIDs.addRestaurantMenuItem} to="/add-restaurant" key="add-restaurant">Add Restaurant</Nav.Link>,
              <>
              </>
              ]
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id={ComponentIDs.loginDropdown} title="Login">
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignIn} as={NavLink} to="/signin">
                  <PersonFill style={{ marginRight: '5px' }}/>
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignUp} as={NavLink} to="/signup">
                  <PersonPlusFill style={{ marginRight: '5px' }} />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={ComponentIDs.currentUserDropdown} title={currentUser}>
                <NavDropdown.Item id={ComponentIDs.currentUserDropdownSignOut} as={NavLink} to="/signout">
                  <BoxArrowRight style={{ marginRight: '5px' }} />
                  {' '}
                  Sign
                  out
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
