'use strict'

// Get todos from localStorage
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos');
    
    try {
        return todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
        return [];
    }
};

// Save new todos to local storage
const saveTodos = (todos) => {
    const todoString = JSON.stringify(todos);
    localStorage.setItem('todos', todoString);
};

// Remove todo with remove button
const removeTodo = (id) => {
    const todoIndex = todos.findIndex( (todo) => todo.id === id);
    todos.splice(todoIndex, 1);
};

// change completed value based off checkbox
const toggleTodo = (id) => {
    const todo = todos.find( (todo) => todo.id === id);

    if (todo) {
        todo.completed = !todo.completed;
    }
};

// Generate todoDom element
const generateDOMElement = (todo) => {
    // Setup div and elements for each todo
    const todoEl = document.createElement('div');
    const todoCheck = document.createElement('input');
    const todoText = document.createElement('span');
    const todoRemove = document.createElement('button');

    //setup checkbox 
    todoCheck.setAttribute('type', 'checkbox');
    todoCheck.checked = todo.completed;
    // read checked change and update the individual todo with true or false
    todoCheck.addEventListener('change', function () {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filter);
    });
    todoEl.appendChild(todoCheck);

    //setup text 
    todoText.textContent = todo.text;
    todoEl.appendChild(todoText);

    // remove button content
    todoRemove.textContent = 'X';
    todoRemove.addEventListener('click', () => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filter);
    });
    todoEl.appendChild(todoRemove);

    return todoEl;
};

// Todo summary for heading
const generateSummaryDOM = (todos) => {
    //filter todos for false for heading text
    const incomplete = todos.filter( (todo) => !todo.completed );

    //render heading based off how many todos we have not completed
    const head = document.querySelector('#heading');
    head.textContent = `You have ${incomplete.length} todos not completed`;
};


// Render based of filtered todoList
const renderTodos = (todoList, filters) => {

    //filter the list based on search query
    const filteredTodo = todoList.filter( (todo) => {
        //created constants for our filter and completed todos
        const todoFilterMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const completedTodoMatch = !filter.hideCompleted || !todo.completed;

        return todoFilterMatch && completedTodoMatch;
    });

    //clear div
    document.querySelector('#todoList').innerHTML = '';
    
    // todo heading
    generateSummaryDOM(filteredTodo);

    //render filtered list in realtime to DOM from search query
    filteredTodo.forEach( (todo) => {
        document.querySelector('#todoList').appendChild(generateDOMElement(todo));
    });
};