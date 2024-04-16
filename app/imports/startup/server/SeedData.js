// To be deleted

import { Meteor } from 'meteor/meteor';
import { Restaurants } from '/imports/api/restaurants/Restaurants';

Meteor.startup(() => {
  if (Restaurants.collection.find().count() === 0) {
    console.log('Inserting initial restaurant data');
    // Array of initial restaurant data
    const initialRestaurants = [
      {
        name: "Gourmet Burger",
        rating: "★★★★★",
        hours: "Today's hours: 10:00AM - 8:00PM",
        imageSrc: "/images/sushi-spectacular.jpg",
      },
      {
        name: "Ultimate Pizza",
        rating: "★★★★★",
        hours: "Today's hours: 11:00AM - 10:00PM",
        imageSrc: "/images/ultimate-pizza.jpg",
      },
      {
        name: "Sushi Spectacular",
        rating: "★★★★",
        hours: "Today's hours: 12:00PM - 8:00PM",
        imageSrc: "/images/sushi-spectacular.jpg",
      },
    ];

    initialRestaurants.forEach(restaurant => Restaurants.collection.insert(restaurant));
  }
});
