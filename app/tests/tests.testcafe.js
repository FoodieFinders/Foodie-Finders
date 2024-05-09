import { Selector } from 'testcafe';
import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { aboutUs } from './aboutus.page';
import { navBar } from './navbar.component';
import { addRestaurantPage } from './addrestaurant.page';
import { editUserPage } from './edituserpage.page';
import { leaveReview } from './leavereview.page';
import { restaurantPage } from './restaurantpage.page';
import { topPicks } from './toppicks.page';
/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('Foodie Finder localhost test with default db')
  .page('http://localhost:3000').beforeEach(async t => {
    await t.resizeWindow(1280, 800);
  });

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test the About Us page', async (testController) => {
/*  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password); */
  await navBar.gotoAboutUsPage(testController); // Ensure this method is added to the NavBar class
  await aboutUs.isDisplayed(testController);
});

test('Test the Top Picks page', async (testController) => {
/*  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password); */
  await navBar.gotoTopPicksPage(testController); // Ensure this method is added to the NavBar class
  await topPicks.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// Add a new test for the Add Restaurant page
test('Test the Add Restaurant page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await testController.navigateTo('/add-restaurant'); // Direct navigation or update navBar class to include a method for this
  await addRestaurantPage.isDisplayed(testController);
  await addRestaurantPage.fillForm(testController, {
    name: 'Test Restaurant',
    hours: '10:00 AM - 6:00 PM',
    address: '123 Main St',
    imageSrc: 'https://example.com/image.png',
    description: 'Great new place to try!',
  });
});

test('Edit user information', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await testController.click('#navbar-current-user');
  await testController.click('#navbar-user-profile');
  await testController.click('#edit-profile-button');
  await editUserPage.isDisplayed(testController);
  await editUserPage.fillForm(testController, {
    firstName: 'John',
    lastName: 'Doe',
    picture: 'https://example.com/johndoe.png',
  });
  const sweetAlert = Selector('.swal-text');
  await testController.expect(sweetAlert.exists).ok();

  // Now you can interact with the SweetAlert, for example, clicking the OK button
  const okButton = Selector('.swal-button');
  await testController.click(okButton);

  const updateProfileButton = Selector('#update-profile-button');
  await testController.click(updateProfileButton);

  // Wait for the SweetAlert to appear

});

test('Testing entering restaurant page', async (testController) => {

  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);

  await testController.navigateTo('/');
  const firstRestaurant = Selector('.top-pick-image');
  await testController.click(firstRestaurant);
  await restaurantPage.isDisplayed(testController);

});

test('Testing leaving a review', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);

  await testController.navigateTo('/');
  const firstRestaurant = Selector('.top-pick-image');
  await testController.click(firstRestaurant);
  await restaurantPage.isDisplayed(testController);

  const firstReview = Selector('.review-link');
  await testController.click(firstReview);

  await leaveReview.isDisplayed(testController);
  await leaveReview.fillForm(testController, {
    comment: 'this food was decent',
  });
  const sweetAlert = Selector('.swal-text');
  await testController.expect(sweetAlert.exists).ok();

  // Now you can interact with the SweetAlert, for example, clicking the OK button
  const okButton = Selector('.swal-button');
  await testController.click(okButton);

});
