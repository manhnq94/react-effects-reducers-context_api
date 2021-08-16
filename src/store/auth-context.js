import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false, // dummy value to help IDE autocomplete
    onLogout: () => {}, // dummy function to help IDE autocomplete
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLogginInformation = localStorage.getItem("isLoggedIn");

        if (storedUserLogginInformation === "1") {
            setIsLoggedIn(true);
        }
    }, []);

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem("isLoggedIn", "1"); // save isLoggedIn to localstorage so it will not be remove when user reload web page
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
export default AuthContext;
