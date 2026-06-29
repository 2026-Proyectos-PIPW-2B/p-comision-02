import { globalOnload } from "./common/global.js"

window.addEventListener('load', () => {
    const initButon = document.getElementById("initButon")
    initButon.addEventListener("click", () => {
        globalOnload(true)
        window.location.href = "/src/pages/login.html?reason=init_complete";
    })
})