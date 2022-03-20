const loginForm = document.querySelector("#login-form")
const loginInput = document.querySelector('#login-form input')

const greetingBox = document.querySelector("#greetings-box")
const editName = document.querySelector(".change-name")

const textElement = document.createElement("h2")
const HIDE_USERNAME = "hidden"

const handleCLick = (e) =>{
    e.preventDefault()
    let username = loginInput.value;
    loginForm.classList.add(HIDE_USERNAME);
    localStorage.setItem("username", username)
    displayUsername(username)
}



// function to display username

function displayUsername(username) {
    textElement.innerText = `Hello ${username}!`
    // greetingBox.append(textElement)
    greetingBox.insertAdjacentElement("afterbegin", textElement)
    greetingBox.classList.remove(HIDE_USERNAME)
}

const usernameFromLocalStorage = localStorage.getItem('username')
// for deleting username

function editUsername(){
    localStorage.removeItem('username')
    window.location.reload()
    return false
}
editName.addEventListener('click', editUsername)


if(usernameFromLocalStorage == null){
    loginForm.classList.remove(HIDE_USERNAME)
    loginForm.addEventListener('submit', handleCLick)
}else{
    displayUsername(usernameFromLocalStorage)
}