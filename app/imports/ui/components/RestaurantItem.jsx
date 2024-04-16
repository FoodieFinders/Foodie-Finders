import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Col, Row, Image } from 'react-bootstrap';

const RestaurantItem = ({ restaurant }) => (
  <Container id="Restaurant-Item" fluid className="h-75">
  <Card className="top-pick-card mb-3">
    <Card.Body className="d-flex">
      <Image src={restaurant.imageSrc}  alt={` ${restaurant.name} Restaurant`} style={{ width: '100px' }} className="img-fluid top-pick-image mr-3" />
      <div>
        <Card.Title>{restaurant.name}</Card.Title>
        <Card.Text>{restaurant.rating}</Card.Text>
        <Card.Text>{restaurant.hours}</Card.Text>
      </div>
    </Card.Body>
  </Card>
  </Container>
);

RestaurantItem.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.string,
    title: PropTypes.string,
    hours: PropTypes.string,
    imageSrc: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default RestaurantItem;