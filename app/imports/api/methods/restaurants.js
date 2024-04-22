

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Restaurants } from '../restaurants/Restaurants';

Meteor.methods({
  'restaurants.delete'(restaurantId) {
    check(restaurantId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to delete restaurants.');
    }

    const restaurant = Restaurants.collection.findOne({ _id: restaurantId, owner: this.userId });
    if (!restaurant) {
      throw new Meteor.Error('not-found', 'Restaurant not found or you are not the owner.');
    }

    Restaurants.collection.remove(restaurantId);
  },
});
