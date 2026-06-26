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
    updateProduct: (updatedProduct) => {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const productIndex = products.findIndex((product) => product.id === updatedProduct.id);
        if (productIndex !== -1) {
            products[productIndex] = updatedProduct;
            localStorage.setItem("products", JSON.stringify(products));
        }
    },
    deleteProduct: (id) => {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const updatedProducts = products.filter((product) => product.id !== id);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
}