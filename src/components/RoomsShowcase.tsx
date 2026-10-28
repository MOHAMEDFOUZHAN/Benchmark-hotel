import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { RoomCategory } from '../types/hotel';
import { formatINR } from '../utils/formatters';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Compass
} from 'lucide-react';

export const RoomsShowcase: React.FC = () => {
  const { rooms, setSelectedRoomFor3D, setSelectedRoomForBooking } = useHotel();
  const [activeCategory, setActiveCategory] = useState<RoomCategory>('All');
  const [activeImageIndexes, setActiveImageIndexes] = useState<{ [roomId: string]: number }>({});

  const categories: { label: string; value: RoomCategory; count: number }[] = [
    { label: 'All Collections', value: 'All', count: rooms.length },
    { label: 'Royal Penthouses', value: 'Penthouse', count: rooms.filter(r => r.category === 'Penthouse').length },
    { label: 'Panoramic Suites', value: 'Suite', count: rooms.filter(r => r.category === 'Suite').length },
    { label: 'Sanctuary Villas', value: 'Villa', count: rooms.filter(r => r.category === 'Villa').length },
    { label: 'Deluxe Rooms', value: 'Deluxe', count: rooms.filter(r => r.category === 'Deluxe').length },
  ];

  const filteredRooms = rooms.filter(room => {
    if (activeCategory === 'All') return true;
    return room.category === activeCategory;
  });

  const handleNextImage = (roomId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % max
    }));
  };

  const handlePrevImage = (roomId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + max) % max
    }));
  };

  return (
    <section id="suites" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16 bg-[#F7F4EE]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#E7DED0]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#A77D4B] font-semibold block mb-2 font-sans">
            Private Sanctuaries
          </span>
          <h2 className="text-4xl md:text-6xl font-normal font-serif-luxury text-[#29241F]">
            The Suite Collection
          </h2>
          <p className="text-xs md:text-sm text-[#777066] max-w-xl mt-3 font-light leading-relaxed">
            Every room is designed with tactile travertine limestone, raw Belgian linen, floor-to-ceiling glass, and unobstructed Mediterranean views.
          </p>
        </div>

        {/* Minimalist Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`py-2 px-4 rounded text-xs tracking-[0.14em] uppercase transition-all border ${
                activeCategory === cat.value
                  ? 'bg-[#29241F] text-[#F7F4EE] border-[#29241F] font-semibold'
                  : 'bg-white text-[#777066] border-[#E7DED0] hover:border-[#29241F] hover:text-[#29241F]'
              }`}
            >
              <span>{cat.label}</span>
              <span className="ml-1.5 opacity-60 text-[10px] font-mono">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* EDITORIAL 3D TOUR INVITATION BANNER */}
      <div id="3d-tour" className="p-8 md:p-12 rounded-lg bg-[#E7DED0]/60 border border-[#E7DED0] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A77D4B] font-semibold block">
            Spatial Exploration
          </span>
          <h3 className="text-3xl md:text-4xl font-normal font-serif-luxury text-[#29241F]">
            Tour your residence before arrival.
          </h3>
          <p className="text-xs md:text-sm text-[#777066] leading-relaxed font-light">
            Rotate 360°, inspect custom furniture craft, and view realistic natural daylight and evening sunset illumination in our interactive 3D spatial twin.
          </p>
        </div>

        <button
          onClick={() => setSelectedRoomFor3D(rooms[0])}
          className="btn-primary-espresso shrink-0 flex items-center gap-2"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Launch Penthouse 3D Tour</span>
        </button>
      </div>

      {/* ROOMS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map((room) => {
          const currentImgIdx = activeImageIndexes[room.id] || 0;

          return (
            <div
              key={room.id}
              className="card-ivory rounded-lg overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative aspect-[16/11] overflow-hidden select-none bg-[#E7DED0]">
                  <img
                    src={room.images[currentImgIdx]}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded bg-[#F7F4EE]/95 backdrop-blur-sm text-[9px] uppercase tracking-[0.2em] font-medium text-[#29241F] border border-[#E7DED0]">
                      {room.category}
                    </span>
                  </div>

                  {/* Carousel Controls */}
                  {room.images.length > 1 && (
                    <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handlePrevImage(room.id, room.images.length, e)}
                        className="p-1.5 rounded bg-white/90 text-[#29241F] pointer-events-auto border border-[#E7DED0] hover:bg-white"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleNextImage(room.id, room.images.length, e)}
                        className="p-1.5 rounded bg-white/90 text-[#29241F] pointer-events-auto border border-[#E7DED0] hover:bg-white"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Dot Indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
                    {room.images.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1 rounded-full transition-all ${
                          i === currentImgIdx ? 'w-4 bg-white' : 'w-1 bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-[11px] text-[#777066] font-mono">
                    <span>{room.sizeSqFt} SQ FT</span>
                    <span>{room.floor}</span>
                    <span>UP TO {room.capacity.maxGuests} GUESTS</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-normal font-serif-luxury text-[#29241F] group-hover:text-[#A77D4B] transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-xs text-[#777066] mt-1.5 font-light leading-relaxed line-clamp-2">
                      {room.tagline}
                    </p>
                  </div>

                  {/* Privileges Preview */}
                  <div className="pt-2 border-t border-[#E7DED0] flex flex-wrap gap-1.5">
                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#F7F4EE] border border-[#E7DED0] text-[10px] text-[#777066]"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 space-y-4">
                <div className="flex items-baseline justify-between pt-2 border-t border-[#E7DED0]">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#777066]">
                    Rate from
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-normal font-serif-luxury text-[#29241F]">{formatINR(room.pricePerNight)}</span>
                    <span className="text-xs text-[#777066]">/ night</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedRoomFor3D(room)}
                    className="btn-outline-bronze text-center"
                  >
                    3D Tour
                  </button>

                  <button
                    onClick={() => setSelectedRoomForBooking(room)}
                    className="btn-primary-espresso flex items-center justify-center gap-1.5"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
