import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Users } from '../../api/users/users';
import { Restaurants } from '../../api/restaurants/Restaurants';
import { Reviews } from '../../api/reviews/Reviews';


/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};
const addUser = (user) => {
  console.log(`  Adding: ${user.lastName} (${user.email})`);
  Users.collection.insert(user);
};

const addRestaurant = (restaurant) => {
  console.log(`  Adding Restaurant: ${restaurant.name}`);
  Restaurants.collection.insert(restaurant);

};

const addReview = (review) => {
  console.log(`  Adding Review: ${review.name}`);
  Reviews.collection.insert(review);

};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

if (Users.collection.find().count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Creating default data.');
    Meteor.settings.defaultUsers.forEach(user => addUser(user));
  }
}

if (Restaurants.collection.find().count() === 0) {
  if (Meteor.settings.defaultRestaurants) {
    console.log('Creating default restaurants.');
    Meteor.settings.defaultRestaurants.forEach(restaurant => addRestaurant(restaurant));
  }
}


if (Reviews.collection.find().count() === 0) {
  if (Meteor.settings.defaultReviews) {
    console.log('Creating default reviews.');
    Meteor.settings.defaultReviews.forEach(review => addReview(review));
  }
}