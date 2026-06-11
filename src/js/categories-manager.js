let categories
let products
let inputName
let inputDescription
let submitBtn
let updateBtn
let cancelBtn
let tbodyCategories
let categoryToUpdate

window.onload = function() {
    categories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : []
    products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []
    inputName = document.getElementById('inputName')
    inputDescription = document.getElementById('inputDescription')
    submitBtn = document.getElementById("submitCategoryButton")
    updateBtn = document.getElementById("updateCategoryButton")
    cancelBtn = document.getElementById("cancelCategoryButton")
    tbodyCategories = document.getElementById("tbodyCategories")


    showSubmitButton()
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
    listCategories()
}

function showSubmitButton() {
    updateBtn.style.display = "none"
    cancelBtn.style.display = "none"
    submitBtn.style.display = "block"
}

function showUpdatesButton() {
    updateBtn.style.display = "block"
    cancelBtn.style.display = "block"
    submitBtn.style.display = "none"
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
    categories.push(category)
    localStorage.setItem("categories", JSON.stringify(categories))
    listCategories()
    clearForm()
}

function updateCategory() {
    const categoryName = inputName.value
    const categoryDescription = inputDescription.value

    const categoryIndex = categories.findIndex(c => c.name === categoryToUpdate.name)
    if (categoryIndex !== -1) {
        categories[categoryIndex].name = categoryName
        categories[categoryIndex].description = categoryDescription
        localStorage.setItem("categories", JSON.stringify(categories))
    }
    categoryToUpdate = null
    listCategories()
    clearForm()
    showSubmitButton()
    inputBlur()
}

function deleteCategory(category) {
    const cantProducts = products.filter(p => p.categoryId === category.id).length
    if (cantProducts > 0) {
        alert("No se puede eliminar la categoría porque tiene productos asociados.")
        return
    }
    categories = categories.filter(c => c.name !== category.name)
    localStorage.setItem("categories", JSON.stringify(categories))
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
}

function listCategories() {
    tbodyCategories.innerHTML = ""
    categories.forEach(element => {
        const row = document.createElement("tr")
        const colName = document.createElement("th")
        const colNameWrapper = document.createElement("div")
        const colNameSpan = document.createElement("span")
        const colDescription = document.createElement("td")
        const colCantProducts = document.createElement("td")
        const colActions = document.createElement("td")
        const editBtn = document.createElement("button")
        const deleteBtn = document.createElement("button")

        colName.scope = "row"
        colNameWrapper.classList.add("cell-name")
        colNameSpan.classList.add("cell-color")
        colNameSpan.style.background = element.color

        editBtn.classList.add("btn")
        editBtn.classList.add("btn-sm")
        editBtn.classList.add("btn-outline-primary")
        deleteBtn.classList.add("btn")
        deleteBtn.classList.add("btn-sm")
        deleteBtn.classList.add("btn-outline-danger")

        
        colNameWrapper.appendChild(colNameSpan)
        colNameWrapper.innerHTML += element.name
        colDescription.textContent = element.description || "-"
        colCantProducts.textContent = products.find(p => p.categoryId === element.id)?.size || 0
        editBtn.textContent = "Editar"
        deleteBtn.textContent = "Eliminar"

        editBtn.onclick = () => {
            categoryToUpdate = element
            inputName.value = element.name
            inputDescription.value = element.description

            inputFocus()
            showUpdatesButton()
        }

        deleteBtn.onclick = () => {
            deleteCategory(element)
        }

        colName.appendChild(colNameWrapper)
        colActions.appendChild(editBtn)
        colActions.appendChild(deleteBtn)
        row.appendChild(colName)
        row.appendChild(colDescription)
        row.appendChild(colCantProducts)
        row.appendChild(colActions)

        tbodyCategories.appendChild(row)
    })
}