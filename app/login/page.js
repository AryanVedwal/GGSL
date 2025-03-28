"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const token = await login(email, password);
      localStorage.setItem("authToken", token);
      router.push("/users");
    } catch (err) {
      setError(err.message || "Login failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden transform transition-all hover:scale-105 duration-300">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-wider">
                Project
              </h2>
              <p className="text-gray-600 font-medium">User Management Platform</p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                <span className="text-sm font-semibold">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400 transition duration-300"
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-400 transition duration-300"
                  required
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl text-white font-bold text-lg tracking-wide transition duration-300 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 active:bg-purple-800 shadow-lg"
                }`}
              >
                {isLoading ? "Logging in..." : "Sign In"}
              </button>
            </form>
          </div>
          <div className="bg-gray-200 px-8 py-4 text-center rounded-b-3xl">
            <p className="text-gray-600 text-sm font-medium">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
