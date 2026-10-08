import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import { validateLoginForm } from "../utils/validation";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        setError("");

        const errors = validateLoginForm(formData);

        if (Object.keys(errors).length > 0) {
            setError(Object.values(errors)[0]);
            return;
        }

        login(formData)
            .then(function () {
                navigate("/dashboard");
            })
            .catch(function (error) {
                setError(error.message);
            });
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Login to your account
                </p>

                {error && (
                    <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default LoginPage;