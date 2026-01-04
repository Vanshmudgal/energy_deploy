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

// --- HERO SLIDES (UPDATED SLIDE 3) ---
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
    title: "SYSTEM OVERLOAD",
    subtitle: "ELECTRIFY THE NIGHT",
    // Cyberpunk/Neon image to match the #ccff00 brand color
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

    // Add scroll listener for navbar background change
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => prev === 0 ? slides.length - 1 : prev - 1);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => prev === slides.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* NAVBAR - Dynamic background based on scroll */}
      <Navbar 
        activePage="home" 
        transparent={!isScrolled} 
      />

      {/* HERO SECTION with padding-top for mobile navbar */}
      <section className="relative h-screen md:h-[90vh] overflow-hidden pt-16 md:pt-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            </div>

            {/* Content - FIXED TEXT STYLING */}
            <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24">
              <p className="text-[#ccff00] text-sm md:text-base lg:text-lg tracking-[0.3em] md:tracking-[0.5em] mb-3 md:mb-4 uppercase">
                {slide.subtitle}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black italic leading-tight md:leading-none break-words whitespace-nowrap">
                {slide.title}
              </h1>
              
              {/* Optional CTA Button */}
              <div className="mt-8 md:mt-12">
                <button className="border-2 border-white px-6 md:px-8 py-3 md:py-4 font-bold uppercase text-sm md:text-base hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-all duration-300">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#ccff00] w-8' 
                  : 'bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* SLIDE CONTROLS */}
        <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 flex gap-2 md:gap-4 z-20">
          <button
            onClick={goToPreviousSlide}
            className="p-2 md:p-3 lg:p-4 border border-white/30 rounded-full hover:bg-[#ccff00] hover:text-black transition-all duration-300 bg-black/20 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={goToNextSlide}
            className="p-2 md:p-3 lg:p-4 border border-white/30 rounded-full hover:bg-[#ccff00] hover:text-black transition-all duration-300 bg-black/20 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-[#ccff00] text-sm md:text-base tracking-[0.2em] md:tracking-[0.3em] lg:tracking-[0.5em] uppercase mb-3 md:mb-4">
              The Lineup
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black italic uppercase px-4">
              Choose Your Fuel
            </h3>
            <p className="mt-4 md:mt-6 text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-4">
              Discover our range of extreme energy drinks designed for maximum performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-[#151515] border border-white/10 rounded-xl md:rounded-2xl overflow-hidden hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-500"
              >
                {/* IMAGE TOP */}
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                  <div
                    className={`absolute inset-0 blur-[80px] md:blur-[120px] opacity-20 md:opacity-30 ${product.color}`}
                  ></div>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="relative w-full h-full object-contain p-4 md:p-6 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* TEXT BOTTOM */}
                <div className="p-4 md:p-6 lg:p-8">
                  <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mb-1 md:mb-2">
                    {product.flavor}
                  </p>

                  <h4
                    className={`text-xl md:text-2xl lg:text-3xl font-black italic uppercase ${product.text} leading-tight`}
                  >
                    {product.name}
                  </h4>
                  
                  {/* Add to Cart Button */}
                  <button className="mt-4 md:mt-6 w-full py-2 md:py-3 text-sm md:text-base font-bold uppercase bg-transparent border border-white/20 rounded-lg hover:bg-white hover:text-black transition-all duration-300 group-hover:border-[#ccff00]">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black italic uppercase mb-4 md:mb-6">
            Join the <span className="text-[#ccff00]">SURGE</span> Revolution
          </h3>
          <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base max-w-2xl mx-auto">
            Get exclusive access to new products, athlete content, and event tickets.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 md:px-6 py-3 md:py-4 bg-transparent border border-white/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#ccff00] transition-colors"
              required
            />
            <button
              type="submit"
              className="px-6 md:px-8 py-3 md:py-4 bg-[#ccff00] text-black font-bold uppercase rounded-lg hover:bg-white transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 md:py-10 text-center text-gray-500 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 mb-6 md:mb-8">
            <div className="text-2xl md:text-3xl font-black italic text-[#ccff00]">
              SURGE
            </div>
            <div className="flex gap-4 md:gap-8 text-sm md:text-base font-bold uppercase">
              <a href="#" className="text-white/50 hover:text-[#ccff00] transition-colors">Contact</a>
              <a href="#" className="text-white/50 hover:text-[#ccff00] transition-colors">Careers</a>
              <a href="#" className="text-white/50 hover:text-[#ccff00] transition-colors">Press</a>
            </div>
          </div>
          <p className="text-xs md:text-sm">© 2024 SURGE Energy. All rights reserved.</p>
          <p className="text-xs mt-2 text-gray-600">Fuel for the fearless.</p>
        </div>
      </footer>
    </div>
  );
}