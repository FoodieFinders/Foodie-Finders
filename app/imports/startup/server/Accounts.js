import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

const createUser = (email, password, role, profile) => {
  console.log(`Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profile: profile  // Storing additional profile data
  });

  if (role) {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, role);
  }
};

if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role, firstName, lastName, title, picture }) => {
      const profile = { firstName, lastName, title, picture };  // Constructing the profile object
      createUser(email, password, role, profile);
    });
  } else {
    console.log('Cannot initialize the database! Please invoke meteor with a settings file.');
  }
}

Accounts.onCreateUser((options, user) => {
  if (options.profile) {
    user.profile = options.profile;  // Ensuring profile is attached to the user document
  }

  // Attach additional properties here if needed

  return user;
});


/*
const createUser = (email, password, role) => {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
};

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
*/
