import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);

    if (result.success) {
      if (result.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
      window.location.reload();
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-5 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-xl p-8 shadow-lg
        bg-white text-gray-900
        dark:bg-[#0d1117] dark:text-gray-100 dark:shadow-none
        border border-transparent dark:border-[#30363d]">
        <h1 className="text-2xl font-bold">Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border px-3 py-2
          bg-white text-gray-900 border-gray-300
          focus:outline-none focus:ring-2 focus:ring-purple-500
          dark:bg-[#161b22] dark:text-gray-100 dark:border-[#30363d]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-lg border px-3 py-2
          bg-white text-gray-900 border-gray-300
          focus:outline-none focus:ring-2 focus:ring-purple-500
          dark:bg-[#161b22] dark:text-gray-100 dark:border-[#30363d]"
        />
        <button
          type="submit"
          className="w-full rounded-lg py-2 font-medium text-white
          bg-purple-600 hover:bg-purple-700 transition
          dark:bg-purple-700 dark:hover:bg-purple-800"
        >
          Sign In
        </button>
        <div className="rounded-xl p-3
          bg-orange-100 text-orange-900
          dark:bg-[#161b22] dark:text-orange-300
          border dark:border-[#30363d]"
        >
          <h1 className="font-bold">Demo Credentials:</h1>
          <p>Email: admin@shophub.com</p>
          <p>Password: Admin123!</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
