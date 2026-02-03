import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Home() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const sectionBg = theme === "dark" ? "bg-gray-950" : "bg-transparent";
  const shadow = theme === "dark" ? "shadow-none border border-gray-800" : "shadow-lg";

  return (
    <div className={`space-y-32 px-6 py-12 ${sectionBg}`}>

      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-pink-400 via-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
          Welcome to Nshop
        </h1>
        <p className={`mt-6 text-lg md:text-xl leading-relaxed ${textSecondary}`}>
          Discover the ultimate online shopping experience with style, speed, and simplicity.
          Your favorite products are just a click away.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-8 px-8 py-3 cursor-pointer bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition transform hover:scale-105"
        >
          Explore Products
        </button>
      </section>

      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "Fast Delivery",
            color: "text-blue-500",
            desc: "Get your products delivered quickly with our efficient logistics and tracking system.",
          },
          {
            title: "Secure Payment",
            color: "text-pink-500",
            desc: "Shop confidently with our encrypted payment system and safe checkout process.",
          },
          {
            title: "Customer Support",
            color: "text-green-500",
            desc: "Our team is available 24/7 to assist you with any questions or concerns.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`${cardBg} p-8 rounded-2xl ${shadow} hover:shadow-xl transition`}
          >
            <h3 className={`text-xl font-bold mb-3 ${item.color}`}>
              {item.title}
            </h3>
            <p className={textSecondary}>{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <img
          src="https://img.freepik.com/premium-photo/why-choose-us_220873-5582.jpg?semt=ais_hybrid&w=740&q=80"
          alt="shopping"
          className="rounded-2xl shadow-xl"
        />
        <div className="space-y-5">
          <h2 className={`text-3xl font-bold ${textPrimary}`}>
            Why Choose Nshop?
          </h2>
          <p className={`${textSecondary} leading-relaxed`}>
            We focus on delivering the best shopping experience with modern design,
            fast browsing, and a wide selection of products.
          </p>
          <p className={`${textSecondary} leading-relaxed`}>
            From product discovery to checkout, every detail is carefully designed
            to provide you with a seamless journey.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto space-y-12">
        <h2 className={`text-4xl font-bold text-center ${textPrimary}`}>
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              text: "Nshop is amazing! I found all my favorite products in one place and the delivery was super fast.",
              name: "Alice M.",
              color: "text-blue-500",
            },
            {
              text: "Shopping here is a pleasure. The UI is smooth and customer support is top-notch.",
              name: "John D.",
              color: "text-pink-500",
            },
            {
              text: "I love how simple it is to find exactly what I need. Nshop really understands UX.",
              name: "Sophia L.",
              color: "text-green-500",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`${cardBg} p-8 rounded-2xl ${shadow} hover:shadow-xl transition`}
            >
              <p className={`${textSecondary} mb-4`}>“{item.text}”</p>
              <h4 className={`font-bold ${item.color}`}>{item.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 py-16 rounded-3xl text-white">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Start Shopping?
        </h2>
        <p className="max-w-2xl mx-auto mb-8">
          Join thousands of happy customers and explore our exclusive collections today.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:scale-105 transition cursor-pointer"
        >
          Shop Now
        </button>
      </section>

    </div>
  );
}

export default Home;
