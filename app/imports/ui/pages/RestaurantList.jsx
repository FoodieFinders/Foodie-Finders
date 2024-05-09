import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Row, ListGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { ArrowUp, ArrowDown, MoonFill, SunFill } from 'react-bootstrap-icons';
import _ from 'lodash'; // Make sure lodash is imported;
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Restaurants } from '../../api/restaurants/Restaurants';
import RestaurantItem from '../components/RestaurantItem';
import LoadingSpinner from '../components/LoadingSpinner';

// Assuming the currentUser is used somewhere in the component or for the subscription.
/*
const currentUser = Meteor.user() ? Meteor.user().username : null;
*/

/* eslint-disable */
const RestaurantList = () => {

  const currentUser = Meteor.user() ? Meteor.user().username : null;
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  const [alphaSort, setAlphaSort] = useState(0);
  const [hotSort, setHotSort] = useState(0);
  const [ratingSort, setRatingSort] = useState(0);
  const [openLate, setOpenLate] = useState(0);
  const [openEarly, setOpenEarly] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { ready, restaurants } = useTracker(() => {
    const subscription = Meteor.subscribe(Restaurants.userPublicationName);
    const rdy = subscription.ready();
    const restaurantItems = Restaurants.collection.find({}).fetch();

    return {
      restaurants: restaurantItems,
      ready: rdy,
    };
  }, []);
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

  const handleOpenEarly = () => {
    setOpenEarly((prevState) => (prevState + 1) % 2);
  };
  const handleOpenLate = () => {
    setOpenLate((prevState) => (prevState + 1) % 2);
  };
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const goToRandom = () => {
    const rand = _.sample(restaurants);
    navigate(`/restaurant-page/${rand._id}`);
  };

  let filteredRestaurants;
  let filteredEarlyRestaurants;
  let searchedRestaurants;
  let sortedRestaurants;

  filteredEarlyRestaurants = restaurants;
  if (openEarly === 1) {
    filteredEarlyRestaurants = restaurants.filter(restaurant => {
      const openingTimes = restaurant.hours.map(hour => moment(hour.split('-')[0], 'HH:mm').format('HH:mm'));
      return openingTimes.some(time => moment(time, 'HH:mm').isBefore(moment('06:01', 'HH:mm')));
    });
  } else {
    filteredEarlyRestaurants = restaurants;
  }

  if (openLate === 1) {
    filteredRestaurants = filteredEarlyRestaurants.filter(restaurant => {
      const closingTimes = restaurant.hours.map(hour => moment(hour.split('-')[1], 'HH:mm').format('HH:mm'));
      return closingTimes.some(time => moment(time, 'HH:mm').isAfter(moment('19:59', 'HH:mm')));
    });
  } else {
    filteredRestaurants = filteredEarlyRestaurants;
  }

  if (searchTerm !== '') {
    const searchTermLower = searchTerm.toLowerCase();
    searchedRestaurants = _.filter(filteredRestaurants, function (restaurant) {
      return restaurant.name.toLowerCase().startsWith(searchTermLower);
    });
  } else {
    searchedRestaurants = filteredRestaurants;
  }

  if (alphaSort === 1 || alphaSort === 2) {
    sortedRestaurants = [...searchedRestaurants].sort((a, b) => (alphaSort === 1 ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
  // } else if (hotSort === 1 || hotSort === 2) {
  //   sortedRestaurants = [...searchedRestaurants].sort((a, b) => (hotSort === 1 ? b.rating - a.rating : a.rating - b.rating));
  } else if (ratingSort === 1 || ratingSort === 2) {
    sortedRestaurants = [...searchedRestaurants].sort((a, b) => (ratingSort === 1 ? b.rating - a.rating : a.rating - b.rating));
  } else {
    // Default to unsorted list
    sortedRestaurants = searchedRestaurants;
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
            <Button className={`toggle-button state-${openEarly}`} onClick={handleOpenEarly}>
              Open Early?
              {openEarly === 0 && ' '}
              {openEarly === 1 && <SunFill style={{ marginBottom: '2px', paddingLeft: '3px' }} /> }
            </Button>
            <Button className={`toggle-button state-${openLate}`} onClick={handleOpenLate}>
              Open Late?
              {openLate === 0 && ' '}
              {openLate === 1 && <MoonFill style={{ marginBottom: '2px', paddingLeft: '3px' }} /> }
            </Button>

            {/* THIS IS THE SORT BY ROW */}
            <h4 className="text-center py-1 ">
              Sort By
              <hr />
            </h4>
            <Button className={`toggle-button state-${alphaSort}`} onClick={handleAlphaSort}>
              Alphabetical
              <span>
                {alphaSort === 0 && ' '}
                {alphaSort === 1 && <ArrowDown style={{ marginBottom: '2px', paddingLeft: '1px' }} />}
                {alphaSort === 2 && <ArrowUp style={{ marginBottom: '2px', paddingLeft: '1px' }} />}
              </span>
            </Button>
            {/* <Button className={`toggle-button state-${hotSort}`} onClick={handleHotSort}> */}
            {/*  Popularity */}
            {/*  <span className="icon"> */}
            {/*    {hotSort === 0 } */}
            {/*    {hotSort === 1 && <ArrowDown style={{ marginBottom: '2px', paddingLeft: '1px' }} />} */}
            {/*    {hotSort === 2 && <ArrowUp style={{ marginBottom: '2px', paddingLeft: '1px' }} />} */}
            {/*  </span> */}
            {/* </Button> */}
            <Button className={`toggle-button state-${ratingSort}`} onClick={handleRatingSort}>
              Rating
              <span className="icon">
                {ratingSort === 0 }
                {ratingSort === 1 && <ArrowDown style={{ marginBottom: '2px', paddingLeft: '1px' }} />}
                {ratingSort === 2 && <ArrowUp style={{ marginBottom: '2px', paddingLeft: '1px' }} />}
              </span>
            </Button>

            {/* SEARCH BUTTON HERE */}
            <h4 className="text-center py-2">
              Search
            </h4>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Find"
                aria-label="Find"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={handleChange}
              />
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
            <Button className="w-75 primary" style={{ height: '75px' }} onClick={goToRandom}>
              <span className="fs-3">SEND IT</span>
            </Button>
            <br />
            <br />
          </h1>
        </Col>
        <Col className="col-lg-2" />
      </Row>
      <Row>
        <Col className="py-5 ps-5">
          <a href="#top-page">
            <Button className="primary" onClick="">
              <ArrowUp style={{ fontSize: '2em' }} />
            </Button>
          </a>
        </Col>
      </Row>
    </>
  ) :
    <LoadingSpinner />
  );
};

export default RestaurantList;
