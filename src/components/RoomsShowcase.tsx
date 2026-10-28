import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { RoomCategory } from '../types/hotel';
import {
  Sparkles,
  Bed,
  Users,
  Maximize2,
  Eye,
  ArrowRight,
  Star,
  Flame,
  ChevronLeft,
  ChevronRight
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
    <section id="suites" className="py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-[#C6A76B]">
            <Sparkles className="w-3.5 h-3.5" />
            Bespoke Accommodations
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-serif-luxury text-[#F6F1E7] mt-2">
            The Benchmark Suite Collection
          </h2>
          <p className="text-xs md:text-sm text-[#F6F1E7]/75 max-w-xl mt-2 leading-relaxed">
            Each suite is an architectural tour de force, designed with custom Italian furnishings, floor-to-ceiling panoramic glass, and personal butler service.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`py-2 px-4 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-2 border ${
                activeCategory === cat.value
                  ? 'bg-[#C6A76B] text-[#102A26] border-[#C6A76B] shadow-lg font-bold'
                  : 'bg-[#193B32] text-[#F6F1E7]/80 border-[#C6A76B]/30 hover:border-[#C6A76B]/70'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === cat.value ? 'bg-[#102A26] text-[#F6F1E7]' : 'bg-[#102A26] text-[#C6A76B]'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3D FEATURE CALLOUT BANNER */}
      <div id="3d-tour" className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#193B32] via-[#102A26] to-[#193B32] border border-[#C6A76B]/40 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102A26] text-[#C6A76B] border border-[#C6A76B]/50 text-xs font-semibold font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            Industry First: Real-Time 3D Digital Twin
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-serif-luxury text-[#F6F1E7]">
            Experience Your Suite Before You Check In
          </h3>
          <p className="text-xs text-[#F6F1E7]/80 leading-relaxed">
            Rotate 360°, inspect marble tubs, switch between sunset and midnight mood lighting, and examine bespoke amenities in interactive WebGL 3D.
          </p>
        </div>

        <button
          onClick={() => setSelectedRoomFor3D(rooms[0])}
          className="py-3.5 px-7 rounded-2xl gold-gradient-btn font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 shrink-0 shadow-xl"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Penthouse in 3D</span>
        </button>
      </div>

      {/* ROOMS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredRooms.map((room) => {
          const currentImgIdx = activeImageIndexes[room.id] || 0;
          const isLowInventory = room.availableInventory <= 2;

          return (
            <div
              key={room.id}
              className="bg-[#193B32]/85 rounded-3xl overflow-hidden border border-[#C6A76B]/30 hover:border-[#C6A76B]/70 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl"
            >
              <div>
                {/* Image Showcase with Carousel Arrows */}
                <div className="relative aspect-[16/10] overflow-hidden select-none bg-[#102A26]">
                  <img
                    src={room.images[currentImgIdx]}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#193B32] via-transparent to-black/30 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#102A26]/90 backdrop-blur-md text-[#C6A76B] border border-[#C6A76B]/40 font-mono">
                      {room.category}
                    </span>

                    {/* Interactive 3D Tour Button on Image */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRoomFor3D(room);
                      }}
                      className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#C6A76B] text-[#102A26] shadow-lg flex items-center gap-1.5 hover:scale-105 transition-transform"
                      title="Launch 3D Room Viewer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>3D View</span>
                    </button>
                  </div>

                  {/* Image Carousel Nav Buttons */}
                  {room.images.length > 1 && (
                    <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handlePrevImage(room.id, room.images.length, e)}
                        className="p-1.5 rounded-full bg-[#102A26]/80 hover:bg-[#102A26] text-white pointer-events-auto border border-[#C6A76B]/40"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleNextImage(room.id, room.images.length, e)}
                        className="p-1.5 rounded-full bg-[#102A26]/80 hover:bg-[#102A26] text-white pointer-events-auto border border-[#C6A76B]/40"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Image Indicator Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
                    {room.images.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          i === currentImgIdx ? 'w-5 bg-[#C6A76B]' : 'w-1.5 bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-5 md:p-6 space-y-4">
                  {/* Rating & Inventory Alert */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#C6A76B] font-semibold">
                      <Star className="w-3.5 h-3.5 fill-[#C6A76B] text-[#C6A76B]" />
                      <span>{room.rating}</span>
                      <span className="text-[#F6F1E7]/60 font-normal">({room.reviewsCount} reviews)</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono">
                      {isLowInventory ? (
                        <span className="text-[#C6A76B] flex items-center gap-1 font-semibold">
                          <Flame className="w-3.5 h-3.5 text-[#C6A76B] animate-pulse" />
                          Only {room.availableInventory} left!
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-semibold">
                          {room.availableInventory} available
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-bold font-serif-luxury text-[#F6F1E7] group-hover:text-[#C6A76B] transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-xs text-[#F6F1E7]/75 mt-1 line-clamp-2 leading-relaxed">
                      {room.tagline}
                    </p>
                  </div>

                  {/* Quick Specs Chips */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#C6A76B]/20 text-[11px] text-[#F6F1E7]/80">
                    <div className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-[#C6A76B] shrink-0" />
                      <span>{room.sizeSqFt} sq ft</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C6A76B] shrink-0" />
                      <span>Up to {room.capacity.maxGuests}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Bed className="w-3.5 h-3.5 text-[#C6A76B] shrink-0" />
                      <span className="truncate">{room.floor}</span>
                    </div>
                  </div>

                  {/* Amenities Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {room.amenities.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-[#102A26] text-[#F6F1E7]/90 border border-[#C6A76B]/25"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="px-2 py-1 rounded-lg text-[10px] text-[#C6A76B] font-mono">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions & Price */}
              <div className="p-5 md:p-6 pt-0 space-y-3">
                <div className="flex items-baseline justify-between pt-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#C6A76B] block font-mono">
                      Exclusive Rate
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#C6A76B] font-mono">${room.pricePerNight}</span>
                      <span className="text-xs text-[#F6F1E7]/70">/ night</span>
                      {room.originalPrice && (
                        <span className="text-xs text-[#F6F1E7]/50 line-through">${room.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSelectedRoomFor3D(room)}
                    className="py-3 px-3 rounded-xl bg-[#102A26] hover:bg-[#14332c] text-[#C6A76B] border border-[#C6A76B]/50 hover:border-[#C6A76B] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Eye className="w-4 h-4" />
                    <span>3D Suite</span>
                  </button>

                  <button
                    onClick={() => setSelectedRoomForBooking(room)}
                    className="py-3 px-3 rounded-xl gold-gradient-btn text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg group"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
