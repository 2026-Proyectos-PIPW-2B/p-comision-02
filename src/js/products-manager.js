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
let updateCancelButtons

let modalElement
let visualizerModal

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
    updateCancelButtons = document.getElementById("updateCancelButtons")

    modalElement = document.getElementById("visualizerModal")
    visualizerModal = new bootstrap.Modal(modalElement)

    inputName.oninput = validateForm
    inputPrice.oninput = validateForm
    inputStock.oninput = validateForm
    selectCategory.onchange = validateForm
    selectImage.onchange = () => {showVisualizer(selectImage.value); validateForm()}

    submitBtn.disabled = true
    updateBtn.disabled = true

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
    showSubmitButton()
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
    resetStates()
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
        const colName = document.createElement("td")
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

function validateForm() {
    const name = inputName.value
    const price = inputPrice.value
    const stock = inputStock.value
    const category = selectCategory.value

    const isNameValid = !validator.isEmpty(name)
    const isPriceValid = !validator.isEmpty(price) && validator.isFloat(price, { gt: 0 })
    const isStockValid = !validator.isEmpty(stock) && validator.isInt(stock, { gt: 0 })
    const isCategoryValid = !validator.isEmpty(category)
    const isImageValid = !validator.isEmpty(selectImage.value)

    if (!isNameValid) {
        mostrarError(inputName, "nameError", "El nombre no puede ser vacío.")
    } else {
        mostrarExito(inputName, "nameError")
    }

    if (!isPriceValid) {
        mostrarError(inputPrice, "priceError", "El precio no puede ser menor a 0.")
    } else {
        mostrarExito(inputPrice, "priceError")
    }

    if (!isStockValid) {
        mostrarError(inputStock, "stockError", "El stock no puede ser menor a 0.")
    } else {
        mostrarExito(inputStock, "stockError")
    }

    if (!isCategoryValid) {
        mostrarError(selectCategory, "categoryError", "Debe seleccionar una categoría.")
    } else {
        mostrarExito(selectCategory, "categoryError")
    }

    if (!isImageValid) {
        mostrarError(selectImage, "imageError", "Debe seleccionar una imagen.")
    } else {
        mostrarExito(selectImage, "imageError")
    }

    submitBtn.disabled = !(isNameValid && isPriceValid && isStockValid && isCategoryValid && isImageValid)
    updateBtn.disabled = !(isNameValid && isPriceValid && isStockValid && isCategoryValid && isImageValid)
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
    const inputs = document.querySelectorAll(".form-control, .form-select")
    for (const input of inputs) {
        input.classList.remove("is-invalid")
        input.classList.remove("is-valid")
    }
}

const showVisualizer = (imgSrc) => {
    const modalBody = document.querySelector("#visualizerModal .modal-body")
    const modalFooter = document.querySelector("#visualizerModal .modal-footer")

    modalBody.innerHTML = ""
    modalFooter.innerHTML = ""

    const card = document.createElement("div")
    card.className = "card border-0"

    const img = document.createElement("img")
    img.src = imgSrc
    img.className = "card-img-top"
    img.style.maxHeight = "250px"
    img.style.objectFit = "contain"

    card.appendChild(img)

    modalBody.appendChild(card)

    const closeButton = document.createElement("button")
    closeButton.type = "button"
    closeButton.className = "btn btn-secondary"
    closeButton.setAttribute("data-bs-dismiss", "modal")
    closeButton.textContent = "Cerrar"

    modalFooter.appendChild(closeButton)

    visualizerModal.show()
}