//selector

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-todo");

//Event listeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletechecked);
// todoList.addEventListener("click", completed);
filterOptions.addEventListener("click", filterTodo);

//Function

function addTodo(event) {
  //prevent from FORM submission
  event.preventDefault();

  //creatin todo div

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create li

  const newTodo = document.createElement("li");
  //Takeing value from input
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //ADD TODO TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);

  //check mark button
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  checkButton.classList.add("check-btn");
  todoDiv.appendChild(checkButton);

  //check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append to list
  todoList.appendChild(todoDiv);

  //clear todoinput value
  todoInput.value = "";
}

function deletechecked(e) {
  const item = e.target;

  //delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check mark
  if (item.classList[0] === "check-btn");
  const todo = item.parentElement;
  todo.classList.toggle("checked");
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //Check-- Do I already have anything in there?
  let todos;
  if(localStorage.getItem("todos") === null) {
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
  //Check-- Do I already have anything in there?
  let todos;
  if(localStorage.getItem("todos") === null) {
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li

  const newTodo = document.createElement("li");
  //Takeing value from input
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //check mark button
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  checkButton.classList.add("check-btn");
  todoDiv.appendChild(checkButton);

  //check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append to list
  todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if(localStorage.getItem("todos") === null) {
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//splice is use  to remove any elements from arry. 

