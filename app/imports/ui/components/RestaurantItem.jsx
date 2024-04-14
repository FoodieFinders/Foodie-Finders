import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const RestaurantItem = ({ restaurant }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={restaurant.image} width={75} />
      <Card.Title>{restaurant.name}</Card.Title>
      <Card.Subtitle>{restaurant.rating}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{restaurant.tag}</Card.Text>
      <Card.Text>{restaurant.hours}</Card.Text>
      <Link to={`/edit/${restaurant._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
RestaurantItem.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.string,
    tag: PropTypes.string,
    image: PropTypes.string,
    hours: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default RestaurantItem;