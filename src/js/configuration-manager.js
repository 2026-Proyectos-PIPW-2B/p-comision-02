import { showNotification } from "./common/utils.js";

window.addEventListener("load", () => {
	loadParameters();
	document.getElementById("resetValuesButton").addEventListener("click", () => {loadParameters();});
	document.getElementById("submitValuesButton").addEventListener("click", submitParameters);
});

const loadParameters = () => {
	const configuration = JSON.parse(localStorage.getItem("configuration"));
	if (!configuration) return;
	document.getElementById("sessionDuration").value = configuration.sessionExpiring;
	document.getElementById("catalogPagination").value = configuration.pagination.catalog;
	document.getElementById("profilePagination").value = configuration.pagination.profile;
	document.getElementById("adminPagination").value = configuration.pagination.admin;
	document.getElementById("minimumPurchase").value = configuration.minimumPurchaseAmount;
	document.getElementById("lowStockThreshold").value = configuration.stock.lowThreshold;
	document.getElementById("mediumStockThreshold").value = configuration.stock.mediumThreshold;
	document.getElementById("highStockThreshold").value = configuration.stock.highThreshold;
};

const submitParameters = () => {
	const configuration = { sessionExpiring: Number(
			document.getElementById("sessionDuration").value,
		),

		pagination: {
			catalog: Number(document.getElementById("catalogPagination").value),
			profile: Number(document.getElementById("profilePagination").value),
			admin: Number(document.getElementById("adminPagination").value),
		},

		minimumPurchaseAmount: Number(
			document.getElementById("minimumPurchase").value,
		),

		stock: {
			lowThreshold: Number(
				document.getElementById("lowStockThreshold").value,
			),
			mediumThreshold: Number(
				document.getElementById("mediumStockThreshold").value,
			),
			highThreshold: Number(
				document.getElementById("highStockThreshold").value,
			),
		},
	};

	localStorage.setItem("configuration", JSON.stringify(configuration));

    loadParameters()
    showNotification({
        type: "success",
        title: "Configuración guardada",
        icon: `<i class="bi bi-check-lg text-success"></i>`,
        message: "Los parametros de configuracion han sido actualizados"
    })
};
