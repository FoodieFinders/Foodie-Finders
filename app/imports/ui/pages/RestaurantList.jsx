import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card } from 'react-bootstrap';
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
        <Row className="justify-content-center text-center">
          <div className="page-header">
            <h1 className="montserrat-header">Our Vendors</h1>
          </div>
          <Row>
            <Col>
          {restaurants.map((restaurant) => <RestaurantItem key={restaurant._id} restaurant={restaurant} />)}
            </Col>
          </Row>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default RestaurantList;
