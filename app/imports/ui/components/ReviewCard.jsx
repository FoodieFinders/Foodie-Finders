import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../client/style.css';
import { Meteor } from 'meteor/meteor';
import { Reviews } from '../../api/reviews/Reviews';
import Rating from './Rating';
import { updateReview } from '../utilities/updateReview';

const RemoveReview = (review) => {
  // Using SweetAlert for confirmation
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this review!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        Meteor.call(Reviews.collection.remove(review._id), (error) => {
          if (error) {
            console.error('Delete review error:', error.reason || error.message);
            swal("Error", `Failed to delete the review: ${error.reason || error.message}`, "error");
          } else {
            swal("Deleted!", "Review deleted successfully.", "success");
          }
        });
          updateReview(0, review.restaurantId);
      } else {
        swal("Did not delete review!");
      }
    });
};

const ReviewCard = ({ review }) => {
  const owner = Meteor.user()?.username;

  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  const isOwner = review.owner === owner;

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
        {isOwner || isAdmin ? (
          <Button onClick={() => { RemoveReview(review) }}>Remove Comment</Button>
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
