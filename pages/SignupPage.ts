import { Page } from "@playwright/test";
import User from "../models/User";

export default class SignupPage {
    private get firstNameInput() {
        return '[data-testid=first-name]';
    }

    private get lastNameInput() {
        return '[data-testid=last-name]';
    }

    private get emailInput() {
        return '[data-testid=email]';
    }

    private get passwordInput() {
        return '[data-testid=password]';
    }

    private get confirmPasswordInput() {
        return '[data-testid=confirm-password]';
    }

    private get submitInput() {
        return '[data-testid=submit]';
    }

    async load(page: Page) {
        await page.goto('/signup');
    }

    async signup(page: Page, user: User) {
        await page.type(this.firstNameInput, user.getFirstName());
        await page.type(this.lastNameInput, user.getLastName());
        await page.type(this.emailInput, user.getEmail());
        await page.type(this.passwordInput, user.getPassword());
        await page.type(this.confirmPasswordInput, user.getPassword());
        await page.click(this.submitInput);
    }
}