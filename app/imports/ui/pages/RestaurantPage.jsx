import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row, Button, Image, ListGroup } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Restaurants } from '../../api/restaurants/Restaurants';
import { Link } from 'react-router-dom';
import { Reviews } from '../../api/reviews/Reviews';
import LoadingSpinner from '../components/LoadingSpinner';
import ReviewCard from '../components/ReviewCard';
import PropTypes from 'prop-types';
import Rating from '../components/Rating';
import moment from 'moment';


/* Renders the EditStuff page for editing a single document. */
const RestaurantPage = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const resId = _id;
  const { doc, rev, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Restaurants.userPublicationName);
    const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    const review = Reviews.collection.find().fetch();
    // Get the document
    const document = Restaurants.collection.findOne(_id);
    return {
      doc: document,
      rev: review,
      ready: rdy,
    };
  }, [_id]);

  const formatHours = (hours) => {
    if (!Array.isArray(hours) || hours.length === 0) {
      return 'No hours provided'; // Display a message indicating no hours provided
    }

    return hours
      .map(hour => {
        if (!hour || typeof hour !== 'string') {
          return null; // Skip if hour is not a string or is undefined
        }
        const trimmedHour = hour.trim();
        if (!trimmedHour) {
          return null; // Skip if hour is empty after trimming
        }

        if (trimmedHour.includes('-')) {
          const [start, end] = trimmedHour.split('-').map(time => {
            // Format time from "HH:MM" to "HH:MM AM/PM"
            return moment(time.trim(), 'HH:mm').format('hh:mm A');
          });
          return `${start} - ${end}`;
        } else {
          return moment(trimmedHour, 'HH:mm').format('hh:mm A');
        }
      })
      .filter(hour => hour) // Filter out null values
      .join(' - ');
  };

  // On successful submit, insert the data.
  const restaurantReviews = rev.filter(review => review.restaurantId === resId);
  return ready ? (
    <Col id="restaurant-page" className="py-3">
      <Row className="justify-content-center">
        <Col lg={5} className="mb-4" >
          <Card className="merged-item-card">
            <Card.Header className="text-center">{doc.name}</Card.Header>
            <Image src={`${doc.imageSrc}`} alt={doc.name} className="img-fluid" />
            <Card.Body>
              <Rating value={doc.rating} />
              <Card.Text>{doc.address}</Card.Text>
              <Card.Text>{formatHours(doc.hours)}</Card.Text>
              <Link className="review-link" to={`/leave-review/${resId}`}><Button variant="primary" className="w-100">Leave a Review!</Button></Link>
              <hr className="comment-divider" />
              <ListGroup variant="flush" className="top-pick-list">
                {restaurantReviews.map((rev, index) => <ReviewCard key={index} review={rev} />)}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
  ) : <LoadingSpinner />;
};
export default RestaurantPage;
