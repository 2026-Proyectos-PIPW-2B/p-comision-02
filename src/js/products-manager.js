import { createActionsButtons, showNotification, trashModal, updatePagination } from "./common/utils.js"
import { showError, showSuccess, resetStates } from "./common/validations.js"

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
let currentPage
let itemsPerPage
let nextPageBtn
let previousPageBtn

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
    currentPage = 1
    itemsPerPage = 10
    nextPageBtn = document.getElementById("nextPage")
    previousPageBtn = document.getElementById("previousPage")
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
    previousPageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(products.length / itemsPerPage)
        if (currentPage > 1) {
            currentPage--
            listProducts()
        }
    })
    nextPageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(products.length / itemsPerPage)
        if (currentPage < totalPages) {
            currentPage++
            listProducts()
        }
    })
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
    showNotification({
        type: "success",
        title: "Producto creado",
        icon: `<i class="bi bi-check-lg text-success"></i>`,
        message: "El producto se creó correctamente."
    })
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
    showNotification({
        type: "success",
        title: "Producto actualizado",
        icon: `<i class="bi bi-check-lg text-success"></i>`,
        message: "El producto se actualizó correctamente."
    })
    clearForm()
    showSubmitButton()
    inputBlur()
    listProducts()   
}

function deleteProduct(product) {
    products = products.filter(p => p.id !== product.id)
    localStorage.setItem("products", JSON.stringify(products))
    showNotification({
        type: "success",
        title: "Producto eliminado",
        icon: `<i class="bi bi-check-lg text-success"></i>`,
        message: "El producto se eliminó correctamente."
    })
    listProducts()
}

function listProducts(page) {
    tbodyProducts.innerHTML = ""

    currentPage = page || currentPage;

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedProducts = products.slice(startIndex, endIndex)

    paginatedProducts.forEach(element => {
        const row = document.createElement("tr")
        const colName = document.createElement("td")
        const colNameWrapper = document.createElement("div")
        const colNameSpan = document.createElement("span")
        const colPrice = document.createElement("td")
        const colStock = document.createElement("td")
        const colCategory = document.createElement("td")
        const colActions = document.createElement("td")
        createActionsButtons(colActions, () => {
            productToUpdate = element
            inputName.value = element.name
            inputPrice.value = element.price
            inputStock.value = element.stock
            selectCategory.value = element.category
            selectImage.value = element.image

            inputFocus()
            showUpdatesButton()
        }, () => trashModal("producto", () => {deleteProduct(element)})
        )

        colName.scope = "row"
        colNameWrapper.classList.add("cell-name")
        colNameSpan.classList.add("cell-color")
        colNameSpan.style.background = listCategories.find(c => c.name === element.category)?.color || "#000000"

        colNameWrapper.appendChild(colNameSpan)
        colNameWrapper.innerHTML += element.name
        colPrice.textContent = element.price
        colStock.textContent = element.stock
        colCategory.textContent = element.category
        colActions.classList.add("d-flex", "justify-content-center", "gap-2")

        colName.appendChild(colNameWrapper)
        row.appendChild(colName)
        row.appendChild(colPrice)
        row.appendChild(colStock)
        row.appendChild(colCategory)
        row.appendChild(colActions)

        tbodyProducts.appendChild(row)
    })

    updatePagination(products, listProducts, itemsPerPage, currentPage)
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
        showError(inputName, "nameError", "El nombre no puede ser vacío.")
    } else {
        showSuccess(inputName, "nameError")
    }

    if (!isPriceValid) {
        showError(inputPrice, "priceError", "El precio no puede ser menor a 0.")
    } else {
        showSuccess(inputPrice, "priceError")
    }

    if (!isStockValid) {
        showError(inputStock, "stockError", "El stock no puede ser menor a 0.")
    } else {
        showSuccess(inputStock, "stockError")
    }

    if (!isCategoryValid) {
        showError(selectCategory, "categoryError", "Debe seleccionar una categoría.")
    } else {
        showSuccess(selectCategory, "categoryError")
    }

    if (!isImageValid) {
        showError(selectImage, "imageError", "Debe seleccionar una imagen.")
    } else {
        showSuccess(selectImage, "imageError")
    }

    submitBtn.disabled = !(isNameValid && isPriceValid && isStockValid && isCategoryValid && isImageValid)
    updateBtn.disabled = !(isNameValid && isPriceValid && isStockValid && isCategoryValid && isImageValid)
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