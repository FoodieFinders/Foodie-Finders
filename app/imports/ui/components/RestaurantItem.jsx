import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Restaurants } from '../../api/restaurants/Restaurants'

const remove = (vendor) => {
  // Using SweetAlert for confirmation
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this restaurant!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        Meteor.call(Restaurants.collection.remove(vendor._id), (error) => {
          if (error) {
            console.error('Delete restaurant error:', error.reason || error.message);
            swal("Error", `Failed to delete the restaurant: ${error.reason || error.message}`, "error");
          } else {
            swal("Deleted!", "Restaurant deleted successfully.", "success");
          }
        });
      } else {
        swal("Your restaurant is safe!");
      }
    });
};
const RestaurantItem = ({ restaurant, currentUser }) => {

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this restaurant?')) {
      Meteor.call('restaurants.delete', restaurant._id, (error) => {
        if (error) {
          console.error('Delete restaurant error:', error.reason || error.message);
        } else {
          console.log('Restaurant deleted successfully.');
        }
      });
    }
  };

  const isOwner = currentUser === restaurant.owner; // Check if current user is the owner

  return (

    <Container id="Restaurant-Item" fluid className="h-75">
      <Card className="top-pick-card h-100">
        <Card.Body className="d-flex">
          <Link to={`/restaurant-page/${restaurant._id}`}>
          <div>
            <Image src={restaurant.imageSrc} alt={`${restaurant.name} Restaurant`} style={{ width: '7rem' }} className="img-fluid top-pick-image mr-3"/>
          </div>
          </Link>
          <div>
            <Card.Title>{restaurant.name}</Card.Title>
            <Card.Text>{restaurant.rating}</Card.Text>
            <Card.Text>{restaurant.hours}</Card.Text>
            {isOwner && <Button variant="danger" onClick={() => remove(restaurant)}>Delete</Button>}
          </div>
          <div className="fire-animation"></div>
        </Card.Body>
      </Card>
    </Container>
  );
};

RestaurantItem.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.string,
    owner: PropTypes.string,
    hours: PropTypes.string,
    imageSrc: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default RestaurantItem;
