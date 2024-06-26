import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import { Restaurants } from '../../api/restaurants/Restaurants';
import { Users } from '../../api/users/users';
import { Reviews } from '../../api/reviews/Reviews';
import '../../api/methods/restaurants';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.

Meteor.publish(Reviews.userPublicationName, function () {
  if (this.userId) {
    //    const username = Meteor.users.findOne(this.userId).username;
    return Reviews.collection.find({});
  }
  return Reviews.collection.find({});

//  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Reviews.adminPublicationName, function () {

  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Reviews.collection.find();
  }
  return this.ready();
});

Meteor.publish(null, function () {
  if (!this.userId) return this.ready();
  return Meteor.users.find(this.userId, {
    fields: {
      username: 1,
      'profile.firstName': 1,
      'profile.lastName': 1,
      'profile.title': 1,
      'profile.picture': 1,
    },
  });
});

/*  Meteor.publish(Users.userPublicationName, function () {
    if (this.userId) {
      return Meteor.users.find(this.userId, {
        fields: {
          username: 1,
          title: 1  // Make sure to publish the title field
        }
      });
    }
    return this.ready();
  }); */

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

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Restaurants.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    if (Restaurants.collection.find({ owner: username }).count() === 0) {
      return Restaurants.collection.find();
    }

    return Restaurants.collection.find({ /* owner: username */ });

  }
  return Restaurants.collection.find();

//  return this.ready();
});

/*
  Meteor.publish(Restaurants.userPublicationName, function () {
    return Restaurants.collection.find(/!*{ owner: username }*!/);
  });
  */

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Restaurants.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Restaurants.collection.find();
  }
  return Restaurants.collection.find();

//  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish('reviewsByEmail', function (email) {
  check(email, String);
  console.log(`Looking for reviews with owner email: ${email}`);
  const reviews = Reviews.collection.find({ owner: email });
  console.log(`Found ${reviews.count()} reviews`);
  return reviews;
});
