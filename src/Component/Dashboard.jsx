import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./Signup";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const handleSwitchToSignup = () => {
    setShowLogin(false);
  };

  const handleSwitchToLogin = () => {o
    setShowLogin(true);
  };

  const handleAdminLogin = () => {
    navigate("/admin-login");
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-photo/light-tropical-leaves-background_961875-290542.jpg?w=996')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-0 right-0 p-6 flex gap-4 z-20">
        <button
          onClick={handleSwitchToLogin}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Login
        </button>
        <button
          onClick={handleSwitchToSignup}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
        <button
          onClick={handleAdminLogin}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Admin Login
        </button>
      </div>

      <div className="z-10">
        {showLogin ? (
          <Login onSwitchToSignUp={handleSwitchToSignup} />
        ) : (
          <SignUp onSwitchToLogin={handleSwitchToLogin} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
