import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useHours } from '../../api/hours/useHours';
import { Restaurants } from '../../api/restaurants/Restaurants';
import Rating from './Rating'

const remove = (vendor, admin) => {
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

const formatHours = (hours) => {
  if (!Array.isArray(hours) || hours.length === 0) {
    return 'No hours provided'; // Display a message indicating no hours provided
  }

  return hours
    .map(hour => {
      if (!hour || typeof hour !== 'string') {
        return null; // Skip if hour is not a string or is undefined
      }
      const trimmedHour = hour.trim();
      if (!trimmedHour) {
        return null; // Skip if hour is empty after trimming
      }

      if (trimmedHour.includes('-')) {
        const [start, end] = trimmedHour.split('-').map(time => {
          // Format time from "HH:MM" to "HH:MM AM/PM"
          return moment(time.trim(), 'HH:mm').format('hh:mm A');
        });
        return `${start} - ${end}`;
      } else {
        return moment(trimmedHour, 'HH:mm').format('hh:mm A');
      }
    })
    .filter(hour => hour) // Filter out null values
    .join(' - ');
};

const RestaurantItem = ({ restaurant, currentUser, canDelete, canEdit }) => {
  console.log('Restaurant hours:', restaurant.hours);
  const { hours } = useHours();

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/editrestaurant/${restaurant._id}`);
  };

  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  const isOwner = currentUser === restaurant.owner || isAdmin; // Check if current user is the owner

  return (
    <Container lg={6} md={3} sm={1} id="Restaurant-Item" fluid className="h-75">

      <Card className="top-pick-card h-100">
        <Card.Body className="d-flex">
          <Link to={`/restaurant-page/${restaurant._id}`}>
          <div>
            <Image src={restaurant.imageSrc} alt={`${restaurant.name} Restaurant`} style={{ width: '7rem' }} className="img-fluid top-pick-image mr-3"/>
          </div>
          </Link>
          <div>
            <Link to={`/restaurant-page/${restaurant._id}`} style={{ textDecoration: 'none', color:'black' }}><Card.Title >{restaurant.name}</Card.Title> </Link>
            <Card.Text>{restaurant.rating}</Card.Text>
            <Card.Text>{formatHours(restaurant.hours)}</Card.Text>

            {canDelete && <Button variant="danger" onClick={() => remove(restaurant)}>Delete</Button>}
            {canEdit && <Button id="edit-button" variant="secondary" onClick={handleEdit} className="ms-2">Edit</Button>}
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
    rating: PropTypes.number,
    owner: PropTypes.string,
    hours: PropTypes.arrayOf(PropTypes.string),
    imageSrc: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  currentUser: PropTypes.string,
  canDelete: PropTypes.bool,
};

export default RestaurantItem;
