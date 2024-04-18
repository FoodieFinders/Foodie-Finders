import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import { Container, Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap';
import '../../../client/style.css'; // Import your custom stylesheet here
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { HTMLFieldProps, connectField } from 'uniforms';



const formSchema = new SimpleSchema({
  name: String,
  phoneNumber: String,
  email: String,
  description: String,
});


const bridge = new SimpleSchema2Bridge(formSchema);


const LeaveReview = () => {
  return (

    <Container id="landing-page" fluid className="py-3">
      <Row className="justify-content-center">
          <AutoForm className="review-form" ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card style={{borderRadius:15}} className="review-card">
              <Card.Body>
                <div className="page-header">
                  <h1 className="montserrat-header">Vendor Dashboard</h1>
                </div>
                <Row>
                  <Col>
                    <TextField name="name" />
                  </Col>
                  <Col>
                    <TextField name="phoneNumber" />
                  </Col>
                </Row>
                <TextField name="email" />
                <LongTextField name="description" />
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

