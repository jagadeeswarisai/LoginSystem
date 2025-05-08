import React, { useState } from "react";

function SignUp({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let validationErrors = {};

    if (!formData.firstName) validationErrors.firstName = "First Name is required.";
    if (!formData.lastName) validationErrors.lastName = "Last Name is required.";
    if (!formData.email) validationErrors.email = "Email is required.";
    if (!formData.confirmEmail) validationErrors.confirmEmail = "Please confirm your email.";
    if (!formData.password) validationErrors.password = "Password is required.";
    if (!formData.confirmPassword) validationErrors.confirmPassword = "Please confirm your password.";

    if (formData.password !== formData.confirmPassword) {
      validationErrors.passwordMatch = "Passwords do not match.";
    }
    if (formData.email !== formData.confirmEmail) {
      validationErrors.emailMatch = "Emails do not match.";
    }
    if (formData.email && !validateEmail(formData.email)) {
      validationErrors.emailFormat = "Please enter a valid email address.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("https://loginsystembackend-1.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        onSwitchToLogin("/login");
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.message || "Signup failed. Please try again." });
      }
    } catch {
      setErrors({ general: "An error occurred. Please try again later." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center via-white to-pink-100 px-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && <p className="text-red-600 text-center">{errors.general}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="First name"
              />
              {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Last name"
              />
              {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            {errors.emailFormat && <p className="text-red-600 text-sm">{errors.emailFormat}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Email</label>
            <input
              name="confirmEmail"
              type="email"
              value={formData.confirmEmail}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Confirm email"
            />
            {errors.confirmEmail && <p className="text-red-600 text-sm">{errors.confirmEmail}</p>}
            {errors.emailMatch && <p className="text-red-600 text-sm">{errors.emailMatch}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
              {errors.passwordMatch && <p className="text-red-600 text-sm">{errors.passwordMatch}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button onClick={onSwitchToLogin} className="text-blue-600 hover:underline font-medium">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;