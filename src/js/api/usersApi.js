export const usersApi = {
    createUser: (user) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
    },
    getAllUsers: () => {
        return JSON.parse(localStorage.getItem("users")) || [];
    },
    getUserByUsername: (username) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        return users.find((user) => user.username === username);
    },
    updateUser: (updatedUser) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex((user) => user.username === updatedUser.username);
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem("users", JSON.stringify(users));
        }
    },
    deleteUser: (username) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.filter((user) => user.username !== username);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
}