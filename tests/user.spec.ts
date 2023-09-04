import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import User from '../models/User';
test("should be able to register to our application", async ({ page }) => {
    const user = new User(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        'Test1234');

    await page.goto('/signup');
    await page.type('[data-testid=first-name]', user.getFirstName());
    await page.type('[data-testid=last-name]', user.getLastName());
    await page.type('[data-testid=email]', user.getEmail());
    await page.type('[data-testid=password]', user.getPassword());
    await page.type('[data-testid=confirm-password]', user.getPassword());
    await page.click('[data-testid=submit]');
    const welcomeMessage = page.locator('[data-testid=welcome]');
    await expect(welcomeMessage).toBeVisible();
});