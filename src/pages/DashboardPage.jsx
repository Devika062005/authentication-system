import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";

function DashboardPage() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div>
            <h1>Dashboard</h1>

            <h2>Welcome, {user.fullName}</h2>

            {user.avatar && (
                <img
                    src={user.avatar}
                    alt="Profile"
                    width="150"
                />
            )}

            <p>
                <strong>Username:</strong> {user.username}
            </p>

            <p>
                <strong>Email:</strong> {user.email}
            </p>

            <p>
                <strong>Full Name:</strong> {user.fullName}
            </p>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default DashboardPage;