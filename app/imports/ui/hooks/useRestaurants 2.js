import { useTracker } from 'meteor/react-meteor-data';
import { Restaurants } from '/imports/api/restaurants/Restaurants';
import { Roles } from 'meteor/alanning:roles';

const useRestaurants = () => {
  const user = useTracker(() => Meteor.user());
  const isAdmin = useTracker(() => Roles.userIsInRole(Meteor.userId(), 'admin'), [user]);

  useTracker(() => {
    if (isAdmin) {
      Meteor.subscribe('restaurants.admin');
    } else {
      Meteor.subscribe('restaurants.user');
    }
  }, [isAdmin]);

  const restaurants = useTracker(() =>
      Restaurants.collection.find({}).fetch(),
    []
  );

  return restaurants;
};
