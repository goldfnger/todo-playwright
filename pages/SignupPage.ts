import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import UserAPI from "../APIs/UserAPI";
import config from "../playwright.config";

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

    async signupByAPI(
        request: APIRequestContext,
        user: User,
        context: BrowserContext) {
        const response = await new UserAPI().signup(request, user);

        const responseBody = await response.json();
        const accessToken = responseBody.access_token;
        const firstName = responseBody.firstName;
        const userID = responseBody.userID;

        user.setAccessToken(accessToken);
        user.setUserID(userID);

        await context.addCookies([
            {
                name: 'access_token',
                value: accessToken,
                url: config.use?.baseURL
            },
            {
                name: 'firstName',
                value: firstName,
                url: config.use?.baseURL
            },
            {
                name: 'userID',
                value: userID,
                url: config.use?.baseURL
            }
        ]);
    }
}