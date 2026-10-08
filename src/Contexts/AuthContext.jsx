import { createContext, useEffect, useState } from "react";

import {
    getUserById,
    getUserByEmail,
    checkUsername,
    createUser
} from "../services/authApi";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch logged-in user when the application starts
    function fetchCurrentUser() {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            setIsLoading(false);
            return;
        }

        getUserById(userId)
            .then(function (response) {
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);

                localStorage.removeItem("userId");
                setUser(null);
            })
            .finally(function () {
                setIsLoading(false);
            });
    }

    // Login
    function login(credentials) {
        return getUserByEmail(credentials.email)
            .then(function (response) {
                const users = response.data;

                if (users.length === 0) {
                    throw new Error("Invalid email or password");
                }

                const user = users[0];

                if (user.password !== credentials.password) {
                    throw new Error("Invalid email or password");
                }

                localStorage.setItem("userId", user.id);

                setUser(user);

                return user;
            });
    }

    // Register
    function register(userData) {
        return checkUsername(userData.username)
            .then(function (response) {
                const users = response.data;

                if (users.length > 0) {
                    throw new Error("Username already exists");
                }

                return createUser(userData);
            })
            .then(function (response) {
                return response.data;
            });
    }

    // Logout
    function logout() {
        localStorage.removeItem("userId");
        setUser(null);
    }

    // Check authentication
    function isAuthenticated() {
        return localStorage.getItem("userId") !== null;
    }

    // Run when application starts
    useEffect(function () {
        fetchCurrentUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                register,
                logout,
                isAuthenticated,
                fetchCurrentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
export default AuthContext;