let users
let inputName
let inputLastname
let inputUsername
let inputPassword
let adminPermission
let enabledSwitchWrapper
let allowedPermission
let submitBtn
let updateBtn
let cancelBtn
let tbodyUsers
let updateCancelButtons
let userToUpdate

window.onload = function() {
    users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
    inputName = document.getElementById('inputName')
    inputLastname = document.getElementById('inputLastname')
    inputUsername = document.getElementById('inputUsername')
    inputPassword = document.getElementById('inputPassword')
    adminPermission = document.getElementById('adminPermission')
    enabledSwitchWrapper = document.getElementById("enabledSwitchWrapper")
    allowedPermission = document.getElementById("allowedPermission")
    submitBtn = document.getElementById("submitUserButton")
    updateBtn = document.getElementById("updateUserButton")
    cancelBtn = document.getElementById("cancelUserButton")
    tbodyUsers = document.getElementById("tbodyUsers")
    updateCancelButtons = document.getElementById("updateCancelButtons")

    submitBtn.onclick = (e) => {
        e.preventDefault()
        submitUser()
    }
    updateBtn.onclick = (e) => {
        e.preventDefault()
        updateUser()
        disabledSwitchWrapperVisibility()
    }
    cancelBtn.onclick = (e) => {
        e.preventDefault()
        userToUpdate = null
        clearForm()
        inputBlur()
        showSubmitButton()
        disabledSwitchWrapperVisibility()
    }
    showSubmitButton()
    listUsers()
}

function showSubmitButton() {
    updateCancelButtons.classList.remove("d-block")
    submitBtn.classList.remove("d-none")
    updateCancelButtons.classList.add("d-none")
    submitBtn.classList.add("d-block")
}

function showUpdatesButton() {
    updateCancelButtons.classList.remove("d-none")
    submitBtn.classList.remove("d-block")
    updateCancelButtons.classList.add("d-block")
    submitBtn.classList.add("d-none")
}

function inputFocus() {
    inputName.focus()
    inputLastname.focus()
    inputUsername.focus()
    inputPassword.focus()
}

function inputBlur() {
    inputName.blur()
    inputLastname.blur()
    inputUsername.blur()
    inputPassword.blur()
}

function clearForm() {
    inputName.value = ""
    inputLastname.value = ""
    inputUsername.value = ""
    inputPassword.value = ""
    adminPermission.checked = false
    allowedPermission.checked = true
    enabledSwitchWrapper.classList.add("d-none")
}

function enabledSwitchWrapperVisibility() {
    enabledSwitchWrapper.classList.remove("d-none")
    enabledSwitchWrapper.classList.add("d-block")
}

function disabledSwitchWrapperVisibility() {
    enabledSwitchWrapper.classList.remove("d-block")
    enabledSwitchWrapper.classList.add("d-none")
}

function submitUser() {
    const userName = inputName.value
    const userLastname = inputLastname.value
    const userUsername = inputUsername.value
    const userPassword = inputPassword.value
    const isAdmin = adminPermission.checked

    const user = {
        name: userName,
        lastname: userLastname,
        username: userUsername,
        password: userPassword,
        isAdmin: isAdmin,
        isAllowed: true,
        orders: []
    }
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
    listUsers()
    clearForm()
}

function updateUser() {
    const userName = inputName.value
    const userLastname = inputLastname.value
    const userUsername = inputUsername.value
    const userPassword = inputPassword.value
    const isAdmin = adminPermission.checked
    const isAllowed = allowedPermission.checked

    const userIndex = users.findIndex(u => u.username === userToUpdate.username)
    if (userIndex !== -1) {
        users[userIndex].name = userName
        users[userIndex].lastname = userLastname
        users[userIndex].username = userUsername
        users[userIndex].password = userPassword
        users[userIndex].isAdmin = isAdmin
        users[userIndex].isAllowed = isAllowed
        localStorage.setItem("users", JSON.stringify(users))
    }
    userToUpdate = null
    listUsers()
    clearForm()
    showSubmitButton()
    inputBlur()
}

function deleteUser(user) {
    const userSession = JSON.parse(sessionStorage.getItem("userSession"))
    if (user.username === userSession.username) {
        users = users.filter(u => u.username !== user.username)
        localStorage.setItem("users", JSON.stringify(users))
    } else {
        alert("No puedes eliminar un usuario que no es el tuyo.")
        return
    }
    listUsers()
}

function listUsers() {
    tbodyUsers.innerHTML = ""
    users.forEach(element => {
        const row = document.createElement("tr")
        const colUsername = document.createElement("th")
        const colPassword = document.createElement("td")
        const colName = document.createElement("td")
        const colLastname = document.createElement("td")
        const colAdmin = document.createElement("td")
        const colAllowed = document.createElement("td")
        const colActions = document.createElement("td")
        const editBtn = document.createElement("button")
        const deleteBtn = document.createElement("button")

        colName.scope = "row"
        colUsername.textContent = element.username
        colPassword.textContent = "********"
        colName.textContent = element.name
        colLastname.textContent = element.lastname
        colAdmin.textContent = element.isAdmin ? "Sí" : "No"
        colAllowed.textContent = element.isAllowed ? "Sí" : "No"

        editBtn.classList.add("btn")
        editBtn.classList.add("btn-sm")
        editBtn.classList.add("btn-outline-primary")
        deleteBtn.classList.add("btn")
        deleteBtn.classList.add("btn-sm")
        deleteBtn.classList.add("btn-outline-danger")

        
        editBtn.textContent = "Editar"
        deleteBtn.textContent = "Eliminar"

        editBtn.onclick = () => {
            userToUpdate = element
            inputName.value = element.name
            inputLastname.value = element.lastname
            inputUsername.value = element.username
            inputPassword.value = element.password
            adminPermission.checked = element.isAdmin
            allowedPermission.checked = element.isAllowed


            inputFocus()
            enabledSwitchWrapperVisibility()
            showUpdatesButton()
        }

        deleteBtn.onclick = () => {
            deleteUser(element)
        }

        colActions.appendChild(editBtn)
        colActions.appendChild(deleteBtn)
        row.appendChild(colUsername)
        row.appendChild(colPassword)
        row.appendChild(colName)
        row.appendChild(colLastname)
        row.appendChild(colAdmin)
        row.appendChild(colAllowed)
        row.appendChild(colActions)

        tbodyUsers.appendChild(row)
    })
}