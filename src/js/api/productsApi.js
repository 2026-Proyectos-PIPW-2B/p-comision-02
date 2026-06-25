export const productsApi = {
    createProduct: (product) => {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
    },
    setAllProducts: (products) => {
        localStorage.setItem("products", JSON.stringify(products));
    },
    getAllProducts: () => {
        return JSON.parse(localStorage.getItem("products")) || [];
    },
    getProductByName: (name) => {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        return products.find((product) => product.name === name);
    },
    updateProduct: (updatedProduct) => {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const productIndex = products.findIndex((product) => product.name === updatedProduct.name);
        if (productIndex !== -1) {
            products[productIndex] = updatedProduct;
            localStorage.setItem("products", JSON.stringify(products));
        }
    },
    deleteProduct: (name) => {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const updatedProducts = products.filter((product) => product.name !== name);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
}