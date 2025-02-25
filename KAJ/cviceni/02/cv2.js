import { createHtmlWithCreateElement, createHtmlWithStrings } from "./render.js";


/* Predefined initial state */
const initialState = {
    todos: [
        { text: 'Hi', completed: true  },
        { text: 'Hello', completed: false },
        { text: 'Hi there!', completed: true },
    ],
    filter: 'all'
};


//
// 1. Prototype expansion
//
// Add method on Object prototype. This method will modify the object
// and add current timestamp to it. All created objects inherit from
// Object prototype and will have this method.
Object.prototype.addTimestamp = function () {
    this.timestamp = Date.now();
}
// You should generally avoid modifying prototypes of basic JavaScript
// objects, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// But it can be sometimes useful, for example, if we want to polyfill
// some language feature to older browsers.


//
// 2. Class containing state
//
var State = function (initialTodos, initialFilter) {
    this._todos = initialTodos;
    this._filter = initialFilter;
}

State.prototype.addTodo = function (todo) {
    this._todos.push(todo);
}

State.prototype.setFilter = function (filter) {
    this._filter = filter;
}

State.prototype.getTodos = function () {
    return this._todos.filter(function (todo) {
        console.log(this);
        if (this._filter === 'all') {
            return true;
        } else if (this._filter === 'completed') {
            return todo.completed === true;
        } else if (this._filter === 'active') {
            return todo.completed === false;
        }
    }.bind(this));
    // The bind() method creates a new function that, when called, has
    // its this keyword set to the provided value.
}

var state = new State(initialState.todos, initialState.filter);
var todoListEl = document.querySelector('.todo-list');
createHtmlWithStrings(state.getTodos(), todoListEl);


//
// 4. Handle main input
//
var inputEl = document.querySelector('.new-todo');
inputEl.addEventListener('keyup', function (event) {
    // EXCERCISE: inspect the event object in dev console

    if (event.key !== "Enter") {
        return;
    }

    // Update app state
    var todo = {
        text: inputEl.value,
        completed: false
    };
    state.addTodo(todo);

    // Update html
    inputEl.value = '';
    createHtmlWithStrings(state.getTodos(), todoListEl);
});


//
// 5. Handle filters
//
var filters = {
    all: document.querySelector('#filter-all'),
    active: document.querySelector('#filter-active'),
    completed: document.querySelector('#filter-completed')
};

for (var filterName in filters) {
    // Without hasOwnProperty check, we would also be iterating over addTimestamp method
    if (filters.hasOwnProperty(filterName)) {
        var filterEl = filters[filterName];

        // This is IIFE (immediately-invoked function expression).
        // We need to capture the filterName value. Otherwise, we would
        // be referencing (after some time when the user clicks and the
        // listener function is called) to the last value of this iteration,
        // not the value of current iteration - which is what we want.
        (function (capturedFilterName) {
            filterEl.addEventListener('click', function (e) {
                filtersClick(capturedFilterName);
            });
        }(filterName));
    }
}

function filtersClick (newFilterType) {
    // Another approach to rendering the view, manually update html
    // nodes that need to be updated instead of rerendering the whole
    // part of the UI, as we did in createHtmlWithStrings or in
    // createHtmlWithCreateElement functions.

    // Remove 'selected' class on all filter buttons
    for (var key in filters) {
        if (filters.hasOwnProperty(key)) {
            var filter = filters[key];
            filter.classList.remove('selected');
        }
    }

    // Add 'selected' class to clicked filter button
    filters[newFilterType].classList.add('selected');

    // Update state
    state.setFilter(newFilterType);

    // Render todos view
    createHtmlWithCreateElement(state.getTodos(), todoListEl);
}
