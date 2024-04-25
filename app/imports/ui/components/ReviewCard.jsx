import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Col, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../client/style.css';
import { Meteor } from 'meteor/meteor';
import { Reviews } from '../../api/reviews/Reviews';
import Rating from './Rating'
import { updateReview } from '../utilities/updateReview';

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
          <Button onClick={() => { RemoveReview(review._id); updateReview(0, review.restaurantId)}}>Remove Comment</Button>
        ) : null}

      </div>
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
