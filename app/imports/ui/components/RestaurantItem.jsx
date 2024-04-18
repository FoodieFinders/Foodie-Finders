import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Col, Row, Image } from 'react-bootstrap';
import '../../../client/style.css';
const RestaurantItem = ({ restaurant }) => (
  <Container id="Restaurant-Item" fluid className="h-100">
  <Card className="top-pick-card h-50">
    <Card.Body className="d-flex align-items-center">
      <div>
        <Image src={restaurant.imageSrc} alt={` ${restaurant.name} Restaurant`} style={{ width: '7rem' }} className="img-fluid top-pick-image mr-3"/>
      </div>
      <div>
        <Card.Title>{restaurant.name}</Card.Title>
        <Card.Text>{restaurant.rating}</Card.Text>
        <Card.Text>{restaurant.hours}</Card.Text>
      </div>
      <div className="fire-animation"></div>
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
    owner: PropTypes.string,
    hours: PropTypes.string,
    imageSrc: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default RestaurantItem;