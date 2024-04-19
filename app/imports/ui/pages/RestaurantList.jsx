import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, ListGroup, Button, ButtonGroup, DropdownButton, Image, ToggleButton, ToggleButtonGroup, Dropdown } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Restaurants } from '../../api/restaurants/Restaurants';
import RestaurantItem from '../components/RestaurantItem';
import LoadingSpinner from '../components/LoadingSpinner';

const RestaurantList = () => {
  const { ready, restaurants } = useTracker(() => {
    const subscription = Meteor.subscribe(Restaurants.userPublicationName);
    const rdy = subscription.ready();
    const restaurantItems = Restaurants.collection.find({}).fetch();
    return {
      restaurants: restaurantItems,
      ready: rdy,
    };
  }, []);

  return (
    ready ? (
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
              <ListGroup variant="flush" className="top-pick-list">
                {restaurants.map(restaurant => (
                  <RestaurantItem key={restaurant._id} restaurant={restaurant} />
                ))}
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default RestaurantList;