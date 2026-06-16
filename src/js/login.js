window.onload = () => {
	const userInput = document.getElementById("userInput");
	const passwordInput = document.getElementById("passwordInput");

	userInput.value = ""
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
	localStorage.setItem(
		"userSession",
		JSON.stringify({
			name: userMatch.name || "John",
			lastname: userMatch.lastname || "Doe",
			username: userMatch.username,
			isAdmin: userMatch.isAdmin,
			orders: userMatch.orders || [],
			cart: [],
		}),
	);

	if(userMatch.isAdmin) window.location.href = "./admin/products-manager.html";
	else window.location.href = "./home.html";
};

const divErrorMessage = document.getElementById("divErrorMessage")
const loginFailed = (errorMessage) => {
	divErrorMessage.textContent = errorMessage
}