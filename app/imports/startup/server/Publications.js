import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Restaurants } from '../../api/restaurants/Restaurants';
import { Users } from '../../api/users/users';

Meteor.publish('restaurants.user', function publishUserRestaurants() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    // Assuming each restaurant has an 'owner' field with the username
    return Restaurants.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('restaurants.admin', function publishAllRestaurants() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Restaurants.collection.find();
  }
  return this.ready();
});

Meteor.publish(Users.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Users.collection.find({ email: username });
  }
  return this.ready();
});

Meteor.publish(Users.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Users.collection.find();
  }
  return this.ready();
});

/* import { Stuffs } from '../../api/stuff/Stuff';
import { TopPicks } from '../../api/toppicks/TopPicks' */
// Server-side code
// Server-side code
/* Meteor.publish(TopPicks.userPublicationName, function () {
  return TopPicks.collection.find();
});

if (Meteor.isServer) {
  Meteor.publish('topPicks', function () {
    return TopPicks.find();
  });
} */

/* Meteor.publish('topPicks', function () {
  return TopPicks.find(); // No filters here, should return all documents
}); */

/*

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
/*Meteor.publish(Stuffs.userPublicationName, function () {

import { Stuffs } from '../../api/stuff/Stuff';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

*/

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
/*

});

Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});
*/

// alanning:roles publication
// Recommended code to publish roles for each user.
/*

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
*/
