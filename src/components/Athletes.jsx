import React, { useMemo, useState } from "react";
import { Instagram, Twitter, Trophy, TrendingUp } from "lucide-react";
import Navbar from "./Navbar";

// Import images directly so the browser can discover them immediately (Vital for LCP)
import JackRyderImg from "./Jack_Ryder.png";
import ElenaIceImg from "./Elena_Ice.png";
import MarcusDriftImg from "./marcus_drift.png";
import SarahSpeedImg from "./sarah_speed.png";

// Optimized AthleteCard
const AthleteCard = React.memo(({ athlete, priority = false }) => {
  // 1. State to track image loading
  const [isLoaded, setIsLoaded] = useState(false);

  const getObjectPosition = useMemo(() => {
    if (athlete.imagePosition === 'right') return '65% center';
    if (athlete.imagePosition === 'left') return '35% center';
    return 'center';
  }, [athlete.imagePosition]);

  return (
    <div className="group relative h-[500px] w-full bg-[#151515] overflow-hidden border border-white/10 hover:border-[#ccff00] transition-all duration-300">
      
      {/* 2. Skeleton Loading UI */}
      {/* Renders a pulsating background while the image is downloading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse z-0"></div>
      )}

      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden bg-transparent z-0">
        <img
          src={athlete.imageSrc}
          alt={athlete.name}
          // 3. Trigger state change when loaded
          onLoad={() => setIsLoaded(true)}
          // 4. Conditional opacity classes to hide the image until loaded
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded 
              ? "grayscale group-hover:grayscale-0 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
              : "opacity-0 scale-105"
          }`}
          style={{ objectPosition: getObjectPosition }}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-60 transition-opacity z-10"></div>

      {/* Content */}
      <div className="absolute bottom-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-20">
        <p className="text-[#ccff00] font-bold tracking-widest text-sm uppercase mb-1">
          {athlete.sport}
        </p>
        <h3 className="text-4xl font-black italic uppercase leading-none mb-2">
          {athlete.name}
        </h3>
        <p className="text-white/80 italic text-sm mb-6 border-l-2 border-[#ccff00] pl-3">
          "{athlete.quote}"
        </p>

        {/* Hidden Stats */}
        <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <div>
            <div className="flex items-center gap-2 text-[#ccff00]">
              <Trophy size={16} /> WINS
            </div>
            <div className="font-bold text-xl">
              {athlete.stats.wins}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[#ccff00]">
              <TrendingUp size={16} /> RANK
            </div>
            <div className="font-bold text-xl">
              {athlete.stats.rank}
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mt-4 justify-end text-white/50">
          <Instagram className="hover:text-white cursor-pointer transition-colors duration-200" size={20} />
          <Twitter className="hover:text-white cursor-pointer transition-colors duration-200" size={20} />
        </div>
      </div>
    </div>
  );
});

AthleteCard.displayName = 'AthleteCard';

const Athletes = () => {
  const athletes = useMemo(() => [
    {
      id: 1,
      name: "JAX RYDER",
      sport: "Freestyle BMX",
      country: "USA",
      imageSrc: JackRyderImg,
      quote: "Gravity is just a suggestion.",
      stats: { wins: 14, rank: "World #1" },
    },
    {
      id: 2,
      name: "ELENA 'ICE' V",
      sport: "Snowboard Cross",
      country: "Sweden",
      imageSrc: ElenaIceImg,
      quote: "Cold veins, hot speed.",
      stats: { wins: 22, rank: "Olym. Gold" },
    },
    {
      id: 3,
      name: "MARCUS DRIFT",
      sport: "Rally Cross",
      country: "UK",
      imageSrc: MarcusDriftImg,
      quote: "If you're in control, you're too slow.",
      stats: { wins: 8, rank: "Top 5" },
      imagePosition: "right",
    },
    {
      id: 4,
      name: "SARAH SPEED",
      sport: "Moto GP",
      country: "Spain",
      imageSrc: SarahSpeedImg,
      quote: "The track is my canvas.",
      stats: { wins: 19, rank: "Champion" },
      imagePosition: "left",
    },
  ], []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black">
      <Navbar activePage="athletes" />

      {/* Header */}
      <header className="relative py-24 px-6 md:px-12 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00] rounded-full blur-[150px] opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[#ccff00] text-xl font-bold tracking-[0.5em] uppercase mb-4">
            The Roster
          </h2>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none text-white">
            TEAM{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#ccff00]">
              SURGE
            </span>
          </h1>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            We don't sponsor participants. We sponsor dominators. Meet the elite
            squad redefining human limits.
          </p>
        </div>
      </header>

      {/* Athlete Grid */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {athletes.map((athlete, index) => (
            <AthleteCard 
                key={athlete.id} 
                athlete={athlete} 
                priority={index === 0} 
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="py-20 text-center">
        <button className="border-2 border-white px-10 py-4 font-black uppercase text-xl hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-all duration-300">
          Apply for Sponsorship
        </button>
      </div>
    </div>
  );
};

export default React.memo(Athletes);