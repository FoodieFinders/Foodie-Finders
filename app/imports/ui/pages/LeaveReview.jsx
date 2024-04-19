import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import { Container, Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap';
import '../../../client/style.css'; // Import your custom stylesheet here
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { HTMLFieldProps, connectField } from 'uniforms';
import { Restaurants } from '../../api/restaurants/Restaurants';
import LoadingSpinner from '../components/LoadingSpinner';



const formSchema = new SimpleSchema({
  rating: Number,
  comment: String,
});

function Rating({
  className,
  disabled,
  max = 5,
  onChange,
  required,
  value = 0,
}) {
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
}

const bridge = new SimpleSchema2Bridge(formSchema);
const RatingField = connectField(Rating);


const LeaveReview = () => {

  const submit = (data, formRef) => {
    const { rating, comment } = data;
    const owner = Meteor.user().username;
    const { _id } = useParams();
    const restaurantId = _id;
    Reviews.collection.insert(
      { rating, comment, owner, restaurantId },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  const { _id } = useParams();
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
  console.log(doc, ready);
  return ready ? (

    <Container id="landing-page" fluid className="py-3">
      <Row className="justify-content-center">
          <AutoForm className="review-form" ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card style={{borderRadius:15}} className="review-card">
              <Card.Body>
                <div className="page-header">
                  <h1 className="montserrat-header">Leave a review for {doc.name}</h1>
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
  ) : <LoadingSpinner />
};


export default LeaveReview;
