import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import '../../../client/style.css'; // Import your custom stylesheet here

const AboutUs = () => {
  const navigate = useNavigate();

  // Function to navigate to the vendor dashboard
  const goToVendorDashboard = () => navigate('/vendor-dashboard');

  // Function to navigate to the leave review page
  const goToLeaveReview = () => navigate('/leave-review');

  const goToTopPicks = () => navigate('top-picks');

  return (
    <Container id="landing-page" fluid className="py-3" style={{ fontFamily:"Montserrat"}}>
      <Row className="justify-content-center">
        <div className="about-text">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="mb-5"><b>Foodie Finder Simplifies Your Dining Experience!</b></h2>

              <h3 className="mt-5">Specific Menu Items:</h3>
              <p>Curious about today's culinary lineup at campus hotspots? We've got the scoop. Foodie Finders gives you the inside track on the mouthwatering dishes being served at campus center locations, food trucks, and more, all in one <a href="/our-vendors" style={{textDecoration: "none"}}>place</a>.</p>

              <h3 className="mt-5">Instant Availability:</h3>
              <p>Craving a quick bite? With Foodie Finders, you can easily discover what's available to devour right now. No more wandering aimlessly – just pull up the app and let your cravings lead the way.</p>

              <h3 className="mt-5">Your Favorite Finds:</h3>
              <p>Love a particular style of cuisine? Never miss out on your <a href="top-picks" style={{textDecoration: "none"}}>favorite</a> dishes again. Foodie Finders keeps you in the loop, notifying you exactly when your preferred food fares are on the menu.</p>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default AboutUs;
