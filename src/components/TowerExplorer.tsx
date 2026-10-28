import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Room } from '../types/hotel';
import { formatINR } from '../utils/formatters';
import {
  Building2,
  Compass,
  ArrowRight,
  Eye,
  Maximize2,
  Sparkles,
  Plane,
  Waves,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface TowerLevel {
  id: string;
  floorLabel: string;
  floorNumber: number;
  altitudeFt: number;
  name: string;
  category: 'Penthouse' | 'Suite' | 'Deluxe' | 'Villa' | 'Facility';
  roomId?: string; // links to Room in context
  description: string;
  image: string;
  pricePerNight?: number;
  highlight: string;
  specs: string;
}

export const TowerExplorer: React.FC = () => {
  const { rooms, setSelectedRoomFor3D, setSelectedRoomForBooking } = useHotel();

  const towerLevels: TowerLevel[] = [
    {
      id: 'lvl-50',
      floorLabel: 'DECK 50',
      floorNumber: 50,
      altitudeFt: 510,
      name: 'Rooftop Helipad & Cloud Stargazer Deck',
      category: 'Facility',
      description: 'Private 7,850 ft MSL touchdown hub above Charing Cross with high-altitude telescope deck for Nilgiri celestial viewing.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
      highlight: 'Direct Nilgiri Air Hub • 2,390m',
      specs: 'Deck 50 • ICAO: VOMY Clearance'
    },
    {
      id: 'lvl-48',
      floorLabel: 'FLOORS 48-49',
      floorNumber: 48,
      altitudeFt: 490,
      name: 'The Viceroy Two-Story Duplex',
      category: 'Penthouse',
      roomId: 'emperor-duplex-suite',
      description: 'Double-height 24ft teakwood grand atrium, Italian stone wood-burning fireplace, Finnish pine sauna, and private Rolls-Royce chauffeur.',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80',
      pricePerNight: 240000,
      highlight: '3,400 Sq Ft • Wood Fireplace & Sauna',
      specs: 'Floors 48 & 49 • Top Sky Wing'
    },
    {
      id: 'lvl-45',
      floorLabel: 'FLOOR 45',
      floorNumber: 45,
      altitudeFt: 450,
      name: 'The Nilgiri Royal Penthouse',
      category: 'Penthouse',
      roomId: 'benchmark-penthouse',
      description: 'Private 34°C heated cantilevered infinity pool suspended in the clouds above Doddabetta tea slopes with dedicated 24-hr butler care.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
      pricePerNight: 175000,
      highlight: '2,800 Sq Ft • Heated Cloud Pool',
      specs: 'Floor 45 • Private Key Access'
    },
    {
      id: 'lvl-32',
      floorLabel: 'FLOORS 28-34',
      floorNumber: 32,
      altitudeFt: 340,
      name: 'Celestial Nilgiri Tea Valley Suite',
      category: 'Suite',
      roomId: 'celestial-ocean-suite',
      description: 'Wraparound teakwood terrace with freestanding deep soaking marble tub looking onto mist-draped emerald tea slopes.',
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80',
      pricePerNight: 72000,
      highlight: '1,150 Sq Ft • Tea Valley Panorama',
      specs: 'Floors 28 to 34 • Unobstructed Mist'
    },
    {
      id: 'lvl-24',
      floorLabel: 'FLOORS 22-26',
      floorNumber: 24,
      altitudeFt: 250,
      name: 'Heritage Colonial Residence Suite',
      category: 'Suite',
      roomId: 'azure-executive-residence',
      description: 'Separate Italian velvet living parlor, brass fireplace, walk-in marble dressing room, and Nilgiri Club privileges.',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
      pricePerNight: 58000,
      highlight: '920 Sq Ft • Living Parlor & Hearth',
      specs: 'Floors 22 to 26 • Club Lounge'
    },
    {
      id: 'lvl-15',
      floorLabel: 'FLOOR 15',
      floorNumber: 15,
      altitudeFt: 160,
      name: 'Heated Glass Pool & Tea Sommelier Bar',
      category: 'Facility',
      description: 'Suspended heated horizon pool (34°C) with transparent glass bottom, heated loungers, and single-estate Nilgiri tea tastings.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80',
      highlight: 'Heated 34°C • Glass Floor Pool',
      specs: 'Floor 15 • Resident Privileges'
    },
    {
      id: 'lvl-12',
      floorLabel: 'FLOORS 12-20',
      floorNumber: 12,
      altitudeFt: 130,
      name: 'Grand Nilgiri Mountain Deluxe King',
      category: 'Deluxe',
      roomId: 'deluxe-horizon-king',
      description: 'Refined Italian rainfall shower with organic Nilgiri eucalyptus aromatherapy, smart climate tablet, and artisanal private minibar.',
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80',
      pricePerNight: 34000,
      highlight: '680 Sq Ft • Valley Panorama',
      specs: 'Floors 12 to 20 • Eucalyptus Aromatics'
    },
    {
      id: 'lvl-0',
      floorLabel: 'SHOLA RESERVE',
      floorNumber: 0,
      altitudeFt: 15,
      name: 'Sanctuary Shola Forest & Tea Estate Villa',
      category: 'Villa',
      roomId: 'emerald-sanctuary-villa',
      description: 'Secluded 40ft private heated turquoise plunge pool surrounded by fragrant wild eucalyptus, organic tea bushes, and private trails to Charing Cross.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
      pricePerNight: 115000,
      highlight: '1,950 Sq Ft • Private Heated Plunge Pool',
      specs: 'Ground Reserve • Tea Estate Trails'
    }
  ];

  const [activeLevelId, setActiveLevelId] = useState<string>('lvl-45');
  const activeLevel = towerLevels.find(l => l.id === activeLevelId) || towerLevels[2];

  const handleLaunch3DForActiveLevel = () => {
    if (!activeLevel.roomId) return;
    const targetRoom = rooms.find(r => r.id === activeLevel.roomId);
    if (targetRoom) {
      setSelectedRoomFor3D(targetRoom);
    }
  };

  const handleReserveActiveLevel = () => {
    if (!activeLevel.roomId) return;
    const targetRoom = rooms.find(r => r.id === activeLevel.roomId);
    if (targetRoom) {
      setSelectedRoomForBooking(targetRoom);
    }
  };

  return (
    <section id="tower-explorer" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-12 md:space-y-16 bg-[#F7F4EE]">
      {/* Section Header */}
      <div className="max-w-2xl">
        <span className="text-[10px] uppercase tracking-[0.28em] text-[#A77D4B] font-semibold block mb-2 font-sans">
          Vertical Spatial Exploration • Charing Cross, Ooty
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-normal font-serif-luxury text-[#29241F]">
          The Tower Elevation
        </h2>
        <p className="text-xs md:text-sm text-[#777066] mt-3 font-light leading-relaxed">
          Select any level along the 50-story architectural elevation above Charing Cross to inspect spatial views, altitude in the Nilgiris (up to 7,850 ft), and suite floorplans.
        </p>
      </div>

      {/* Main Architectural Tower Container */}
      <div className="rounded-xl border border-[#E7DED0] bg-white shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        {/* Left Column: Architectural Vertical Building Elevation Track */}
        <div className="lg:col-span-5 p-4 sm:p-6 md:p-8 bg-[#F7F4EE]/70 border-b lg:border-b-0 lg:border-r border-[#E7DED0] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7DED0]">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#777066]">
                Tower Cross-Section
              </span>
              <span className="text-[10px] font-mono text-[#A77D4B] font-semibold">
                Altitude: {activeLevel.altitudeFt} FT
              </span>
            </div>

            {/* Vertical Floor Buttons (The Tower Spine) */}
            <div className="space-y-1.5 max-h-[380px] lg:max-h-none overflow-y-auto no-scrollbar pr-0.5">
              {towerLevels.map((lvl) => {
                const isSelected = lvl.id === activeLevelId;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setActiveLevelId(lvl.id)}
                    className={`w-full text-left p-2.5 sm:p-3 rounded-lg transition-all flex items-center justify-between gap-2 border ${
                      isSelected
                        ? 'bg-[#29241F] text-[#F7F4EE] border-[#29241F] shadow-sm'
                        : 'bg-white border-[#E7DED0] text-[#777066] hover:border-[#29241F] hover:text-[#29241F]'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      {/* Floor Indicator Badge */}
                      <span className={`text-[9px] sm:text-[10px] font-mono font-semibold px-2 py-0.5 rounded shrink-0 ${
                        isSelected ? 'bg-[#A77D4B] text-white' : 'bg-[#E7DED0]/60 text-[#29241F]'
                      }`}>
                        {lvl.floorLabel}
                      </span>
                      <span className={`text-xs truncate ${isSelected ? 'font-semibold text-white' : 'font-medium'}`}>
                        {lvl.name}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      {lvl.pricePerNight ? (
                        <span className={`text-xs font-mono font-medium ${isSelected ? 'text-[#E7DED0]' : 'text-[#A77D4B]'}`}>
                          {formatINR(lvl.pricePerNight)}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-[#777066]">Amenity</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E7DED0] text-[10px] text-[#777066] font-mono flex items-center justify-between">
            <span>50 Stories Total</span>
            <span>Charing Cross, Ooty</span>
          </div>
        </div>

        {/* Right Column: Selected Floor Spotlight Card */}
        <div className="lg:col-span-7 flex flex-col justify-between p-5 sm:p-8 md:p-10 bg-white">
          <div className="space-y-6">
            {/* Visual Header of Selected Level */}
            <div className="relative aspect-[16/9] rounded overflow-hidden border border-[#E7DED0] bg-[#E7DED0]">
              <img
                src={activeLevel.image}
                alt={activeLevel.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#29241F]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded bg-[#F7F4EE]/90 backdrop-blur-sm text-[9px] uppercase tracking-[0.2em] font-mono text-[#29241F] border border-[#E7DED0]">
                  {activeLevel.specs}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase text-[#E7DED0] block">
                  {activeLevel.highlight}
                </span>
                <h3 className="text-2xl md:text-3xl font-normal font-serif-luxury">
                  {activeLevel.name}
                </h3>
              </div>
            </div>

            {/* Architectural Narrative */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#A77D4B] font-semibold block">
                Spatial Character & Specifications
              </span>
              <p className="text-xs md:text-sm text-[#777066] font-light leading-relaxed">
                {activeLevel.description}
              </p>
            </div>

            {/* Altitude & Horizon Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded bg-[#F7F4EE]/50 border border-[#E7DED0] text-xs">
              <div>
                <span className="text-[10px] text-[#777066] uppercase font-mono block">Elevation</span>
                <span className="font-mono text-[#29241F] font-medium">{activeLevel.altitudeFt} ft above sea</span>
              </div>
              <div>
                <span className="text-[10px] text-[#777066] uppercase font-mono block">Orientation</span>
                <span className="text-[#29241F] font-medium">Unobstructed West Arc</span>
              </div>
              <div>
                <span className="text-[10px] text-[#777066] uppercase font-mono block">Transit Time</span>
                <span className="text-[#29241F] font-medium">18s Express Lift</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-[#E7DED0] flex flex-wrap items-center justify-between gap-4">
            <div>
              {activeLevel.pricePerNight ? (
                <div>
                  <span className="text-[10px] text-[#777066] uppercase block font-mono">Resident Rate</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-normal font-serif-luxury text-[#29241F]">{formatINR(activeLevel.pricePerNight)}</span>
                    <span className="text-xs text-[#777066]">/ night</span>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-[10px] text-[#777066] uppercase block font-mono">Access Privilege</span>
                  <span className="text-sm font-medium text-[#29241F]">Complimentary to Residents</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
              {activeLevel.roomId && (
                <>
                  <button
                    onClick={handleLaunch3DForActiveLevel}
                    className="btn-outline-bronze flex items-center justify-center gap-1.5 py-3"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>3D Suite Tour</span>
                  </button>

                  <button
                    onClick={handleReserveActiveLevel}
                    className="btn-primary-espresso flex items-center justify-center gap-1.5 py-3"
                  >
                    <span>Reserve on Level</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

