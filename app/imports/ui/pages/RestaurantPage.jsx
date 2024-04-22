import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row, Button, Image, Link, ListGroup } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Restaurants } from '../../api/restaurants/Restaurants';
import { Reviews } from '../../api/reviews/Reviews';
import LoadingSpinner from '../components/LoadingSpinner';
import ReviewCard from '../components/ReviewCard';
import PropTypes from 'prop-types';


/* Renders the EditStuff page for editing a single document. */
const RestaurantPage = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const resId = _id;
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
  const { rev, ready2 } = useTracker(() => {
    const subscription = Meteor.subscribe(Reviews.userPublicationName);
    const rdy = subscription.ready();
    const review = Reviews.collection.find({restaurantId:resId}).fetch();
    return {
      rev: review,
      ready2: rdy,
    };
  }, []);

  // On successful submit, insert the data.

  return ready ? (
    <Col id="landing-page" className="py-3">
      <Row className="justify-content-center">
        <Col lg={5} className="mb-4" >
          <Card className="merged-item-card">
            <Card.Header className="text-center">{doc.name}</Card.Header>
            <Image src={`/images/${doc.imageSrc}`} alt={doc.name} className="img-fluid" />
            <Card.Body>
              {/* Display the gold stars for the order rating */}
              <div className="star-rating">{doc.rating}</div>
              <Card.Text>{doc.address}</Card.Text>
              <Card.Text>{doc.hours}</Card.Text>
              <Button href={`/leave-review/${resId}`} variant="primary" className="w-100">Leave a Review!</Button>
              <hr className="comment-divider" />
              <ListGroup variant="flush" className="top-pick-list">
                {rev.map((review, index) => <ReviewCard key={index} review={review} />)}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
  ) : <LoadingSpinner />;
};
export default RestaurantPage;
