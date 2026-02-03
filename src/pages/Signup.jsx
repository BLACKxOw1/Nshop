import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const validatePhone = (phone) => /^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(phone);
  const validatePassword = (pass) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(pass);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!validatePhone(form.phone)) {
      setError("Phone number format is invalid");
      return;
    }
    if (!validatePassword(form.password)) {
      setError(
        "Password must have at least 8 chars, 1 uppercase, 1 number, 1 special char"
      );
      return;
    }
    if (form.username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }
    signup({
      username: form.username,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center mt-5 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-xl p-8 bg-white text-gray-900 shadow-lg dark:bg-[#0d1117] dark:text-gray-100 dark:shadow-none border border-transparent dark:border-[#30363d]"
      >
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-gray-500 dark:text-gray-400">Sign up to start shopping</p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          className="w-full rounded-lg px-3 py-2 border bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-[#161b22] dark:text-gray-100 dark:border-[#30363d]"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full rounded-lg px-3 py-2 border bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-[#161b22] dark:text-gray-100 dark:border-[#30363d]"
        />
        <input
          type="text"
          placeholder="+998 __ ___ __ __"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          className="w-full rounded-lg px-3 py-2 border bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-[#161b22] dark:text-gray-100 dark:border-[#30363d]"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="w-full rounded-lg px-3 py-2 border bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-[#161b22] dark:text-gray-100 dark:border-[#30363d]"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          required
          className="w-full rounded-lg px-3 py-2 border bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-[#161b22] dark:text-gray-100 dark:border-[#30363d]"
        />
        <button
          type="submit"
          className="w-full rounded-lg py-2 font-medium text-white bg-purple-600 hover:bg-purple-700 transition dark:bg-purple-700 dark:hover:bg-purple-800"
        >
          Sign Up
        </button>
        <p className="text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <span
            className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
