import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row, Nav, Image, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaPinterest, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  const navigate = useNavigate();
  const goToSignUp = () => navigate('signup');
  const goToSignIn = () => navigate('signin');

  return (
    <footer className="mt-auto py-4 text-white" style={{ backgroundColor: '#124216' }}>
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={3} className="mb-3 mb-md-0">
            <Image src="/images/logo.png" width={50} style={{ marginBottom: 3 }} />
            <div style={{ paddingTop: '20px' }}>
              <strong>Foodie Finders</strong>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div style={{ paddingTop: '10px' }}>
              <strong>Become a Member Your Tummy will Thank you!</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
              <Button variant="outline-light" onClick={goToSignUp} style={{ marginRight: '200px' }}>Sign Up!</Button>
              <Button variant="outline-light" onClick={goToSignIn}>Sign In!</Button>
            </div>
          </Col>
          <Col xs={12} md={5}>
            <Container>
              <Row className="justify-content-center text-center pt-3">
                <Col>
                  <Nav className="justify-content-center">
                    <Nav.Link href="#" style={{ color: 'white' }}><FaFacebook size="20px" /></Nav.Link>
                    <Nav.Link href="#" style={{ color: 'white' }}><FaInstagram size="20px" /></Nav.Link>
                    <Nav.Link href="#" style={{ color: 'white' }}><FaTwitter size="20px" /></Nav.Link>
                    <Nav.Link href="#" style={{ color: 'white' }}><FaPinterest size="20px" /></Nav.Link>
                  </Nav>
                </Col>
                <Col>
                  Contact Us <br />
                  <strong>808-777-7777</strong> <br />
                  <strong>admin@foodiefinder.com</strong>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <hr />
        <div className="text-center">
          <strong style={{ fontSize: '12px' }}>© {currentYear} Foodie Finders. All rights reserved.</strong>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
