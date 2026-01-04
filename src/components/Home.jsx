import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  {
    id: 1,
    name: "ORIGINAL SURGE",
    flavor: "Citrus Kick",
    color: "bg-[#ccff00]",
    text: "text-[#ccff00]",
    image: citrus_kick,
  },
  {
    id: 2,
    name: "CRIMSON RUSH",
    flavor: "Sour Berry",
    color: "bg-red-600",
    text: "text-red-500",
    image: crimson_rush,
  },
  {
    id: 3,
    name: "ZERO ULTRA",
    flavor: "Zero Sugar",
    color: "bg-white",
    text: "text-white",
    image: zero_ultra,
  },
  {
    id: 4,
    name: "BLUE VOLT",
    flavor: "Electric Raspberry",
    color: "bg-cyan-400",
    text: "text-cyan-400",
    image: blue_volte,
  },
  {
    id: 5,
    name: "SOLAR FLARE",
    flavor: "Tropical Punch",
    color: "bg-orange-500",
    text: "text-orange-500",
    image: solar_flare,
  },
  {
    id: 6,
    name: "NIGHT OPS",
    flavor: "Dark Grape",
    color: "bg-purple-600",
    text: "text-purple-500",
    image: dark_grape,
  },
];

// --- HERO SLIDES ---
const slides = [
  {
    id: 1,
    title: "DEFY GRAVITY",
    subtitle: "OWN THE AIR",
    image:
     "https://images.unsplash.com/photo-1664494130837-14e0473ed284?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "PURE ADRENALINE",
    subtitle: "FUEL YOUR PASSION",
    image:
      "https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "SYSTEM OVERLOAD",
    subtitle: "ELECTRIFY THE NIGHT",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
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
            <div
              key={product.id}
              className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative h-64">
                <div
                  className={`absolute inset-0 blur-[100px] opacity-30 ${product.color}`}
                />
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative w-full h-full object-contain p-6"
                />
              </div>

              {/* TEXT */}
              <div className="p-6">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">
                  {product.flavor}
                </p>
                <h4
                  className={`text-2xl font-black italic uppercase ${product.text}`}
                >
                  {product.name}
                </h4>
              </div>
            </div>
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
