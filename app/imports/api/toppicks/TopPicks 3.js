import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const TopPicks = new Mongo.Collection('topPicks');

TopPicks.schema = new SimpleSchema({
  name: String,
  rating: String,
  hours: String,
  imageSrc: String,
});

TopPicks.attachSchema(TopPicks.schema);

if (Meteor.isServer) {
  Meteor.publish('topPicks', function () {
    const data = TopPicks.find();
    console.log(`Publishing ${data.count()} top picks`);
    return data;
  });

  // Startup data insertion
  Meteor.startup(() => {
    const topPicksData = [
      // Your data objects here
    ];

    if (TopPicks.find().count() === 0) {
      topPicksData.forEach(pick => TopPicks.insert(pick));
    }
  });
}
