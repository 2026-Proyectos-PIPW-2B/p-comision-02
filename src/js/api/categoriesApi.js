export const categoriesApi = {
    createCategory: (category) => {
        const categories = JSON.parse(localStorage.getItem("categories")) || [];
        categories.push(category);
        localStorage.setItem("categories", JSON.stringify(categories));
    },
    setAllCategories: (categories) => {
        localStorage.setItem("categories", JSON.stringify(categories));
    },
    getAllCategories: () => {
        return JSON.parse(localStorage.getItem("categories")) || [];
    },
    getCategoryByName: (name) => {
        const categories = JSON.parse(localStorage.getItem("categories")) || [];
        return categories.find((category) => category.name === name);
    },
    updateCategory: (updatedCategory) => {
        const categories = JSON.parse(localStorage.getItem("categories")) || [];
        const categoryIndex = categories.findIndex((category) => category.name === updatedCategory.name);
        if (categoryIndex !== -1) {
            categories[categoryIndex] = updatedCategory;
            localStorage.setItem("categories", JSON.stringify(categories));
        }
    },
    deleteCategory: (name) => {
        const categories = JSON.parse(localStorage.getItem("categories")) || [];
        const updatedCategories = categories.filter((category) => category.name !== name);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }
}