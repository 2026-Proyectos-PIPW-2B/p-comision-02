import { updatePagination } from "../common/utils.js";
import { usersApi } from "../api/usersApi.js";

let orders
let currentPage;
let itemsPerPage;
let nextPageBtn;
let previousPageBtn;

window.addEventListener("load", () => {
    const logoutButton = document.getElementById("logoutButton");
    const users = usersApi.getAllUsers();
    orders = JSON.parse(localStorage.getItem("orders")) || [];
    
    currentPage = 1;
    itemsPerPage = JSON.parse(localStorage.getItem("configuration")).pagination.admin
    nextPageBtn = document.getElementById("nextPage");
    previousPageBtn = document.getElementById("previousPage");

    previousPageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(orders.length / itemsPerPage);
        if (currentPage > 1) {
            currentPage--;
            mapOrders();
        }
    });
    nextPageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(orders.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            mapOrders();
        }
    });

    mapOrders();
    showEmptyCard()

});


const mapOrders = (page) => {
    const tbody = document.getElementById("tbodyOrders");
    tbody.innerHTML = "";
    currentPage = page || currentPage;
    const userSession = JSON.parse(localStorage.getItem("userSession"));

    if (!orders.length) {
        const tr = document.createElement("tr");

        const td = document.createElement("td");
        td.colSpan = 4;
        td.className = "text-center";
        td.textContent = "No hay órdenes registradas";

        tr.appendChild(td);
        tbody.appendChild(tr);

        return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedOrders = orders.slice(startIndex, endIndex);

    paginatedOrders.forEach((order) => {
        const tr = document.createElement("tr");

        // ID
        const tdId = document.createElement("td");
        tdId.textContent = order.id;

        // User
        const tdUser = document.createElement("td")
        tdUser.textContent = order.username 

        // Productos
        const tdProducts = document.createElement("td");

        const productsInfo = document.createElement("span");
        productsInfo.textContent = `${order.products.length} producto${order.products.length !== 1 ? "s" : ""}`;

        const tdViewButton = document.createElement("td");
        const viewButton = document.createElement("button");
        viewButton.className = "btn text-primary p-0";
        viewButton.addEventListener("click", () => showDetailedCard(order))
        viewButton.innerHTML = `<i class="bi bi-eye"></i>`;
        tdViewButton.appendChild(viewButton)


        tdProducts.appendChild(productsInfo);

        // Monto total
        const tdTotal = document.createElement("td");
        tdTotal.className = `text-end` 
        tdTotal.textContent = `$ ${Number(order.total).toLocaleString()}`;

        // Fecha
        const tdDate = document.createElement("td");
        tdDate.textContent = order.date;

        tr.appendChild(tdId);
        tr.appendChild(tdUser)
        tr.appendChild(tdProducts);
        tr.appendChild(tdTotal);
        tr.appendChild(tdDate);
        tr.appendChild(tdViewButton)

        tbody.appendChild(tr);
    });
    updatePagination(orders, mapOrders, itemsPerPage, currentPage);
};

const showEmptyCard = () => {
    const sidebarBody = document.getElementById("sidebarBody");

    sidebarBody.innerHTML = "";

    const title = document.createElement("h5");
    title.textContent = "Detalle de pedido";

    const container = document.createElement("div");
    container.className = "d-flex flex-column justify-content-center align-items-center text-center py-2 text-secondary";

    const icon = document.createElement("i");
    icon.className = "bi bi-receipt fs-1 mb-3";

    const message = document.createElement("p");
    message.className = "mb-1 fw-semibold";
    message.textContent = "No hay ningún pedido seleccionado";

    const helpText = document.createElement("small");
    helpText.textContent = "Hacé clic en un pedido de la lista para ver su detalle.";

    container.appendChild(icon);
    container.appendChild(message);
    container.appendChild(helpText);

    sidebarBody.appendChild(title);
    sidebarBody.appendChild(container);
};

const showDetailedCard = ({ id, username, products, total, date }) => {
    const sidebarBody = document.getElementById("sidebarBody");
    sidebarBody.innerHTML = "";

    const title = document.createElement("h5");
    title.textContent = `Detalle de pedido: #${id}`;

    const productsList = document.createElement("div");
    productsList.className = "d-flex flex-column gap-3 mt-3";

    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "card";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex";

        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.product;
        productImage.className = "rounded";
        productImage.style.width = "110px";
        productImage.style.objectFit = "contain";

        const productInfo = document.createElement("div");
        productInfo.className = "flex-grow-1";

        const productName = document.createElement("h6");
        productName.className = "card-title mb-2";
        productName.textContent = product.product;

        const productCategory = document.createElement("p");
        productCategory.className = "mb-1 text-secondary";
        productCategory.textContent = `${product.category}`;

        const productQuantity = document.createElement("p");
        productQuantity.className = "mb-1";
        productQuantity.textContent = `Cantidad: ${product.quantity}`;

        const productPrice = document.createElement("p");
        productPrice.className = "mb-0";
        productPrice.textContent = `Precio unitario: $${Number(product.price).toLocaleString()}`;

        productInfo.appendChild(productName);
        productInfo.appendChild(productCategory);
        productInfo.appendChild(productQuantity);
        productInfo.appendChild(productPrice);

        cardBody.appendChild(productImage);
        cardBody.appendChild(productInfo);

        productCard.appendChild(cardBody);
        productsList.appendChild(productCard);
    });

    sidebarBody.appendChild(title);
    sidebarBody.appendChild(productsList);
};