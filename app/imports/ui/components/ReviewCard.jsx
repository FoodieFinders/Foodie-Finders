import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Col, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../client/style.css';

const ReviewCard = ({ review }) => {
    return (
        <div className="instagram-style-comment">
            <div className="comment-details">
                <strong>{review.owner}</strong>
                <Rating value={review.rating} />
                <span>{review.comment}</span>
            </div>
        </div>
    );
}
function Rating({
  max = 5,
  value = 0,
}) {
  const numStarsToShow = Math.min(value, max); // Show up to 'value' number of stars, capped at 'max'

  return (
    <div>
      {Array.from({ length: numStarsToShow }, (_, index) => index + 1).map(index => (
        <span
          style={{ fontSize: 25 }}
          key={index}
          tabIndex={0}
        >
          ★
        </span>
      ))}
      {Array.from({ length: max - numStarsToShow }, (_, index) => index + numStarsToShow + 1).map(index => (
        <span
          style={{ fontSize: 25 }}
          key={index}
          tabIndex={0}
        >
          ☆
        </span>
      ))}
    </div>
  );
}
ReviewCard.propTypes = {
  review: PropTypes.shape({
    owner: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    rating: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default ReviewCard;