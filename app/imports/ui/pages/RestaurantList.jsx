import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, ListGroup, Button, InputGroup, ToggleButton, ToggleButtonGroup, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Search } from 'react-bootstrap-icons';
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
      <Container id="restaurant-list-page" fluid>
        <Row>
          <Col sm="2">
            <div className="d-grid gap-1 sticky-top py-3">
              <h4 className="text-center">Filters</h4>
              <hr />
              <ToggleButtonGroup type="checkbox" defaultValue={1}>
                <ToggleButton id="tbg-check-1" value={1} variant="primary">Top Pick?</ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup type="checkbox" defaultValue={1}>
                <ToggleButton id="tbg-check-2" value={2} variant="primary">Open?</ToggleButton>
              </ToggleButtonGroup>
              <h4 className="text-center py-3">Sort By</h4>
              <hr />
              <Button variant="primary">Popularity</Button>
              <Button variant="primary">Rating</Button>
              <Button variant="primary">Distance</Button>
              <h4 className="text-center py-3">Search</h4>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  name="search"
                />
                <Button variant="primary" id="button-addon2"><Search /></Button>
              </InputGroup>
            </div>
          </Col>
          <Col sm="5">
            <div className="py-3">
              <ListGroup variant="flush" className="top-pick-list">
                {restaurants.map(restaurant => (
                  <RestaurantItem key={restaurant._id} restaurant={restaurant} />
                ))}
              </ListGroup>
            </div>
          </Col>
          <Col sm="5">
            <div className="d-grid gap-1 sticky-top p-3">
              <h1 className="text-center">
                <br />
                <br />
                <br />
                <br />
                Can't decide what to eat?
                <br />
                <Button variant="primary" size="lg">
                  SEND IT
                </Button>
              </h1>
            </div>
          </Col>
        </Row>
      </Container>
      ) :
      <LoadingSpinner />
  );
};

export default RestaurantList;