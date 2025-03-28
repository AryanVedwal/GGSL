"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function EditUserPage() {
  const params = useParams();
  const userId = params?.id;
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }

    if (userId) {
      loadUserDetails();
    }
  }, [userId]);

  const loadUserDetails = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${userId}`);
      const userData = response.data.data;

      if (userData) {
        setUser(userData);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setEmail(
          `${userData.first_name.toLowerCase()}.${userData.last_name.toLowerCase()}@reqres.in`
        );
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to load user details:", err);
      setError("Failed to load user details");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await axios.put(`https://reqres.in/api/users/${userId}`, {
        first_name: firstName,
        last_name: lastName,
        email,
      });
      router.push("/users");
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update user");
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="flex space-x-3">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-6 h-20 bg-gray-300 animate-pulse"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: "1.5s",
              }}
            ></div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 px-6 py-12">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-3xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 mb-4 relative shadow-md rounded-full overflow-hidden">
            <Image
              src={user.avatar}
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Edit Profile
          </h2>
          <p className="text-gray-500">Update user information</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="First Name"
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
            required
          />
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => router.push("/users")}
              className="w-1/2 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-1/2 ml-4 py-3 rounded-lg text-white font-semibold transition ${
                isLoading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
              }`}
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
