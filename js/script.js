'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('todoData')));
  }

  addTodo(e) {
    e.preventDefault();

    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateUniqueKey()
      };

      this.todoData.set(newTodo.key, newTodo);

      this.input.value = '';

      this.render();
    }
  }

  addDataToLocalStorage() {
    localStorage.setItem('todoData', JSON.stringify([...this.todoData])); // refresh localStorage item
  }

  deleteTodo(item, button, todo) {
    // remove task from HTML-document and tasks list
    button.addEventListener('click', () => {
      todo.remove();
      this.todoData.delete(item.key);
      this.addDataToLocalStorage(); // refresh localStorage
    });
  }

  completeTodo(item, button) {
    // change task's status
    button.addEventListener('click', () => {
      item.completed = !item.completed;
      this.addDataToLocalStorage(); // refresh localStorage
      this.render();
    });
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';

    this.todoData.forEach(item => this.createElement(item));
    this.addDataToLocalStorage();
  }

  createElement(item) {
    const li = document.createElement('li');

    li.classList.add('todo-item');
    li.insertAdjacentHTML('beforeend',
      `<span class="text-todo">${item.value}</span>` +
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
      '</div>');

    if (item.completed) {
      this.todoCompleted.append(li); // add to completed tasks div
    } else {
      this.todoList.append(li); // add to to-do tasks div
    }

    const removeButton = li.querySelector('.todo-remove');
    const markAsDoneButton = li.querySelector('.todo-complete');

    this.deleteTodo(item, removeButton, li); // deleteded task listener

    this.completeTodo(item, markAsDoneButton); // changed task's status listener
  }

  generateUniqueKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();