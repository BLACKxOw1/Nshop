import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import { ProtectedRoute, AuthRedirectRoute } from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Background from "./components/Background";
import Header from "./components/header";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Test from "./components/Test";
import UserInfo from "./components/UserInfo";
import Categories from "./components/Categories";

import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const { theme } = useTheme();

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const addToCart = (product) => {
    setCartItems((prev) => {
      const updated = [...prev, product];
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen bg-gray-950 text-gray-100"
          : "min-h-screen text-gray-800"
      }
    >
      <Background />
      <Header />

      <div className="pt-22 w-340 mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<AuthRedirectRoute><Login /></AuthRedirectRoute>} />
          <Route path="/signup" element={<AuthRedirectRoute><Signup /></AuthRedirectRoute>} />

          <Route path="/categories" element={<Categories />} />

          <Route path="/users" element={<Test />} />
          <Route path="/users/user/:id" element={<UserInfo />} />

          <Route
            path="/products"
            element={<Products addToCart={addToCart} />}
          />

          <Route path="/dashboard" element={
            <ProtectedRoute adminOnly={true}>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
