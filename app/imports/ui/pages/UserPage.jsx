import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { Users } from '../../api/users/users';
import UserProfile from '../components/UserProfile';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const UserPage = () => {
  const navigate = useNavigate();
  const goToEditUserPage = () => navigate('/edituser/:_id');
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, users } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Users.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const userProfiles = Users.collection.find({}).fetch();
    return {
      users: userProfiles,
      ready: rdy,
    };
  }, []);

  const currentUser = users.length > 0 ? users[0] : null;
  const currentUserFirstName = currentUser ? currentUser.firstName : '';

  return (ready ? (
    <Container fluid id="view-user-page" className="min-vh-100">
      <Row>
        <Col md={6}>
          <Col md={{ span: 4, offset: 3 }} className="text-center">
            <h2>Hi, {currentUserFirstName}</h2>
          </Col>
          {users.map((user) => (
            <UserProfile key={user._id} user={user} /> // Pass profile instead of stuff
          ))}
          <Col md={{ span: 4, offset: 3 }}>
            <Button size="lg" block className=" text-center mt-3  custom-review-button" onClick={goToEditUserPage}>
              Edit Your Profile Page
            </Button>
          </Col>
        </Col>
        <Col md={6}>
          <Col className="text-center py-5">
            <h2>Are You A Vendor?</h2>
            <Button size="lg" block className=" text-center mt-3 custom-review-button">
              Submit A New Restaurant
            </Button>
          </Col>
          <Col className="text-center py-4">
            <h2>Already Ate?</h2>
            <Button size="lg" block className=" text-center mt-3 custom-review-button">
              Write A Review
            </Button>
          </Col>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default UserPage;
