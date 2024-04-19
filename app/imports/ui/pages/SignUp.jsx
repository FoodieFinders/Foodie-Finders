import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Users } from '../../api/users/users';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: { type: String },
    password: { type: String, min: 6 },
    firstName: { type: String },
    lastName: { type: String },
    title: { type: String, allowedValues: ['Student', 'Vendor'], defaultValue: 'Student' },
    picture: { type: String },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password, firstName, lastName, title, picture } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        Users.collection.insert({ email, firstName, lastName, title, picture }, (err2) => {
          if (err2) {
            setError(err2.reason);
          } else {
            setRedirectToRef(true);
          }
        });
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <h2 className="text-center mb-4">Register your account</h2>
          <AutoForm schema={bridge} onSubmit={submit}>
            <Card>
              <Card.Body>
                <TextField name="email" placeholder="E-mail address" />
                <TextField name="password" placeholder="Password" type="password" />
                <TextField name="firstName" placeholder="First Name" />
                <TextField name="lastName" placeholder="Last Name" />
                <SelectField name="title" placeholder="Title" allowedValues={['Student', 'Vendor']} />
                <TextField name="picture" placeholder="Picture URL " />
                <ErrorsField />
                <SubmitField className="mt-3" value="Register" />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light" className="text-center mt-3">
            Already have an account? <Link to="/signin">Login here</Link>
          </Alert>
          {error && (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
