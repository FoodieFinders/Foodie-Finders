import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Restaurants } from '../../api/restaurants/Restaurants';
import RestaurantItem from '../components/RestaurantItem';
import LoadingSpinner from '../components/LoadingSpinner';
import '../../../client/style.css'; // Import your custom stylesheet here


/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Landing2 = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, restaurants } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Restaurants.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const restaurantItems = Restaurants.collection.find({}).fetch();
    return {
      restaurants: restaurantItems,
      ready: rdy,
    };
  }, []);

  const navigate = useNavigate();

  // Function to navigate to the vendor dashboard
  const goToVendorDashboard = () => navigate('/vendor-dashboard');

  // Function to navigate to the leave review page
  const goToLeaveReview = () => navigate('/leave-review');

  const goToTopPicks = () => navigate('top-picks');

  return (ready ? (
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
            {restaurants.map((restaurant) => <RestaurantItem key={restaurant._id} restaurant={restaurant} />)}

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
  ) : <LoadingSpinner />);
};

export default Landing2;
