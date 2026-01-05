import React from "react";

function Cart({ cartItems = [], removeFromCart }) {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  if (cartItems.length === 0) {
    return <p className="text-center mt-10 text-2xl">Your cart is empty.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex bg-white p-4 rounded-2xl shadow-lg items-center gap-4">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-24 w-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default Cart;
