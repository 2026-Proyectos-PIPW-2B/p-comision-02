export const productsMock = [
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

export const categoriesMock = [
    {name: "Ferretería", description: "", color: "#DE1240"},
    {name: "Construcción", description: "", color: "#CB3999"},
    {name: "Pinturería", description: "", color: "#39589E"}
]

export const usersMock = [
	{
		name: "Ignacio",
		lastname: "Alonso",
		username: "ignacio.admin",
		password: "Admin1234*",
		isAdmin: true,
		orders: [],
		isAllowed: true,
	},
	{
		name: "Juan",
		lastname: "Pérez",
		username: "juan.perez",
		password: "User1234*",
		isAdmin: false,
		orders: [],
		isAllowed: true,
	},
	{
		name: "Pedro",
		lastname: "Martin",
		username: "pedro.martin",
		password: "User1234*",
		isAdmin: false,
		orders: [],
		isAllowed: false,
	},
];
