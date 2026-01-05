import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate()

  return (
    <div className="px-6 py-10 space-y-24">

      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold bg-linear-to-r from-pink-400 via-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
          About Nshop
        </h1>
        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
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
          <h2 className="text-3xl font-bold text-gray-800">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Nshop was born from a simple idea: make online shopping smooth, joyful,
            and visually delightful. We believe technology should feel human,
            friendly, and inspiring.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From carefully crafted UI elements to performance-focused architecture,
            every part of Nshop is designed with love and attention to detail.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-3xl shadow-lg py-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-8">
          <div>
            <h3 className="text-4xl font-bold text-blue-500">10K+</h3>
            <p className="text-gray-500 mt-2">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-pink-500">500+</h3>
            <p className="text-gray-500 mt-2">Products</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-green-500">24/7</h3>
            <p className="text-gray-500 mt-2">Support</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-purple-500">5★</h3>
            <p className="text-gray-500 mt-2">User Rating</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-blue-500">Innovation</h3>
            <p className="text-gray-600">
              We constantly explore new technologies and ideas to deliver the best
              shopping experience.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-pink-500">Quality</h3>
            <p className="text-gray-600">
              From code to customer service, quality is at the heart of everything
              we do.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-green-500">Trust</h3>
            <p className="text-gray-600">
              We build long-term relationships with our users based on honesty and
              transparency.
            </p>
          </div>
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
          onClick={()=>navigate('/products')}
          className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:scale-105 transition cursor-pointer">
          Explore Products
        </button>
      </section>

    </div>
  );
}

export default About;
