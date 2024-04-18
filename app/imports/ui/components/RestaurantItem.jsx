import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../client/style.css';
const RestaurantItem = ({ restaurant }) => (
  <Link to={`/restaurant-page/${restaurant._id}`} >
    <Container id="Restaurant-Item" fluid className="h-75">
      <Card className="top-pick-card">
        <Card.Body className="d-flex">
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
  </Link>
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