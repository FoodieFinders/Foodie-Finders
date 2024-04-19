import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, ListGroup } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Restaurants } from '../../api/restaurants/Restaurants';
import RestaurantItem from '../components/RestaurantItem';
import LoadingSpinner from '../components/LoadingSpinner';

const RestaurantList = () => {
  const { ready, restaurants } = useTracker(() => {
    const subscription = Meteor.subscribe(Restaurants.userPublicationName);
    const rdy = subscription.ready();
    const restaurantItems = Restaurants.collection.find({}).fetch();
    return {
      restaurants: restaurantItems,
      ready: rdy,
    };
  }, []);

  return (
    ready ? (
      <Container id="landing-page" fluid className="py-3">
        <Row className="justify-content-center">
          <Col className="text-center">
            <div className="top-picks-header">
              <h1>Our Vendors</h1>
            </div>
            <ListGroup variant="flush" className="top-pick-list">
              {restaurants.map(restaurant => (
                <RestaurantItem key={restaurant._id} restaurant={restaurant} />
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default RestaurantList;