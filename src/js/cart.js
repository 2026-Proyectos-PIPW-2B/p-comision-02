let cartMock = []

cartMock = [
    {
        id: 1,
        name: "Cable galvanizado reforzado para cercos rurales de alta resistencia",
        category: "Ferretería",
        quantity: 2,
        price: 18500,
        image: "../img/products/cable_galvanizado.jpg",
    },
    {
        id: 2,
        name: "Cemento Portland CP40 x 50 kg",
        category: "Construcción",
        quantity: 5,
        price: 9200,
        image: "../img/products/cemento.jpg",
    },
    {
        id: 3,
        name: "Cetol Classic Satinado Protector para Madera 4 L",
        category: "Pinturería",
        quantity: 1,
        price: 48900,
        image: "../img/products/cetol.jpg",
    },
    {
        id: 4,
        name: "Ladrillo Cerámico Portante 18x19x33 cm",
        category: "Construcción",
        quantity: 100,
        price: 1350,
        image: "../img/products/ladrilo.jpg",
    },
    {
        id: 1,
        name: "Cable galvanizado reforzado para cercos rurales de alta resistencia",
        category: "Ferretería",
        quantity: 2,
        price: 18500,
        image: "../img/products/cable_galvanizado.jpg",
    },
    {
        id: 2,
        name: "Cemento Portland CP40 x 50 kg",
        category: "Construcción",
        quantity: 5,
        price: 9200,
        image: "../img/products/cemento.jpg",
    },
    {
        id: 3,
        name: "Cetol Classic Satinado Protector para Madera 4 L",
        category: "Pinturería",
        quantity: 1,
        price: 48900,
        image: "../img/products/cetol.jpg",
    },
    {
        id: 4,
        name: "Ladrillo Cerámico Portante 18x19x33 cm",
        category: "Construcción",
        quantity: 100,
        price: 1350,
        image: "../img/products/ladrilo.jpg",
    }
];

window.onload = () => {
    const cartContainer = document.getElementById("cartContainer");

    if (!cartMock.length) {
        mapEmptyCart(cartContainer);
    } else {
        mapProductsCart(cartMock, cartContainer);
    }
};

const mapEmptyCart = (cartContainer) => {
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

const mapProductsCart = (cartMock, cartContainer) => {
    const total = cartMock.reduce(
        (acc, product) =>
            acc + Number(product.price) * Number(product.quantity),
        0
    );

    const row = document.createElement("div");
    row.className = "row g-4";

    const leftCol = document.createElement("div");
    leftCol.className = "col-lg-8";

    cartMock.forEach((product) => {
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
        infoCol.appendChild(quantity);

        const priceCol = document.createElement("div");
        priceCol.className = "col-auto text-end";

        const unitPrice = document.createElement("p");
        unitPrice.className = "text-secondary mb-1";
        unitPrice.textContent = `$ ${Number(product.price).toLocaleString()} c/u`;

        const price = document.createElement("h5");
        price.className = "mb-0";
        price.textContent = `$ ${subtotal.toLocaleString()}`;

        priceCol.appendChild(unitPrice);
        priceCol.appendChild(price);

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

function confirmPurchase() {
    
    const modalElement = document.getElementById("exampleModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    modal.hide();
}