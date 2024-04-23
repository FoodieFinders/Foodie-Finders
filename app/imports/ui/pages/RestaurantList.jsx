import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Row, ListGroup, Button, InputGroup, ToggleButton, ToggleButtonGroup, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Search } from 'react-bootstrap-icons';
import { Restaurants } from '../../api/restaurants/Restaurants';
import RestaurantItem from '../components/RestaurantItem';
import LoadingSpinner from '../components/LoadingSpinner';

const currentUser = Meteor.user() ? Meteor.user().username : null;

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

  return (ready ? (
    <>
      <Row>
        <a id="top-page" />
        <Col className="col-md-2">
          <div className="d-grid gap-1 sticky-top py-1">
            <h4 className="text-center py-2">
              Filters
              <hr />
            </h4>
            <ToggleButtonGroup type="checkbox" defaultValue={1}>
              <ToggleButton id="tbg-check-1" value={1} variant="primary">Top Pick?</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup type="checkbox" defaultValue={1}>
              <ToggleButton id="tbg-check-2" value={2} variant="primary">Open?</ToggleButton>
            </ToggleButtonGroup>
            <h4 className="text-center py-1 ">
              Sort By
              <hr />
            </h4>
            <Button variant="primary">Popularity</Button>
            <Button variant="primary">Rating</Button>
            <Button variant="primary">Distance</Button>
            <h4 className="text-center py-2">Search</h4>
            <InputGroup className="mb-3">
              <Form.Control
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <Button variant="primary" id="button-addon2"><Search /></Button>
            </InputGroup>
          </div>
        </Col>
        <Col className="col-md-5">
          <div className="py-3">
            <ListGroup variant="flush" className="top-pick-list">
              {restaurants.map(restaurant => (
                <RestaurantItem key={restaurant._id} restaurant={restaurant} />
              ))}
            </ListGroup>
          </div>
        </Col>
        <Col className="col-md-5" />
      </Row>
      <Row>
        <Col className="col-lg-2" />
        <Col className="col-lg-8 text-center">
          <h1 className="sticky-top py-4">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            Can't decide what to eat?
            <br />
            <br />
            <Button className="w-75 primary" style={{ height: '75px' }}>
              <span className="fs-3">SEND IT
              {/*  {restaurants.map((restaurant, index) => (*/}
              {/*  <RestaurantItem key={index} restaurant={restaurant} currentUser={currentUser} />*/}
              {/*))}*/}
              </span>
            </Button>
            <br />
            <br />
            <br />
            <br />
          </h1>
        </Col>
        <Col className="col-lg-2" />
      </Row>
      <Col className="col-1">
        <a href="#top-page">
          <Row>
            <Button className="primary" onClick="">
              <span className="fs-6">Return to Top</span>
            </Button>
          </Row>
        </a>
      </Col>
    </>
  ) :
    <LoadingSpinner />
  );
};

export default RestaurantList;
