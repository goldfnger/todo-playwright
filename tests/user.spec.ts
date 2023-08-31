import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

test("should be able to register to our application", async ({ page }) => {
    await page.goto('/signup');
    await page.type('[data-testid=first-name]', faker.person.firstName());
    await page.type('[data-testid=last-name]', faker.person.lastName());
    await page.type('[data-testid=email]', faker.internet.email());
    await page.type('[data-testid=password]', 'Test1234');
    await page.type('[data-testid=confirm-password]', 'Test1234');
    await page.click('[data-testid=submit]');
    const welcomeMessage = page.locator('[data-testid=welcome]');
    await expect(welcomeMessage).toBeVisible();
});