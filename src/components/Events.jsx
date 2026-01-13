import React from "react";
import { MapPin, Calendar, ArrowRight, Ticket } from "lucide-react";
import Navbar from "./Navbar";

// --- DATA: Events ---
const events = [
  {
    id: 1,
    title: "URBAN DOWNHILL",
    date: "OCT 12",
    location: "Valparaiso, Chile",
    status: "SELLING FAST",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "NEON DRIFT NIGHTS",
    date: "NOV 04",
    location: "Tokyo, Japan",
    status: "SOLD OUT",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/King_of_Europe_Round_3_Lydden_Hill_2014_%2814356011899%29.jpg"
  },
  {
    id: 3,
    title: "BASE JUMP FINALS",
    date: "DEC 18",
    location: "Dubai, UAE",
    status: "OPEN",
    image: "https://play-lh.googleusercontent.com/jCBxmz9cNGEtFWuxkmmkylk_Ao0IgxWO068nvUSLSkt2Rw5BE5cLYD2gUsss6WKfkAo"
  },
  {
    id: 4,
    title: "WINTER X-FEST",
    date: "JAN 22",
    location: "Aspen, USA",
    status: "OPEN",
    image: "https://crva.imgix.net/hero-images/Ice-Skating.jpg?auto=compress%2Cformat&fit=crop&fm=webp&ixlib=php-3.1.0&q=80&v=1668019884"
  }
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black">
      
      {/* --- NAVBAR COMPONENT --- */}
      <Navbar activePage="events" />

      {/* --- HERO --- */}
      <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1920&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            alt="Crowd"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black"></div>
        <div className="relative z-10 text-center">
            <h1 className="text-7xl md:text-9xl font-black italic uppercase text-white drop-shadow-2xl">
                CHAOS <span className="text-[#ccff00]">TOUR</span>
            </h1>
            <p className="text-xl tracking-[0.3em] font-bold uppercase mt-4">2024 - 2025 World Circuit</p>
        </div>
      </div>

      {/* --- EVENTS LIST --- */}
      <section className="max-w-6xl mx-auto px-6 pb-24 -mt-20 relative z-20">
        <div className="flex flex-col gap-6">
            {events.map((event) => (
                <div key={event.id} className="group bg-[#111] border border-white/10 hover:border-[#ccff00] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_0_30px_rgba(204,255,0,0.1)]">
                    
                    {/* Date Box */}
                    <div className="flex-shrink-0 w-full md:w-32 h-32 border-2 border-[#ccff00] flex flex-col items-center justify-center bg-black group-hover:bg-[#ccff00] group-hover:text-black transition-colors duration-300">
                        <span className="text-3xl font-black uppercase text-center leading-none">{event.date.split(" ")[0]}<br/>{event.date.split(" ")[1]}</span>
                    </div>

                    {/* Image Snippet */}
                    <div className="hidden md:block w-48 h-32 overflow-hidden relative">
                        <img src={event.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" alt="event" />
                    </div>

                    {/* Info */}
                    <div className="flex-grow text-center md:text-left">
                        <h3 className="text-3xl md:text-4xl font-black italic uppercase mb-2">{event.title}</h3>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 font-bold uppercase tracking-wider text-sm">
                            <MapPin size={16} className="text-[#ccff00]" /> {event.location}
                        </div>
                    </div>

                    {/* Status & Action */}
                    <div className="flex flex-col items-center md:items-end gap-3 min-w-[150px]">
                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest border ${
                            event.status === 'SOLD OUT' 
                            ? 'border-red-500 text-red-500' 
                            : 'border-[#ccff00] text-[#ccff00]'
                        }`}>
                            {event.status}
                        </span>

                        <button 
                            disabled={event.status === 'SOLD OUT'}
                            className={`flex items-center gap-2 px-6 py-3 font-bold uppercase transition-all ${
                                event.status === 'SOLD OUT'
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                : 'bg-white text-black hover:bg-[#ccff00]'
                            }`}
                        >
                            {event.status === 'SOLD OUT' ? 'Waitlist' : 'Get Tickets'} <Ticket size={18} />
                        </button>
                    </div>

                </div>
            ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/10 text-center bg-[#050505]">
          <h2 className="text-2xl font-black italic uppercase mb-6">Don't Miss The Rush</h2>
          <div className="flex justify-center gap-4 mb-8">
              <input type="email" placeholder="ENTER EMAIL" className="bg-transparent border-b-2 border-white/50 px-4 py-2 outline-none focus:border-[#ccff00] text-white w-64 placeholder:text-gray-600 font-bold uppercase" />
              <button className="text-[#ccff00] font-black uppercase hover:text-white transition-colors"><ArrowRight size={24} /></button>
          </div>
          <p className="text-gray-600 text-xs uppercase tracking-widest">© 2024 SURGE Events.</p>
      </footer>

    </div>
  );
}