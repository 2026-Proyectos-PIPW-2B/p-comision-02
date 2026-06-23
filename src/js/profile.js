import { updatePagination } from "./common/utils.js";
import { usersApi } from "./api/usersApi.js";

let user;
let userOrders;
let currentPage;
let itemsPerPage;
let nextPageBtn;
let previousPageBtn;

window.addEventListener("load", () => {
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", () => {
        logout();
    });
    const users = usersApi.getAllUsers();
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    const namelastname = document.getElementById("namelastname");
    const username = document.getElementById("username");
    namelastname.textContent = `${userSession.name} ${userSession.lastname}`;
    username.textContent = userSession.username;

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    userOrders = orders.filter(
        (order) => order.username === userSession.username,
    );
    currentPage = 1;
    itemsPerPage = JSON.parse(localStorage.getItem("configuration")).pagination.profile
    nextPageBtn = document.getElementById("nextPage");
    previousPageBtn = document.getElementById("previousPage");

    user = usersApi.getUserByUsername(userSession.username);
    changeProfileImage(user?.profileImage);
    const editProfileImageButton = document.getElementById(
        "editProfileImageButton",
    );
    editProfileImageButton.addEventListener("click", () => {
        const profileImages = [
            "/src/img/blank-profile-picture-973460_960_720.png",
            "/src/img/cat-profile-img.jpg",
            "/src/img/minion-profile-img.jpg",
            "/src/img/profile-1197063289.png"
        ];
        showProfileModal(profileImages);
    });

    previousPageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(userOrders.length / itemsPerPage);
        if (currentPage > 1) {
            currentPage--;
            mapOrders();
        }
    });
    nextPageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(userOrders.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            mapOrders();
        }
    });

    mapOrders();
});

const logout = () => {
    localStorage.removeItem("userSession");
    window.location.href = `/src/pages/login.html`;
};

const mapOrders = (page) => {
    const tbody = document.getElementById("tbodyCategories");
    tbody.innerHTML = "";
    currentPage = page || currentPage;
    const userSession = JSON.parse(localStorage.getItem("userSession"));

    if (!userOrders.length) {
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
    const paginatedOrders = userOrders.slice(startIndex, endIndex);

    paginatedOrders.forEach((order) => {
        const tr = document.createElement("tr");

        // ID
        const tdId = document.createElement("td");
        tdId.textContent = order.id;

        // Productos
        const tdProducts = document.createElement("td");

        const productsInfo = document.createElement("span");
        productsInfo.textContent = `${order.products.length} producto${order.products.length !== 1 ? "s" : ""}`;

        const tdViewButton = document.createElement("td");
        const viewButton = document.createElement("button");
        viewButton.className = "btn text-primary p-0";
        viewButton.innerHTML = `<i class="bi bi-eye"></i>`;
        tdViewButton.appendChild(viewButton)

        viewButton.onclick = () => {
            showProductsModal(order.products);
        };

        tdProducts.appendChild(productsInfo);

        // Monto total
        const tdTotal = document.createElement("td");
        tdTotal.className = `text-end` 
        tdTotal.textContent = `$ ${Number(order.total).toLocaleString()}`;

        // Fecha
        const tdDate = document.createElement("td");
        tdDate.textContent = order.date;

        tr.appendChild(tdId);
        tr.appendChild(tdProducts);
        tr.appendChild(tdTotal);
        tr.appendChild(tdDate);
        tr.appendChild(tdViewButton)

        tbody.appendChild(tr);
    });
    updatePagination(userOrders, mapOrders, itemsPerPage, currentPage);
};

const showProductsModal = (products) => {
    const modalTitle = document.getElementById("staticBackdropLabel");
    const modalBody = document.querySelector("#staticBackdrop .modal-body");

    modalTitle.textContent = `Mostrando ${products.length} producto${products.length > 1 ? `s` : ``}`;

    // Limpiar contenido anterior
    modalBody.innerHTML = "";

    products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "card mb-3";

        const row = document.createElement("div");
        row.className = "row g-0";

        const imageCol = document.createElement("div");
        imageCol.className = "col-4";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.product;
        image.className = "img-fluid rounded-start h-100 object-fit-cover";

        imageCol.appendChild(image);

        const contentCol = document.createElement("div");
        contentCol.className = "col-8";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = product.product;

        const category = document.createElement("p");
        category.className = "card-text mb-1";
        category.innerHTML = `<strong>Categoría:</strong> ${product.category}`;

        const price = document.createElement("p");
        price.className = "card-text mb-1";
        price.innerHTML = `<strong>Precio Unitario:</strong> $${product.price.toLocaleString()}`;

        const quantity = document.createElement("p");
        quantity.className = "card-text mb-0";
        quantity.innerHTML = `<strong>Cantidad:</strong> ${product.quantity}`;

        cardBody.appendChild(title);
        cardBody.appendChild(category);
        cardBody.appendChild(price);
        cardBody.appendChild(quantity);

        contentCol.appendChild(cardBody);

        row.appendChild(imageCol);
        row.appendChild(contentCol);

        card.appendChild(row);

        modalBody.appendChild(card);
    });

    const modal = new bootstrap.Modal(
        document.getElementById("staticBackdrop"),
    );

    modal.show();
};

const showProfileModal = (images) => {
    const modalElement = document.getElementById("staticBackdropProfile");
    const modalTitle = document.getElementById("staticBackdropLabelProfile");
    const modalBody = document.querySelector("#staticBackdropProfile .row");

    modalTitle.textContent = `Cambiar foto de perfil`;

    // Limpiar contenido anterior
    modalBody.innerHTML = "";

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement)

    images.forEach((element) => {
        const col = document.createElement("div");
        col.className = "col mb-3";

        const card = document.createElement("div");
        card.className = "card h-100 cursor-pointer overflow-hidden";

        const image = document.createElement("img");
        image.src = element;
        image.className = "img-fluid w-100 h-100 object-fit-cover";

        card.appendChild(image);
        col.appendChild(card);

        card.addEventListener("click", () => {
            changeProfileImage(element);
            modal.hide()
        });

        modalBody.appendChild(col);
    });

    modal.show();
};

function changeProfileImage(newImageUrl) {
    const profileImage = document.getElementById("profileImage");
    if (profileImage) {
        user.profileImage = newImageUrl;
        usersApi.updateUser(user);
        profileImage.src = newImageUrl;
    }
}
