import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Row, ListGroup, Button, InputGroup, ToggleButton, ToggleButtonGroup, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { ArrowUp, ArrowDown, Search } from 'react-bootstrap-icons';
import { Restaurants } from '../../api/restaurants/Restaurants';
import RestaurantItem from '../components/RestaurantItem';
import LoadingSpinner from '../components/LoadingSpinner';

const RestaurantList = () => {

  const [state1, setState1] = useState(0);
  const [state2, setState2] = useState(0);
  const [state3, setState3] = useState(0);

  const handleClick1 = () => {
    setState1((prevState) => (prevState + 1) % 3);
    setState2(0);
    setState3(0);
  };

  const handleClick2 = () => {
    setState2((prevState) => (prevState + 1) % 3);
    setState1(0);
    setState3(0);
  };

  const handleClick3 = () => {
    setState3((prevState) => (prevState + 1) % 3);
    setState1(0);
    setState2(0);
  };

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
      <Row className="ps-lg-5">
        {/* THIS IS THE ANCHOR TO SCROLL UP TO THE TOP OF THE PAGE */}
        <a id="top-page" />

        {/* THIS COLUMN IS THE FILTERS COLUMN} */}
        <Col className="col-md-2">
          <div className="d-grid gap-1 sticky-top py-3">
            <h4 className="text-center py-2">
              Filters
              <hr />
            </h4>
            <ToggleButtonGroup type="checkbox" defaultValue={1}>
              <ToggleButton id="tbg-check-2" value={2} variant="primary">Open Late?</ToggleButton>
            </ToggleButtonGroup>

            {/* THIS IS THE SORT BY ROW */}
            <h4 className="text-center py-1 ">
              Sort By
              <hr />
            </h4>
            <Button className={`toggle-button state-${state1}`} onClick={handleClick1}>
              Alphabetical
              <span>
                {state1 === 0 && ' '}
                {state1 === 1 && <ArrowDown />}
                {state1 === 2 && <ArrowUp />}
              </span>
            </Button>
            <Button className={`toggle-button state-${state2}`} onClick={handleClick2}>
              Popularity
              <span className="icon">
                {state2 === 0 }
                {state2 === 1 && <ArrowDown />}
                {state2 === 2 && <ArrowUp />}
              </span>
            </Button>
            <Button className={`toggle-button state-${state3}`} onClick={handleClick3}>
              Rating
              <span className="icon">
                {state3 === 0 }
                {state3 === 1 && <ArrowDown />}
                {state3 === 2 && <ArrowUp />}
              </span>
            </Button>
            <Button variant="primary">Distance</Button>

            {/* SEARCH BUTTON HERE */}
            <h4 className="text-center py-2">
              Search
            </h4>
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
              <span className="fs-3">SEND IT</span>
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
