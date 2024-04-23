import { Selector, t } from 'testcafe';

class AddRestaurantPage {
  constructor() {
    this.pageId = '#add-restaurant-page';  
    this.pageSelector = Selector(this.pageId);
    this.nameInput = Selector('input[name="name"]');
    this.hoursSelect = Selector('select[name="hours"]');
    this.addressInput = Selector('input[name="address"]');
    this.imageInput = Selector('input[name="imageSrc"]');
    this.descriptionInput = Selector('textarea[name="description"]');
    this.submitButton = Selector('input[type="submit"]');
  }

  /** Asserts that the Add Restaurant page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fill the form with data and submit it. */
  async fillForm(testController, { name, hours, address, imageSrc, description }) {
    await testController
      .typeText(this.nameInput, name)
      .click(this.hoursSelect)
      .click(this.hoursSelect.find('option').withText(hours))
      .typeText(this.addressInput, address)
      .typeText(this.imageInput, imageSrc)
      .typeText(this.descriptionInput, description)
      .click(this.submitButton);
  }
}

export const addRestaurantPage = new AddRestaurantPage();
