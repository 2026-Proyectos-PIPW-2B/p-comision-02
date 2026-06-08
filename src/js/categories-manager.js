let categoriesId
let products
let categories
let inputName
let inputDescription
let saveBtn
let tbodyCategories

window.onload = function() {
    categoriesId = localStorage.getItem('categoriesId') ? parseInt(localStorage.getItem('categoriesId')) : 0
    categories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : []
    products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []
    inputName = document.getElementById('inputName')
    inputDescription = document.getElementById('inputDescription')
    saveBtn = document.getElementById("saveCategoryButton")
    tbodyCategories = document.getElementById("tbodyCategories")

    saveBtn.onclick = (e) => {
        e.preventDefault()
        saveCategory()
    }
    listCategories()
}

function saveCategory() {
    const categoryName = inputName.value
    const categoryDescription = inputDescription.value
    const categoryColor = getRandomColor()
    console.log("Entro al save")

    const category = {
        id: categoriesId,
        name: categoryName,
        description: categoryDescription,
        color: categoryColor
    }
    categoriesId++
    localStorage.setItem("categoriesId", categoriesId)
    categories.push(category)
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
        colDescription.textContent = element.description
        colCantProducts.textContent = products.find(p => p.categoryId === element.id)?.size || 0
        editBtn.textContent = "Editar"
        deleteBtn.textContent = "Eliminar"

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