//To be deleted

import { Meteor } from 'meteor/meteor';
import { TopPicks } from '/imports/api/toppicks/TopPicks'; // Adjust path as necessary

Meteor.startup(() => {
  // Example data for top picks
  const topPicksData = [
    {
      name: "Gourmet Burger",
      rating: 5,
      hours: "Today's hours: 10:00AM - 8:00PM",
      imageSrc: "/images/gourmet-burger.jpg",
    },
    {
      name: "Veggie Pizza",
      rating: 5,
      hours: "Today's hours: 11:00AM - 9:00PM",
      imageSrc: "/images/veggie-pizza.jpg",
    },
    {
      name: "Sushi Platter",
      rating: 4,
      hours: "Today's hours: 12:00PM - 10:00PM",
      imageSrc: "/images/sushi-platter.jpg",
    },
    // Add more items as needed
  ];

  // Only insert if the collection is empty
  Meteor.startup(() => {
    console.log("Starting to insert initial top picks data.");
    if (TopPicks.find().count() === 0) {
      topPicksData.forEach((pick) => {
        TopPicks.insert(pick);
        console.log(`Inserted: ${pick.name}`);
      });
    } else {
      console.log("TopPicks collection already has data.");
    }
  });


