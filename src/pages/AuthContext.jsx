import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (email, password) => {
    const storedUsers = JSON.parse(sessionStorage.getItem("users")) || [];
    const allUsers = [
      { email: "admin@shophub.com", password: "Admin123!", username: "Admin", role: "admin" },
      ...storedUsers,
    ];
    const foundUser = allUsers.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      sessionStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
      return { success: true, user: foundUser };
    } else {
      return { success: false, message: "Email yoki password xato!" };
    }
  };

  const signup = (newUser) => {
    const storedUsers = JSON.parse(sessionStorage.getItem("users")) || [];
    storedUsers.push({ ...newUser, role: "user" });
    sessionStorage.setItem("users", JSON.stringify(storedUsers));
    sessionStorage.setItem("user", JSON.stringify({ ...newUser, role: "user" }));
    setUser({ ...newUser, role: "user" });
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
