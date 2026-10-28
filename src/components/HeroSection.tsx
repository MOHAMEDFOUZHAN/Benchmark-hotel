import React, { useState, useEffect } from 'react';
import { useHotel } from '../context/HotelContext';
import { formatINR } from '../utils/formatters';
import {
  Calendar,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Sun,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface HeroScene {
  id: string;
  title: string;
  tagline: string;
  subtitle: string;
  locationTag: string;
  image: string;
}

export const HeroSection: React.FC = () => {
  const { searchFilter, setSearchFilter, rooms, setSelectedRoomFor3D, setSelectedRoomForBooking } = useHotel();
  
  // Interactive 3-Scene Carousel
  const scenes: HeroScene[] = [
    {
      id: 'pool',
      title: 'The Cloud-Crest Cantilever',
      tagline: 'Where the Blue Mountains meet eternal mist.',
      subtitle: 'Suspended high above Charing Cross and the rolling tea plantations of Doddabetta, enveloped by fragrant Nilgiri eucalyptus and cedar pine.',
      locationTag: "11°24'N 76°42'E • CHARING CROSS, OOTY",
      image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=2400&q=85',
    },
    {
      id: 'penthouse',
      title: 'The Nilgiri Sovereign Penthouse',
      tagline: 'A glass sanctuary above the cloud inversion.',
      subtitle: 'Teakwood fireplaces, private heated hydrotherapy pool looking over tea valleys, single-estate silver needle tea service, and personal butler.',
      locationTag: 'FLOOR 45 • SKYLINE TEA RIDGE KEY ACCESS',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85',
    },
    {
      id: 'sanctuary',
      title: 'Shola Tea Estate Pavilions',
      tagline: 'Private heritage garden swimming sanctuaries.',
      subtitle: 'Tucked into historic tea slopes moments from Charing Cross, featuring crackling open hearths, botanical plunge pools, and private estate walking paths.',
      locationTag: 'CHARING CROSS RESERVE • SHOLA COVE',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2400&q=85',
    },
  ];

  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const activeScene = scenes[currentSceneIdx];

  // Auto-advance scene gently every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSceneIdx((prev) => (prev + 1) % scenes.length);
    }, 8500);
    return () => clearInterval(timer);
  }, [scenes.length]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExplorePenthouse3D = () => {
    const penthouse = rooms.find(r => r.category === 'Penthouse') || rooms[0];
    setSelectedRoomFor3D(penthouse);
  };

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 bg-[#F7F4EE] overflow-hidden select-none">
      {/* BACKGROUND IMAGE CAROUSEL WITH SMOOTH CROSSFADE */}
      <div className="absolute inset-0 z-0">
        {scenes.map((scene, idx) => (
          <div
            key={scene.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSceneIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={scene.image}
              alt={scene.title}
              className="w-full h-full object-cover object-center transform transition-transform duration-10000 ease-linear scale-105"
            />
            {/* Elegant Luxury Gradients — Natural sunlit contrast without dark mud */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#29241F]/90 via-[#29241F]/40 to-[#29241F]/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#29241F]/80 via-transparent to-[#29241F]/40" />
          </div>
        ))}
      </div>

      {/* TOP FLOATING RESORT TICKER (Live Time, Temperature & Location) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 flex flex-wrap items-center justify-between text-white/90 text-xs gap-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded bg-[#29241F]/60 backdrop-blur-md border border-white/20 text-[10px] tracking-[0.25em] uppercase font-mono text-[#E7DED0]">
            {activeScene.locationTag}
          </span>
          <span className="hidden sm:inline text-white/70 text-[11px] font-light">
            Charing Cross, Nilgiri Blue Mountains • 2,240m Elevation
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-white/90">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#29241F]/60 backdrop-blur-md border border-white/20">
            <Sun className="w-3.5 h-3.5 text-[#A77D4B]" />
            <span>16°C • Highland Mist & Pine</span>
          </div>
          <span className="hidden md:inline text-white/60">Dusk 18:24 • Evening Bonfire</span>
        </div>
      </div>

      {/* CENTER EDITORIAL HERO DISPLAY */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        {/* Left Column: Bold, Poetic Typography */}
        <div className="lg:col-span-8 space-y-6 text-white">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A77D4B] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#E7DED0] font-sans font-medium">
              BENCHMARK RESIDENCES • CHARING CROSS, OOTY • PERSPECTIVE 0{currentSceneIdx + 1}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal font-serif-luxury leading-[1.02] sm:leading-[0.96] tracking-tight drop-shadow-lg">
            Where Blue Mountains <br />
            <span className="italic font-light text-[#E7DED0]">meet eternal mist.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-xl text-[#F7F4EE]/90 max-w-2xl font-light leading-relaxed drop-shadow">
            {activeScene.subtitle}
          </p>

          {/* Primary High-Contrast Buttons — Mobile Full-Width Touch Friendly */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' })}
              className="py-3.5 sm:py-4 px-7 rounded bg-[#F7F4EE] hover:bg-white text-[#29241F] text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-[0_4px_25px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5"
            >
              <span>Explore The Suites</span>
              <ArrowRight className="w-4 h-4 text-[#A77D4B]" />
            </button>

            <button
              onClick={handleExplorePenthouse3D}
              className="py-3.5 sm:py-4 px-6 rounded bg-[#29241F]/80 hover:bg-[#29241F] text-[#F7F4EE] border border-white/40 hover:border-white backdrop-blur-md text-xs font-semibold tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <Eye className="w-4 h-4 text-[#A77D4B]" />
              <span>Launch 3D Room Tour</span>
            </button>
          </div>
        </div>

        {/* Right Column: Floating 3D Interactive Suite Portal Card */}
        <div className="lg:col-span-4 flex flex-col justify-end">
          <div className="p-6 rounded-lg bg-[#29241F]/85 backdrop-blur-md border border-[#A77D4B]/40 text-[#F7F4EE] shadow-2xl space-y-4 hover:border-[#A77D4B] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#A77D4B] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Interactive 3D Suite Tour
              </span>
              <span className="text-[10px] font-mono text-[#E7DED0]/80">360° WEBGL</span>
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-normal font-serif-luxury text-white">
                The Nilgiri Royal Penthouse
              </h4>
              <p className="text-xs text-[#E7DED0]/80 font-light leading-relaxed">
                Step inside the 2,800 sq ft top-floor duplex above Charing Cross. Inspect heated stone fireplaces, mist balconies, and 360° cloud vistas.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/15">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#E7DED0]/70 block font-mono">From</span>
                <span className="text-lg font-mono font-medium text-white">{formatINR(rooms.find(r => r.category === 'Penthouse')?.pricePerNight || 175000)} <span className="text-xs text-[#E7DED0]/70 font-normal">/ night</span></span>
              </div>
              <button
                onClick={handleExplorePenthouse3D}
                className="py-2.5 px-4 rounded bg-[#A77D4B] hover:bg-[#8A6436] text-white text-[11px] font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 shadow"
              >
                <span>Enter 3D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CONTROLS & RESERVATION SUITE BAR */}
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4">
        {/* Scene Indicator Pagination Controls */}
        <div className="flex items-center justify-between text-white text-xs pb-1">
          <div className="flex items-center gap-2">
            {scenes.map((scene, i) => (
              <button
                key={scene.id}
                onClick={() => setCurrentSceneIdx(i)}
                className={`py-1.5 px-3 rounded text-[11px] font-mono transition-all flex items-center gap-2 border ${
                  i === currentSceneIdx
                    ? 'bg-white text-[#29241F] border-white font-bold shadow-md'
                    : 'bg-[#29241F]/60 text-white/80 border-white/20 hover:border-white/50'
                }`}
              >
                <span>0{i + 1}</span>
                <span className="hidden md:inline font-sans text-[10px] tracking-wider uppercase">{scene.title.split(' ')[1] || scene.title}</span>
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-white/80">
            <span>Perspective {currentSceneIdx + 1} of {scenes.length}</span>
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => setCurrentSceneIdx((prev) => (prev - 1 + scenes.length) % scenes.length)}
                className="p-1 rounded bg-[#29241F]/60 border border-white/20 hover:bg-white hover:text-[#29241F] transition-all"
                title="Previous perspective"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentSceneIdx((prev) => (prev + 1) % scenes.length)}
                className="p-1 rounded bg-[#29241F]/60 border border-white/20 hover:bg-white hover:text-[#29241F] transition-all"
                title="Next perspective"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* HIGH-CONTRAST BESPOKE RESERVATION BAR */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white p-4 md:p-5 rounded-lg border border-[#E7DED0] shadow-[0_12px_45px_rgba(0,0,0,0.25)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-center"
        >
          {/* Check-In */}
          <div className="p-3 rounded border border-[#E7DED0] bg-[#F7F4EE]/60 hover:border-[#29241F] transition-colors">
            <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#777066] block mb-1 flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-[#A77D4B]" /> Check-In
            </label>
            <input
              type="date"
              value={searchFilter.checkIn}
              onChange={(e) => setSearchFilter({ ...searchFilter, checkIn: e.target.value })}
              className="w-full bg-transparent text-[#29241F] text-xs font-semibold focus:outline-none cursor-pointer"
            />
          </div>

          {/* Check-Out */}
          <div className="p-3 rounded border border-[#E7DED0] bg-[#F7F4EE]/60 hover:border-[#29241F] transition-colors">
            <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#777066] block mb-1 flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-[#A77D4B]" /> Check-Out
            </label>
            <input
              type="date"
              value={searchFilter.checkOut}
              onChange={(e) => setSearchFilter({ ...searchFilter, checkOut: e.target.value })}
              className="w-full bg-transparent text-[#29241F] text-xs font-semibold focus:outline-none cursor-pointer"
            />
          </div>

          {/* Guests */}
          <div className="p-3 rounded border border-[#E7DED0] bg-[#F7F4EE]/60 hover:border-[#29241F] transition-colors">
            <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#777066] block mb-1 flex items-center gap-1.5 font-mono">
              <Users className="w-3.5 h-3.5 text-[#A77D4B]" /> Residents
            </label>
            <select
              value={searchFilter.adults}
              onChange={(e) => setSearchFilter({ ...searchFilter, adults: Number(e.target.value) })}
              className="w-full bg-transparent text-[#29241F] text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value={1}>1 Resident</option>
              <option value={2}>2 Residents (Couple)</option>
              <option value={3}>3 Residents</option>
              <option value={4}>4 Residents (Family)</option>
              <option value={6}>6 Residents (Villa)</option>
            </select>
          </div>

          {/* Collection Tier */}
          <div className="p-3 rounded border border-[#E7DED0] bg-[#F7F4EE]/60 hover:border-[#29241F] transition-colors">
            <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#777066] block mb-1 flex items-center gap-1.5 font-mono">
              <Compass className="w-3.5 h-3.5 text-[#A77D4B]" /> Collection
            </label>
            <select
              value={searchFilter.category}
              onChange={(e) => setSearchFilter({ ...searchFilter, category: e.target.value as any })}
              className="w-full bg-transparent text-[#29241F] text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="All">All Residences</option>
              <option value="Penthouse">Royal Penthouses</option>
              <option value="Suite">Panoramic Suites</option>
              <option value="Villa">Cliffside Villas</option>
              <option value="Deluxe">Deluxe Rooms</option>
            </select>
          </div>

          {/* High-Contrast Standout Button */}
          <button
            type="submit"
            className="w-full h-full min-h-[52px] bg-[#29241F] hover:bg-[#A77D4B] text-[#F7F4EE] rounded text-xs font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 group shadow-md"
          >
            <span>Check Availability</span>
            <ArrowRight className="w-4 h-4 text-[#A77D4B] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>
        </form>
      </div>
    </section>
  );
};
