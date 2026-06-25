export const ordersApi = {
    createOrder: (order) => {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
    },
    setAllOrders: (orders) => {
        localStorage.setItem("orders", JSON.stringify(orders));
    },
    getAllOrders: () => {
        return JSON.parse(localStorage.getItem("orders")) || [];
    },
    getOrdersByUser: (username) => {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        return orders.filter((order) => order.username === username);
    }
}