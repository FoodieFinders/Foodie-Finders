import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Col, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../client/style.css';
import { Meteor } from 'meteor/meteor';
import { Reviews } from '../../api/reviews/Reviews';

const ReviewCard = ({ review }) => {
  const owner = Meteor.user()?.username;

  const RemoveReview = (reviewId) => {
    Reviews.collection.remove(reviewId);
  };

  return (
    <div className="instagram-style-comment">
      <div className="comment-details">
        <div className="user-info">
          {review.image && (
            <Image src={review.image} roundedCircle style={{ width: '50px', height: '50px', marginTop: '-10px' }} />

          )}
          <strong>{review.firstName || review.owner}</strong>
        </div>
        <Rating value={review.rating} />
        <span>{review.comment}</span>
        <br />
        {review.owner === owner ? (
          <Button onClick={() => { RemoveReview(review._id); }}>Remove Comment</Button>
        ) : null}

      </div>
    </div>
  );
};
const Rating = ({
  max = 5,
  value = 0,
}) => {
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
};
ReviewCard.propTypes = {
  review: PropTypes.shape({
    owner: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    image: PropTypes.string,
    comment: PropTypes.string.isRequired,
    rating: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default ReviewCard;
