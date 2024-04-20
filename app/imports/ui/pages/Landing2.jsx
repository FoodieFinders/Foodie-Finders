import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Restaurants } from '../../api/restaurants/Restaurants';
import RestaurantItem from '../components/RestaurantItem';
import LoadingSpinner from '../components/LoadingSpinner';
import '../../../client/style.css'; // Import your custom stylesheet here

const Landing2 = () => {
  const { ready, restaurants, loggedIn, currentUser } = useTracker(() => {
    const subscription = Meteor.subscribe(Restaurants.userPublicationName);
    const rdy = subscription.ready();
    const restaurantItems = Restaurants.collection.find({}).fetch();
    return {
      restaurants: restaurantItems,
      ready: rdy,
      loggedIn: !!Meteor.user(),
      currentUser: Meteor.user() ? Meteor.user().username : null,
    };
  }, []);

  const navigate = useNavigate();

  const goToSignIn = () => navigate('signin');
  const goToLeaveReview = () => navigate('/leave-review');
  const goToTopPicks = () => navigate('top-picks');

  if (!ready) {
    return <LoadingSpinner />;
  }

  return (
    <Container id="landing-page" fluid className="py-3">
      <Row className="justify-content-center">
        {loggedIn ? (
          // When logged in, check the number of restaurants to decide layout
          restaurants.length === 1 ? (
            // Center the single card in the middle of the page
            <Col md={6} className="text-center">
              <div className="top-picks-header text-center">
                <h1>Today's Top Picks</h1>
              </div>
              <RestaurantItem key={restaurants[0]._id} restaurant={restaurants[0]} currentUser={currentUser}/>
              <div className="top-picks-header text-center">
              </div>
              <div className="top-picks-header text-center">
              </div>
              <div className="top-picks-header text-center">
              </div>
            </Col>
          ) : (
            // If more than one, display them normally
            <Col md={6} className="text-center">
              <div className="top-picks-header">
                <h1>Today's Top Picks</h1>
              </div>
              <ListGroup variant="flush" className="top-pick-list">
                {restaurants.map((restaurant, index) => (
                  <RestaurantItem key={index} restaurant={restaurant} currentUser={currentUser}/>
                ))}
              </ListGroup>
            </Col>
          )
        ) : (
          // Render full page when not logged in
          <>
          <Row className="d-flex flex-row justify-content-center">
            <Col className="d-flex flex-column align-items-center">
              <div className="top-picks-header text-center">
                <h1>Today's Top Picks</h1>
              </div>
              <ListGroup variant="flush" className="top-pick-list">
                {restaurants.map(restaurant => <RestaurantItem key={restaurant._id} restaurant={restaurant} currentUser={currentUser}/>)}
              </ListGroup>
              <Button size="lg" block className="top-picks-header text-center mt-3 custom-review-button d-block" onClick={goToTopPicks} style={{width:600}}>
                See all of today's top picks!
              </Button>
            </Col>
            <Col className="mb-4 d-flex flex-column align-items-center justify-content-center cta-container cta-card text-center">
              <h2>Are you a vendor?</h2>
              <Button size="lg" className="custom-review-button" onClick={goToSignIn}>
                Vendor Dashboard
              </Button>

              <h2>Are you a student?</h2>
              <Button size="lg" className="custom-review-button" onClick={goToLeaveReview}>
                Leave a review!
              </Button>
            </Col>
          </Row>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Landing2;
