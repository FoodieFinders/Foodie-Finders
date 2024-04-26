import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row, Button, Image, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import ReviewCard from '../components/ReviewCard';
import { Restaurants } from '../../api/restaurants/Restaurants';
import { Reviews } from '../../api/reviews/Reviews';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RestaurantPage = () => {
  const { _id } = useParams();

  const { doc, rev, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Restaurants.userPublicationName);
    const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
    const ready = subscription.ready() && subscription2.ready();
    const document = Restaurants.collection.findOne(_id);
    const reviews = ready ? Reviews.collection.find({ restaurantId: _id }).fetch() : [];
    
    return { doc: document, rev: reviews, ready };
  }, [_id]);

  if (!ready || !doc) {
    return <LoadingSpinner />;
  }

  return (
    <Col id="restaurant-page" className="py-3">
      <Row className="justify-content-center">
        <Col lg={5} className="mb-4">
          <Card className="merged-item-card">
            <Card.Header className="text-center">{doc.name}</Card.Header>
            <Image src={`${doc.imageSrc}`} alt={doc.name} className="img-fluid" />
            <Card.Body>
              <div className="star-rating">{doc.rating}</div>
              <Card.Text>{doc.address}</Card.Text>
              <Card.Text>{doc.hours}</Card.Text>
              <Card.Text>{doc.description}</Card.Text>
              <Link className="review-link" to={`/leave-review/${_id}`}>
                <Button variant="primary" className="w-100">Leave a Review!</Button>
              </Link>
              <hr className="comment-divider" />
              <ListGroup variant="flush" className="top-pick-list">
                {rev.map((review, index) => <ReviewCard key={index} review={review} />)}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

export default RestaurantPage;