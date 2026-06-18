export function showSuccess(input, idDivError) {
    input.classList.remove("is-invalid")
    input.classList.add("is-valid")
    document.getElementById(idDivError).textContent = ""
}

export function showError(input, idDivError, mensaje) {
    input.classList.remove("is-valid")
    input.classList.add("is-invalid")
    document.getElementById(idDivError).textContent = mensaje
}

export function resetStates() {
    const inputs = document.querySelectorAll(".form-control")
    for (const input of inputs) {
        input.classList.remove("is-invalid")
        input.classList.remove("is-valid")
    }
}