import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row, Button, Image, Link } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Restaurants } from '../../api/restaurants/Restaurants';
import LoadingSpinner from '../components/LoadingSpinner';
import PropTypes from 'prop-types';

const bridge = new SimpleSchema2Bridge(Restaurants.schema);

const MergedItemCard = ({ order, review, restaurantId }) => (
  <Col lg={5} className="mb-4" >
    <Card className="merged-item-card">
      <Card.Header className="text-center">{order.name}</Card.Header>
      <Image src={`${order.imageSrc}`} alt={order.name} className="img-fluid" />
      <Card.Body>
        {/* Display the gold stars for the order rating */}
        <div className="star-rating">{order.rating}</div>
        <Card.Text>{order.address}</Card.Text>
        <Card.Text>{order.hours}</Card.Text>
        <Button href={`/leave-review/${restaurantId}`} variant="primary" className="w-100">Leave a Review!</Button>
        <hr className="comment-divider" />
        <div className="instagram-style-comment">
          <Image src={`${review.avatarSrc}`} alt={`${review.reviewerName}'s avatar`} className="comment-avatar rounded-circle" />
          <div className="comment-details">
            <strong>{review.reviewerName}</strong>
            <div className="star-rating">{review.rating}</div>
            <span>{review.reviewText}</span>
            <div className="comment-interaction">
              <button className="icon-button emoji" aria-label="Like">👍</button>
              <span className="likes">{review.likes} Likes</span>
              <button className="icon-button emoji" aria-label="Comment">💬</button>
              <span className="comments">{review.comments} Comments</span>
            </div>
            <Button variant="outline-primary" size="sm" className="mt-2">View more Comments</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

MergedItemCard.propTypes = {
  order: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  review: PropTypes.shape({
    reviewerName: PropTypes.string.isRequired,
    avatarSrc: PropTypes.string.isRequired,
    reviewText: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
  }).isRequired,
};
const sampleReview = {
      review: {
        reviewerName: 'Joshuah D. Jones',
        reviewText: 'Absolutely loved the Caramel Frappuccino, perfect blend of coffee and sweetness!',
        rating: '★★★★★',
        avatarSrc: 'ME.jpeg',
        likes: 192,
        comments: 72,
      },
};

console.log(sampleReview.review);


/* Renders the EditStuff page for editing a single document. */
const RestaurantPage = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const restaurantId = _id;
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Restaurants.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Restaurants.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.

  return ready ? (
    <Col id="landing-page" className="py-3">
      <Row className="justify-content-center">
        <MergedItemCard order={doc} review={sampleReview.review} restaurantId={restaurantId} />
      </Row>
    </Col>
  ) : <LoadingSpinner />;
};

export default RestaurantPage;
