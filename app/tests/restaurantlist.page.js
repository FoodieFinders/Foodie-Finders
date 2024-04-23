import { Selector } from 'testcafe';

class RestaurantlistPage {
  constructor() {
    this.pageId = '#restaurant-list-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const restaurantlistPage = new RestaurantlistPage();
