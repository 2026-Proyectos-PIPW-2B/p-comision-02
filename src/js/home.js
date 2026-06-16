import { showNotification } from "./utils.js";

const productsMock = [
    {
        id: 1,
        name: "Cable galvanizado reforzado para cercos rurales de alta resistencia",
        category: "Ferretería",
        stock: 125,
        price: 18500,
        image: "../img/products/cable_galvanizado.jpg",
    },
    {
        id: 2,
        name: "Cemento Portland CP40 x 50 kg",
        category: "Construcción",
        stock: 42,
        price: 9200,
        image: "../img/products/cemento.jpg",
    },
    {
        id: 3,
        name: "Cetol Classic Satinado Protector para Madera 4 L",
        category: "Pinturería",
        stock: 8,
        price: 48900,
        image: "../img/products/cetol.jpg",
    },
    {
        id: 4,
        name: "Ladrillo Cerámico Portante 18x19x33 cm",
        category: "Construcción",
        stock: 650,
        price: 1350,
        image: "../img/products/ladrilo.jpg",
    },
    {
        id: 5,
        name: "Cable Galvanizado Trenzado 6 mm para Alambrados",
        category: "Ferretería",
        stock: 87,
        price: 27300,
        image: "../img/products/cable_galvanizado.jpg",
    },
    {
        id: 6,
        name: "Cemento de Albañilería Plasticor Bolsa 40 kg",
        category: "Construcción",
        stock: 31,
        price: 7800,
        image: "../img/products/cemento.jpg",
    },
    {
        id: 7,
        name: "Cetol Deck Protector para Madera Exterior 1 L",
        category: "Pinturería",
        stock: 15,
        price: 21900,
        image: "../img/products/cetol.jpg",
    },
    {
        id: 8,
        name: "Ladrillo Común de Campo para Muros y Cerramientos",
        category: "Construcción",
        stock: 1200,
        price: 950,
        image: "../img/products/ladrilo.jpg",
    },
];

const categoriesMock = [
    {name: "Ferretería", description: "", color: "#DE1240"},
    {name: "Construcción", description: "", color: "#CB3999"},
    {name: "Pinturería", description: "", color: "#39589E"}
]

const modalElement = document.getElementById("cartModal");
const cartModal = new bootstrap.Modal(modalElement);
const cartModalBody = document.getElementById("cartModal-body");
const select = document.getElementById("floatingSelect");
const menu = document.getElementById("multiSelectMenu");
const button = document.getElementById("multiSelectButton");
const toast = document.getElementById("toastSuccess")

window.onload = () => {

    // products seed
    if(!localStorage.getItem("products") || JSON.parse(localStorage.getItem("products")).length === 0) {
        localStorage.setItem("products", JSON.stringify(productsMock))
        localStorage.setItem("productsId", "9")
    } 
    // categories seed
    if(!localStorage.getItem("categories") || JSON.parse(localStorage.getItem("categories")).length === 0) {
        localStorage.setItem("categories", JSON.stringify(categoriesMock))
    }
    
    const productsContainer = document.getElementById("productsContainer");
    mapProducts(JSON.parse(localStorage.getItem("products")), productsContainer);
    console.log(JSON.parse(localStorage.getItem("categories")));
    
    updateFilterCategories(JSON.parse(localStorage.getItem("categories")));
};

const updateFilterCategories = (categories) => {
    const floatingSelect = document.getElementById("floatingSelect");

    console.log(floatingSelect);

    floatingSelect.innerHTML = "";

    categories.forEach(({ name }) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;

        floatingSelect.appendChild(option);
    });

    console.log(floatingSelect);

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




const mapProducts = (products, productsContainer) => {
    productsContainer.innerHTML = ""
    if(!products) return 
    products.forEach((product) => {
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

        const stock = document.createElement("p");
        stock.className = "card-text";
        stock.textContent = `Stock: ${product.stock}`;

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

    const stock = document.createElement("p");
    stock.className = "card-text";
    stock.textContent = `Stock: ${product.stock}`;

    const price = document.createElement("span");
    price.style.maxHeight = 'fit-content'
    price.className = "badge text-bg-info bg-opacity-75 fs-6";
    price.textContent = `$ ${product.price}`;

    const priceQuantityWrapper = document.createElement("div");
    priceQuantityWrapper.appendChild(quantityHandler(product, price));
    priceQuantityWrapper.appendChild(price);
    priceQuantityWrapper.className = "d-flex justify-content-between align-items-center"

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

    const cart = JSON.parse(localStorage.getItem("cart")) || []

    const index = cart.findIndex((p) => 
        p.id === product.id
    )
    
    if(index !== -1) {
        cart[index].quantity += product.quantity
    } else cart.push(product)

    localStorage.setItem("cart", JSON.stringify(cart))

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
}

const handleFilters = () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];

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

    console.log(filteredProducts)
    mapProducts(filteredProducts, productsContainer);
};