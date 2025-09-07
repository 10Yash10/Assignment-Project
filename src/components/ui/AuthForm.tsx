"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }, [isLogin, isForgotPassword])

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

    const handleForgotPassword = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = users.findIndex((u: { email: string }) => u.email === email);

        if (userIndex === -1) {
            alert("User not found");
            return;
        }

        users[userIndex].password = password;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Password updated successfully");
        setIsForgotPassword(false);
    };

    return (
        <div className="w-full max-w-md">
            <div className="flex gap-4 ml-8 mb-8">
                <div className="w-10 h-10 rounded-full bg-neutral-500 text-white flex items-center justify-center" >Logo</div>
                <h1 className="text-4xl font-bold">Amplifai</h1>

            </div>

            {isForgotPassword ? (
                <div className="ml-8">
                    <h2 className="text-2xl font-semibold">Forgot Password</h2>
                    <p className="text-sm font-regular text-neutral-400">Enter your email and new password</p>
                </div>
            ) : isLogin ? (
                <div className="ml-8">
                    <h2 className="text-2xl font-semibold">Login</h2>
                    <p className="text-sm font-regular text-neutral-400">Enter your email below to login to your account</p>
                </div>
            ) : (
                <div className="ml-8">
                    <h2 className="text-2xl font-semibold">Sign up</h2>
                    <p className="text-sm font-regular text-neutral-400">Enter your name, email and password below to create your account</p>
                </div>
            )}

            <div className="p-8">
                {isForgotPassword ? (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Business Email</label>
                            <input
                                type="email"
                                placeholder="username@domain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-neutral-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-neutral-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                            <input
                                type="password"
                                placeholder="Confirm Your Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-neutral-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <button
                            onClick={handleForgotPassword}
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                        >
                            Update Password
                        </button>
                        <div className="text-center mt-4 text-sm">
                            <button className="text-blue-500 hover:underline cursor-pointer" onClick={() => setIsForgotPassword(false)}>
                                Back to Login
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {!isLogin && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="John Doe"
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-neutral-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Business Email</label>
                            <input
                                type="email"
                                placeholder="username@domain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-neutral-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-neutral-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        {isLogin && (
                            <div className="text-right text-sm text-blue-500 hover:underline mb-4">
                                <button className="underline underline-offset-4 cursor-pointer" onClick={() => setIsForgotPassword(true)}>Forgot your Password?</button>
                            </div>
                        )}
                        <button
                            onClick={isLogin ? handleLogin : handleRegister}
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                        >
                            {isLogin ? "Login" : "Sign up"}
                        </button>
                        <div className="text-center mt-4 text-sm">
                            {isLogin ? (
                                <p>
                                    Don&apos;t have an account?{" "}
                                    <button className="underline underline-offset-4 text-blue-500 hover:underline cursor-pointer" onClick={() => setIsLogin(false)}>
                                        Sign up
                                    </button>
                                </p>
                            ) : (
                                <p>
                                    Already have an account?{" "}
                                    <button className="underline underline-offset-4 text-blue-500 hover:underline cursor-pointer" onClick={() => setIsLogin(true)}>
                                        Login
                                    </button>
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthForm;