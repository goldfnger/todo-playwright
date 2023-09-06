import User from "../models/User";
import TodoAPI from "../APIs/TodoAPI";
import { Page, APIRequestContext } from "@playwright/test";

export default class NewTodoPage {
    private get newTodoInput() {
        return '[data-testid=new-todo]'
    }

    private get newTodoSubmit() {
        return '[data-testid=submit-newTask]'
    }

    async load(page: Page) {
        await page.goto('/todo/new');
    }

    async addTodo(page: Page, task: string) {
        await page.type(this.newTodoInput, task);
        await page.click(this.newTodoSubmit);
    }

    async addTodoAPI(request: APIRequestContext, user: User) {
        await new TodoAPI().addTodo(request, user);
    }
}