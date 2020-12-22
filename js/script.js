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
    } else {
      alert('Нельзя добавлять пустое дело!')
    }
  }

  addDataToLocalStorage() {
    localStorage.setItem('todoData', JSON.stringify([...this.todoData])); // refresh localStorage item
  }

  deleteTodo(todo) {
    todo.remove(); // remove task from HTML-document and tasks list
    this.todoData.delete(todo.key);
    this.addDataToLocalStorage(); // refresh localStorage
  }

  completeTodo(todo) {
    this.todoData.forEach(item => {
      if (item.key === todo.key) {
        item.completed = !item.completed; // change task's status
      }
    });
    this.addDataToLocalStorage(); // refresh localStorage
    this.render();
  }

  handlerEvents() {
    this.todoContainer.addEventListener('click', (e) => {
      const todoItem = e.target.closest('.todo-item');
      if (e.target.matches('.todo-remove')) {
        this.deleteTodo(todoItem);
      } else if (e.target.matches('.todo-complete')) {
        this.completeTodo(todoItem);
      }
    });
  }

  render() {
    // this.todoData = JSON.parse(localStorage.getItem('todoData'));
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(item => this.createElement(item));
    this.addDataToLocalStorage();
  }

  createElement(item) {
    const li = document.createElement('li');

    li.classList.add('todo-item');
    li.key = item.key;
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
  }

  generateUniqueKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  init() {
    this.render();
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.handlerEvents();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();