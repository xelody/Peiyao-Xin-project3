import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeUsername, setActiveUsername] = useState(null);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, activeUsername, setActiveUsername }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
