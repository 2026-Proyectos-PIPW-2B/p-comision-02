let cart = JSON.parse(localStorage.getItem('cart')) || []

window.onload = () => {
    const cartContainer = document.getElementById("cartContainer");

    if (!cart.length) {
        mapEmptyCart(cartContainer);
    } else {
        mapProductsCart(cart, cartContainer);
    }
};

const mapEmptyCart = (cartContainer) => {
    cartContainer.innerHTML = ""
    const row = document.createElement("div");
    row.className = "row g-4";

    const leftCol = document.createElement("div");
    leftCol.className = "col-lg-8";

    const emptyCard = document.createElement("div");
    emptyCard.className = "card border-0 shadow-sm";

    const emptyCardBody = document.createElement("div");
    emptyCardBody.className = "card-body p-4";

    const emptyRow = document.createElement("div");
    emptyRow.className = "row align-items-center";

    const iconCol = document.createElement("div");
    iconCol.className = "col-auto";

    const icon = document.createElement("i");
    icon.className = "bi bi-cart-dash display-5";

    iconCol.appendChild(icon);

    const textCol = document.createElement("div");
    textCol.className = "col";

    const title = document.createElement("h4");
    title.className = "fw-semibold mb-2";
    title.textContent = "Tu carrito está vacío";

    const description = document.createElement("p");
    description.className = "mb-0";
    description.textContent =
        "Acá verás los productos que agregues al carrito";

    textCol.appendChild(title);
    textCol.appendChild(description);

    const linkCol = document.createElement("div");
    linkCol.className = "col-auto";

    const link = document.createElement("a");
    link.href = "../pages/home.html";
    link.className = "text-decoration-none";
    link.textContent = "Volver al catálogo";

    linkCol.appendChild(link);

    emptyRow.appendChild(iconCol);
    emptyRow.appendChild(textCol);
    emptyRow.appendChild(linkCol);

    emptyCardBody.appendChild(emptyRow);
    emptyCard.appendChild(emptyCardBody);
    leftCol.appendChild(emptyCard);

    const rightCol = document.createElement("div");
    rightCol.className = "col-lg-4";

    const summaryCard = document.createElement("div");
    summaryCard.className = "card border-0 shadow-sm";

    const summaryHeader = document.createElement("div");
    summaryHeader.className = "card-header bg-white py-3";

    const summaryTitle = document.createElement("h5");
    summaryTitle.className = "mb-0 text-secondary";
    summaryTitle.textContent = "Resumen de compra";

    summaryHeader.appendChild(summaryTitle);

    const summaryBody = document.createElement("div");
    summaryBody.className = "card-body";

    const summaryText = document.createElement("p");
    summaryText.className = "text-secondary mb-0";
    summaryText.textContent =
        "Acá verás el precio total de tu compra.";

    summaryBody.appendChild(summaryText);

    summaryCard.appendChild(summaryHeader);
    summaryCard.appendChild(summaryBody);

    rightCol.appendChild(summaryCard);

    row.appendChild(leftCol);
    row.appendChild(rightCol);

    cartContainer.appendChild(row);
};

const mapProductsCart = (cart, cartContainer) => {
    cartContainer.innerHTML = ""
    const total = cart.reduce(
        (acc, product) =>
            acc + Number(product.price) * Number(product.quantity),
        0
    );

    const row = document.createElement("div");
    row.className = "row g-4";

    const leftCol = document.createElement("div");
    leftCol.className = "col-lg-8";

    cart.forEach((product) => {
        const subtotal =
            Number(product.price) * Number(product.quantity);

        const card = document.createElement("div");
        card.className = "card border-0 shadow-sm mb-3";

        const body = document.createElement("div");
        body.className = "card-body";

        const productRow = document.createElement("div");
        productRow.className = "row align-items-center";

        const imageCol = document.createElement("div");
        imageCol.className = "col-auto";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.style.width = "100px";
        image.style.height = "100px";
        image.style.objectFit = "contain";

        imageCol.appendChild(image);

        const infoCol = document.createElement("div");
        infoCol.className = "col";

        const name = document.createElement("h5");
        name.className = "mb-1";
        name.textContent = product.name;

        const category = document.createElement("p");
        category.className = "text-secondary mb-1";
        category.textContent = product.category;

        const quantity = document.createElement("p");
        quantity.className = "text-secondary mb-0";
        quantity.textContent = `Cantidad: ${product.quantity}`;

        infoCol.appendChild(name);
        infoCol.appendChild(category);

        const priceCol = document.createElement("div");
        priceCol.className = "col-auto text-end";

        const unitPrice = document.createElement("p");
        unitPrice.className = "text-secondary mb-1";
        unitPrice.textContent = `$ ${Number(product.price).toLocaleString()} c/u`;

        const price = document.createElement("h5");
        price.className = "mb-0";
        price.textContent = `$ ${subtotal.toLocaleString()}`;

        const trashButton = document.createElement("button")
        trashButton.className = "btn mt-2 d-block mx-auto";
        const trashIcon = document.createElement("i")
        trashIcon.className = "bi bi-trash"
        trashButton.onclick = () => {trashProductModal(product)}
        trashButton.appendChild(trashIcon)
        
        infoCol.appendChild(quantityHandler(product, price));

        priceCol.appendChild(unitPrice);
        priceCol.appendChild(price);
        priceCol.appendChild(trashButton)

        productRow.appendChild(imageCol);
        productRow.appendChild(infoCol);
        productRow.appendChild(priceCol);

        body.appendChild(productRow);
        card.appendChild(body);

        leftCol.appendChild(card);
    });

    const rightCol = document.createElement("div");
    rightCol.className = "col-lg-4";

    const summaryCard = document.createElement("div");
    summaryCard.className = "card border-0 shadow-sm sticky-top";
    summaryCard.style.top = "90px";

    const summaryHeader = document.createElement("div");
    summaryHeader.className = "card-header bg-white py-3";

    const summaryTitle = document.createElement("h5");
    summaryTitle.className = "mb-0 text-secondary";
    summaryTitle.textContent = "Resumen de compra";

    summaryHeader.appendChild(summaryTitle);

    const summaryBody = document.createElement("div");
    summaryBody.className = "card-body d-flex flex-column ";

    const totalLabel = document.createElement("p");
    totalLabel.className =
        "d-flex justify-content-between fw-semibold mb-0";
    totalLabel.id = 'totalCart'
    totalLabel.innerHTML = `
        <span>Total</span>
        <span>$ ${total.toLocaleString()}</span>
    `;

    summaryBody.appendChild(totalLabel);

    summaryCard.appendChild(summaryHeader);
    summaryCard.appendChild(summaryBody);

    rightCol.appendChild(summaryCard);

    row.appendChild(leftCol);
    row.appendChild(rightCol);

    const checkoutButton = document.createElement("button");
    checkoutButton.type = "button";
    checkoutButton.className = "btn btn-outline-success w-50 mt-3 align-self-end";
    checkoutButton.textContent = "Finalizar compra";

    checkoutButton.setAttribute("data-bs-toggle", "modal");
    checkoutButton.setAttribute("data-bs-target", "#exampleModal");

    summaryBody.appendChild(checkoutButton);

    cartContainer.appendChild(row);
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
    quantityInput.value = product.quantity;
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

            const newCart = JSON.parse(localStorage.getItem("cart")).map((p) => {
                if (p.id === product.id) {
                    return {
                        ...p,
                        quantity: p.quantity -=1
                    };
                }

                return p;
            });
            
            localStorage.setItem("cart", JSON.stringify(newCart));
            const totalLabel = document.getElementById('totalCart')
            const total = newCart.reduce(
                (acc, product) =>
                    acc + Number(product.price) * Number(product.quantity),
                0
            );
            totalLabel.innerHTML = `
                <span>Total</span>
                <span>$ ${total.toLocaleString()}</span>
            `;
        } else trashProductModal(product)
    };

    increaseButton.onclick = () => {
        if (Number(quantityInput.value) < product.stock) {
            quantityInput.value = Number(quantityInput.value) + 1;
            updatePrice();

            const newCart = JSON.parse(localStorage.getItem("cart")).map((p) => {
                if (p.id === product.id) {
                    return {
                        ...p,
                        quantity: p.quantity + 1
                    };
                }

                return p;
            });
            
            localStorage.setItem("cart", JSON.stringify(newCart));
            const totalLabel = document.getElementById('totalCart')
            const total = newCart.reduce(
                (acc, product) =>
                    acc + Number(product.price) * Number(product.quantity),
                0
            );
            totalLabel.innerHTML = `
                <span>Total</span>
                <span>$ ${total.toLocaleString()}</span>
            `;
        }
    };

    quantityInput.addEventListener("input", updatePrice);

    quantityContainer.appendChild(decreaseButton);
    quantityContainer.appendChild(quantityInput);
    quantityContainer.appendChild(increaseButton);

    return quantityContainer;
};

const trashProductModal = (product) => {
    
    const modalElement = document.getElementById("trashProductModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    
    const modalButton = document.querySelector("#trashProductModal .btn-danger")
    const img = document.querySelector("#trashProductModal img");
    const name = document.querySelector("#trashProductModal h3");
    
    modalButton.onclick = () => {trashProductHandler(product)}
    img.src = product.image
    name.textContent = product.name

    modal.show();
}

const trashProductHandler = (product) => {

    const cartContainer = document.getElementById("cartContainer");
    const modalElement = document.getElementById("trashProductModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    const cart = JSON.parse(localStorage.getItem("cart"))
    const newCart = cart.filter(p => p.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(newCart));


    if (!newCart.length) {
        mapEmptyCart(cartContainer);
    } else {
        mapProductsCart(newCart, cartContainer);
    }
    modal.hide()
}


function confirmPurchase() {
    
    const modalElement = document.getElementById("exampleModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    modal.hide();
}