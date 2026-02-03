import React from "react";
import { useTheme } from "../context/ThemeContext";

function Cart({ cartItems = [], removeFromCart }) {
  const { theme } = useTheme();

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const pageBg = theme === "dark" ? "bg-gray-950" : "bg-transparent";
  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const cardBorder =
    theme === "dark" ? "border border-gray-800" : "shadow-lg";

  if (cartItems.length === 0) {
    return (
      <p className={`text-center mt-10 text-2xl ${textSecondary}`}>
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className={`${pageBg} max-w-6xl mx-auto px-6 py-12`}>
      <h1 className={`text-4xl font-bold mb-8 text-center ${textPrimary}`}>
        Your Cart
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 p-4 rounded-2xl transition ${cardBg} ${cardBorder}`}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-24 w-24 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h3 className={`font-bold text-lg ${textPrimary}`}>
                {item.title}
              </h3>
              <p className={textSecondary}>${item.price}</p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <h2 className={`text-2xl font-bold ${textPrimary}`}>
          Total: ${total.toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

export default Cart;
