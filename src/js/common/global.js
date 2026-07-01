import { configurationMock, ordersMock, usersMock, categoriesMock, productsMock} from "./mocks.js"
import { adminNavbar, showCartCount } from "./utils.js"
import { productsApi } from "../api/productsApi.js"
import { categoriesApi } from "../api/categoriesApi.js"
import { usersApi } from "../api/usersApi.js"
import { ordersApi } from "../api/ordersApi.js"
import { configurationApi } from "../api/configurationApi.js"

const userSession = JSON.parse(localStorage.getItem("userSession")) || null

export const globalOnload = (index) => {
    // any role check
    if(!window.location.href.includes("login") && !userSession) {
        window.location.href = "/p-comision-02/src/pages/not-found.html";
        return
    }

    // // admin role check
    if(window.location.href.includes("admin") && !userSession?.isAdmin) {
        window.location.href = "/p-comision-02/src/pages/not-found.html";
        return
    }

    // admin navbar
    if(JSON.parse(localStorage.getItem("userSession"))?.isAdmin && !window.location.href.includes("login") && !window.location.href.includes("index")) {
        window.location.href.includes("admin") ? adminNavbar(true) : adminNavbar()
    }

    // products seed
    const products = localStorage.getItem("products")
    if(index || !products || (!localStorage.getItem("productsId"))) {
        productsApi.setAllProducts(productsMock)
        localStorage.setItem("productsId", "9")
    } 

    // categories seed
    const categories = localStorage.getItem("categories")
    if(index || !categories)
        categoriesApi.setAllCategories(categoriesMock)

    // Admin seed y user seed
    const users = localStorage.getItem("users")
    if(index || !users || users.length === 0)
        usersApi.setAllUsers(usersMock)

    // orders seed
    const orders = localStorage.getItem("orders")
    if(index || !orders || (!localStorage.getItem("ordersId"))) {
        ordersApi.setAllOrders(ordersMock)
        localStorage.setItem("ordersId", "16")
    }

    // configuration seed
    const configuration = configurationApi.getConfiguration();
    if(index || !configuration) {
        configurationApi.setConfiguration(configurationMock)
    }

    // Session expiring
    const session = JSON.parse(localStorage.getItem("userSession"));
    if (session) {
        const expirationDate = new Date(session.expiresAt);

        if (Date.now() > expirationDate.getTime()) {
            localStorage.removeItem("userSession");
            window.location.href = "/p-comision-02/src/pages/login.html?reason=session_expired";
        }
    }

    // Cart counter icon
    if(!window.location.href.includes("admin") && !window.location.href.includes("login") && !window.location.href.includes("index")) {
        showCartCount()
    }
}

document.addEventListener("DOMContentLoaded", () => {
    globalOnload()
})