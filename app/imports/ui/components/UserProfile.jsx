import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Col, Row, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserProfile = ({ user }) => (
  <Container id="Container-User-Profile" fluid className="h-75">
    <Row className="h-100">
      <Col md={10} className="h-100">
        <Card id="Card-Profile" className="h-100 w-100">
          <Card.Body>
            <Row className="justify-content-center">
              <Col className="justify-content-center text-center">
                <Image src={user.picture} rounded width={200} />
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <p>First Name: {user.firstName}</p>
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <p>Last Name: {user.lastName}</p>
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <p>Title: {user.title}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

// Require a document to be passed to this component.
UserProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    title: PropTypes.string,
    picture: PropTypes.string,
    email: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default UserProfile;
