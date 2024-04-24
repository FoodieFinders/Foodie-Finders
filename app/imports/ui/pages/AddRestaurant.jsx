import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Restaurants } from '../../api/restaurants/Restaurants';


// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  hours: {
    type: Array,
    optional: true
  },
  'hours.$': {
    type: String
  },
/*  hours: {
    type: String,
    allowedValues: ['9:00 AM - 5:00 PM', '10:00 AM - 6:00 PM', '11:00 AM - 7:00 PM', '12:00 PM - 8:00 PM', '1:00 PM - 9:00 PM'],
  },*/
  address: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  },
  rating: {
    type: String,
    optional: true
  },
  imageSrc: {
    type: String,
    optional: true // Make optional if some restaurants might not have an image initially
  }
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddRestaurant = () => {
  const [hours, setHours] = useState('');
  const navigate = useNavigate();
  const submit = (data, formRef) => {
    console.log("Form data:", data);
    console.log("Logged in user:", Meteor.user());
    const { name, address, imageSrc, description, rating } = data;

    if (!hours) {
      swal('Error', 'Hours field is required', 'error');
      return;
    }

    const owner = Meteor.user().username;
    Restaurants.collection.insert(
      { name, address, imageSrc, description, hours, owner, rating },
      (error) => {
        if (error) {
          console.error("Error:", error);
          swal('Error', error.message, 'error');
        } else {
          console.error("Success:", error);
          swal('Success', 'Item added successfully', 'success').then(() => {
            navigate('/restaurants-list');
            // Navigate to the homepage after success
          });
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id="add-restaurant-page" fluid className="py-3">
      <Row className="justify-content-center">
        <AutoForm className="review-form" ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
          <Card style={{borderRadius:15}} className="review-card">
            <Card.Body>
              <div className="page-header">
                <h1 className="montserrat-header">Vendor Dashboard</h1>
              </div>
              <Row>
                <Col>
                  <TextField name="name"/>
                </Col>

                <label htmlFor="hours">Hours</label>
                <div style={{  position: 'relative', display: 'inline-block', width: '400px' }}>
                  <TimeRangePicker
                    onChange={setHours}
                    value={hours}
                    format="h:mm a" // Use AM/PM format
                    name="hours"
                    id="hours"
                    className="form-control" //Ensure TimeRangePicker matches form-control styling
                    clockAriaLabel="Toggle clock"
                    clearAriaLabel="Clear value"
                    clockIcon={null}
                    disableClock={true}
                    clearIcon="Clear"
                  />
                </div>

              </Row>
              <TextField name="address"/>
              <TextField name="imageSrc" label="Image"/>
              <LongTextField name="description"/>
              <SubmitField value="Submit"/>
              <ErrorsField/>
            </Card.Body>
          </Card>
        </AutoForm>
      </Row>
    </Container>
  );
};

export default AddRestaurant;
