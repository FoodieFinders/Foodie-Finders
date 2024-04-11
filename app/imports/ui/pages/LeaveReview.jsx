import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import { Container, Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap';
import '../../../client/style.css'; // Import your custom stylesheet here
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { HTMLFieldProps, connectField } from 'uniforms';



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
  return (

    <Container id="landing-page" fluid className="py-3">
      <Row className="justify-content-center">
        <div className="top-picks-header">
          <h1>Leave a Review</h1>
        </div>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={() => alert("Submit")}>
            <Card className="review-card">
              <Card.Body>
                <Row className="justify-content-center">
                  <img style={{width:"80%", height:500, objectFit:"cover"}} src="https://www.certifiedirishangus.ie/wp-content/uploads/2019/11/TheUltimateBurgerwBacon_RecipePic.jpg" />
                </Row>
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
  );
};

export default LeaveReview;
