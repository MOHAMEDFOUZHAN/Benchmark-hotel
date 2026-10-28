import React from 'react';
import { useHotel } from '../context/HotelContext';
import {
  Sparkles,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Star,
  Award
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { searchFilter, setSearchFilter, rooms, setSelectedRoomFor3D } = useHotel();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExplorePenthouse3D = () => {
    const penthouse = rooms.find(r => r.category === 'Penthouse') || rooms[0];
    setSelectedRoomFor3D(penthouse);
  };

  return (
    <section className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 px-4 md:px-8 overflow-hidden bg-[#102A26]">
      {/* Background Image with Cinematic Deep Emerald Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85"
          alt="Benchmark Hotel Resort Exterior & Infinity Pool"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Emerald Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#102A26] via-[#102A26]/80 to-[#102A26]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C6A76B]/15 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        {/* Forbes & Excellence Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#102A26]/90 border border-[#C6A76B]/50 backdrop-blur-xl shadow-xl mb-6 animate-float">
          <Award className="w-4 h-4 text-[#C6A76B]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#F6F1E7]">
            Forbes Travel Guide 5-Star Laureate 2026
          </span>
          <div className="flex items-center gap-0.5 text-[#C6A76B]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#C6A76B]" />
            ))}
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight font-serif-luxury text-[#F6F1E7] max-w-4xl leading-[1.1] drop-shadow-2xl">
          Where Haute Luxury Meets <br />
          <span className="gold-gradient-text italic font-normal">Emerald Horizons</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-base md:text-lg text-[#F6F1E7]/85 max-w-2xl font-light leading-relaxed drop-shadow">
          Welcome to Benchmark Hotel & Private Residences. Immerse in private cantilevered sky pools, bespoke Michelin dining, and groundbreaking 3D suite previews.
        </p>

        {/* Quick CTA Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' })}
            className="py-3.5 px-8 rounded-2xl gold-gradient-btn font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 group shadow-2xl"
          >
            <span>Explore Suites & Reserve</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleExplorePenthouse3D}
            className="py-3.5 px-7 rounded-2xl bg-[#193B32]/90 hover:bg-[#193B32] text-[#C6A76B] border border-[#C6A76B]/60 hover:border-[#C6A76B] backdrop-blur-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl group"
          >
            <Sparkles className="w-4 h-4 text-[#C6A76B] group-hover:rotate-12 transition-transform" />
            <span>Launch 3D Suite Tour</span>
          </button>
        </div>

        {/* FLOATING BOOKING & AVAILABILITY SEARCH BAR */}
        <div className="mt-12 w-full max-w-5xl">
          <form
            onSubmit={handleSearchSubmit}
            className="glass-panel-emerald p-4 sm:p-5 rounded-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-center text-left"
          >
            {/* Check-In */}
            <div className="bg-[#102A26]/85 p-3 rounded-2xl border border-[#C6A76B]/30">
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#C6A76B] block mb-1 flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5" /> Check-In
              </label>
              <input
                type="date"
                value={searchFilter.checkIn}
                onChange={(e) => setSearchFilter({ ...searchFilter, checkIn: e.target.value })}
                className="w-full bg-transparent text-[#F6F1E7] text-xs font-semibold focus:outline-none"
              />
            </div>

            {/* Check-Out */}
            <div className="bg-[#102A26]/85 p-3 rounded-2xl border border-[#C6A76B]/30">
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#C6A76B] block mb-1 flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5" /> Check-Out
              </label>
              <input
                type="date"
                value={searchFilter.checkOut}
                onChange={(e) => setSearchFilter({ ...searchFilter, checkOut: e.target.value })}
                className="w-full bg-transparent text-[#F6F1E7] text-xs font-semibold focus:outline-none"
              />
            </div>

            {/* Guests */}
            <div className="bg-[#102A26]/85 p-3 rounded-2xl border border-[#C6A76B]/30">
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#C6A76B] block mb-1 flex items-center gap-1.5 font-mono">
                <Users className="w-3.5 h-3.5" /> Guests
              </label>
              <select
                value={searchFilter.adults}
                onChange={(e) => setSearchFilter({ ...searchFilter, adults: Number(e.target.value) })}
                className="w-full bg-transparent text-[#F6F1E7] text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value={1} className="bg-[#102A26]">1 Guest (Single)</option>
                <option value={2} className="bg-[#102A26]">2 Guests (Couple)</option>
                <option value={3} className="bg-[#102A26]">3 Guests (Suite)</option>
                <option value={4} className="bg-[#102A26]">4 Guests (Family)</option>
                <option value={6} className="bg-[#102A26]">6 Guests (Penthouse)</option>
              </select>
            </div>

            {/* Suite Category */}
            <div className="bg-[#102A26]/85 p-3 rounded-2xl border border-[#C6A76B]/30">
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#C6A76B] block mb-1 flex items-center gap-1.5 font-mono">
                <Compass className="w-3.5 h-3.5" /> Collection
              </label>
              <select
                value={searchFilter.category}
                onChange={(e) => setSearchFilter({ ...searchFilter, category: e.target.value as any })}
                className="w-full bg-transparent text-[#F6F1E7] text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-[#102A26]">All Collections</option>
                <option value="Penthouse" className="bg-[#102A26]">Royal Penthouses</option>
                <option value="Suite" className="bg-[#102A26]">Panoramic Suites</option>
                <option value="Villa" className="bg-[#102A26]">Sanctuary Villas</option>
                <option value="Deluxe" className="bg-[#102A26]">Deluxe Rooms</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full h-full min-h-[52px] rounded-2xl gold-gradient-btn font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 group shadow-xl"
            >
              <span>Check Rates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#F6F1E7]/70">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C6A76B]" />
            Guaranteed Best Direct Rate
          </span>
          <span className="w-1 h-1 rounded-full bg-[#193B32] hidden sm:inline" />
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C6A76B]" />
            Complimentary VIP Dom Pérignon Welcome
          </span>
          <span className="w-1 h-1 rounded-full bg-[#193B32] hidden sm:inline" />
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#C6A76B]" />
            Flexible 48-Hour Cancellation
          </span>
        </div>
      </div>
    </section>
  );
};
