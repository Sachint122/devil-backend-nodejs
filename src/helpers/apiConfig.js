const config = { baseURL: '', token: null };

export const configureApi = ({ baseURL = '' } = {}) => {
    config.baseURL = baseURL;
};

export const updateToken = (token) => { config.token = token; };
export const clearToken = () => { config.token = null; };
export const getApiConfig = () => config;
