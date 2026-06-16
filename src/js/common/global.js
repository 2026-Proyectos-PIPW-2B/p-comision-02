import { usersMock } from "./mocks.js"
import { categoriesMock } from "./mocks.js"
import { productsMock } from "./mocks.js"

const globalOnload = () => {
    if(window.location.href.includes("admin") && !JSON.parse(localStorage.getItem("userSession"))?.isAdmin) {
        window.location.href = "../../pages/not-found.html";
    }

    // products seed
    if(!localStorage.getItem("products") || JSON.parse(localStorage.getItem("products")).length === 0) {
        localStorage.setItem("products", JSON.stringify(productsMock))
        localStorage.setItem("productsId", "9")
    } 
    // categories seed
    if(!localStorage.getItem("categories") || JSON.parse(localStorage.getItem("categories")).length === 0) {
        localStorage.setItem("categories", JSON.stringify(categoriesMock))
    }
    // Admin seed y user seed
	if(!localStorage.getItem("users"))
	localStorage.setItem("users", JSON.stringify(usersMock))

}

document.addEventListener("DOMContentLoaded", () => {
    globalOnload()
})