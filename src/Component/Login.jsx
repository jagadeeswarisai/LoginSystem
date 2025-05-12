// src/Component/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onSwitchToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("https://loginsystembackendecommercesite.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.status === 200) {
      setMessage("Login successful!");
      alert("login sucess");
      navigate("/homedashboard");
    } else {
      setMessage(data.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
     to-white px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={onSwitchToSignUp}
            className="text-blue-500 hover:underline font-medium"
          >
            Sign Up
          </button>
        </p>

        {message && (
          <p className="mt-4 text-center text-red-500 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
