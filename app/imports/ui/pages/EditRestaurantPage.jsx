import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Roles } from 'meteor/alanning:roles';
import { Restaurants } from '../../api/restaurants/Restaurants';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField, SelectField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import LoadingSpinner from '../components/LoadingSpinner';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import RestaurantItem from '../components/RestaurantItem';
import { useHours } from '../../api/hours/useHours';

const bridge = new SimpleSchema2Bridge(Restaurants.schema);

const EditRestaurantPage = () => {
  const { hours, setHours } = useHours();
  const { _id } = useParams();
  const navigate = useNavigate();
  const { doc, ready, canEdit } = useTracker(() => {
    const subscription = Meteor.subscribe(Restaurants.userPublicationName, _id);
    const currentUser = Meteor.user();
    const rdy = subscription.ready();
    const document = Restaurants.collection.findOne(_id);
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
    const isOwner = document && currentUser && document.owner === currentUser.username;
    const canEdit = isAdmin || isOwner;
    return {
      doc: document,
      ready: rdy,
      canEdit: canEdit
    };
  }, [_id]);

/*  const [hours, setHours] = useState(doc.hours || ['09:00', '17:00']);*/

  const submit = (data) => {
    const { address, description, rating, imageSrc } = data;
    setHours([]);
    Restaurants.collection.update(_id, { $set: { address, description, rating, hours, imageSrc } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Restaurant updated successfully', 'success').then(() => {
          navigate('/');
          // Navigate to the homepage after success
        });
      }
    });
  };


  if (!ready) {
    return <LoadingSpinner />;
  }

  if (!canEdit) {
    swal("Unauthorized", "You do not have permission to edit this restaurant.", "error");
    navigate('/'); 
  }

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Edit Restaurant</h2>
          <AutoForm schema={bridge} model={doc} onSubmit={submit}>
            <Card>
              <Card.Body>
                <TextField name="address" placeholder="Address"/>
                <LongTextField name="description" placeholder="Description"/>
                <SelectField name="rating"/>
                <label htmlFor="hours">Hours</label>
                <br/>
                <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
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
                <TextField name="imageSrc" placeholder="Image URL" label="Image"/>
                <div className="text-center">
                  <SubmitField value="Update Restaurant"/>
                  <ErrorsField/>
                </div>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditRestaurantPage;
