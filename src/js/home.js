const productsMock = [
    {
        id: 1,
        name: "Cable galvanizado",
        category: "Ferreteria",
        stock: 3,
        price: 6000,
        image: "../img/products/cable_galvanizado.jpg",
    },
    {
        id: 2,
        name: "Cemento",
        category: "Construccion",
        stock: 3,
        price: 6000,
        image: "../img/products/cemento.jpg",
    },
    {
        id: 3,
        name: "Cetol",
        category: "Limpieza",
        stock: 3,
        price: 6000,
        image: "../img/products/cetol.jpg",
    },
    {
        id: 4,
        name: "Ladrillo",
        category: "Construccion",
        stock: 3,
        price: 6000,
        image: "../img/products/ladrilo.jpg",
    },
];

window.onload = () => {
    const productsContainer = document.getElementById("productsContainer");
    mapProducts(productsMock, productsContainer);
};

const mapProducts = (products, productsContainer) => {
    products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.className = "card-img-top";
        img.style.maxHeight = "300px";
        img.style.objectFit = "cover";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const title = document.createElement("h5");
        title.className = "card-title";
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

        infoContainer.appendChild(stock);
        infoContainer.appendChild(price);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-outline-success";
        button.textContent = "Añadir al Carrito";

        cardBody.appendChild(title);
        cardBody.appendChild(category);
        cardBody.appendChild(infoContainer);
        cardBody.appendChild(button);

        card.appendChild(img);
        card.appendChild(cardBody);

        productsContainer.appendChild(card);
    });
};