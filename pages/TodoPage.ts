import { Page } from "@playwright/test";

export default class TodoPage {
    private get welcomeMessage() {
        return '[data-testid=welcome]'
    }

    getWelcomeMessageElement(page: Page) {
        return page.locator(this.welcomeMessage);
    }
}