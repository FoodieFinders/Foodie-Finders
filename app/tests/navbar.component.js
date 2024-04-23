import { Selector } from 'testcafe';

/*class NavBar {


  async gotoSignInPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }*/

class NavBar {
  constructor() {
    this.toggler = Selector('button.navbar-toggler');
    this.loginDropdown = Selector('#login-dropdown');
  }

  async ensureMenuVisible(testController) {
    if (await this.toggler.visible) {
      await testController.click(this.toggler);
    }
  }

  async gotoSignInPage(testController) {
    await this.ensureLogout(testController);
    await this.ensureMenuVisible(testController);
    await testController.click(this.loginDropdown);
    await testController.click('#signin-button');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }


  /** Pull down login menu, go to sign up page. */
  async gotoSignUpPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }


  async gotoAboutUsPage(testController) {
    await testController.click('#navbar-about-us'); // Ensure the correct selector for the About Us link
  }
  
}


export const navBar = new NavBar();
