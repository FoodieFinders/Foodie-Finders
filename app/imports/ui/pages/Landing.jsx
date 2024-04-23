import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Restaurants } from '../../api/restaurants/Restaurants';
import RestaurantItem from '../components/RestaurantItem';
import LoadingSpinner from '../components/LoadingSpinner';
import '../../../client/style.css';

const Landing = () => {
  const { ready, restaurants, loggedIn, currentUser, isAdmin } = useTracker(() => {
    const subscription = Meteor.subscribe(Restaurants.userPublicationName);
    const rdy = subscription.ready();
    const currentUser = Meteor.user() ? Meteor.user().username : null;
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
    let allRestaurants = Restaurants.collection.find({}).fetch();

    const userRestaurants = currentUser ? allRestaurants.filter(rest => rest.owner === currentUser) : [];
    const unownedRestaurants = allRestaurants.filter(rest => !rest.owner || rest.owner !== currentUser);

    // Randomly shuffle unowned restaurants
    const shuffled = unownedRestaurants.sort(() => 0.5 - Math.random());
    // Select random restaurants to ensure there are always up to three displayed
    const randomUnownedRestaurants = shuffled.slice(0, Math.max(3 - userRestaurants.length, 0));

    return {
      restaurants: [...userRestaurants, ...randomUnownedRestaurants].slice(0, 3), // ensure no more than 3 restaurants are shown
      ready: rdy,
      loggedIn: !!Meteor.user(),
      currentUser: currentUser,
      isAdmin: isAdmin
    };
  }, []);

  const navigate = useNavigate();

  const goToEditRestaurantPage = (userId) => navigate(`/editrestaurant/${userId}`);
  const goToSignIn = () => navigate('signin');
  const goToLeaveReview = () => navigate('/leave-review');
  const goToTopPicks = () => navigate('top-picks');

  if (!ready) {
    return <LoadingSpinner />;
  }

  return (
    <Container id="landing-page" fluid className="py-3">
      <Row className="justify-content-center">
        {restaurants.length > 0 ? (
          <Col md={6} className="text-center d-flex flex-column align-items-center">
            <div className="top-picks-header my-4">
              <h1>Today's Top Picks</h1>
            </div>
            <div>
            <ListGroup variant="flush" className="top-pick-list w-100">
              {restaurants.map((restaurant, index) => (
                // In Landing.jsx where RestaurantItem is used
                <RestaurantItem key={index}
                                restaurant={restaurant}
                                currentUser={currentUser}
                                canDelete={isAdmin || currentUser === restaurant.owner}
                                canEdit={isAdmin || currentUser === restaurant.owner}/>

              ))}
            </ListGroup>
            </div>
            <div>
            <Button size="lg" className="top-picks-header text-center mt-3 custom-review-button d-block" onClick={goToTopPicks} style={{width:600}}>
              See all of today's top picks!
            </Button>
            </div>
          </Col>
        ) : (
          <Col md={6} className="text-center">
            <div className="top-picks-header">
              <h1>No Restaurants Available</h1>
            </div>
          </Col>
        )}
        {!loggedIn && (
          <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
            <h2>Are you a vendor?</h2>
            <div>
            <Button size="lg" className="top-picks-header text-center mt-3 custom-review-button d-block" onClick={goToSignIn} style={{width:300}}>
              Vendor Dashboard
            </Button>
            </div>
            <br/>
            <h2>Are you a student?</h2>
            <div>
              <Button size="lg" className="top-picks-header text-center mt-3 custom-review-button d-block" onClick={goToLeaveReview} style={{width:300}}>
              Leave a review!
            </Button>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Landing;
