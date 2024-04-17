import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Restaurants } from '../../api/restaurants/Restaurants';
import RestaurantItem from '../components/RestaurantItem';
import LoadingSpinner from '../components/LoadingSpinner';
import '../../../client/style.css'; // Import your custom stylesheet here

const Landing2 = () => {
  const { ready, restaurants, loggedIn } = useTracker(() => {
    const subscription = Meteor.subscribe(Restaurants.userPublicationName);
    const rdy = subscription.ready();
    const restaurantItems = Restaurants.collection.find({}).fetch();
    return {
      restaurants: restaurantItems,
      ready: rdy,
      loggedIn: !!Meteor.user(),
    };
  }, []);

  const navigate = useNavigate();

  const goToVendorDashboard = () => navigate('/vendor-dashboard');
  const goToLeaveReview = () => navigate('/leave-review');
  const goToTopPicks = () => navigate('top-picks');

  if (!ready) {
    return <LoadingSpinner />;
  }

  if (loggedIn) {
    return (
      <Container id="landing-page" fluid className="py-3">
        <Row className="justify-content-center">
          <Col md={5} className="text-center">
            <div className="top-picks-header text-center">
              <h1>Today's Top Picks</h1>
            </div>
            <ListGroup variant="flush" className="top-pick-list">
              {restaurants.map(restaurant => (
                <RestaurantItem key={restaurant._id} restaurant={restaurant} />
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }

  // Render full page when not logged in
  return (
    <Container id="landing-page" fluid className="py-3">
      <Row className="justify-content-center">
        <Col md={8} className="mb-4">
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="top-picks-header text-center">
                <h1>Today's Top Picks</h1>
              </div>
            </Col>
          </Row>
          <ListGroup variant="flush" className="top-pick-list">
            {restaurants.map(restaurant => <RestaurantItem key={restaurant._id} restaurant={restaurant} />)}
          </ListGroup>
          <Row className="justify-content-center">
            <Col md={8}>
              <Button size="lg" block className="top-picks-header text-center mt-3 custom-review-button" onClick={goToTopPicks}>
                See all of today's top picks!
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={4} className="mb-4">
          <div className="cta-container cta-card text-center">
            <h2>Are you a vendor?</h2>
            <Button size="lg" className="custom-review-button" onClick={goToVendorDashboard}>
              Vendor Dashboard
            </Button>

            <h2>Are you a student?</h2>
            <Button size="lg" className="custom-review-button" onClick={goToLeaveReview}>
              Leave a review!
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing2;
