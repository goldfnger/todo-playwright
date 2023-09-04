import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker'
import User from "../models/User";
test("should be able to add a new todo", async ({ page, request, context }) => {
    const user = new User(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        'Test1234');

    const response = await request.post('/api/v1/users/register', {
        data: {
            email: user.getEmail(),
            password: user.getPassword(),
            firstName: user.getFirstName(),
            lastName: user.getLastName()
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

test("should be able to delete a todo", async ({ page, request, context }) => {
    const user = new User(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        'Test1234');
        
    const response = await request.post('/api/v1/users/register', {
        data: {
            email: user.getEmail(),
            password: user.getPassword(),
            firstName: user.getFirstName(),
            lastName: user.getLastName()
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

    await request.post('/api/v1/tasks', {
        data: {
            isCompleted: false,
            item: "Learn Playwright",
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    await page.goto('/todo');
    await page.click('[data-testid=delete]');
    const noTodosMessage = page.locator('[data-testid=no-todos]');
    await expect(noTodosMessage).toBeVisible();
});