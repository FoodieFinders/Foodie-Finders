import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Row, ListGroup, Button, InputGroup, ToggleButton, ToggleButtonGroup, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { ArrowUp, ArrowDown, Search } from 'react-bootstrap-icons';
import _ from 'lodash'; // Make sure lodash is imported;
import { Restaurants } from '../../api/restaurants/Restaurants';
import RestaurantItem from '../components/RestaurantItem';
import LoadingSpinner from '../components/LoadingSpinner';

// Assuming the currentUser is used somewhere in the component or for the subscription.
/*
const currentUser = Meteor.user() ? Meteor.user().username : null;
*/

const RestaurantList = () => {

  const currentUser = Meteor.user() ? Meteor.user().username : null;
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  const [alphaSort, setAlphaSort] = useState(0);
  const [hotSort, setHotSort] = useState(0);
  const [ratingSort, setRatingSort] = useState(0);

  const handleAlphaSort = () => {
    setAlphaSort((prevState) => (prevState + 1) % 3);
    setHotSort(0);
    setRatingSort(0);
  };

  const handleHotSort = () => {
    setHotSort((prevState) => (prevState + 1) % 3);
    setAlphaSort(0);
    setRatingSort(0);
  };

  const handleRatingSort = () => {
    setRatingSort((prevState) => (prevState + 1) % 3);
    setAlphaSort(0);
    setHotSort(0);
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

  let sortedRestaurants;
  if (alphaSort === 1 || alphaSort === 2) {
    sortedRestaurants = [...restaurants].sort((a, b) => {
      return alphaSort === 1 ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
  } else if (hotSort === 1 || hotSort === 2) {
    sortedRestaurants = [...restaurants].sort((a, b) => {
      return hotSort === 1 ? a.rating - b.rating : b.rating - a.rating;
    });
  } else if (ratingSort === 1 || ratingSort === 2) {
    sortedRestaurants = [...restaurants].sort((a, b) => {
      return ratingSort === 1 ? a.rating - b.rating : b.rating - a.rating;
    });
  } else {
    // Default to unsorted list
    sortedRestaurants = restaurants;
  }

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
            <Button className={`toggle-button state-${alphaSort}`} onClick={handleAlphaSort}>
              Alphabetical
              <span>
                {alphaSort === 0 && ' '}
                {alphaSort === 1 && <ArrowDown />}
                {alphaSort === 2 && <ArrowUp />}
              </span>
            </Button>
            <Button className={`toggle-button state-${hotSort}`} onClick={handleHotSort}>
              Popularity
              <span className="icon">
                {hotSort === 0 }
                {hotSort === 1 && <ArrowDown />}
                {hotSort === 2 && <ArrowUp />}
              </span>
            </Button>
            <Button className={`toggle-button state-${ratingSort}`} onClick={handleRatingSort}>
              Rating
              <span className="icon">
                {ratingSort === 0 }
                {ratingSort === 1 && <ArrowDown />}
                {ratingSort === 2 && <ArrowUp />}
              </span>
            </Button>

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
              {sortedRestaurants.map(restaurant => (
                <RestaurantItem
                  key={restaurant._id}
                  restaurant={restaurant}
                  currentUser={currentUser}
                  canDelete={isAdmin || currentUser === restaurant.owner}
                  canEdit={isAdmin || currentUser === restaurant.owner}
                />
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
