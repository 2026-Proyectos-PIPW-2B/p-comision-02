import { configurationMock, ordersMock, usersMock } from "./mocks.js"
import { categoriesMock } from "./mocks.js"
import { productsMock } from "./mocks.js"
import { showCartCount } from "./utils.js"
import { productsApi } from "../api/productsApi.js"
import { categoriesApi } from "../api/categoriesApi.js"
import { usersApi } from "../api/usersApi.js"
import { ordersApi } from "../api/ordersApi.js"
import { configurationApi } from "../api/configurationApi.js"

const globalOnload = () => {
    if(window.location.href.includes("admin") && !JSON.parse(localStorage.getItem("userSession"))?.isAdmin) {
        window.location.href = "../../pages/not-found.html";
    }

    // products seed
    const products = productsApi.getAllProducts();
    if(!products || products.length === 0 || (!localStorage.getItem("productsId"))) {
        productsApi.setAllProducts(productsMock)
        localStorage.setItem("productsId", "9")
    } 
    // categories seed
    const categories = categoriesApi.getAllCategories();
    if(!categories || categories.length === 0)
        categoriesApi.setAllCategories(categoriesMock)
    // Admin seed y user seed
    const users = usersApi.getAllUsers();
    if(!users || users.length === 0)
        usersApi.setAllUsers(usersMock)

    // orders seed
    const orders = ordersApi.getAllOrders();
    if(!orders || orders.length === 0 || (!localStorage.getItem("ordersId"))) {
        ordersApi.setAllOrders(ordersMock)
        localStorage.setItem("ordersId", "11")
    }

    // configuration seed
    const configuration = configurationApi.getConfiguration();
    if(!configuration) {
        configurationApi.setConfiguration(configurationMock)
    }

    // Session expiring
    const session = JSON.parse(localStorage.getItem("userSession"));
    if (session) {
        const expirationDate = new Date(session.expiresAt);

        if (Date.now() > expirationDate.getTime()) {
            localStorage.removeItem("userSession");
            window.location.href = "/src/pages/login.html?reason=session_expired";
        }
    }

    // Cart counter icon
    if(!window.location.href.includes("admin") && !window.location.href.includes("login")) {
        showCartCount()
    }
    }

document.addEventListener("DOMContentLoaded", () => {
    globalOnload()
})