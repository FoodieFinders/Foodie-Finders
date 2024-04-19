import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class RestaurantsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'RestaurantsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: { 
        type: String, 
        index: true, 
        unique: true
      },
      address: { 
        type: String, 
        optional: true 
      },
      description: { 
        type: String, 
        optional: true 
      },
      rating: {
        type: String,
        defaultValue: '☆☆☆☆☆',
      },
      owner: {
        optional: true,
        type: String
      },
      hours: { 
        type: String, 
        optional: true 
      },
      imageSrc: {
        type: String,
        optional: true // Make optional if some restaurants might not have an image initially
      }
    });
    // Attach the schema to the collection.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  // Helper methods for this collection can be defined here
}

/**
 * The singleton instance of the RestaurantsCollection.
 * @type {RestaurantsCollection}
 */

export const Restaurants = new RestaurantsCollection();
