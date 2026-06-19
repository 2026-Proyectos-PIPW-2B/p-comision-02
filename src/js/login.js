window.onload = () => {
	const userInput = document.getElementById("userInput");
	const passwordInput = document.getElementById("passwordInput");
	userInput.value = ""

	const divErrorMessage = document.getElementById("divErrorMessage")
	const params = new URLSearchParams(window.location.search);
	if (params.get("reason") === "session_expired") {
		divErrorMessage.textContent = "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
	}
};

const login = () => {
	
	const userInput = document.getElementById("userInput");
	const passwordInput = document.getElementById("passwordInput");

	const userArray = JSON.parse(localStorage.getItem("users"));

	const userMatch = userArray.find(
		(u) => u.username === userInput.value && u.password === passwordInput.value,
	);
	console.log(userMatch);
	
	userMatch ? userMatch.isAllowed ? loginSuccess(userMatch) : loginFailed("Usuario Inhabilitado") : loginFailed("Credenciales Incorrectas")
};

const loginSuccess = (userMatch) => {
	const userExpiringTime = JSON.parse(localStorage.getItem("configuration")).userSessionExpiring
	const adminExpiringTime = JSON.parse(localStorage.getItem("configuration")).adminSessionExpiring
	const expiresAt = userMatch.isAdmin ? new Date(Date.now() + adminExpiringTime * 60 * 60 * 1000) : new Date(Date.now() + userExpiringTime * 60 * 60 * 1000)
	localStorage.setItem(
		"userSession",
		JSON.stringify({
			name: userMatch.name || "John",
			lastname: userMatch.lastname || "Doe",
			username: userMatch.username,
			isAdmin: userMatch.isAdmin,
			cart: [],
			expiresAt,
			expiresAtFormatted: expiresAt.toLocaleString()
		}),
	);

	if(userMatch.isAdmin) window.location.href = "./admin/products-manager.html";
	else window.location.href = "./home.html";
};

const divErrorMessage = document.getElementById("divErrorMessage")
const loginFailed = (errorMessage) => {
	divErrorMessage.textContent = errorMessage
}