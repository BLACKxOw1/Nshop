import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="flex items-center justify-between max-w-330 mx-auto">
        <div className="cursor-pointer flex">
          <svg width="35" height="35" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="80" width="200" height="160" rx="20"
              fill="none" stroke="rgb(0, 136, 255)" strokeWidth="12" />

            <path d="M90 80 C90 40 210 40 210 80"
              fill="none" stroke="rgb(0, 136, 255)"
              strokeWidth="12" strokeLinecap="round" />

            <path d="M150 150 
           C140 135 120 135 120 155
           C120 175 150 195 150 195
           C150 195 180 175 180 155 
           C180 135 160 135 150 150 Z"
              fill="rgb(255, 96, 128)" />

            <text x="150" y="275"
              fontFamily="Montserrat, sans-serif"
              fontSize="28"
              fill="rgb(0, 136, 255)"
              textAnchor="middle">
            </text>
          </svg>
          <h1 className="text-2xl font-semibold bg-linear-to-r from-pink-400 via-purple-400 via-indigo-400 via-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
            Nshop
          </h1>
        </div>

        <nav className="text-[17px] flex items-center gap-5 text-[#4DA6FF]">
          {[
            { name: "Home", path: "/" },
            { name: "Users", path: "/users" },
            { name: "Products", path: "/products" },
            { name: "Cart", path: "/cart" },
            { name: "About", path: "/about" },
          ].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-5 py-1 rounded-xl transition-all duration-400 ${isActive ? "bg-gray-500 text-white" : "hover:bg-gray-400 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="border border-blue-500 rounded px-3 py-0.5 bg-blue-300 text-white text-sm cursor-pointer">Login</button>
          <button className="border border-green-500 rounded px-3 py-0.5 bg-green-300 text-white text-sm cursor-pointer">Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
