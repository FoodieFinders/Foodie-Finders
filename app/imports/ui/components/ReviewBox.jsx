import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { Reviews } from '../../api/reviews/Reviews';
import '../../../client/ReviewsBox.css';

const ReviewsBox = ({ userEmail }) => {
  const { reviews, isReady } = useTracker(() => {
    console.log('Subscription started for email:', userEmail);
    const subscription = Meteor.subscribe('reviewsByEmail', userEmail);
    const ready = subscription.ready();
    console.log('Subscription is ready:', ready);
    const userReviews = Reviews.collection.find({ owner: userEmail }).fetch();
    console.log('Fetched reviews:', userReviews); // Check fetched reviews
    return {
      reviews: userReviews,
      isReady: ready,
    };
  }, [userEmail]);

  if (!isReady) {
    return <div className="reviews-box">Loading...</div>;
  }

  if (reviews.length === 0) {
    return <div className="reviews-box">No reviews to display.</div>; // To handle the case of no reviews
  }

  return (
    <div className="reviews-box justify-content-left">
      <h2 className="text-center">My Reviews</h2>
      <div className="reviews-container">
        {reviews.map((review) => (
          <div key={review._id} className="review">
            {review.image && (
              <Image src={review.image} roundedCircle style={{ width: '50px', height: '50px', marginTop: '-10px' }} />

            )}
            <strong>{review.firstName || review.owner}</strong>
            <p><strong>Comment:</strong> {review.comment}</p>
            {/* Additional review details can be added here */}
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
