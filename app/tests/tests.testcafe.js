import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { aboutUs } from './aboutus.page'
import { navBar } from './navbar.component';
import { addRestaurantPage } from './addrestaurant.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test the About Us page', async (testController) => {
/*  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);*/
  await navBar.gotoAboutUsPage(testController); // Ensure this method is added to the NavBar class
  await aboutUs.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});


// Add a new test for the Add Restaurant page
test.only('Test the Add Restaurant page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await testController.navigateTo('/add-restaurant'); // Direct navigation or update navBar class to include a method for this
  await addRestaurantPage.isDisplayed(testController);
  await addRestaurantPage.fillForm(testController, {
    name: 'New Restaurant',
    hours: '10:00 AM - 6:00 PM',
    address: '123 Main St',
    imageSrc: 'http://example.com/image.png',
    description: 'Great new place to try!'
  });
});


