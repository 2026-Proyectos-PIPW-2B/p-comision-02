export const configurationApi = {
    setConfiguration: (configuration) => {
        localStorage.setItem("configuration", JSON.stringify(configuration));
    },
    getConfiguration: () => {
        const configuration = JSON.parse(localStorage.getItem("configuration"));
        return configuration;
    }
}