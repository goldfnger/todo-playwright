import { test, expect } from '@playwright/test'

test("should be able to register to our application", async ({ page }) => {
    await page.goto('https://todo.qacart.com/signup');
    await page.type('[data-testid=first-name]', 'QAcart');
    await page.type('[data-testid=last-name]', 'Awesome!');
    await page.type('[data-testid=email]', 'test1@example.com');
    await page.type('[data-testid=password]', 'Test1234');
    await page.type('[data-testid=confirm-password]', 'Test1234');
    await page.click('[data-testid=submit]');
    const welcomeMessage = page.locator('[data-testid=submit]');
    await expect(welcomeMessage).toBeVisible();
});