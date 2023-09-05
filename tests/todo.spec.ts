import { test, expect } from "@playwright/test";
import User from "../models/User";
import UserAPI from "../APIs/UserAPI";
import TodoAPI from "../APIs/TodoAPI";
import SignupPage from "../pages/SignupPage";
import TodoPage from "../pages/TodoPage";

test("should be able to add a new todo", async ({ page, request, context }) => {
    const user = new User();
    const signupPage = new SignupPage();

    await signupPage.signupByAPI(request, user, context);

    await page.goto('/todo');
    await page.click('[data-testid=add]');
    await page.type('[data-testid=new-todo]', 'Learn Playwright');
    await page.click('[data-testid=submit-newTask]');

    const todoItem = page.locator('[data-testid=todo-item]');
    expect(await todoItem.innerText()).toEqual('Learn Playwright');
});

test("should be able to delete a todo", async ({ page, request, context }) => {
    const user = new User();
    const signupPage = new SignupPage();
    const todoPage = new TodoPage();

    await signupPage.signupByAPI(request, user, context);
    await new TodoAPI().addTodo(request, user);

    await todoPage.load(page);
    await todoPage.deleteTodo(page);
    const noTodosMessage = await todoPage.getNoTodosMessage(page);
    await expect(noTodosMessage).toBeVisible();
});