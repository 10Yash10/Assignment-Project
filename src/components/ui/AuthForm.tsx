"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        setEmail("");
        setPassword("");
    }, [isLogin])

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((u: { email: string, password: string }) => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem("authenticated", "true");
            router.push("/dashboard");
        } else {
            alert("Invalid credentials");
        }
    };

    const handleRegister = () => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("user registerd successfully");
        setIsLogin(true);
    };

    return (
        <div className="w-full max-w-md">
            <div className="flex gap-4 ml-8 mb-8">
                <div className="w-10 h-10 rounded-full bg-neutral-500 text-white flex items-center justify-center" >Logo</div>
                <h1 className="text-4xl font-bold">Amplifai</h1>

            </div>

            {/* heading and description */}
            {isLogin ? <div className="ml-8">
                <h2 className="text-2xl font-semibold">Login</h2>
                <p className="text-sm font-regular text-neutral-400">Enter your email below to login to your account</p>
            </div> : <div className="ml-8">
                <h2 className="text-2xl font-semibold">Register</h2>
                <p className="text-sm font-regular text-neutral-400">Enter your name, email and password below to create your account</p>
            </div>}

            <div className="p-8">
                {!isLogin && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-neutral-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Business Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-neutral-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-neutral-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                {isLogin && (
                    <div className="text-right text-sm text-blue-500 hover:underline mb-4">
                        <a href="#">Forgot Password?</a>
                    </div>
                )}
                <button
                    onClick={isLogin ? handleLogin : handleRegister}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                >
                    {isLogin ? "Login" : "Register"}
                </button>
                <div className="text-center mt-4 text-sm">
                    {isLogin ? (
                        <p>
                            Don&apos;t have an account?{" "}
                            <button className="text-blue-500 hover:underline cursor-pointer" onClick={() => setIsLogin(false)}>
                                Register
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <button className="text-blue-500 hover:underline cursor-pointer" onClick={() => setIsLogin(true)}>
                                Login
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
