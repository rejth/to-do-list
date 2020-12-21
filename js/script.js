'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('todoData')));
    this.todoContainer= document.querySelector('.todo-container');
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

  deleteTodo(item, todo) {
    // remove task from HTML-document and tasks list
    todo.remove();
    this.todoData.delete(item.key);
    this.addDataToLocalStorage(); // refresh localStorage
  }

  completeTodo(item) {
    // change task's status
    item.completed = !item.completed;
    this.addDataToLocalStorage(); // refresh localStorage
    this.render();
  }

  handlerEvents(item, todo) {
    this.todoContainer.addEventListener('click', (e) => {
      if (e.target.matches('.todo-remove')) {
        this.deleteTodo(item, todo);
      } else if (e.target.matches('.todo-complete')) {
        this.completeTodo(item);
      }
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

    this.handlerEvents(item, li);
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