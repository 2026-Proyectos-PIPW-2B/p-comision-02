let usersId
let users
let inputName
let inputLastname
let inputUsername
let inputPassword
let adminPermission
let saveBtn
let tbodyUsers

window.onload = function() {
    usersId = localStorage.getItem('usersId') ? parseInt(localStorage.getItem('usersId')) : 0
    users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
    products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []
    inputName = document.getElementById('inputName')
    inputLastname = document.getElementById('inputLastname')
    inputUsername = document.getElementById('inputUsername')
    inputPassword = document.getElementById('inputPassword')
    adminPermission = document.getElementById('adminPermission')
    saveBtn = document.getElementById("saveUserButton")
    tbodyUsers = document.getElementById("tbodyUsers")

    saveBtn.onclick = (e) => {
        e.preventDefault()
        saveUser()
    }
    listUsers()
}

function saveUser() {
    const userName = inputName.value
    const userLastName = inputLastname.value
    const userUsername = inputUsername.value
    const userPassword = inputPassword.value
    const isAdmin = adminPermission.checked

    const user = {
        id: usersId,
        name: userName,
        lastName: userLastName,
        username: userUsername,
        password: userPassword,
        isAdmin: isAdmin
    }
    usersId++
    localStorage.setItem("usersId", usersId)
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
    listUsers()
}

function listUsers() {
    tbodyUsers.innerHTML = ""
    users.forEach(element => {
        const row = document.createElement("tr")
        const colUsername = document.createElement("th")
        const colPassword = document.createElement("td")
        const colName = document.createElement("td")
        const colLastName = document.createElement("td")
        const colAdmin = document.createElement("td")
        const colActions = document.createElement("td")
        const editBtn = document.createElement("button")
        const deleteBtn = document.createElement("button")

        colName.scope = "row"
        colUsername.textContent = element.username
        colPassword.textContent = "********"
        colName.textContent = element.name
        colLastName.textContent = element.lastName
        colAdmin.textContent = element.isAdmin ? "Sí" : "No"

        editBtn.classList.add("btn")
        editBtn.classList.add("btn-sm")
        editBtn.classList.add("btn-outline-primary")
        deleteBtn.classList.add("btn")
        deleteBtn.classList.add("btn-sm")
        deleteBtn.classList.add("btn-outline-danger")

        
        editBtn.textContent = "Editar"
        deleteBtn.textContent = "Eliminar"

        colActions.appendChild(editBtn)
        colActions.appendChild(deleteBtn)
        row.appendChild(colUsername)
        row.appendChild(colPassword)
        row.appendChild(colName)
        row.appendChild(colLastName)
        row.appendChild(colAdmin)
        row.appendChild(colActions)

        tbodyUsers.appendChild(row)
    })
}