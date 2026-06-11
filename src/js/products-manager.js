let productsId
let products
let listCategories
let inputName
let inputPrice
let inputStock
let selectCategory
let selectImage
let submitBtn
let updateBtn
let cancelBtn
let productToUpdate
let tbodyProducts

window.onload = function() {
    productsId = localStorage.getItem('productsId') ? parseInt(localStorage.getItem('productsId')) : 0
    products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []
    listCategories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : []
    inputName = document.getElementById('inputName')
    inputPrice = document.getElementById('inputPrice')
    inputStock = document.getElementById('inputStock')
    selectCategory = document.getElementById('selectCategories')
    selectImage = document.getElementById('selectImage')
    submitBtn = document.getElementById("submitProductButton")
    updateBtn = document.getElementById("updateProductButton")
    cancelBtn = document.getElementById("cancelProductButton")
    tbodyProducts = document.getElementById("tbodyProducts")

    showSubmitButton()
    submitBtn.onclick = (e) => {
        e.preventDefault()
        submitProduct()
    }
    updateBtn.onclick = (e) => {
        e.preventDefault()
        updateProduct()
    }
    cancelBtn.onclick = (e) => {
        e.preventDefault()
        productToUpdate = null
        clearForm()
        inputBlur()
        showSubmitButton()
    }
    listProducts()
    addCategoriesToSelect()
}

function addCategoriesToSelect() {
    listCategories.forEach(category => {
        const option = document.createElement("option")
        option.value = category.name
        option.textContent = category.name
        selectCategory.appendChild(option)
    })
}

function clearForm() {
    inputName.value = ""
    inputPrice.value = ""
    inputStock.value = ""
    selectCategory.value = ""
    selectImage.value = ""
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
    inputPrice.focus()
    inputStock.focus()
    selectCategory.focus()
    selectImage.focus()
}

function inputBlur() {
    inputName.blur()
    inputPrice.blur()
    inputStock.blur()
    selectCategory.blur()
    selectImage.blur()
}

function submitProduct() {
    const productName = inputName.value
    const productPrice = parseFloat(inputPrice.value)
    const productStock = parseInt(inputStock.value)
    const productCategory = selectCategory.value
    const productImage = selectImage.value

    const product = {
        id: productsId,
        name: productName,
        price: productPrice,
        stock: productStock,
        category: productCategory,
        image: productImage
    }
    productsId++
    localStorage.setItem("productsId", productsId)
    products.push(product)
    localStorage.setItem("products", JSON.stringify(products))
    clearForm()
    inputBlur()
    listProducts()   
}

function updateProduct() {
    const productName = inputName.value
    const productPrice = parseFloat(inputPrice.value)
    const productStock = parseInt(inputStock.value)
    const productCategory = selectCategory.value
    const productImage = selectImage.value

    const productIndex = products.findIndex(p => p.id === productToUpdate.id)
    if (productIndex !== -1) {
        products[productIndex].name = productName
        products[productIndex].price = productPrice
        products[productIndex].stock = productStock
        products[productIndex].category = productCategory
        products[productIndex].image = productImage
        localStorage.setItem("products", JSON.stringify(products))
    }
    productToUpdate = null
    clearForm()
    showSubmitButton()
    inputBlur()
    listProducts()   
}

function deleteProduct(product) {
    products = products.filter(p => p.id !== product.id)
    localStorage.setItem("products", JSON.stringify(products))
    listProducts()
}

function listProducts() {
    tbodyProducts.innerHTML = ""
    products.forEach(element => {
        const row = document.createElement("tr")
        const colName = document.createElement("th")
        const colPrice = document.createElement("td")
        const colStock = document.createElement("td")
        const colCategory = document.createElement("td")
        const colActions = document.createElement("td")
        const editBtn = document.createElement("button")
        const deleteBtn = document.createElement("button")

        colName.scope = "row"

        colName.textContent = element.name
        colPrice.textContent = element.price
        colStock.textContent = element.stock
        colCategory.textContent = element.category

        editBtn.classList.add("btn")
        editBtn.classList.add("btn-sm")
        editBtn.classList.add("btn-outline-primary")
        deleteBtn.classList.add("btn")
        deleteBtn.classList.add("btn-sm")
        deleteBtn.classList.add("btn-outline-danger")

        editBtn.textContent = "Editar"
        deleteBtn.textContent = "Eliminar"

        editBtn.onclick = () => {
            productToUpdate = element
            inputName.value = element.name
            inputPrice.value = element.price
            inputStock.value = element.stock
            selectCategory.value = element.category
            selectImage.value = element.image

            inputFocus()
            showUpdatesButton()
        }

        deleteBtn.onclick = () => {
            deleteProduct(element)
        }

        colActions.appendChild(editBtn)
        colActions.appendChild(deleteBtn)
        row.appendChild(colName)
        row.appendChild(colPrice)
        row.appendChild(colStock)
        row.appendChild(colCategory)
        row.appendChild(colActions)

        tbodyProducts.appendChild(row)
    })
}