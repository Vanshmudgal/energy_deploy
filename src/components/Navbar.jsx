import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ activePage = "home" }) => {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-6 bg-black border-b border-white/10">
      {/* Logo */}
      <Link to="/" className="text-4xl font-black tracking-tighter italic text-[#ccff00]">
        SURGE
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 font-bold text-sm tracking-widest uppercase">
        <Link
          to="/"
          className={`${
            activePage === "home"
              ? "text-[#ccff00] underline underline-offset-8 decoration-4"
              : "text-white/50 hover:text-[#ccff00]"
          } cursor-pointer transition-colors duration-300`}
        >
          Home
        </Link>
        
        <Link
          to="/athletes"
          className={`${
            activePage === "athletes"
              ? "text-[#ccff00] underline underline-offset-8 decoration-4"
              : "text-white/50 hover:text-[#ccff00]"
          } cursor-pointer transition-colors duration-300`}
        >
          Athletes
        </Link>
        
        <Link
          to="/events"
          className={`${
            activePage === "events"
              ? "text-[#ccff00] underline underline-offset-8 decoration-4"
              : "text-white/50 hover:text-[#ccff00]"
          } cursor-pointer transition-colors duration-300`}
        >
          Events
        </Link>
      </div>

      {/* Mobile Menu Button (optional) */}
      <button className="md:hidden text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;