import { Selector } from 'testcafe';

class EditUserPage {
  constructor() {
    this.pageId = '#edit-user-page';
    this.pageSelector = Selector(this.pageId);
    this.firstNameInput = Selector('input[name="firstName"]');
    this.lastNameInput = Selector('input[name="lastName"]');
    this.pictureInput = Selector('input[name="picture"]');
    this.submitButton = Selector('input[type="submit"]');
  }

  /** Check if the Edit User page is displayed */
  async isDisplayed(testController) {
    await testController.wait(5000).expect(this.pageSelector.exists).ok();
  }

  /** Fill the form on the Edit User page */
  async fillForm(testController, { firstName, lastName, title, picture }) {
    if (firstName) await testController.typeText(this.firstNameInput, firstName, { replace: true });
    if (lastName) await testController.typeText(this.lastNameInput, lastName, { replace: true });
    if (title) {
      await testController
        .click(this.titleSelect)
        .click(this.titleSelect.find('option').withText(title));
    }
    if (picture) await testController.typeText(this.pictureInput, picture, { replace: true });
    await testController.click(this.submitButton);
  }
}

export const editUserPage = new EditUserPage();
