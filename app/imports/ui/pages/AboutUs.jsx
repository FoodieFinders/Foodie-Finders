import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../client/style.css'; // Import your custom stylesheet here

const AboutUs = () => (
  <>
    <Container id="about-us" fluid className="py-3" style={{ fontFamily: 'Montserrat', textAlign: 'center' }}>
      <br />
      <br />
      <br />
      <div className="about-text">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="mb-5"><b>Foodie Finder Simplifies Your Dining Experience!</b></h1>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Row className="justify-content-center">
        <Col
          className="col-md-7"
          style={{
            backgroundImage: 'url(https://images.indianexpress.com/2023/12/food.jpg)',
            backgroundSize: 'cover',
            height: '70vh',
          }}
        />
        <Col className="col-md-4 justify-content-center">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h3 className="mt-5">Specific Menu Items:</h3>
          <p>Curious about today&apos;s culinary lineup at campus hotspots? We&apos;ve got the scoop. Foodie Finders gives you the inside track on the mouthwatering dishes being served at campus center locations, food trucks, and more, all in
            one <a href="/restaurants-list" style={{ textDecoration: 'none' }}>place</a>.
          </p>
        </Col>
      </Row>
    </Container>
    <Container>
      <Row className="ps-lg-5 p-5">
        <Col className="col-md-4 justify-content-center">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1 className="mt-5">Instant Availability:</h1>
          <p>Craving a quick bite? With Foodie Finders, you can easily discover what&apos;s available to devour right now. No more wandering aimlessly – just pull up the app and let your cravings lead the way.</p>
        </Col>
        <Col />
        <Col
          className="col-md-7"
          style={{
            backgroundImage: 'url(      https://wearesolomon.com/wp-content/uploads/2019/03/If-your-food-delivery-man-handed-you-the-real-menu-of-their-everyday-lives-the-story-of-Mohammed-1-1.jpg)',
            backgroundSize: 'cover',
            height: '70vh' }}
        />
      </Row>
    </Container>
    <Container>
      <Row className="ps-lg-5 p-5">
        <Col
          className="col-md-6"
          style={{ backgroundImage: 'url(https://wallpapers.com/images/featured/bubble-tea-c2914vahudkc6p9d.jpg)',
            backgroundSize: 'cover',
            height: '70vh' }}
        />
        <Col />
        <Col className="col-md-5 justify-content-center">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1 className="text-start">Your Favorite Finds:</h1>
          <p>Love a particular style of cuisine? Never miss out on your <a href="top-picks" style={{ textDecoration: 'none' }}>favorite</a> dishes again. Foodie Finders keeps you in the loop, notifying you exactly when your preferred food
            fares are on the menu.
          </p>
        </Col>
      </Row>
    </Container>
  </>
);

export default AboutUs;
