window.onload = () => {};

const login = () => {
	const userInput = document.getElementById("userInput");
	const passwordInput = document.getElementById("passwordInput");

	const userArray = JSON.parse(localStorage.getItem("users"));

	const userMatch = userArray.find(
		(u) => u.user === userInput.value && u.password === passwordInput.value,
	);

	userMatch ? loginSuccess(userMatch) : console.log("incorrecta");
};

const loginSuccess = (userMatch) => {
	localStorage.setItem(
		"userSession",
		JSON.stringify({
			username: userMatch.user,
			name: userMatch.name || "John",
			lastname: userMatch.lastname || "Doe",
			orders: userMatch.orders || [],
			cart: [],
		}),
	);
	window.location.href = "./home.html";
};
