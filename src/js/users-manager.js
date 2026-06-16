import { createActionsButtons, showNotification, trashModal } from "./common/utils.js"

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
    userToUpdate = null

    inputName.oninput = validateForm
    inputLastname.oninput = validateForm
    inputUsername.oninput = validateForm
    inputPassword.oninput = validateForm

    submitBtn.disabled = true
    updateBtn.disabled = true

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
    resetStates()
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
    const userSession = JSON.parse(localStorage.getItem("userSession"))
    if (user.username !== userSession.username) {
        users = users.filter(u => u.username !== user.username)
        localStorage.setItem("users", JSON.stringify(users))
    } else {
        showNotification({
            type: "error",
            title: "eliminar el usuario",
            icon: `<i class="bi bi-x-lg text-danger"></i>`,
            message: "No puedes eliminar el usuario en sesión"
        })
        return
    }
    showNotification({
        type: "success",
        title: "Eliminación exitosa",
        icon: `<i class="bi bi-check-lg text-success"></i>`,
        message: "Usuario eliminado correctamente"
    })
    listUsers()
}

function listUsers() {
    tbodyUsers.innerHTML = ""
    users.forEach(element => {
        const row = document.createElement("tr")
        const colUsername = document.createElement("td")
        const colName = document.createElement("td")
        const colLastname = document.createElement("td")
        const colAdmin = document.createElement("td")
        const colAllowed = document.createElement("td")
        const colActions = document.createElement("td")
        createActionsButtons(colActions, () => {
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
        }, () => trashModal("usuario", () => {deleteUser(element)})
        )

        colName.scope = "row"
        colUsername.textContent = element.username
        colName.textContent = element.name
        colLastname.textContent = element.lastname
        colAdmin.textContent = element.isAdmin ? "Sí" : "No"
        colAllowed.textContent = element.isAllowed ? "Sí" : "No"

        row.appendChild(colUsername)
        row.appendChild(colName)
        row.appendChild(colLastname)
        row.appendChild(colAdmin)
        row.appendChild(colAllowed)
        row.appendChild(colActions)

        tbodyUsers.appendChild(row)
    })
}

function validateForm() {
    const name = inputName.value
    const lastname = inputLastname.value
    const username = inputUsername.value
    const password = inputPassword.value

    const isUsernameValid = validateUsername(username)
    const isPasswordValid = validatePassword(password)
    const isNameValid = !validator.isEmpty(name)
    const isLastnameValid = !validator.isEmpty(lastname)

    if (!isNameValid) {
        mostrarError(inputName, "nameError", "El nombre no puede ser vacío.")
    } else {
        mostrarExito(inputName, "nameError")
    }

    if (!isLastnameValid) {
        mostrarError(inputLastname, "lastnameError", "El apellido no puede ser vacío.")
    } else {
        mostrarExito(inputLastname, "lastnameError")
    }

    if (!isUsernameValid) {
        mostrarError(inputUsername, "usernameError", "El nombre de usuario debe tener entre 4 y 20 caracteres y no puede estar repetido.")
    } else {
        mostrarExito(inputUsername, "usernameError")
    }

    if (!isPasswordValid) {
        mostrarError(inputPassword, "passwordError", "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.")
    } else {
        mostrarExito(inputPassword, "passwordError")
    }

    submitBtn.disabled = !(isUsernameValid && isPasswordValid && isNameValid && isLastnameValid)
    updateBtn.disabled = !(isUsernameValid && isPasswordValid && isNameValid && isLastnameValid)
}

function validateUsername(username) {
    const isUpdating = userToUpdate !== null
    const isSameUsername = isUpdating && userToUpdate.username === username
    return (isSameUsername || !users.some(u => u.username === username)) && validator.isLength(username, { min: 4, max: 20 })
}

function validatePassword(password) {
    return validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
}

function mostrarExito(input, idDivError) {
    input.classList.remove("is-invalid")
    input.classList.add("is-valid")
    document.getElementById(idDivError).textContent = ""
}

function mostrarError(input, idDivError, mensaje) {
    input.classList.remove("is-valid")
    input.classList.add("is-invalid")
    document.getElementById(idDivError).textContent = mensaje
}

function resetStates() {
    const inputs = document.querySelectorAll(".form-control")
    for (const input of inputs) {
        input.classList.remove("is-invalid")
        input.classList.remove("is-valid")
    }
}