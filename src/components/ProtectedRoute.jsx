import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;