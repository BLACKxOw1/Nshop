import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GridOnIcon from "@mui/icons-material/GridOn";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTheme } from "../context/ThemeContext";

const STATIC_CATEGORIES = [
  { name: "beauty", count: 0 },
  { name: "fragrances", count: 0 },
  { name: "furniture", count: 0 },
  { name: "groceries", count: 0 },
  { name: "men's clothing", count: 0 },
  { name: "jewelery", count: 0 },
  { name: "electronics", count: 0 },
  { name: "women's clothing", count: 0 },
];

function Dashboard() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [categories, setCategories] = useState(STATIC_CATEGORIES);
  const [loading, setLoading] = useState(true);

  const goToProducts = (cat) => {
    cat === "All"
      ? navigate("/products")
      : navigate(`/products?category=${encodeURIComponent(cat)}`);
  };

  const showNotImplemented = () => {
    window.alert("❌ Bu funksiyani hozircha qila olmadim");
  };

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [dummyRes, fakeRes] = await Promise.all([
          axios.get("https://dummyjson.com/products"),
          axios.get("https://fakestoreapi.com/products"),
        ]);

        const allProducts = [...dummyRes.data.products, ...fakeRes.data];

        const countMap = allProducts.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {});

        setCategories(
          STATIC_CATEGORIES.map((c) => ({
            ...c,
            count: countMap[c.name] || 0,
          }))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  const totalProducts = categories.reduce((a, b) => a + b.count, 0);

  if (loading) {
    return (
      <p className="text-center mt-20 text-xl text-gray-500">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div
      className={`max-w-7xl mx-auto px-6 py-10 flex gap-10 transition
      ${isDark ? "bg-gray-950 text-gray-200" : "bg-transparent text-gray-800"}`}
    >
      <aside className="w-64 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Categories</h2>
        <ul className="space-y-3">
          <li
            onClick={() => goToProducts("All")}
            className={`cursor-pointer px-4 py-2 rounded-lg transition
            ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
          >
            All Products
          </li>

          {categories.map((cat) => (
            <li
              key={cat.name}
              onClick={() => goToProducts(cat.name)}
              className={`cursor-pointer flex justify-between px-4 py-2 rounded-lg transition
              ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
            >
              <span className="capitalize">{cat.name}</span>
              <span className="text-sm font-semibold text-indigo-500">
                {cat.count}
              </span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 space-y-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Products"
            value={totalProducts}
            icon={<GridOnIcon />}
          />
          <StatCard
            title="Categories"
            value={categories.length}
            icon={<ShoppingCartIcon />}
          />
          <StatCard
            title="Users"
            value={JSON.parse(sessionStorage.getItem("users") || "[]").length}
            icon={<PeopleIcon />}
          />
        </div>

        <section
          className={`rounded-2xl p-6 border transition
          ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
        >
          <h2 className="text-xl font-bold mb-6">Product Categories</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => goToProducts(cat.name)}
                className={`cursor-pointer rounded-xl px-6 py-4 flex justify-between items-center transition
                ${isDark
                    ? "border border-gray-800 hover:bg-gray-800"
                    : "border border-gray-200 hover:bg-gray-50"}`}
              >
                <div>
                  <p className="font-semibold capitalize">{cat.name}</p>
                  <p className="text-sm text-gray-500">
                    {cat.count} products
                  </p>
                </div>
                <span className="text-2xl font-bold text-indigo-500">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          <ActionCard
            title="View All Products"
            subtitle="Browse and manage all products"
            gradient={
              isDark
                ? "from-indigo-700 to-purple-700"
                : "from-indigo-200 to-pink-200"
            }
            onClick={showNotImplemented}
          />

          <ActionCard
            title="Recently Deleted"
            subtitle="Restore deleted products"
            gradient={
              isDark
                ? "from-pink-700 to-purple-700"
                : "from-pink-200 to-purple-200"
            }
            onClick={showNotImplemented}
          />
        </div>

      </main>
    </div>
  );
}

export default Dashboard;


function StatCard({ title, value, icon }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`border rounded-2xl p-6 flex justify-between items-center transition
      ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className="text-indigo-400 text-4xl">{icon}</div>
    </div>
  );
}

function ActionCard({ title, subtitle, gradient, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-6 bg-gradient-to-r ${gradient} cursor-pointer transition hover:scale-[1.02]`}
    >
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm opacity-80">{subtitle}</p>
    </div>
  );
}

