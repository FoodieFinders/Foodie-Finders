import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Card = ({ card }) => (
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
Card.propTypes = {
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

export default Card;