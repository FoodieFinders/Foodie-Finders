import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Dont know which files use this so cant rename it */
/* eslint-disable */
const CardItem = ({ card }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={card.image} width={75} />
      <Card.Title>{card.name}</Card.Title>
      <Card.Subtitle>{card.rating}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{card.tag}</Card.Text>
      <Card.Text>{card.hours}</Card.Text>
      <Link to={`/edit/${card._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
CardItem.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.string,
    tag: PropTypes.string,
    image: PropTypes.string,
    hours: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default CardItem;
