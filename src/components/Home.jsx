import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom"; // Make sure you have react-router-dom installed

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
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1920&auto=format&fit=crop",
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
    title: "UNSTOPPABLE",
    subtitle: "NO LIMITS. NO FEAR.",
    image:
      "https://images.unsplash.com/photo-1621360841016-b8e734377033?q=80&w=1920&auto=format&fit=crop",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* NAVBAR - FIXED WITH NAVIGATION LINKS */}
      <nav className="absolute top-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-transparent">
        <div className="text-4xl font-black italic text-[#ccff00]">
          SURGE
        </div>
        <div className="hidden md:flex space-x-8 font-bold text-sm tracking-widest uppercase">
          <Link 
            to="/" 
            className="text-[#ccff00] underline underline-offset-8 decoration-4 cursor-pointer"
          >
            Home
          </Link>
          <Link 
            to="/athletes" 
            className="text-white/50 hover:text-[#ccff00] cursor-pointer"
          >
            Athletes
          </Link>
          <Link 
            to="/events" 
            className="text-white/50 hover:text-[#ccff00] cursor-pointer"
          >
            Events
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-transform duration-1000"
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-24">
              <p className="text-[#ccff00] tracking-[0.5em] mb-4">
                {slide.subtitle}
              </p>
              <h1 className="text-7xl md:text-9xl font-black italic">
                {slide.title}
              </h1>
            </div>
          </div>
        ))}

        {/* SLIDE CONTROLS */}
        <div className="absolute bottom-10 right-10 flex gap-4 z-20">
          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0 ? slides.length - 1 : prev - 1
              )
            }
            className="p-4 border border-white/30 rounded-full hover:bg-[#ccff00] hover:text-black transition"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
              )
            }
            className="p-4 border border-white/30 rounded-full hover:bg-[#ccff00] hover:text-black transition"
          >
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* PRODUCTS (INFO ONLY) */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="text-center mb-20">
          <h2 className="text-[#ccff00] tracking-[0.5em] uppercase mb-4">
            The Lineup
          </h2>
          <h3 className="text-5xl md:text-7xl font-black italic uppercase">
            Choose Your Fuel
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-[#151515] border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500"
            >
              {/* IMAGE TOP */}
              <div className="relative h-72 overflow-hidden">
                <div
                  className={`absolute inset-0 blur-[120px] opacity-30 ${product.color}`}
                ></div>

                <img
                  src={product.image}
                  alt={product.name}
                  className="relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* TEXT BOTTOM */}
              <div className="p-8">
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">
                  {product.flavor}
                </p>

                <h4
                  className={`text-3xl font-black italic uppercase ${product.text}`}
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
        © 2024 SURGE Energy
      </footer>
    </div>
  );
}