'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInputValue = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      completedList = document.querySelector('.todo-completed');

const toDoData = [];

const render = function() {
  todoList.textContent = '';
  completedList.textContent = '';

  toDoData.forEach(function(item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML =
      `<span class="text-todo">${item.value}</span>` +
      '<div class="todo-buttons">' +
				'<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      completedList.append(li);
    } else {
      todoList.append(li);
    }

    const removeButton = li.querySelector('.todo-remove'),
          markAsDoneButton = li.querySelector('.todo-complete');

    markAsDoneButton.addEventListener('click', function() {
      item.completed = !item.completed;
      render();
    });

    removeButton.addEventListener('click', function() {
      li.remove();
    });
  });
};

todoControl.addEventListener('submit', function(e) {
  e.preventDefault();

  const newToDo = {
    value: headerInputValue.value,
    completed: false
  };

  toDoData.push(newToDo);

  render();
});

render();