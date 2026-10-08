import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import { validateRegisterForm } from "../utils/validation";

function RegisterPage() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        fullName: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        const errors = validateRegisterForm(formData);

        if (Object.keys(errors).length > 0) {
            setError(Object.values(errors)[0]);
            return;
        }

        register(formData)
            .then(function () {
                setSuccess("Registration successful!");

                setTimeout(function () {
                    navigate("/login");
                }, 1000);
            })
            .catch(function (error) {
                setError(error.message);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">

            <div className="w-full max-w-md rounded-3xl p-8 bg-white/60 backdrop-blur-xl border border-white/70 shadow-2xl">

                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-6">
                    Register a new account
                </p>

                {error && (
                    <p className="bg-red-100/80 text-red-600 p-3 rounded-xl mb-4 text-sm">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="bg-green-100/80 text-green-600 p-3 rounded-xl mb-4 text-sm">
                        {success}
                    </p>
                )}

                {/* Glass input container */}
                <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-inner">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/80 outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/90 transition"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/80 outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/90 transition"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/80 outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/90 transition"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/80 outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/90 transition"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] transition"
                        >
                            Register
                        </button>

                    </form>

                </div>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-purple-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default RegisterPage;