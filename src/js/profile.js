import { updatePagination } from "./common/utils.js";
import { usersApi } from "./api/usersApi.js";
import { configurationApi } from "./api/configurationApi.js";
import { ordersApi } from "./api/ordersApi.js";

let user;
let userOrders;
let currentPage;
let itemsPerPage;
let priceSortingStatus;
let dateSortingStatus;

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

    userOrders = ordersApi.getOrdersByUser(userSession.username);
    currentPage = 1;
    itemsPerPage = configurationApi.getConfiguration().pagination.profile

    user = usersApi.getUserByUsername(userSession.username);
    changeProfileImage(user?.profileImage);
    const editProfileImageButton = document.getElementById(
        "editProfileImageButton",
    );
    editProfileImageButton.addEventListener("click", () => {
        const profileImages = [
            "/p-comision-02/src/img/blank-profile-picture-973460_960_720.png",
            "/p-comision-02/src/img/cat-profile-img.jpg",
            "/p-comision-02/src/img/minion-profile-img.jpg",
            "/p-comision-02/src/img/profile-1197063289.png"
        ];
        showProfileModal(profileImages);
    })

    priceSortingStatus = 0
    const totalAmountHeader = document.getElementById("totalAmountHeader");
    totalAmountHeader.onclick = () => {
        dateSortingStatus = 0
        priceSortingStatus = (priceSortingStatus + 1) % 3;
        handleFilters();
    };

    dateSortingStatus = 0
    const dateSortHeader = document.getElementById("dateSortHeader");
    dateSortHeader.onclick = () => {
        priceSortingStatus = 0
        dateSortingStatus = (dateSortingStatus + 1) % 3;
        handleFilters();
    };
    const dateStart = document.getElementById("dateStart")
    const dateEnd = document.getElementById("dateEnd")
    dateStart.onchange = () => {
        const FilteredArray = dateFilter(userOrders)
        mapOrders(currentPage, FilteredArray)
    }

    dateEnd.onchange = () => {
        const FilteredArray = dateFilter(userOrders)
        mapOrders(currentPage, FilteredArray)
    }

    mapOrders(currentPage, userOrders);
});

const logout = () => {
    localStorage.removeItem("userSession");
    window.location.href = `/p-comision-02/src/pages/login.html`;
};

const mapOrders = (page, array) => {
    const tbody = document.getElementById("tbodyOrders");
    tbody.innerHTML = "";
    currentPage = page || currentPage;

    if (!array.length) {
        const tr = document.createElement("tr");

        const td = document.createElement("td");
        td.colSpan = 5;
        td.className = "text-center";
        td.textContent = "No hay órdenes registradas";

        tr.appendChild(td);
        tbody.appendChild(tr);

        return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedOrders = array.slice(startIndex, endIndex);

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
    updatePagination(array, mapOrders, itemsPerPage, currentPage);
};

const handleFilters = () => {
    let filteredOrders = [...userOrders]

    filteredOrders = priceSortFilter(filteredOrders, priceSortingStatus)
    filteredOrders = dateSortFilter(filteredOrders, dateSortingStatus)
    mapOrders(1, filteredOrders);
};

const priceSortFilter = (array, sortOrder) => {
    const priceSortIcon = document.getElementById("priceSortIcon");
    const filteredArray = [...array];
    switch (sortOrder) {
        case 0:
            priceSortIcon.className = "fas fa-sort";
            break
        case 1:
            filteredArray.sort((a, b) => a.total - b.total);
            priceSortIcon.className = "fas fa-arrow-up";
            break;
        case 2:
            filteredArray.sort((a, b) => b.total - a.total);
            priceSortIcon.className = "fas fa-arrow-down";
            break;
        default:
            break
    }
    return filteredArray;
}

const parsearFecha = (fechaString) => {
    if (!fechaString) return 0;

    const [fecha, hora] = fechaString.split(", ");
    
    const [dia, mes, anio] = fecha.split("/");
    
    const [horas, minutos, segundos] = hora.split(":");

    return new Date(anio, mes - 1, dia, horas, minutos, segundos).getTime();
};

const dateSortFilter = (array, sortOrder) => {
    const dateSortIcon = document.getElementById("dateSortIcon"); 
    const filteredArray = [...array];

    switch (sortOrder) {
        case 0:
            dateSortIcon.className = "fas fa-sort";
            break;
        case 1:
            filteredArray.sort((a, b) => parsearFecha(a.date) - parsearFecha(b.date));
            dateSortIcon.className = "fas fa-arrow-up";
            break;
        case 2:
            filteredArray.sort((a, b) => parsearFecha(b.date) - parsearFecha(a.date));
            dateSortIcon.className = "fas fa-arrow-down";
            break;
        default:
            break;
    }
    
    return filteredArray;
}

const dateFilter = (orders) => {
    const FilteredOrders = [...orders]
    const dateStart = document.getElementById("dateStart").value
    const dateEnd = document.getElementById("dateEnd").value

    if (!dateStart && !dateEnd) {
        return orders;
    }

    let startObj = -Infinity;
    if (dateStart) {
        startObj = new Date(dateStart + "T00:00:00").getTime();
    }

    let endObj = Infinity;
    if (dateEnd) {
        endObj = new Date(dateEnd + "T23:59:59").getTime();
    }

    return FilteredOrders.filter((o) => {
        const orderDateObj = parseDate(o.date).getTime()
        return orderDateObj >= startObj && orderDateObj <= endObj
    })
}

const parseDate = (dateString) => {
    const [date, hour] = dateString.split(", ");
    const [day, month, year] = date.split("/");
    return new Date(year, month - 1, day)
}

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
