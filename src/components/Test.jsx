import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, User, Calendar } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Test() {
  const [counter, setCounter] = useState(1);
  const navigate = useNavigate();
  const listRef = useRef(null);
  const scrollPos = useRef(0);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/users");
      return res.data.users;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = scrollPos.current;
    }
  }, []);

  if (isLoading)
    return <p className="text-center text-3xl mt-10">Loading users...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error loading users</p>;

  return (
    <div
      ref={listRef}
      className={`${isDark ? "bg-gray-950 text-gray-100" : "bg-transparent text-gray-900"} min-h-screen p-6 transition-colors`}
    >
      <h1 className="text-4xl text-center font-bold py-5 text-blue-400">
        Counter: {counter}
      </h1>

      <div className="flex gap-3 items-center justify-center py-3">
        <button
          className={`rounded-xl border px-6 py-2 ${isDark ? "hover:bg-green-700" : "hover:bg-green-200"} transition`}
          onClick={() => setCounter(counter + 1)}
        >
          Increment
        </button>
        <button
          className={`rounded-xl border px-6 py-2 ${isDark ? "hover:bg-red-700" : "hover:bg-red-200"} transition`}
          onClick={() => setCounter(counter - 1)}
        >
          Decrement
        </button>
        <button
          className={`rounded-xl border px-6 py-2 ${isDark ? "hover:bg-yellow-800" : "hover:bg-yellow-100"} transition`}
          onClick={() => setCounter(0)}
        >
          Reset
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto pt-5">
        {users.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => {
              scrollPos.current = listRef.current.scrollTop;
              navigate(`/users/user/${user.id}`);
            }}
            className={`cursor-pointer rounded-2xl p-5 border transition-shadow shadow-md ${
              isDark
                ? "bg-gray-900 hover:shadow-gray-700/50"
                : "bg-white hover:shadow-lg"
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={user.image}
                alt={user.firstName}
                className={`w-16 h-16 rounded-full ring-2 ${
                  isDark ? "ring-blue-500" : "ring-blue-200"
                }`}
              />

              <div>
                <h3 className="font-semibold text-lg">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-xs capitalize">{user.role}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {user.email}
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Age: {user.age}
              </p>
              <p className="flex items-center gap-2">
                <User className="w-4 h-4" /> {user.company?.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Test;
