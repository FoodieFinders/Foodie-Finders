import { Selector } from 'testcafe';

class LeaveReview {
  constructor() {
    this.pageId = '#leave-review';
    this.pageSelector = Selector(this.pageId);
    this.starSelector = Selector('.star-4');
    this.commentSelector = Selector('textarea[name="comment"]');
    this.submitButton = Selector('input[type="submit"]');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async fillForm(testController, { comment }) {
    await testController.click(this.starSelector);
    if (comment) await testController.typeText(this.commentSelector, comment, { replace: true });
    await testController.click(this.submitButton);
  }
}

export const leaveReview = new LeaveReview();
