import React from 'react';
import { Meteor } from 'meteor/meteor';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import { Container, Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../../client/style.css'; // Import your custom stylesheet here
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { connectField } from 'uniforms';
import { Restaurants } from '../../api/restaurants/Restaurants';
import { Reviews } from '../../api/reviews/Reviews';
import LoadingSpinner from '../components/LoadingSpinner';
import { Users } from '../../api/users/users';
import { updateReview } from '../utilities/updateReview';

const formSchema = new SimpleSchema({
  rating: Number,
  comment: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const Rating = ({
  disabled,
  max = 5,
  onChange,
  required,
  value = 0,
}) => {
  function onAction(event, index) {
    if (!disabled && (!('key' in event) || event.key === 'Enter')) {
      onChange(!required && value === index ? undefined : index);
    }
  }

  return (
    <div>
      {Array.from({ length: max }, (_, index) => index + 1).map(index => (
        <span
          style={{ fontSize: 40, cursor: 'pointer' }}
          key={index}
          class={`star-${index}`}
          onClick={event => onAction(event, index)}
          onKeyDown={event => onAction(event, index)}
          role="button"
          tabIndex={0}
        >
          {index <= value ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

const RatingField = connectField(Rating);

const LeaveReview = () => {
  const { _id } = useParams();
  const restaurantId = _id;

  const navigate = useNavigate();
  const goBack = () => navigate(`/restaurant-page/${restaurantId}`);

  const { userData, userReady } = useTracker(() => {
    const user = Meteor.user();
    if (user) {
      const handle = Meteor.subscribe(Users.userPublicationName);
      const userInfo = Users.collection.findOne({ email: user.username });
      return { userData: userInfo, userReady: handle.ready() };
    }
    return { userData: null, userReady: false };
  }, []);

  const owner = userData?.email; // Assuming 'email' is stored as the username
  const firstname = userData?.firstName;
  const image = userData?.picture;
  /* test
  console.log('hi');
  console.log(owner, firstname, image);
  */


  const submit = (data, formRef) => {
    const { rating, comment } = data;
    const existingReview = rev.filter(rev => rev.restaurantId === restaurantId && rev.owner === userData.email);
    if (existingReview.length >= 1) {
      swal('Error', 'You have already submitted a review for this restaurant', 'error');
      return; // Prevent duplicate reviews
    }

    const reviewData = {
      comment,
      rating,
      owner: userData?.email, // Assuming email is used as owner identifier
      restaurantId,
      firstName: userData?.firstName, // Make sure the key matches what your schema expects
      image: userData?.picture,
    };
    Reviews.collection.insert(reviewData, (error) => {
      updateReview(rating, restaurantId);
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Review added successfully', 'success').then(goBack);
        formRef.reset();
      }
    });
  };

  const { rev, ready2 } = useTracker(() => {
    const subscription = Meteor.subscribe(Reviews.userPublicationName);
    const rdy = subscription.ready();
    const review = Reviews.collection.find().fetch();
    return {
      rev: review,
      ready2: rdy,
    };
  }, []);

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

  let fRef = null;
  return ready ? (

    <Container id="leave-review" fluid className="py-3">
      <Row className="justify-content-center">
        <AutoForm className="review-form" ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
          <Card style={{ borderRadius: 15 }} className="review-card">
            <Card.Body>
              <div className="page-header">
                <Link style={{ textDecoration: 'none' }} to={`/restaurant-page/${restaurantId}`}><h1 className="montserrat-header">Leave a review for {doc.name}</h1></Link>
              </div>
              <Col className="justify-content-center review-img">
                <Image src={`${doc.imageSrc}`} />
              </Col>
              <h4><b>Rating</b></h4>
              <RatingField name="rating" />
              <LongTextField name="comment" />
              <SubmitField value="Submit" />
              <ErrorsField />
            </Card.Body>
          </Card>
        </AutoForm>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default LeaveReview;
