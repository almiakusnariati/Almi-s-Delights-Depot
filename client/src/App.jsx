import React, { useState, createContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./components/header.jsx";

export const AuthContext = createContext();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div>
        <Header />
        <Outlet />
        <footer className="border-t border-gray-300 p-2 text-center">
          &copy; AlmiaChan
        </footer>
      </div>
    </AuthContext.Provider>
  );
}
