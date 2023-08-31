import { test, expect } from "@playwright/test";

test("should be able to add a new todo", async ({ page }) => {
    await page.goto('https://todo.qacart.com/signup');
    await page.type('[data-testid=first-name]', 'QAcart');
    await page.type('[data-testid=last-name]', 'Awesome!');
    await page.type('[data-testid=email]', 'test222@example.com');
    await page.type('[data-testid=password]', 'Test1234');
    await page.type('[data-testid=confirm-password]', 'Test1234');
    await page.click('[data-testid=submit]');

    const welcomeMessage = page.locator('[data-testid=welcome]');
    await expect(welcomeMessage).toBeVisible();

    await page.click('[data-testid=add]');
    await page.type('[data-testid=new-todo]', 'Learn Playwright');
    await page.click('[data-testid=submit-newTask]');

    const todoItem = page.locator('[data-testid=todo-item]');
    expect(await todoItem.innerText()).toEqual('Learn Playwright');
});
