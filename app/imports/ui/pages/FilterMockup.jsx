import React from 'react';
import { Container, Dropdown, Col, Row, Button, ButtonGroup, DropdownButton, Card, Image, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

const FilterMockup = () => (
  <Container fluid>
    <Row>
      <Col sm="2">
        <div className="d-grid gap-1 sticky-top py-3">
          <h3 className="text-center">Filters</h3>
          <ToggleButtonGroup type="checkbox" defaultValue={1}>
            <ToggleButton id="tbg-check-1" value={1} variant="outline-primary">Top Pick?</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup type="checkbox" defaultValue={1}>
            <ToggleButton id="tbg-check-2" value={2} variant="outline-primary">Open?</ToggleButton>
          </ToggleButtonGroup>
          <Button variant="outline-primary">Rating</Button>
          <Button variant="outline-primary">Distance</Button>
          <Button variant="outline-primary">Reviews</Button>
          <DropdownButton
            as={ButtonGroup}
            title="Search Tags"
            id="bg-vertical-dropdown-2"
          >
            <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
            <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
          </DropdownButton>
        </div>
      </Col>
      <Col sm="6">
        <div className="py-3">
          <Card className="top-pick-card mb-4">
            <Card.Body className="d-flex">
              <Image src="/images/Burger.jpg" className="img-fluid top-pick-image mr-3" />
              <div>
                <Card.Title></Card.Title>
                <Card.Text>asdasd</Card.Text>
                <Card.Text>asdsada</Card.Text>
                <Card.Text>asdasd</Card.Text>
              </div>
            </Card.Body>
          </Card>
          <Card className="top-pick-card mb-3">
            <Card.Body className="d-flex">
              <Image src="/images/Burger.jpg" className="img-fluid top-pick-image mr-3" />
              <div>
                <Card.Title></Card.Title>
                <Card.Text></Card.Text>
                <Card.Text></Card.Text>
              </div>
            </Card.Body>
          </Card>
          <Card className="top-pick-card mb-3">
            <Card.Body className="d-flex">
              <Image src="/images/Burger.jpg" className="img-fluid top-pick-image mr-3" />
              <div>
                <Card.Title></Card.Title>
                <Card.Text></Card.Text>
                <Card.Text></Card.Text>
              </div>
            </Card.Body>
          </Card>
          <Card className="top-pick-card mb-3">
            <Card.Body className="d-flex">
              <Image src="/images/Burger.jpg" className="img-fluid top-pick-image mr-3" />
              <div>
                <Card.Title></Card.Title>
                <Card.Text></Card.Text>
                <Card.Text></Card.Text>
              </div>
            </Card.Body>
          </Card>
          <Card className="top-pick-card mb-3">
            <Card.Body className="d-flex">
              <Image src="/images/Burger.jpg" className="img-fluid top-pick-image mr-3" />
              <div>
                <Card.Title></Card.Title>
                <Card.Text></Card.Text>
                <Card.Text></Card.Text>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Col>
      <Col sm="4">
        <div className="sticky-top py-3">
          <Card className="top-pick-card mb-3">
            <Card.Body className="d-flex">
              <Image src="/images/Burger.jpg" className="img-fluid top-pick-image mr-3" />
              <div>
                <Card.Title></Card.Title>
                <Card.Text></Card.Text>
                <Card.Text></Card.Text>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Col>
    </Row>
  </Container>
);

export default FilterMockup;
