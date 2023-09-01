import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker'

test("should be able to add a new todo", async ({ page, request, context }) => {
    const response = await request.post('/api/v1/users/register', {
        data: {
            email: faker.internet.email(),
            password: "Test1234",
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName()
        },
    });

    const responseBody = await response.json();
    const accessToken = responseBody.access_token;
    const firstName = responseBody.firstName;
    const userID = responseBody.userID;

    await context.addCookies([
        {
            name: 'access_token',
            value: accessToken,
            url: 'https://todo.qacart.com'
        },
        {
            name: 'firstName',
            value: firstName,
            url: 'https://todo.qacart.com'
        },
        {
            name: 'userID',
            value: userID,
            url: 'https://todo.qacart.com'
        }
    ]);

    // expect(response).toBeOK();
    await page.goto('/todo');
    await page.click('[data-testid=add]');
    await page.type('[data-testid=new-todo]', 'Learn Playwright');
    await page.click('[data-testid=submit-newTask]');

    const todoItem = page.locator('[data-testid=todo-item]');
    expect(await todoItem.innerText()).toEqual('Learn Playwright');
});

test("should be able to delete a todo", async ({ page }) => {
    await page.goto('/signup');
    await page.type('[data-testid=first-name]', faker.person.firstName());
    await page.type('[data-testid=last-name]', faker.person.lastName());
    await page.type('[data-testid=email]', faker.internet.email());
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

    await page.click('[data-testid=delete]');

    const noTodosMessage = page.locator('[data-testid=no-todos]');
    await expect(noTodosMessage).toBeVisible();

});