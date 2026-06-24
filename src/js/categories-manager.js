import { createActionsButtons, showNotification, updatePagination } from "./common/utils.js"
import { showError, showSuccess, resetStates } from "./common/validations.js"
import { categoriesApi } from "./api/categoriesApi.js"
import { productsApi } from "./api/productsApi.js"

let categories
let products
let inputName
let inputDescription
let submitBtn
let updateBtn
let cancelBtn
let tbodyCategories
let categoryToUpdate
let updateCancelButtons
let currentPage
let itemsPerPage
let nextPageBtn
let previousPageBtn

window.onload = function() {
    categories = categoriesApi.getAllCategories()
    products = productsApi.getAllProducts()
    inputName = document.getElementById('inputName')
    inputDescription = document.getElementById('inputDescription')
    submitBtn = document.getElementById("submitCategoryButton")
    updateBtn = document.getElementById("updateCategoryButton")
    cancelBtn = document.getElementById("cancelCategoryButton")
    tbodyCategories = document.getElementById("tbodyCategories")
    updateCancelButtons = document.getElementById("updateCancelButtons")
    currentPage = 1
    itemsPerPage = JSON.parse(localStorage.getItem("configuration")).pagination.admin
    nextPageBtn = document.getElementById("nextPage")
    previousPageBtn = document.getElementById("previousPage")

    inputName.oninput = validateForm
    inputDescription.oninput = validateForm

    submitBtn.disabled = true
    updateBtn.disabled = true

    submitBtn.onclick = (e) => {
        e.preventDefault()
        submitCategory()
    }
    updateBtn.onclick = (e) => {
        e.preventDefault()
        updateCategory()
    }
    cancelBtn.onclick = (e) => {
        e.preventDefault()
        categoryToUpdate = null
        clearForm()
        inputBlur()
        showSubmitButton()
    }
    document.getElementById("previousPage").addEventListener("click", (e) => {
        e.preventDefault()
        if (currentPage > 1) {
            currentPage--
            listCategories()
        }
    })
    previousPageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(categories.length / itemsPerPage)
        if (currentPage > 1) {
            currentPage--
            listCategories()
        }
    })
    nextPageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(categories.length / itemsPerPage)
        if (currentPage < totalPages) {
            currentPage++
            listCategories()
        }
    })
    showSubmitButton()
    listCategories()
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
    inputDescription.focus()
}

function inputBlur() {
    inputName.blur()
    inputDescription.blur()
}

function submitCategory() {
    const categoryName = inputName.value
    const categoryDescription = inputDescription.value
    const categoryColor = getRandomColor()

    const category = {
        name: categoryName,
        description: categoryDescription,
        color: categoryColor
    }
    categoriesApi.createCategory(category)
    categories = categoriesApi.getAllCategories()
    showNotification({
        type: "success",
        title: "Categoría creada",
        icon: `<i class="bi bi-check-lg text-success"></i>`,
        message: "La categoría se creó correctamente."
    })
    listCategories()
    clearForm()
}

function updateCategory() {
    const categoryName = inputName.value
    const categoryDescription = inputDescription.value

    const updatedCategory = {
        name: categoryName,
        description: categoryDescription
    }
    categoriesApi.updateCategory(updatedCategory)
    categories = categoriesApi.getAllCategories()
    categoryToUpdate = null
    showNotification({
        type: "success",
        title: "Actualizar categoría",
        icon: `<i class="bi bi-check-lg text-success"></i>`,
        message: "La categoría se actualizó correctamente."
    })
    listCategories()
    clearForm()
    showSubmitButton()
    inputBlur()
}

function deleteCategory(category) {
    const cantProducts = products.filter(p => p.category === category.name).length
    if (cantProducts > 0) {
        showNotification({
            type: "error",
            title: "eliminar",
            icon: `<i class="bi bi-exclamation-triangle text-danger"></i>`,
            message: "No se puede eliminar la categoría porque tiene productos asociados."
        })
        return
    }
    categoriesApi.deleteCategory(category.name)
    categories = categoriesApi.getAllCategories()
    showNotification({
        type: "success",
        title: "Categoría eliminada",
        icon: `<i class="bi bi-check-lg text-success"></i>`,
        message: "La categoría se eliminó correctamente."
    })
    listCategories()
}

function getRandomColor() {
    let color = randomColor()
    while (categories.some((c) => c.color === color)) {
        color = randomColor()
    }
    return color
}

function randomColor() {
    var letters = "0123456789ABCDEF"
    var color = "#"
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function clearForm() {
    inputName.value = ""
    inputDescription.value = ""
    resetStates()
}

function listCategories(page) {
    tbodyCategories.innerHTML = ""
    
    currentPage = page || currentPage;

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedCategories = categories.slice(startIndex, endIndex)

    paginatedCategories.forEach(element => {
        const row = document.createElement("tr")
        const colName = document.createElement("td")
        const colNameWrapper = document.createElement("div")
        const colNameSpan = document.createElement("span")
        const colDescription = document.createElement("td")
        const colCantProducts = document.createElement("td")
        const colActions = document.createElement("td")
        
        createActionsButtons(colActions, () => {
            categoryToUpdate = element;
            inputName.value = element.name;
            inputDescription.value = element.description;
            inputFocus();
            showUpdatesButton();
        }, () => {
            deleteCategory(element);
        })

        colName.scope = "row"
        colNameWrapper.classList.add("cell-name")
        colNameWrapper.classList.add("d-flex")
        colNameWrapper.classList.add("justify-content-center")
        colNameSpan.classList.add("cell-color")
        colNameSpan.style.background = element.color

        colNameWrapper.appendChild(colNameSpan)
        colNameWrapper.innerHTML += element.name
        colDescription.textContent = element.description || "-"
        
        colCantProducts.textContent = products.filter(p => p.category === element.name).length

        colName.appendChild(colNameWrapper)
        row.appendChild(colName)
        row.appendChild(colDescription)
        row.appendChild(colCantProducts)
        row.appendChild(colActions)

        tbodyCategories.appendChild(row)
    })

    updatePagination(categories, listCategories, itemsPerPage, currentPage)
}

function validateForm() {
    const name = inputName.value
    const description = inputDescription.value
    
    const isNameValid = validateName(name)
    const isDescriptionValid = validator.isLength(description, { min: 0, max: 200 })

    if (!isNameValid) {
        showError(inputName, "nameError", "El nombre no puede ser vacío.")
    } else {
        showSuccess(inputName, "nameError")
    }

    if (!isDescriptionValid) {
        showError(inputDescription, "descriptionError", "La descripción no puede tener más de 200 caracteres.")
    } else {
        showSuccess(inputDescription, "descriptionError")
    }

    submitBtn.disabled = !(isNameValid && isDescriptionValid)
    updateBtn.disabled = !(isNameValid && isDescriptionValid)
}

function validateName(name) {
    return !validator.isEmpty(name) && !categories.some(c => c.name === name && c !== categoryToUpdate)
}
