import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Image, Button, Col } from 'react-bootstrap';
import { Reviews } from '../../api/reviews/Reviews';
import '../../../client/ReviewsBox.css';
import Rating from './Rating';

const ReviewsBox = ({ userEmail }) => {
  const navigate = useNavigate();

  const { reviews, isReady } = useTracker(() => {
    console.log('Subscription started for email:', userEmail);
    const subscription = Meteor.subscribe('reviewsByEmail', userEmail);
    const ready = subscription.ready();
    const userReviews = Reviews.collection.find({ owner: userEmail }).fetch();
    console.log('Fetched reviews:', userReviews);
    return {
      reviews: userReviews,
      isReady: ready,
    };
  }, [userEmail]);

  const handleNavigate = (restaurantId) => {
    navigate(`/restaurant-page/${restaurantId}`); // Navigate to the restaurant page
  };

  if (!isReady) {
    return <div className="reviews-box">Loading...</div>;
  }

  if (reviews.length === 0) {
    return <div className="reviews-box">No reviews to display.</div>;
  }

  return (
    <div className="py-4 reviews-box justify-content-left">
      <h2 className="text-center">My Reviews</h2>
      <div className="reviews-container">
        {reviews.map((review) => (
          <div key={review._id} className="review">
            {review.image && (
              <Image src={review.image} roundedCircle style={{ width: '50px', height: '50px', marginTop: '-10px' }} />
            )}
            <strong>{review.firstName || review.owner}</strong>
            <Rating value={review.rating} />
            <p><strong>Comment:</strong> {review.comment}</p>
            <Col className="pb-4">
              <Button variant="primary" onClick={() => handleNavigate(review.restaurantId)}>
                Visit Review
              </Button>
            </Col>
          </div>
        ))}
      </div>
    </div>
  );
};

ReviewsBox.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default ReviewsBox;
