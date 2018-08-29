const todos = getSavedTodos();

// filter object that will hold users search term
const filter = {
    searchText: '',
    hideCompleted: false
};

renderTodos(todos, filter); 

// listen for search filter text
document.querySelector('#searchText').addEventListener('input', (e) => {
    filter.searchText = e.target.value;
    renderTodos(todos, filter);
});

// submit form behavior
document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault(); //prevent the page from reloading
    if (e.target.elements.newTodo.value.length > 0) {
        todos.push({
            id: uuidv4(),
            text: e.target.elements.newTodo.value,
            completed: false
        });
        
        //clear input field after we submit todo
        e.target.elements.newTodo.value = '';
    } 

    // update the todos list and push to local storage
    saveTodos(todos);
    renderTodos(todos, filter);
    
});

// listener to hide completed items
document.querySelector('#hideCompleted').addEventListener('change', (e) => {
    filter.hideCompleted = e.target.checked;
    renderTodos(todos, filter);
});

