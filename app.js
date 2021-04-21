//? Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//*shift alt down arrow to duplicate line of script so COOL

//*Event listener
document.addEventListener('DOMContentLoaded', getTodos); 
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//!todo" {FUNCTIONS}
function addTodo(e) {
  //prevent from submitting -refreshing
  e.preventDefault();
  //Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; //! instead of give it HEY replace it with the const todoInput.value
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //!Add todo to local storage
  saveLocalTodos(todoInput.value);
  //check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //APPEND TO LIST
  todoList.appendChild(todoDiv);
  //*clear todoInput value
  todoInput.value = "";
}
function deleteCheck(e) {
  //console.log(e.target);//! to check if it's working
  const item = e.target;
  //*delete TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement; //! The purpose of defining a variable is to tell the computer exactly what the "todo" mean and once the computer get the meaning and this case it means the parent element and when we run the item.remove since we define it as the parent element it get rid of the whole thing. basically create the
    todo.classList.add("fall"); //* this is to add the class and add animation via css
    removeLocalTodos(todo); 
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //*check Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    //! we use for each because  we using a nodelist so we can have access with all individual todo
    switch (e.target.value) {
      case "all": //!since we have them already showed
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          //!make sure to only check the todo that are completed
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          //? the exclamation point mean if it doesn't have it...THE BREAK FIX EVERYThiNG
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //! check---hey Do i alreay have thing in there
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos(){
    //console.log('hello');
    let todos; 
    //*check -- Hey do I already have thing in there 
    if (localStorage.getItem("todos") === null) {
        todos = []; 
    }else {
        todos = JSON.parse(localStorage.getItem("todos")); 
    }
    todos.forEach(function(todo){
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; //! instead of give it HEY replace it with the const todoInput.value
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
  
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
  
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    }); 
}
function removeLocalTodos(todo) {
    let todos; 
    //*check -- Hey do I already have thing in there 
    if (localStorage.getItem("todos") === null) {
        todos = []; 
    }else {
        todos = JSON.parse(localStorage.getItem("todos")); 
    }
    const todoIndex = todo.children[0].innerText; 
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));  
}

//localStorage.clear(); 

 //?localStorage.clear(); //!how you clear the storage 
//*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//*null stands for it doesn't exist if local storage doesn't exist create an empty array of todo for it that's what the top row means under function

//!todo" {FUNCTIONS}
// function addTodo(e) {
//     //* to check if your function is added to the event listener it's wise to put a console.log to check
//     e.preventDefault(); //! the prevent default stop the browser from doing what it normally do which is refreshing itself
//     console.log('Mic-check');
// }
//!todo" {FUNCTIONS}
// function addTodo(e) {
//to check if it's working
//     console.log("Mic-check");

//*  completedButton.innerText = 'IDGAF' //! for text we use inner.text for HTML new Icon changess we use inner.html
