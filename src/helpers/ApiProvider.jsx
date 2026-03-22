import React, { createContext, useContext, useState } from 'react';
const ApiContext = createContext(null);

export const ApiProvider = ({ baseURL = '', children }) => {
    const [authToken, setAuthToken] = useState(null);
    return (
        <ApiContext.Provider value={{ baseURL, authToken, setAuthToken }}>
            {children}
        </ApiContext.Provider>
    );
};
export const useApiContext = () => useContext(ApiContext);
