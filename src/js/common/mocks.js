export const productsMock = [
    {
        id: 1,
        name: "Cable galvanizado reforzado para cercos rurales",
        category: "Ferretería",
        stock: 125,
        price: 18500,
        image: "/src/img/products/cable_galvanizado.jpg",
    },
    {
        id: 2,
        name: "Cemento Portland CP40 x 50 kg",
        category: "Construcción",
        stock: 42,
        price: 9200,
        image: "/src/img/products/cemento.jpg",
    },
    {
        id: 3,
        name: "Cetol Classic Satinado Protector para Madera 4 L",
        category: "Pinturería",
        stock: 8,
        price: 48900,
        image: "/src/img/products/cetol.jpg",
    },
    {
        id: 4,
        name: "Ladrillo Cerámico Portante 18x19x33 cm",
        category: "Construcción",
        stock: 650,
        price: 1350,
        image: "/src/img/products/ladrillo.jpg",
    },
    {
        id: 5,
        name: "Pintura Acrílica Exterior Blanca 20 L",
        category: "Pinturería",
        stock: 24,
        price: 67500,
        image: "/src/img/products/acrilico.jpg",
    },
    {
        id: 6,
        name: "Rodillo Antigota Profesional 22 cm",
        category: "Pinturería",
        stock: 58,
        price: 4900,
        image: "/src/img/products/rodillo.jpg",
    },
    {
        id: 7,
        name: "Espuma Expansiva Multiuso 500 ml",
        category: "Construcción",
        stock: 37,
        price: 8900,
        image: "/src/img/products/espuma.jpg",
    },
    {
        id: 8,
        name: "Sellador Adhesivo Fastix Transparente 300 ml",
        category: "Ferretería",
        stock: 73,
        price: 6200,
        image: "/src/img/products/fastix.jpg",
    },
    {
        id: 9,
        name: "Casco de Seguridad Industrial Ajustable",
        category: "Seguridad",
        stock: 19,
        price: 15800,
        image: "/src/img/products/casco.jpg",
    },
    {
        id: 10,
        name: "Chaleco Reflectivo de Alta Visibilidad",
        category: "Seguridad",
        stock: 46,
        price: 7300,
        image: "/src/img/products/chaleco.jpg",
    },
    {
        id: 11,
        name: "Guantes de Trabajo Reforzados con Palma Antideslizante",
        category: "Seguridad",
        stock: 92,
        price: 4100,
        image: "/src/img/products/guante.jpg",
    },
    {
        id: 12,
        name: "Cinta de Seguridad para perímetros",
        category: "Seguridad",
        stock: 180,
        price: 850,
        image: "/src/img/products/cinta.jpg",
    },
    {
        id: 13,
        name: "Codo PVC Sanitario 90° de 110 mm",
        category: "Plomería",
        stock: 19,
        price: 2900,
        image: "/src/img/products/codo-90.jpg",
    },
    {
        id: 14,
        name: "T de Derivación PVC Presión 25 mm",
        category: "Plomería",
        stock: 22,
        price: 3400,
        image: "/src/img/products/T-junc.jpg",
    },
    {
        id: 15,
        name: "Nylon Negro para Construcción 200 Micrones",
        category: "Construcción",
        stock: 33,
        price: 14700,
        image: "/src/img/products/nylon.jpg",
    },
];

export const categoriesMock = [
    {
        name: "Ferretería",
        description: "Herramientas, fijaciones, cables y accesorios.",
        color: "#DE1240"
    },
    {
        name: "Construcción",
        description: "Materiales para obra, albañilería, terminaciones y estructuras.",
        color: "#CB3999"
    },
    {
        name: "Pinturería",
        description: "Pinturas, protectores, rodillos y accesorios para acabados.",
        color: "#39589E"
    },
    {
        name: "Seguridad",
        description: "Elementos de protección personal y seguridad industrial.",
        color: "#2E8B57"
    },
    {
        name: "Plomería",
        description: "Cañerías, conexiones, selladores y accesorios sanitarios.",
        color: "#1E88E5"
    },
    {
    name: "Electricidad",
    description: "Cables, llaves térmicas, iluminación y componentes eléctricos.",
    color: "#F9A825"
    },
    {
        name: "Jardinería",
        description: "Herramientas, mangueras, fertilizantes y accesorios para exteriores.",
        color: "#43A047"
    },
    {
        name: "Carpintería",
        description: "Maderas, herrajes, adhesivos y herramientas para trabajos en madera.",
        color: "#8D6E63"
    },
    {
        name: "Tornillería",
        description: "Tornillos, tuercas, arandelas y elementos de fijación especializados.",
        color: "#546E7A"
    },
    {
        name: "Abrasivos",
        description: "Lijas, discos de corte, cepillos y productos para desbaste y pulido.",
        color: "#EF6C00"
    }
];

export const usersMock = [
	{
		name: "Ignacio",
		lastname: "Alonso",
        profileImage: "/src/img/blank-profile-picture-973460_960_720.png",
		username: "administrador",
		password: "administrador",
		isAdmin: true,
		isAllowed: true,
	},
	{
		name: "Juan",
		lastname: "Pérez",
        profileImage: "/src/img/blank-profile-picture-973460_960_720.png",
		username: "usuario",
		password: "usuario",
		isAdmin: false,
		isAllowed: true,
	},
	{
		name: "Pedro",
		lastname: "Martin",
		username: "pedro.martin",
        profileImage: "/src/img/blank-profile-picture-973460_960_720.png",
		password: "User1234*",
		isAdmin: false,
		isAllowed: false,
	},
    {
        name: "María",
        lastname: "González",
        profileImage: "/src/img/blank-profile-picture-973460_960_720.png",
        username: "maria.gonzalez",
        password: "User1234*",
        isAdmin: false,
        isAllowed: true,
    },
    {
        name: "Lucía",
        lastname: "Fernández",
        profileImage: "/src/img/blank-profile-picture-973460_960_720.png",
        username: "lucia.fernandez",
        password: "User1234*",
        isAdmin: false,
        isAllowed: true,
    },
    {
        name: "Carlos",
        lastname: "Rodríguez",
        profileImage: "/src/img/blank-profile-picture-973460_960_720.png",
        username: "carlos.rodriguez",
        password: "User1234*",
        isAdmin: false,
        isAllowed: false,
    },
    {
        name: "Sofía",
        lastname: "López",
        profileImage: "/src/img/blank-profile-picture-973460_960_720.png",
        username: "sofia.lopez",
        password: "User1234*",
        isAdmin: false,
        isAllowed: true,
    },
    {
        name: "Martín",
        lastname: "Suárez",
        profileImage: "/src/img/blank-profile-picture-973460_960_720.png",
        username: "martin.suarez",
        password: "User1234*",
        isAdmin: false,
        isAllowed: true,
    },
];

export const ordersMock = [
    // =========================
    // usuario
    // =========================
    {
        id: 1,
        username: "usuario",
        total: 18500,
        date: "10/6/2026, 09:15:22",
        products: [
            {
                id: 1,
                product: "Cable galvanizado reforzado para cercos rurales",
                category: "Ferretería",
                price: 18500,
                quantity: 1,
                image: "/src/img/products/cable_galvanizado.jpg",
            },
        ],
    },
    {
        id: 2,
        username: "usuario",
        total: 10450,
        date: "11/6/2026, 14:32:10",
        products: [
            {
                id: 2,
                product: "Cemento Portland CP40 x 50 kg",
                category: "Construcción",
                price: 9200,
                quantity: 1,
                image: "/src/img/products/cemento.jpg",
            },
            {
                id: 8,
                product: "Ladrillo Común de Campo para Muros",
                category: "Construcción",
                price: 950,
                quantity: 1,
                image: "/src/img/products/ladrillo.jpg",
            },
        ],
    },
    {
        id: 3,
        username: "usuario",
        total: 32950,
        date: "12/6/2026, 18:45:55",
        products: [
            {
                id: 5,
                product: "Cable Galvanizado Trenzado 6 mm para Alambrados",
                category: "Ferretería",
                price: 27300,
                quantity: 1,
                image: "/src/img/products/cable_galvanizado.jpg",
            },
            {
                id: 4,
                product: "Ladrillo Cerámico Portante 18x19x33 cm",
                category: "Construcción",
                price: 1350,
                quantity: 4,
                image: "/src/img/products/ladrillo.jpg",
            },
        ],
    },
    {
        id: 4,
        username: "usuario",
        total: 66900,
        date: "14/6/2026, 11:20:33",
        products: [
            {
                id: 3,
                product: "Cetol Classic Satinado Protector para Madera 4 L",
                category: "Pinturería",
                price: 48900,
                quantity: 1,
                image: "/src/img/products/cetol.jpg",
            },
            {
                id: 6,
                product: "Cemento de Albañilería Plasticor Bolsa 40 kg",
                category: "Construcción",
                price: 7800,
                quantity: 1,
                image: "/src/img/products/cemento.jpg",
            },
            {
                id: 4,
                product: "Ladrillo Cerámico Portante 18x19x33 cm",
                category: "Construcción",
                price: 1350,
                quantity: 3,
                image: "/src/img/products/ladrillo.jpg",
            },
            {
                id: 8,
                product: "Ladrillo Común de Campo para Muros y Cerramientos",
                category: "Construcción",
                price: 950,
                quantity: 2,
                image: "/src/img/products/ladrillo.jpg",
            },
        ],
    },
    {
        id: 5,
        username: "usuario",
        total: 119700,
        date: "16/6/2026, 16:05:47",
        products: [
            {
                id: 1,
                product: "Cable galvanizado reforzado para cercos rurales",
                category: "Ferretería",
                price: 18500,
                quantity: 1,
                image: "/src/img/products/cable_galvanizado.jpg",
            },
            {
                id: 2,
                product: "Cemento Portland CP40 x 50 kg",
                category: "Construcción",
                price: 9200,
                quantity: 2,
                image: "/src/img/products/cemento.jpg",
            },
            {
                id: 3,
                product: "Cetol Classic Satinado Protector para Madera 4 L",
                category: "Pinturería",
                price: 48900,
                quantity: 1,
                image: "/src/img/products/cetol.jpg",
            },
            {
                id: 4,
                product: "Ladrillo Cerámico Portante 18x19x33 cm",
                category: "Construcción",
                price: 1350,
                quantity: 5,
                image: "/src/img/products/ladrillo.jpg",
            },
            {
                id: 7,
                product: "Cetol Deck Protector para Madera Exterior 1 L",
                category: "Pinturería",
                price: 21900,
                quantity: 1,
                image: "/src/img/products/cetol.jpg",
            },
        ],
    },

    // =========================
    // administrador
    // =========================
    {
        id: 6,
        username: "administrador",
        total: 48900,
        date: "10/6/2026, 12:10:15",
        products: [
            {
                id: 3,
                product: "Cetol Classic Satinado Protector para Madera 4 L",
                category: "Pinturería",
                price: 48900,
                quantity: 1,
                image: "/src/img/products/cetol.jpg",
            },
        ],
    },
    {
        id: 7,
        username: "administrador",
        total: 35100,
        date: "11/6/2026, 17:42:28",
        products: [
            {
                id: 6,
                product: "Cemento de Albañilería Plasticor Bolsa 40 kg",
                category: "Construcción",
                price: 7800,
                quantity: 3,
                image: "/src/img/products/cemento.jpg",
            },
            {
                id: 8,
                product: "Ladrillo Común de Campo para Muros",
                category: "Construcción",
                price: 950,
                quantity: 12,
                image: "/src/img/products/ladrillo.jpg",
            },
        ],
    },
    {
        id: 8,
        username: "administrador",
        total: 85800,
        date: "13/6/2026, 08:55:02",
        products: [
            {
                id: 5,
                product: "Cable Galvanizado Trenzado 6 mm para Alambrados",
                category: "Ferretería",
                price: 27300,
                quantity: 2,
                image: "/src/img/products/cable_galvanizado.jpg",
            },
            {
                id: 4,
                product: "Ladrillo Cerámico Portante 18x19x33 cm",
                category: "Construcción",
                price: 1350,
                quantity: 23,
                image: "/src/img/products/ladrillo.jpg",
            },
        ],
    },
    {
        id: 9,
        username: "administrador",
        total: 78950,
        date: "15/6/2026, 15:23:51",
        products: [
            {
                id: 1,
                product: "Cable galvanizado reforzado para cercos rurales",
                category: "Ferretería",
                price: 18500,
                quantity: 1,
                image: "/src/img/products/cable_galvanizado.jpg",
            },
            {
                id: 2,
                product: "Cemento Portland CP40 x 50 kg",
                category: "Construcción",
                price: 9200,
                quantity: 2,
                image: "/src/img/products/cemento.jpg",
            },
            {
                id: 4,
                product: "Ladrillo Cerámico Portante 18x19x33 cm",
                category: "Construcción",
                price: 1350,
                quantity: 5,
                image: "/src/img/products/ladrillo.jpg",
            },
        ],
    },
    {
        id: 10,
        username: "administrador",
        total: 129250,
        date: "18/6/2026, 19:17:25",
        products: [
            {
                id: 1,
                product: "Cable galvanizado reforzado para cercos rurales",
                category: "Ferretería",
                price: 18500,
                quantity: 1,
                image: "/src/img/products/cable_galvanizado.jpg",
            },
            {
                id: 3,
                product: "Cetol Classic Satinado Protector para Madera 4 L",
                category: "Pinturería",
                price: 48900,
                quantity: 1,
                image: "/src/img/products/cetol.jpg",
            },
            {
                id: 5,
                product: "Cable Galvanizado Trenzado 6 mm para Alambrados",
                category: "Ferretería",
                price: 27300,
                quantity: 1,
                image: "/src/img/products/cable_galvanizado.jpg",
            },
            {
                id: 6,
                product: "Cemento de Albañilería Plasticor Bolsa 40 kg",
                category: "Construcción",
                price: 7800,
                quantity: 1,
                image: "/src/img/products/cemento.jpg",
            },
            {
                id: 7,
                product: "Cetol Deck Protector para Madera Exterior 1 L",
                category: "Pinturería",
                price: 21900,
                quantity: 1,
                image: "/src/img/products/cetol.jpg",
            },
        ],
    },
];

export const configurationMock = {
    userSessionExpiring: 72,
    adminSessionExpiring: 72,
    pagination: {
        catalog: 10,
        profile: 8,
        admin: 12,
    },
    minimumPurchaseAmount: 20000,
    stock: {
        lowThreshold: 25,
        mediumThreshold: 50,
        highThreshold: 100,
    },
};