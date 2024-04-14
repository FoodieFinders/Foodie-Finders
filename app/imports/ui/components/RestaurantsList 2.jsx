import React from 'react';
import { useRestaurants } from '/imports/ui/hooks/useRestaurants';
import { Card, Image } from 'react-bootstrap';


const RestaurantsList = () => {
  const restaurants = useRestaurants();

  return (
    <div>
      {restaurants.map((restaurant, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Image src={restaurant.imageSrc} alt={restaurant.name} className="img-fluid top-pick-image mr-3" />
            <Card.Title>{restaurant.name}</Card.Title>
            <Card.Text>{restaurant.rating}</Card.Text>
            <Card.Text>{restaurant.hours}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default RestaurantsList;
