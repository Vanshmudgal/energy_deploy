import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

// 🔥 IMPORT IMAGES (SAME FOLDER)
import blue_volte from "./blue_volte.png";
import citrus_kick from "./citrus_kick.png";
import crimson_rush from "./crimson_rush.png";
import dark_grape from "./dark_grape.png";
import solar_flare from "./solar_flare.png";
import zero_ultra from "./zero_ultra.png";

// --- PRODUCT DATA ---
const products = [
  { id: 1, name: "ORIGINAL SURGE", flavor: "Citrus Kick", color: "bg-[#ccff00]", text: "text-[#ccff00]", image: citrus_kick },
  { id: 2, name: "CRIMSON RUSH", flavor: "Sour Berry", color: "bg-red-600", text: "text-red-500", image: crimson_rush },
  { id: 3, name: "ZERO ULTRA", flavor: "Zero Sugar", color: "bg-white", text: "text-white", image: zero_ultra },
  { id: 4, name: "BLUE VOLT", flavor: "Electric Raspberry", color: "bg-cyan-400", text: "text-cyan-400", image: blue_volte },
  { id: 5, name: "SOLAR FLARE", flavor: "Tropical Punch", color: "bg-orange-500", text: "text-orange-500", image: solar_flare },
  { id: 6, name: "NIGHT OPS", flavor: "Dark Grape", color: "bg-purple-600", text: "text-purple-500", image: dark_grape },
];

// --- HERO SLIDES ---
const slides = [
  { id: 1, title: "DEFY GRAVITY", subtitle: "OWN THE AIR", image: "https://images.unsplash.com/photo-1664494130837-14e0473ed284?q=80&w=1170&auto=format&fit=crop" },
  { id: 2, title: "PURE ADRENALINE", subtitle: "FUEL YOUR PASSION", image: "https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=1920&auto=format&fit=crop" },
  { id: 3, title: "SYSTEM OVERLOAD", subtitle: "ELECTRIFY THE NIGHT", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop" },
];

// --- INDIVIDUAL PRODUCT CARD COMPONENT ---
const ProductCard = ({ product }) => {
  // Two states: One for loading, one for a totally broken link
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
      {/* IMAGE CONTAINER */}
      <div className="relative h-64 flex items-center justify-center">
        {/* Background Glow */}
        <div className={`absolute inset-0 blur-[100px] opacity-30 ${product.color}`} />
        
        {/* 1. SKELETON LOADER (Visible only while downloading) */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center z-10 p-6">
            {/* Tailwind's animate-pulse gives it that loading "breathing" effect */}
            <div className="w-full h-full bg-white/5 rounded-xl animate-pulse" />
          </div>
        )}

        {/* 2. ERROR STATE UI (If image completely fails) */}
        {hasError ? (
          <div className="relative z-10 flex flex-col items-center justify-center text-gray-600">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-bold tracking-[0.2em] uppercase">No Image</span>
          </div>
        ) : (
          /* 3. ACTUAL IMAGE */
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            // We keep it in the DOM but hide it with opacity-0 until it's done loading, 
            // then smoothly fade it in with duration-500
            className={`relative z-20 w-full h-full object-contain p-6 transition-opacity duration-500 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)} // Triggers when the download finishes
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }} // Triggers if the link is broken
          />
        )}
      </div>

      {/* TEXT */}
      <div className="p-6 mt-auto">
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">
          {product.flavor}
        </p>
        <h4 className={`text-2xl font-black italic uppercase ${product.text}`}>
          {product.name}
        </h4>
      </div>
    </div>
  );
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar activePage="home" transparent={!isScrolled} />

      {/* HERO */}
      <section className="relative h-screen md:h-[90vh] overflow-hidden pt-16 md:pt-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

            <div className="relative h-full flex flex-col justify-center px-6 md:px-24">
              <p className="text-[#ccff00] tracking-[0.4em] uppercase mb-4">
                {slide.subtitle}
              </p>
              <h1 className="text-5xl md:text-8xl font-black italic">
                {slide.title}
              </h1>
            </div>
          </div>
        ))}
      </section>

      {/* PRODUCTS */}
      <section className="py-16 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-[#ccff00] tracking-[0.4em] uppercase mb-4">
            The Lineup
          </h2>
          <h3 className="text-4xl md:text-6xl font-black italic uppercase">
            Choose Your Fuel
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 border-t border-white/10">
        <p className="text-sm">© 2024 SURGE Energy. All rights reserved.</p>
      </footer>
    </div>
  );
}