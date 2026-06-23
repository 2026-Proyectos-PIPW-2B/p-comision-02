import { configurationMock, ordersMock, usersMock } from "./mocks.js"
import { categoriesMock } from "./mocks.js"
import { productsMock } from "./mocks.js"
import { showCartCount } from "./utils.js"

const globalOnload = () => {
    // any role check
    if(!window.location.href.includes("login") && !JSON.parse(localStorage.getItem("userSession"))) {
        window.location.href = "/src/pages/not-found.html";
    }

    // admin role check
    if(window.location.href.includes("admin") && !JSON.parse(localStorage.getItem("userSession"))?.isAdmin) {
        window.location.href = "/src/pages/not-found.html";
    }

    // products seed
    if(!localStorage.getItem("products") || JSON.parse(localStorage.getItem("products")).length === 0 || (!localStorage.getItem("productsId"))) {
        localStorage.setItem("products", JSON.stringify(productsMock))
        localStorage.setItem("productsId", productsMock.length+1)
    } 
    // categories seed
    if(!localStorage.getItem("categories") || JSON.parse(localStorage.getItem("categories")).length === 0) {
        localStorage.setItem("categories", JSON.stringify(categoriesMock))
    }
    // Admin seed y user seed
    if(!localStorage.getItem("users"))
        localStorage.setItem("users", JSON.stringify(usersMock))

    // orders seed
    if(!localStorage.getItem("orders") || JSON.parse(localStorage.getItem("orders")).length === 0 || (!localStorage.getItem("ordersId"))) {
        localStorage.setItem("orders", JSON.stringify(ordersMock))
        localStorage.setItem("ordersId", "11")
    }

    // configuration seed
    if(!localStorage.getItem("configuration")) {
        localStorage.setItem("configuration", JSON.stringify(configurationMock))
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