import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const authorizationToken = `Bearer ${token}`;
    const storeTokenInls = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;
    console.log("isLoggedIN", isLoggedIn);



    //tackling the logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");

    };
    //jwt AUTHENTICATION- to get the currently loggedIN user data
    const userAuthentication = async (token) => {
        try {
            const response = await fetch("http://localhost:5000/api/user",
                {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    },
                });
            if (response.ok) {
                const data = await response.json();
                console.log("Msg:", data.userData);
                setUser(data.userData);

            }
            else {
                console.error("Error fetching user data");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching user data");

        }
    };


    // useEffect(() => {
    // //     const token = getTokenFromSomewhere(); // Implement this function to retrieve the token
    // // userAuthentication(token);
    //     userAuthentication();
    // }, []);
    useEffect(() => {
        userAuthentication(token); // Pass the token to userAuthentication
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                storeTokenInls,
                LogoutUser,
                user,
                authorizationToken,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};