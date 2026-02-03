import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GridOnIcon from "@mui/icons-material/GridOn";
import { useTheme } from "../context/ThemeContext";

const STATIC_CATEGORIES = [
  { name: "beauty", count: null },
  { name: "fragrances", count: null },
  { name: "furniture", count: null },
  { name: "groceries", count: null },
  { name: "men's clothing", count: null },
  { name: "jewelery", count: null },
  { name: "electronics", count: null },
  { name: "women's clothing", count: null },
];

function Categories() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [categories, setCategories] = useState(STATIC_CATEGORIES);
  const [loading, setLoading] = useState(true);

  const pageBg = theme === "dark" ? "bg-gray-950" : "bg-transparent";
  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const hoverBg = theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-400";

  const goToProducts = (cat) => {
    if (cat === "All") {
      navigate("/products");
    } else {
      navigate(`/products?category=${encodeURIComponent(cat)}`);
    }
  };

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [dummyRes, fakeRes] = await Promise.all([
          axios.get("https://dummyjson.com/products"),
          axios.get("https://fakestoreapi.com/products"),
        ]);

        const allProducts = [
          ...dummyRes.data.products,
          ...fakeRes.data,
        ];

        const countMap = allProducts.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {});

        const updated = STATIC_CATEGORIES.map((cat) => ({
          ...cat,
          count: countMap[cat.name] || 0,
        }));

        setCategories(updated);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <p className={`text-center mt-10 text-2xl ${textSecondary}`}>
        Loading categories...
      </p>
    );
  }

  return (
    <div
      className={`${pageBg} max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10`}
    >
      <aside className="md:w-64 shrink-0">
        <div className="sticky top-24">
          <h2 className={`text-2xl font-bold mb-6 ${textPrimary}`}>
            Categories
          </h2>

          <ul className="space-y-3">
            <li
              onClick={() => goToProducts("All")}
              className={`cursor-pointer px-4 py-2 rounded-xl transition ${hoverBg}`}
            >
              All Products
            </li>

            {categories.map((cat) => (
              <li
                key={cat.name}
                onClick={() => goToProducts(cat.name)}
                className={`cursor-pointer px-4 py-2 rounded-xl transition flex justify-between ${hoverBg}`}
              >
                <span className="capitalize">{cat.name}</span>
                <span className="text-sm px-2 py-0.5 rounded-lg bg-gray-500 text-white">
                  {cat.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="flex-1">
        <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>
          All Categories
        </h1>
        <p className={`${textSecondary} mb-8`}>
          Browse our complete collection organized by category
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => goToProducts(cat.name)}
              className={`cursor-pointer rounded-3xl p-8 transition group border ${cardBg} ${borderColor} hover:shadow-lg`}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <GridOnIcon style={{ fontSize: 48, color: "blue" }} />
              </div>

              <h3
                className={`text-xl font-bold capitalize mb-1 ${
                  theme === "dark"
                    ? "group-hover:text-blue-400"
                    : "group-hover:text-blue-700"
                }`}
              >
                {cat.name}
              </h3>
              <p className={textSecondary}>{cat.count} products</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
