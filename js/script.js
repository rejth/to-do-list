'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInputValue = document.querySelector('.header-input'),
      createtTodoButton = document.querySelector('.header-button'),
      todoList = document.querySelector('.todo-list'),
      completedList = document.querySelector('.todo-completed');

// to-do list
let todoData = [];

const render = function() {
  // check the first init of document
  todoData = localStorage.getItem('todoData') === null ? todoData : JSON.parse(localStorage.todoData);

  todoList.textContent = '';
  completedList.textContent = '';

  todoData.forEach(function(item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML =
      `<span class="text-todo">${item.value}</span>` +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      completedList.append(li); // add to completed tasks div
    } else {
      todoList.append(li); // add to to-do tasks div
    }

    const removeButton = li.querySelector('.todo-remove');
    const markAsDoneButton = li.querySelector('.todo-complete');

    // change task's status
    markAsDoneButton.addEventListener('click', function() {
      item.completed = !item.completed;
      localStorage.todoData = JSON.stringify(todoData); // refresh localStorage
      render();
    });

    // remove task from HTML-document and tasks list
    removeButton.addEventListener('click', function() {
      li.remove();
      todoData = todoData.filter(element => element !== item);
      localStorage.todoData = JSON.stringify(todoData); // refresh localStorage
    });
  });
};

todoControl.addEventListener('submit', function(e) {
  e.preventDefault();

  // not empty input validation
  if (headerInputValue.value !== '') {

    // create new task
    const newToDo = {
      value: headerInputValue.value,
      completed: false
    };

    // clean input
    headerInputValue.value = '';

    todoData.push(newToDo);
    localStorage.todoData = JSON.stringify(todoData); // refresh localStorage

    render();
  }
});

render();