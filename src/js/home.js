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

window.onload = () => {
    const productsContainer = document.getElementById("productsContainer");
    mapProducts(productsMock, productsContainer);
};

const mapProducts = (products, productsContainer) => {
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

