let productsId
let products
let listCategories
let inputName
let inputPrice
let inputStock
let selectCategory
let selectImage
let saveBtn
let tbodyProducts

window.onload = function() {
    productsId = localStorage.getItem('productsId') ? parseInt(localStorage.getItem('productsId')) : 0
    products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []
    listCategories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : []
    inputName = document.getElementById('inputName')
    inputPrice = document.getElementById('inputPrice')
    inputStock = document.getElementById('inputStock')
    selectCategory = document.getElementById('selectCategory')
    selectImage = document.getElementById('selectImage')
    saveBtn = document.getElementById("saveProductButton")
    tbodyProducts = document.getElementById("tbodyProducts")

    saveBtn.onclick = (e) => {
        e.preventDefault()
        saveProduct()
    }
    listProducts()
}

function saveProduct() {
    const productName = inputName.value
    const productPrice = parseFloat(inputPrice.value)
    const productStock = parseInt(inputStock.value)
    const prductCategoryId = parseInt(selectCategory.value)
    const productImage = selectImage.value

    const product = {
        id: productsId,
        name: productName,
        price: productPrice,
        stock: productStock,
        categoryId: prductCategoryId,
        image: productImage
    }
    productsId++
    localStorage.setItem("productsId", productsId)
    products.push(product)
    localStorage.setItem("products", JSON.stringify(products))
}

function listProducts() {
    products.forEach(element => {
        const row = document.createElement(tr)
        const colName = document.createElement(th)
        const colPrice = document.createElement(td)
        const colStock = document.createElement(td)
        const colCategory = document.createElement(td)

        colName.scope = "row"

        colName.textContent = element.name
        colPrice.textContent = element.price
        colStock.textContent = element.stock
        colCategory.textContent = listCategories.find(c => c.id === element.categoryId)?.name

        row.appendChild(colName)
        row.appendChild(colPrice)
        row.appendChild(colStock)
        row.appendChild(colCategory)

        tbodyProducts.appendChild(row)
    })
}