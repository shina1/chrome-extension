const todoForm = document.querySelector('#todo-form')
const todoInput = todoForm.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const editTodoForm = document.querySelector('#edit-todo-box')
const editTodoInput = editTodoForm.querySelector('#edit-todo-input')
const submitEditTodo = editTodoForm.querySelector('#edit-todo-submit-btn')




let todoArr = []
function saveTodoToLocalstorage() {
  localStorage.setItem("todo", JSON.stringify(todoArr))
}



function displayTodo(todo) {
    const todoElement = document.createElement('li')
    todoElement.id = todo.id
    const span = document.createElement('span')
    const todoDelteBtn = document.createElement('button')
    const todoEditBtn = document.createElement('button')
    todoDelteBtn.classList.add("del-btn-sm")
    todoEditBtn.classList.add("edit-btn-sm")

    // populating the created elements with individual content
    todoDelteBtn.textContent = "X"
    todoEditBtn.textContent = "edit"
    span.textContent = `${todo.todo}`


//adding event listners to handle button events 
    todoDelteBtn.addEventListener('click', deleteTodo)
    todoEditBtn.addEventListener('click', editTodo)
    
    todoElement.append(todoDelteBtn,todoEditBtn,span)

    todoList.insertAdjacentElement('afterbegin', todoElement) 
}

function handleTodoSubmit(event) {
    event.preventDefault()
    const newTodo = todoInput.value;
    const todoObject = {
        id: Math.floor(Math.random() * Date.now()).toString(36),
        todo: newTodo,
    }
    todoInput.value = ""
    todoArr.push(todoObject)
    displayTodo(todoObject)
    saveTodoToLocalstorage()
}

const todoFromLocalstorage = JSON.parse(localStorage.getItem('todo'))
if(todoFromLocalstorage !== null){
    todoArr = todoFromLocalstorage
    todoFromLocalstorage.forEach(el => {displayTodo(el)})
}

function deleteTodo(e) {
    e.preventDefault()
    const todoToDelete = e.currentTarget.parentNode.id
    todoFromLocalstorage.forEach((el, i) => {
        if(todoFromLocalstorage[i].id == todoToDelete){
            todoFromLocalstorage.splice(i, 1)
            localStorage.setItem('todo', JSON.stringify(todoFromLocalstorage))
        }
    })
    window.location.reload()
}


let todoToEdit
// let inputValue
function editTodo(e) {
    e.preventDefault()
    editTodoForm.classList.remove('hidden')
    todoToEdit = e.currentTarget.parentNode.id
    
    // window.location.reload()
}

function handleEditTodo(e) {
    e.preventDefault()
    todoFromLocalstorage.forEach((el, i) => {
        if(todoFromLocalstorage[i].id == todoToEdit){
         todoFromLocalstorage[i].todo = editTodoInput.value
         localStorage.setItem('todo', JSON.stringify(todoFromLocalstorage))
        }
    })
    window.location.reload() 
}

submitEditTodo.addEventListener('click', handleEditTodo)
todoForm.addEventListener('submit', handleTodoSubmit)