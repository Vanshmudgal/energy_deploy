import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ activePage = "home", transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav 
        className={`w-full flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 ${
          transparent 
            ? "bg-transparent" 
            : "bg-black border-b border-white/10"
        }`}
      >
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl sm:text-3xl md:text-4xl font-black italic text-[#ccff00]"
        >
          SURGE
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 font-bold text-sm tracking-widest uppercase">
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

        {/* Mobile Menu Button - ALWAYS VISIBLE ON MOBILE */}
        <button 
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay - Sideways Slide-in */}
      <div className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        {/* Semi-transparent backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Side Menu Panel */}
        <div className={`absolute right-0 top-0 h-full w-64 bg-black border-l border-white/10 transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-white p-2 hover:text-[#ccff00]"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Mobile Navigation Links */}
          <div className="flex flex-col px-6 py-8 space-y-6">
            <MobileNavLink 
              to="/" 
              active={activePage === "home"}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </MobileNavLink>
            
            <MobileNavLink 
              to="/athletes" 
              active={activePage === "athletes"}
              onClick={() => setIsMenuOpen(false)}
            >
              Athletes
            </MobileNavLink>
            
            <MobileNavLink 
              to="/events" 
              active={activePage === "events"}
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </MobileNavLink>
          </div>
          
          {/* Decorative Footer in Mobile Menu */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <div className="text-[#ccff00] text-xs uppercase tracking-widest opacity-70">
              Extreme Energy
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({ to, children, active, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`text-xl font-bold uppercase py-3 px-4 rounded-lg transition-all duration-200 ${
      active
        ? "bg-[#ccff00] text-black"
        : "text-white hover:bg-white/10 hover:text-[#ccff00]"
    }`}
  >
    {children}
  </Link>
);

export default Navbar;