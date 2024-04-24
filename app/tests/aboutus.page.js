import { Selector } from 'testcafe';

class AboutUs {
  constructor() {
    this.pageId = '#about-us';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const aboutUs = new AboutUs();
