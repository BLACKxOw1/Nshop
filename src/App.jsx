import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Background from "./components/Background";
import Header from "./components/header";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Test from "./components/Test";
import UserInfo from "./components/UserInfo";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const addToCart = (product) => {
    setCartItems(prev => {
      const updated = [...prev, product];
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      <Background />
      <Header />

      <div className="pt-22 w-340 mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/users" element={<Test />} />
          <Route path="/users/user/:id" element={<UserInfo />} />

          <Route path="/products" element={<Products addToCart={addToCart} />} />

          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
