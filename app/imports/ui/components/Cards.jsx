import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Cards = ({ cards }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={cards.image} width={75} />
      <Card.Title>{cards.name}</Card.Title>
      <Card.Subtitle>{cards.rating}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{cards.tag}</Card.Text>
      <Card.Text>{cards.hours}</Card.Text>
      <Link to={`/edit/${cards._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Cards.propTypes = {
  cards: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.string,
    tag: PropTypes.string,
    image: PropTypes.string,
    hours: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Cards;
