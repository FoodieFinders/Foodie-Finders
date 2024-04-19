import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap';
import '../../../client/style.css'; // Import your custom stylesheet here

const TopPick = ({ name, rating, hours, imageSrc }) => (
  <Card className="top-pick-card mb-3">
    <Card.Body className="d-flex">
      <Image src="/images/Burger.jpg" alt={name} className="img-fluid top-pick-image mr-3" />
      <div>
        <Card.Title className="top-pick-name">{name}</Card.Title>
        <Card.Text className="top-pick-rating">{rating}</Card.Text>
        <Card.Text className="top-pick-hours">{hours}</Card.Text>
      </div>
    </Card.Body>
  </Card>
);

const Landing = () => {
  const navigate = useNavigate();

  // Function to navigate to the vendor dashboard
  const goToVendorDashboard = () => navigate('/vendor-dashboard');

  // Function to navigate to the leave review page
  const goToLeaveReview = () => navigate('/leave-review');

  const goToSeeAll = () => navigate('/see-all');

  return (
    <Container id="landing-page" className="">
      <Row className="justify-content-center">
        <Row className="justify-content-center">
            <div className="top-picks-header text-center">
              <h1>Today's Top Picks</h1>
            </div>
        </Row>
        <ListGroup variant="flush" className="top-pick-list">
          <TopPick
            name="BRITO"
            rating="★★★★★"
            hours="Today's hours: 10:00AM - 2:00PM"
            imageSrc="/path/to/image.jpg"
          />
          <TopPick
            name="BRITO"
            rating="★★★★★"
            hours="Today's hours: 10:00AM - 2:00PM"
            imageSrc="/path/to/image.jpg"
          />
          <TopPick
            name="BRITO"
            rating="★★★★★"
            hours="Today's hours: 10:00AM - 2:00PM"
            imageSrc="/path/to/image.jpg"
          />
          {/* Repeat TopPick as necessary */}
        </ListGroup>
        <Row className="justify-content-center">
          <Col>
            <Button size="lg" block className="top-picks-header text-center mt-3 custom-review-button" onClick={goToFilterMockup}>
              Browse Through All Restaurants!
            </Button>
          </Col>
        </Row>

        <div className="cta-container cta-card text-center">
          <h2>Are you a vendor?</h2>
          <Button size="lg" className="custom-review-button" onClick={goToVendorDashboard}>
            Vendor Dashboard
          </Button>

          <h2>Are you a student?</h2>
          <Button size="lg" className="custom-review-button" onClick={goToLeaveReview}>
            Leave a review!
          </Button>
        </div>
      </Row>
    </Container>
  );
};

export default Landing;
