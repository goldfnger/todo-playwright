import { test, expect } from "@playwright/test";
import User from "../models/User";
import SignupPage from "../pages/SignupPage";
import TodoPage from "../pages/TodoPage";
import NewTodoPage from "../pages/NewTodoPage";

test("should be able to add a new todo", async ({ page, request, context }) => {
    const user = new User();
    const signupPage = new SignupPage();
    const newTodoPage = new NewTodoPage();
    const todoPage = new TodoPage();

    await signupPage.signupByAPI(request, user, context);

    await newTodoPage.load(page);
    await newTodoPage.addTodo(page, 'Learn Playwright');

    await todoPage.getTodoItem(page);
    const todoItem = await todoPage.getTodoItem(page);

    expect(await todoItem.innerText()).toEqual('Learn Playwright');
});

test("should be able to delete a todo", async ({ page, request, context }) => {
    const user = new User();
    const signupPage = new SignupPage();
    const todoPage = new TodoPage();
    const newTodoPage = new NewTodoPage();

    await signupPage.signupByAPI(request, user, context);
    await newTodoPage.addTodoAPI(request, user);

    await todoPage.load(page);
    await todoPage.deleteTodo(page);
    const noTodosMessage = await todoPage.getNoTodosMessage(page);
    await expect(noTodosMessage).toBeVisible();
});