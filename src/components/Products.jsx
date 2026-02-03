import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../pages/AuthContext";

function Products({ addToCart }) {
  const { theme } = useTheme();
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const pageBg = theme === "dark" ? "bg-gray-950" : "bg-transparent";
  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const categoryCount = theme === "dark" ? "bg-gray-200" : "bg-gray-300";
  const cardShadow =
    theme === "dark" ? "border border-gray-800" : "shadow-lg hover:shadow-xl";
  const categoryActive = "bg-gray-500 text-white";
  const categoryHover =
    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-400";

  const fetchProducts = async () => {
    try {
      const [dummyRes, fakeRes] = await Promise.all([
        axios.get("https://dummyjson.com/products"),
        axios.get("https://fakestoreapi.com/products"),
      ]);

      const dummyProducts = dummyRes.data.products.map((p) => ({
        id: `dummy-${p.id}`,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        thumbnail: p.thumbnail,
      }));

      const fakeProducts = fakeRes.data.map((p) => ({
        id: `fake-${p.id}`,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        thumbnail: p.image,
      }));

      const allProducts = [...dummyProducts, ...fakeProducts];

      const countMap = allProducts.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {});

      const categoryList = [
        { name: "All", count: allProducts.length },
        ...Object.keys(countMap).map((key) => ({
          name: key,
          count: countMap[key],
        })),
      ];

      setProducts(allProducts);
      setCategories(categoryList);

      const urlCategory = searchParams.get("category");
      if (urlCategory) {
        setActiveCategory(urlCategory);
        setFilteredProducts(
          allProducts.filter((p) => p.category === urlCategory)
        );
      } else {
        setActiveCategory("All");
        setFilteredProducts(allProducts);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const filterByCategory = (category) => {
    setActiveCategory(category);
    setFilteredProducts(
      category === "All"
        ? products
        : products.filter((p) => p.category === category)
    );
  };

  const handleAdminClick = (type) => {
    alert(`Bu tugmani ishlatolmadim: ${type}`);
  };

  if (loading)
    return (
      <p className={`text-center mt-10 text-2xl ${textSecondary}`}>
        Loading products...
      </p>
    );

  return (
    <div
      className={`${pageBg} max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8`}
    >
      <aside className="md:w-64 shrink-0">
        <div className="sticky top-24">
          <h2 className={`text-2xl font-bold mb-6 ${textPrimary}`}>
            Categories
          </h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat.name}
                onClick={() => filterByCategory(cat.name)}
                className={`cursor-pointer px-4 py-2 rounded-lg transition flex justify-between ${
                  activeCategory === cat.name ? categoryActive : categoryHover
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-sm px-2 py-0.5 rounded-lg ${categoryCount} text-black`}
                >
                  {cat.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="flex-1">
        <h1 className={`text-3xl font-bold mb-6 ${textPrimary}`}>
          {activeCategory === "All" ? "All Products" : activeCategory}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`${cardBg} p-4 rounded-2xl transition flex flex-col ${cardShadow}`}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-48 w-full object-cover rounded-lg mb-4"
              />

              <h3 className={`font-bold text-lg mb-2 ${textPrimary}`}>
                {product.title}
              </h3>

              <p className={`${textSecondary} mb-2 line-clamp-2`}>
                {product.description}
              </p>

              <p className="text-blue-500 font-semibold mb-4">
                ${product.price}
              </p>

              <div className="mt-auto flex items-center gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-green-500 cursor-pointer text-white py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Add to Cart
                </button>

                {user?.role === "admin" ? (
                  <div className="flex gap-2">
                    <EditIcon
                      className="cursor-pointer text-yellow-400"
                      onClick={() => handleAdminClick("Edit")}
                    />
                    <DeleteIcon
                      className="cursor-pointer text-red-500"
                      onClick={() => handleAdminClick("Delete")}
                    />
                  </div>
                ) : (
                  <LockOutlineIcon
                    className={textSecondary}
                    style={{ cursor: "not-allowed" }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
