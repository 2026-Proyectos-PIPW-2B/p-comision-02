import { showNotification, showCartCount, updatePagination } from "./common/utils.js";
import { categoriesApi } from "./api/categoriesApi.js";
import { productsApi } from "./api/productsApi.js";
import { configurationApi } from "./api/configurationApi.js";

let products;
let productsContainer;
let modalElement;
let cartModal;
let cartModalBody;
let select;
let menu;
let button;
let toast;
let searchInput;
let currentPage
let itemsPerPage

window.onload = () => {
    products = productsApi.getAllProducts();
    modalElement = document.getElementById("cartModal");
    cartModal = new bootstrap.Modal(modalElement);
    cartModalBody = document.getElementById("cartModal-body");
    select = document.getElementById("floatingSelect");
    menu = document.getElementById("multiSelectMenu");
    button = document.getElementById("multiSelectButton");
    toast = document.getElementById("toastSuccess")
    searchInput = document.getElementById("searchInput")
    currentPage = 1
    itemsPerPage = 5
    productsContainer = document.getElementById("productsContainer");

    resetFilters()
    updateFilterCategories(categoriesApi.getAllCategories());
    searchInput.oninput = handleFilters
    mapProducts(currentPage, products);
};

const updateFilterCategories = (categories) => {
    const floatingSelect = document.getElementById("floatingSelect");

    floatingSelect.innerHTML = "";

    categories.forEach(({ name }) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;

        floatingSelect.appendChild(option);
    });

    const selected = [...select.selectedOptions].map(
        option => option.textContent
    );

    if (selected.length === 0) {
        button.textContent = "Filtrar Categorias";
    } else if (selected.length <= 2) {
        button.textContent = selected.join(", ");
    } else {
        button.textContent = `${selected.length} seleccionadas`;
    }

    [...select.options].forEach(option => {
    const li = document.createElement("li");

    const wrapper = document.createElement("div");
    wrapper.className = "form-check px-3";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input";
    checkbox.id = `option-${option.value}`;

    const label = document.createElement("label");
    label.className = "form-check-label";
    label.htmlFor = checkbox.id;
    label.textContent = option.textContent;

    checkbox.addEventListener("change", () => {
        option.selected = checkbox.checked;
        updateButtonText();
        handleFilters();
    });

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    li.appendChild(wrapper);
    menu.appendChild(li);
});
};

const updateButtonText = () => {
    const selected = [...select.selectedOptions].map(
        option => option.textContent
    );

    if (selected.length === 0) {
        button.textContent = "Filtrar Categorias";
    } else if (selected.length <= 2) {
        button.textContent = selected.join(", ");
    } else {
        button.textContent = `${selected.length} seleccionadas`;
    }
};

const mapProducts = (page, arrayProducts) => {
    productsContainer.innerHTML = ""
    if(!arrayProducts) return

    currentPage = page || currentPage;
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedProducts = arrayProducts.slice(startIndex, endIndex)

    paginatedProducts.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col";

        const card = document.createElement("div");
        card.className = "card shadow";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.className = "card-img-top";
        img.style.maxHeight = "300px";
        img.style.objectFit = "contain";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const title = document.createElement("h5");
        title.className = "card-title product-title";
        title.textContent = product.name;

        const category = document.createElement("p");
        category.className = "card-text text-secondary";
        category.textContent = product.category;

        const infoContainer = document.createElement("div");
        infoContainer.className = "d-flex justify-content-between";

        const stock = document.createElement("span");
        stock.className = "card-text mb-3";
        stock.textContent = `Stock: `;
        const stockNumber = document.createElement("span");
        
        const {lowThreshold, mediumThreshold, highThreshold} = JSON.parse(localStorage.getItem("configuration")).stock
        
        const stockLevel =
        product.stock <= lowThreshold ? "text-bg-danger" :
        product.stock <= mediumThreshold ? "text-bg-warning" :
        product.stock <= highThreshold ? "text-bg-success" :
        "text-bg-dark";    

        stockNumber.classList = `badge ${stockLevel} fs-6 px-2 py-1`
        stockNumber.textContent = `${product.stock}`;
        stock.appendChild(stockNumber)


        const price = document.createElement("p");
        price.className = "card-text";
        price.textContent = `$ ${product.price}`;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-outline-success";
        button.textContent = "Añadir al Carrito";
        button.onclick = () => addToCartModal(product);

        infoContainer.appendChild(stock);
        infoContainer.appendChild(price);

        cardBody.appendChild(title);
        cardBody.appendChild(category);
        cardBody.appendChild(infoContainer);
        cardBody.appendChild(button);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);

        productsContainer.appendChild(col);
    });
    updatePagination(arrayProducts, mapProducts, itemsPerPage, currentPage)
};

const addToCartModal = (product) => {
    const modalBody = document.querySelector("#cartModal .modal-body");
    const modalFooter = document.querySelector("#cartModal .modal-footer");

    modalBody.innerHTML = "";
    modalFooter.innerHTML = ""

    const card = document.createElement("div");
    card.className = "card border-0";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.className = "card-img-top";
    img.style.maxHeight = "250px";
    img.style.objectFit = "contain";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title fs-5";
    title.textContent = product.name;

    const category = document.createElement("p");
    category.className = "card-text";
    category.textContent = `Categoria: ${product.category}`;

    const stock = document.createElement("span");
    stock.className = "card-text";
    stock.textContent = `Stock: `;
    const stockNumber = document.createElement("span");
    
    const {lowThreshold, mediumThreshold, highThreshold} = JSON.parse(localStorage.getItem("configuration")).stock
    const stockLevel =
    product.stock <= lowThreshold ? "text-bg-danger" :
    product.stock <= mediumThreshold ? "text-bg-warning" :
    product.stock <= highThreshold ? "text-bg-success" :
    "text-bg-dark";    

    stockNumber.classList = `badge ${stockLevel} fs-6 px-2 py-1`
    stockNumber.textContent = `${product.stock}`;
    stock.appendChild(stockNumber)

    const price = document.createElement("span");
    price.style.maxHeight = 'fit-content'
    price.className = "badge text-bg-info bg-opacity-75 fs-6";
    price.textContent = `$ ${product.price}`;

    const priceQuantityWrapper = document.createElement("div");
    priceQuantityWrapper.appendChild(quantityHandler(product, price));
    priceQuantityWrapper.appendChild(price);
    priceQuantityWrapper.className = "d-flex justify-content-between align-items-center mt-3"

    cardBody.appendChild(title);
    cardBody.appendChild(category);
    cardBody.appendChild(stock);
    cardBody.appendChild(priceQuantityWrapper);

    card.appendChild(img);
    card.appendChild(cardBody);

    modalBody.appendChild(card);

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.className = "btn btn-secondary";
    cancelButton.setAttribute("data-bs-dismiss", "modal");
    cancelButton.textContent = "Cancelar";

    const confirmButton = document.createElement("button");
    confirmButton.type = "button";
    confirmButton.className = "btn btn-success";
    confirmButton.id = "confirmAddToCart";
    confirmButton.textContent = "Confirmar";
    confirmButton.onclick = () => {confirmAddToCart(product)}
    modalFooter.appendChild(cancelButton)
    modalFooter.appendChild(confirmButton)

    cartModal.show();
};

const quantityHandler = (product, price) => {
    const quantityContainer = document.createElement("div");
    quantityContainer.className = "d-flex align-items-center gap-2";

    const decreaseButton = document.createElement("button");
    decreaseButton.className = "btn btn-outline-danger btn-sm";
    decreaseButton.textContent = "-";

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.className = "form-control text-center";
    quantityInput.style.width = "80px";
    quantityInput.max = product.stock;
    quantityInput.value = 1;
    quantityInput.id = "quantityInput"

    const increaseButton = document.createElement("button");
    increaseButton.className = "btn btn-outline-success btn-sm";
    increaseButton.textContent = "+";

    const updatePrice = () => {
        let quantity = Number(quantityInput.value);

        if (quantity > product.stock) {
            quantity = product.stock;
        }

        quantityInput.value = quantity;
        price.textContent = `$ ${product.price * (quantity || 1)}`;
    };

    decreaseButton.onclick = () => {
        if (Number(quantityInput.value) > 1) {
            quantityInput.value = Number(quantityInput.value) - 1;
            updatePrice();
        }
    };

    increaseButton.onclick = () => {
        if (Number(quantityInput.value) < product.stock) {
            quantityInput.value = Number(quantityInput.value) + 1;
            updatePrice();
        }
    };

    quantityInput.addEventListener("input", updatePrice);

    quantityContainer.appendChild(decreaseButton);
    quantityContainer.appendChild(quantityInput);
    quantityContainer.appendChild(increaseButton);

    return quantityContainer;
};

const confirmAddToCart = (product) => {
    const quantity = document.getElementById("quantityInput").value
    product.quantity = Number(quantity)

    const userSession = JSON.parse(localStorage.getItem("userSession"))
    const cart = userSession.cart  || []

    const index = cart.findIndex((p) => 
        p.id === product.id
    )
    
    if(index !== -1) {
        cart[index].quantity += product.quantity
    } else cart.push(product)

    localStorage.setItem("userSession", JSON.stringify({...userSession, cart}))

    const toastTrigger = document.getElementById('confirmAddToCart')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
    }

    cartModal.hide()

    showNotification({
        type: "success",
        title: "Exito",
        message: "Producto agregado correctamente",
        icon: `<i class="bi bi-cart-check text-success"></i>`
    });
    showCartCount()
}

const resetFilters = () => {
    const floatingSelect = document.getElementById("floatingSelect");
    const searchInput = document.getElementById("searchInput");
    searchInput.value = "";
    floatingSelect.value = "";
}

const handleFilters = () => {
    const floatingSelect = document.getElementById("floatingSelect");
    const searchInput = document.getElementById("searchInput");

    const searchTerm = searchInput.value.trim().toLowerCase();

    const selectedCategories = [...floatingSelect.selectedOptions].map(
        option => option.value
    );

    const filteredProducts = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        return matchesSearch && matchesCategory;
    });

    mapProducts(currentPage, filteredProducts);
};