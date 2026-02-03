import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../pages/AuthContext"

function Header() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const isDark = theme === "dark"
  const [showProfile, setShowProfile] = useState(false)

  const wrapperClass = `header transition ${isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-700"}`
  const navBase = "px-3 py-1 rounded-xl transition"
  const navActive = isDark ? "bg-blue-700 text-white" : "bg-gray-500 text-white"
  const navInactive = isDark
    ? "text-blue-400 hover:bg-gray-700 hover:text-white"
    : "text-blue-400 hover:bg-gray-400 hover:text-white"
  const buttonBase = "border rounded px-3 py-0.5 text-sm cursor-pointer transition font-semibold"

  const links = ["/", "/categories", "/products"]
  if (user?.role === "admin") links.push("/dashboard")
  links.push("/cart", "/users", "/about")

  return (
    <div className={wrapperClass}>
      <div className="flex items-center justify-between max-w-330 mx-auto">
        <div className="cursor-pointer flex items-center gap-2" onClick={() => window.location.href = "/"}>
          <h1 className="text-2xl font-semibold bg-linear-to-r from-pink-400 via-purple-400 via-indigo-400 via-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
            Nshop
          </h1>
        </div>
        <nav className="flex gap-4">
          {links.map((path) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `${navBase} ${isActive ? navActive : navInactive}`}
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3 relative">
          <button onClick={toggleTheme} className="cursor-pointer p-1">
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
          <button className="cursor-pointer p-1" onClick={() => navigate("/cart")}>
            <ShoppingCartIcon />
          </button>
          {!user && (
            <>
              <button
                onClick={() => navigate("/login")}
                className={`${buttonBase} ${isDark ? "bg-blue-700 border-blue-600 text-white" : "bg-blue-300 border-blue-500 text-white"}`}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className={`${buttonBase} ${isDark ? "bg-green-700 border-green-600 text-white" : "bg-green-300 border-green-500 text-white"}`}
              >
                Sign Up
              </button>
            </>
          )}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className={`${buttonBase} ${isDark ? "bg-purple-700 text-white" : "bg-purple-300 text-white"}`}
              >
                {user.role === "admin" ? `ADMIN: ${user.username}` : `USER: ${user.username}`}
              </button>
              {showProfile && (
                <div className={`absolute right-0 mt-2 w-48 p-3 rounded-xl shadow-lg ${isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}>
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <button
                    onClick={() => { logout(); navigate("/"); setShowProfile(false); }}
                    className="mt-2 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
