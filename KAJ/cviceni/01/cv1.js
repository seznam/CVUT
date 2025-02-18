import { createHtmlWithCreateElement, createHtmlWithStrings } from "./render.js";

console.log('Module cv1.js is loaded.');

const state = {
    todos: [
        { text: 'Hi', completed: true },
        { text: 'Hello', completed: false },
        { text: 'Hi there!', completed: true },
    ],
    filter: 'all'
};

const todoListEl = document.querySelector('.todo-list');
createHtmlWithCreateElement(state.todos, todoListEl);
// createHtmlWithStrings(state.todos, todoListEl);