export function showNotification(notification) {
    const notificationDiv = document.createElement("div");
    notificationDiv.className = `toast__notification toast__notification--${notification.type}`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "toast__notification-content";

    const strong = document.createElement("strong");
    strong.innerHTML =
        notification.type === "error"
            ? `${notification.icon} No se puede ${notification.title}`
            : `${notification.icon}<span class="text-dark"> ${notification.title}</span></i>`;

    const span = document.createElement("span");
    span.textContent = notification.message;

    contentDiv.append(strong, span);
    notificationDiv.appendChild(contentDiv);

    document.body.appendChild(notificationDiv);

    // Después de 3 segundos inicia la animación de salida
    setTimeout(() => {
        notificationDiv.classList.add("toast__notification--closing");

        notificationDiv.addEventListener(
            "animationend",
            () => notificationDiv.remove(),
            { once: true },
        );
    }, notification.time || 3000);
}

export function createActionsButtons(parent, editHandler, deleteHandler) {
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    const wrapper =  document.createElement("div");
    wrapper.classList.add("d-flex", "justify-content-center", "gap-2")

    editBtn.classList.add("btn", "btn-sm", "btn-outline-primary");
    deleteBtn.classList.add("btn", "btn-sm", "btn-outline-danger");

    editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>';
    deleteBtn.innerHTML = '<i class="bi bi-trash-fill"></i>';

    editBtn.onclick = editHandler;
    deleteBtn.onclick = deleteHandler;

    wrapper.appendChild(editBtn)
    wrapper.appendChild(deleteBtn)

    parent.appendChild(wrapper);
}

export const trashModal = (type, trashHandler) => {
    const modalElement = document.getElementById("trashModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    const title = document.getElementById("trashModalLabel");
    const subtitle = document.querySelector("#trashModal h3");
    const modalButton = document.querySelector("#trashModal .btn-danger");

    title.textContent = `Eliminar ${type}`;
    subtitle.textContent = `¿Quieres eliminar ${type === "categoría" ? "esta" : "este"} ${type}?`;
    modalButton.onclick = () => {
        trashHandler();
    };

    modal.show();
};

export function showCartCount() {
    const cart = JSON.parse(localStorage.getItem("userSession")).cart || [];
    const cartCount = document.getElementById("cartItemCount");
    cartCount.textContent = cart.length;
}

export function updatePagination(array, listFunction, itemsPerPage, currentPage) {
    const totalPages = Math.ceil(array.length / itemsPerPage);
    const prevButton = document.getElementById("previousPage");
    const nextButton = document.getElementById("nextPage");
    document.querySelectorAll(".dynamic-page-item").forEach((el) => el.remove());

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.classList.add("page-item", "dynamic-page-item");

        if (i === currentPage) li.classList.add("active");

        const a = document.createElement("a");
        a.classList.add("page-link");
        a.href = "";
        a.textContent = i;

        a.addEventListener("click", (e) => {
            e.preventDefault();
            listFunction(i, array);
            window.scrollTo({ top: 0, behavior: 'smooth' })
        });

        li.appendChild(a);

        nextButton.parentNode.parentNode.insertBefore(li, nextButton.parentNode);
    }
    paginatedButtonsHandler(array, listFunction, totalPages, currentPage);
    prevButton.classList.toggle("disabled", currentPage === 1);
    nextButton.classList.toggle("disabled", currentPage === totalPages || totalPages === 0);
}

const paginatedButtonsHandler = (array, listFunction, totalPages, currentPage) => {
    const nextPageBtn = document.getElementById("nextPage")
    const previousPageBtn = document.getElementById("previousPage")
    previousPageBtn.onclick = (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--
            listFunction(currentPage, array);
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
    nextPageBtn.onclick = (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++
            listFunction(currentPage, array);
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}

export const adminNavbar = (admin) => {
    const navbarPanel = document.querySelector(".navbar-brand")
    const switchButton = document.createElement("button")
    switchButton.className = `btn text-bg-dark ms-2`
    switchButton.textContent = admin ? `Cambiar a cliente` : `Cambiar a admin`
    switchButton.onclick = () => {
        window.location.href = admin ?  "/p-comision-02/src/pages/home.html" : "/p-comision-02/src/pages/admin/products-manager.html"
    } 
    navbarPanel.appendChild(switchButton)
}

export const priceSortFilter = (array, sortOrder) => {
    const priceSortIcon = document.getElementById("priceSortIcon");
    const filteredArray = [...array];
    switch (sortOrder) {
        case 0:
            priceSortIcon.className = "fas fa-sort";
            break
        case 1:
            filteredArray.sort((a, b) => a.price - b.price);
            priceSortIcon.className = "fas fa-arrow-up";
            break;
        case 2:
            filteredArray.sort((a, b) => b.price - a.price);
            priceSortIcon.className = "fas fa-arrow-down";
            break;
        default:
            break
    }
    return filteredArray;
}

export const nameSortFilter = (array, sortOrder) => {
    const nameSortIcon = document.getElementById("nameSortIcon");
    const filteredArray = [...array];
    switch (sortOrder) {
        case 0:
            nameSortIcon.className = "fas fa-sort";
            break;
        case 1:
            filteredArray.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            nameSortIcon.className = "fas fa-arrow-up";
            break;
        case 2:
            filteredArray.sort((a, b) =>
                b.name.localeCompare(a.name)
            );
            nameSortIcon.className = "fas fa-arrow-down";
            break;
        default:
            break;
    }
    return filteredArray;

}