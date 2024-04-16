import React from 'react';
import { Col, Container, Row, Nav, Image, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaPinterest, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-4 text-white" style={{ backgroundColor: '#124216' }}>
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={3} className="mb-3 mb-md-0">
            <Image src="../images/Manoa_Logo.jpg" fluid style={{ maxWidth: '70%', height: '60px', borderRadius: '50%' }} />
            <div style={{ paddingTop: '20px' }}>
              <strong>Foodies</strong>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div style={{ paddingTop: '10px' }}>
              <strong>Become a Subscriber Your Tummy will Thank you!</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
              <input type="text" placeholder="Enter Email Address" style={{ flexGrow: 1, marginRight: '10px', padding: '10px', border: 'none', borderRadius: '5px' }} />
              <Button variant="outline-light">Subscribe!</Button>
            </div>
          </Col>
          <Col xs={12} md={5}>
            <Container>
              <Row className="justify-content-center text-center pt-3">
                <Col>
                  <Nav className="justify-content-center">
                    <Nav.Link href="#" style={{ color: 'white' }}><FaFacebook size="20px"/></Nav.Link>
                    <Nav.Link href="#" style={{ color: 'white' }}><FaInstagram size="20px"/></Nav.Link>
                    <Nav.Link href="#" style={{ color: 'white' }}><FaTwitter size="20px"/></Nav.Link>
                    <Nav.Link href="#" style={{ color: 'white' }}><FaPinterest size="20px"/></Nav.Link>
                  </Nav>
                </Col>
                <Col>
                  Contact Us <br/>
                  <strong>808-777-7777</strong> <br/>
                  <strong>admin@foodiefinder.com</strong>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row style={{ paddingTop: '30px' }}>
          <hr />
          <div className="text-center py-3">
            <strong style={{ fontSize: '12px' }}>© {currentYear} Foodie Finders. All rights reserved.</strong>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
