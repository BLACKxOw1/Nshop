import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function About() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const pageBg = theme === "dark" ? "bg-gray-950" : "bg-transparent";
  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const cardBorder =
    theme === "dark" ? "border border-gray-800" : "shadow-lg";

  return (
    <div className={`${pageBg} px-6 py-10 space-y-24`}>

      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold bg-linear-to-r from-pink-400 via-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
          About Nshop
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${textSecondary}`}>
          Nshop is more than just an online store. It’s a modern digital marketplace
          built with passion, creativity, and a deep understanding of what users love.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
          alt="about"
          className="rounded-2xl shadow-xl"
        />

        <div className="space-y-5">
          <h2 className={`text-3xl font-bold ${textPrimary}`}>
            Our Story
          </h2>
          <p className={`${textSecondary} leading-relaxed`}>
            Nshop was born from a simple idea: make online shopping smooth, joyful,
            and visually delightful. We believe technology should feel human,
            friendly, and inspiring.
          </p>
          <p className={`${textSecondary} leading-relaxed`}>
            From carefully crafted UI elements to performance-focused architecture,
            every part of Nshop is designed with love and attention to detail.
          </p>
        </div>
      </section>

      <section
        className={`rounded-3xl py-14 max-w-6xl mx-auto ${cardBg} ${cardBorder}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-8">
          <div>
            <h3 className="text-4xl font-bold text-blue-500">10K+</h3>
            <p className={`${textSecondary} mt-2`}>Happy Customers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-pink-500">500+</h3>
            <p className={`${textSecondary} mt-2`}>Products</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-green-500">24/7</h3>
            <p className={`${textSecondary} mt-2`}>Support</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-purple-500">5★</h3>
            <p className={`${textSecondary} mt-2`}>User Rating</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-12 ${textPrimary}`}>
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Innovation",
              color: "text-blue-500",
              desc: "We constantly explore new technologies and ideas to deliver the best shopping experience.",
            },
            {
              title: "Quality",
              color: "text-pink-500",
              desc: "From code to customer service, quality is at the heart of everything we do.",
            },
            {
              title: "Trust",
              color: "text-green-500",
              desc: "We build long-term relationships with our users based on honesty and transparency.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`p-8 rounded-2xl transition hover:shadow-xl ${cardBg} ${cardBorder}`}
            >
              <h3 className={`text-xl font-bold mb-3 ${item.color}`}>
                {item.title}
              </h3>
              <p className={textSecondary}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 py-16 rounded-3xl text-white">
        <h2 className="text-4xl font-bold mb-4">
          Join the Nshop Experience
        </h2>
        <p className="max-w-2xl mx-auto mb-8">
          Discover a new way of online shopping where beauty, performance,
          and simplicity come together.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:scale-105 transition cursor-pointer"
        >
          Explore Products
        </button>
      </section>

    </div>
  );
}

export default About;
