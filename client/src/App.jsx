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
        {/* <footer className="border-t font-bold text-xl text-white bg-gray-700 border-gray-800 p-2 text-center">
          &copy; AlmiaChan
        </footer> */}
      </div>
    </AuthContext.Provider>
  );
}
