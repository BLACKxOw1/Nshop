import React, { useEffect, useState } from "react";
import axios from "axios";

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const [dummyRes, fakeRes] = await Promise.all([
          axios.get("https://dummyjson.com/products"),
          axios.get("https://fakestoreapi.com/products")
        ]);

        const dummyProducts = dummyRes.data.products.map(p => ({
          id: `dummy-${p.id}`,
          title: p.title,
          price: p.price,
          description: p.description,
          category: p.category,
          thumbnail: p.thumbnail
        }));

        const fakeProducts = fakeRes.data.map(p => ({
          id: `fake-${p.id}`,
          title: p.title,
          price: p.price,
          description: p.description,
          category: p.category,
          thumbnail: p.image
        }));

        const allProducts = [...dummyProducts, ...fakeProducts];

        const allCategories = ["All", ...new Set(allProducts.map(p => p.category))];

        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setCategories(allCategories);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  if (loading) return <p className="text-center mt-10 text-2xl">Loading products...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
      <aside className="md:w-64 shrink-0">
        <div className="sticky top-24">
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          <ul className="space-y-2">
            {categories.map(cat => (
              <li
                key={cat}
                onClick={() => filterByCategory(cat)}
                className={`cursor-pointer px-4 py-2 rounded-lg transition ${activeCategory === cat ? "bg-gray-500 text-white" : "hover:bg-gray-300"
                  }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">{activeCategory === "All" ? "All Products" : activeCategory}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col">
              <img src={product.thumbnail} alt={product.title} className="h-48 w-full object-cover rounded-lg mb-4" />
              <h3 className="font-bold text-lg mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              <p className="text-blue-500 font-semibold mb-4">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
