import React, { useState, useEffect, useRef } from 'react';
import { useHotel } from '../context/HotelContext';
import { Room, RoomCategory } from '../types/hotel';
import { formatINRNumber } from '../utils/formatters';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Compass,
  RotateCw,
  Eye,
  Grid,
  MoveHorizontal
} from 'lucide-react';

export const RoomsShowcase: React.FC = () => {
  const { rooms, setSelectedRoomFor3D, setSelectedRoomForBooking } = useHotel();
  const [activeCategory, setActiveCategory] = useState<RoomCategory>('All');
  const [activeImageIndexes, setActiveImageIndexes] = useState<{ [roomId: string]: number }>({});
  const [viewMode, setViewMode] = useState<'3d_orbit' | 'grid'>('3d_orbit');

  // 3D Orbit State
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Drag interaction refs
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startAngleRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);

  // Mathematically safe radii that NEVER let cards touch or get cut off by container borders
  const [radii, setRadii] = useState({ rx: 320, rz: 200, cardWidth: 295 });

  useEffect(() => {
    const updateDimensions = () => {
      const containerW = containerRef.current?.clientWidth || window.innerWidth;
      
      // Determine card width adapted to viewport
      let cardW = 300;
      if (containerW < 540) {
        cardW = Math.min(240, containerW - 64);
      } else if (containerW < 900) {
        cardW = 275;
      } else {
        cardW = 300;
      }

      // Safe lateral radius (rx):
      // Outer edge of card at max displacement: rx + (cardW * scale / 2)
      // With depthFactor=0.5 at 90deg, scale is ~0.88 -> cardW * 0.44
      // We ensure the outer edge stays at least safeMargin inside the container edge.
      const safeMargin = containerW < 640 ? 20 : 54;
      const maxSafeRx = (containerW / 2) - (cardW * 0.44) - safeMargin;
      const rx = Math.max(30, Math.min(maxSafeRx, 330));
      const rz = Math.min(rx * 0.65, 195);

      setRadii({ rx, rz, cardWidth: cardW });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    let ro: ResizeObserver | null = null;
    if (containerRef.current && window.ResizeObserver) {
      ro = new ResizeObserver(() => updateDimensions());
      ro.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (ro) ro.disconnect();
    };
  }, [viewMode]);

  // Filtered rooms
  const filteredRooms = rooms.filter(room => {
    if (activeCategory === 'All') return true;
    return room.category === activeCategory;
  });

  const N = filteredRooms.length;
  const stepAngle = N > 0 ? 360 / N : 60;

  // Auto-rotation loop
  useEffect(() => {
    if (!isAutoRotating || isDragging || isHovered || viewMode !== '3d_orbit' || N <= 1) {
      return;
    }
    let animationFrameId: number;
    const rotate = () => {
      setRotationAngle(prev => (prev - 0.1) % 360);
      animationFrameId = requestAnimationFrame(rotate);
    };
    animationFrameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoRotating, isDragging, isHovered, viewMode, N]);

  // Image navigation inside card
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

  // Pointer drag events for 3D Orbit
  const handlePointerDown = (e: React.PointerEvent) => {
    if (viewMode !== '3d_orbit') return;
    setIsDragging(true);
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    startAngleRef.current = rotationAngle;
    dragDistanceRef.current = 0;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const dx = e.clientX - lastXRef.current;
    
    velocityRef.current = dx / dt;
    lastTimeRef.current = now;
    lastXRef.current = e.clientX;

    const totalDelta = e.clientX - startXRef.current;
    dragDistanceRef.current = Math.abs(totalDelta);

    const sensitivity = window.innerWidth < 640 ? 0.32 : 0.25;
    setRotationAngle(startAngleRef.current + totalDelta * sensitivity);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (N > 0) {
      const snapVelocity = velocityRef.current * 14;
      const targetAngle = rotationAngle + snapVelocity;
      const nearestIndex = Math.round(-targetAngle / stepAngle);
      const snappedAngle = -nearestIndex * stepAngle;
      setRotationAngle(snappedAngle);
    }
  };

  const rotateToRoomIndex = (index: number) => {
    const targetAngle = -index * stepAngle;
    setRotationAngle(targetAngle);
  };

  const handleStepOrbit = (direction: 'next' | 'prev') => {
    const delta = direction === 'next' ? -stepAngle : stepAngle;
    const nearestIndex = Math.round(-(rotationAngle + delta) / stepAngle);
    setRotationAngle(-nearestIndex * stepAngle);
  };

  // Front active room detection
  const getFrontIndex = () => {
    if (N === 0) return 0;
    let minDiff = Infinity;
    let frontIdx = 0;
    filteredRooms.forEach((_, i) => {
      let norm = (i * stepAngle + rotationAngle) % 360;
      if (norm > 180) norm -= 360;
      if (norm < -180) norm += 360;
      if (Math.abs(norm) < minDiff) {
        minDiff = Math.abs(norm);
        frontIdx = i;
      }
    });
    return frontIdx;
  };

  const activeFrontIndex = getFrontIndex();
  const activeFrontRoom = filteredRooms[activeFrontIndex] || filteredRooms[0];

  const categories: { label: string; value: RoomCategory; count: number }[] = [
    { label: 'All Collections', value: 'All', count: rooms.length },
    { label: 'Royal Penthouses', value: 'Penthouse', count: rooms.filter(r => r.category === 'Penthouse').length },
    { label: 'Panoramic Suites', value: 'Suite', count: rooms.filter(r => r.category === 'Suite').length },
    { label: 'Sanctuary Villas', value: 'Villa', count: rooms.filter(r => r.category === 'Villa').length },
    { label: 'Deluxe Rooms', value: 'Deluxe', count: rooms.filter(r => r.category === 'Deluxe').length },
  ];

  return (
    <section id="suites" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-10 bg-[#F7F4EE]">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#E7DED0]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#A77D4B] font-semibold block mb-2 font-sans">
            Highland Sanctuaries • Charing Cross, Ooty
          </span>
          <h2 className="text-4xl md:text-6xl font-normal font-serif-luxury text-[#29241F]">
            The Suite Collection
          </h2>
          <p className="text-xs md:text-sm text-[#777066] max-w-xl mt-3 font-light leading-relaxed">
            Every residence is designed with hand-hewn Nilgiri teakwood, stone wood-burning fireplaces, private mist terraces, and 360° cloud valley horizons.
          </p>
        </div>

        {/* View Switcher & Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* View Mode Toggle Pill */}
          <div className="flex items-center p-1 rounded-full bg-white border border-[#E7DED0] shadow-sm">
            <button
              onClick={() => setViewMode('3d_orbit')}
              className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-mono transition-all flex items-center gap-1.5 ${
                viewMode === '3d_orbit'
                  ? 'bg-[#29241F] text-[#F7F4EE] shadow-sm'
                  : 'text-[#777066] hover:text-[#29241F]'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5 text-[#A77D4B]" />
              <span>3D Orbit</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-mono transition-all flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-[#29241F] text-[#F7F4EE] shadow-sm'
                  : 'text-[#777066] hover:text-[#29241F]'
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-[#A77D4B]" />
              <span>Grid View</span>
            </button>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  setRotationAngle(0);
                }}
                className={`py-1.5 px-3 rounded text-[11px] tracking-[0.14em] uppercase transition-all border ${
                  activeCategory === cat.value
                    ? 'bg-[#29241F] text-[#F7F4EE] border-[#29241F] font-semibold'
                    : 'bg-white text-[#777066] border-[#E7DED0] hover:border-[#29241F] hover:text-[#29241F]'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1 opacity-60 text-[10px] font-mono">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3D ORBIT MODE */}
      {viewMode === '3d_orbit' ? (
        <div className="space-y-6">
          {/* Active Front Suite HUD Indicator */}
          {activeFrontRoom && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-white border border-[#E7DED0] shadow-sm">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-[#F7F4EE] border border-[#E7DED0] text-[10px] font-mono uppercase tracking-widest text-[#A77D4B] font-semibold">
                  0{activeFrontIndex + 1} / 0{N}
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-normal font-serif-luxury text-[#29241F]">
                    {activeFrontRoom.name}
                  </h3>
                  <span className="text-[11px] text-[#777066] font-light">
                    {activeFrontRoom.floor} • {activeFrontRoom.sizeSqFt} SQ FT • {activeFrontRoom.view}
                  </span>
                </div>
              </div>

              {/* Orbit Controls & Drag Hint */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-[#777066] bg-[#F7F4EE] px-3 py-1.5 rounded border border-[#E7DED0]">
                  <MoveHorizontal className="w-3.5 h-3.5 text-[#A77D4B]" />
                  <span>Drag horizontally to orbit 360°</span>
                </div>

                <button
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className={`py-1.5 px-3 rounded text-[11px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                    isAutoRotating
                      ? 'bg-[#A77D4B] text-white border-[#A77D4B]'
                      : 'bg-white text-[#777066] border-[#E7DED0] hover:text-[#29241F]'
                  }`}
                  title={isAutoRotating ? 'Pause continuous 3D orbit' : 'Start continuous 3D orbit'}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                  <span>{isAutoRotating ? 'Orbit Active' : 'Orbit Paused'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStepOrbit('prev')}
                    className="p-2 rounded bg-white hover:bg-[#29241F] hover:text-white border border-[#E7DED0] transition-colors shadow-sm"
                    title="Previous residence"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleStepOrbit('next')}
                    className="p-2 rounded bg-white hover:bg-[#29241F] hover:text-white border border-[#E7DED0] transition-colors shadow-sm"
                    title="Next residence"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3D ORBITAL STAGE CONTAINER (With extra vertical headroom and safe width) */}
          <div
            ref={containerRef}
            className="relative w-full h-[680px] sm:h-[720px] md:h-[760px] overflow-hidden select-none cursor-grab active:cursor-grabbing orbit-perspective-stage rounded-xl border border-[#E7DED0] bg-gradient-to-b from-[#F7F4EE] via-[#E7DED0]/25 to-[#F7F4EE]"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={() => {
              handlePointerUp();
              setIsHovered(false);
            }}
            onMouseEnter={() => setIsHovered(true)}
          >
            {/* Ambient 3D Ground Pedestal / Orbital Ellipse */}
            <div
              className="absolute left-1/2 bottom-8 -translate-x-1/2 pointer-events-none rounded-full border border-[#A77D4B]/30 shadow-[0_0_70px_rgba(167,125,75,0.12)]"
              style={{
                width: `${radii.rx * 2}px`,
                height: `${radii.rz * 1.5}px`,
                transform: 'rotateX(74deg)',
              }}
            >
              {/* Inner Concentric Luxury Ring */}
              <div className="absolute inset-3 rounded-full border border-dashed border-[#A77D4B]/20 animate-spin" style={{ animationDuration: '60s' }} />
              {/* Active Beacon Pointing to Front */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#A77D4B] shadow-[0_0_12px_#A77D4B] animate-pulse" />
            </div>

            {/* Central Stage Lighting Glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#A77D4B]/8 blur-3xl pointer-events-none" />

            {/* 3D CARDS ORBITING CONTAINER (Centered with safe vertical padding) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none preserve-3d">
              {filteredRooms.map((room, i) => {
                let normAngle = (i * stepAngle + rotationAngle) % 360;
                if (normAngle > 180) normAngle -= 360;
                if (normAngle < -180) normAngle += 360;

                const rad = (normAngle * Math.PI) / 180;
                const x = Math.sin(rad) * radii.rx;
                const z = Math.cos(rad) * radii.rz;

                // Depth factor: 0 (farthest back) to 1 (front)
                const depthFactor = (z + radii.rz) / (2 * radii.rz);

                // Calibrated scaling: 0.76 (back) to 1.0 (front) so cards NEVER exceed top/bottom
                const scale = 0.76 + 0.24 * depthFactor;
                const opacity = 0.35 + 0.65 * depthFactor;
                const rotateY = normAngle * 0.42; // subtle inward perspective
                const blur = Math.max(0, (1 - depthFactor) * 2.5);
                const zIndex = Math.round(depthFactor * 100);

                const isFront = Math.abs(normAngle) < (stepAngle / 2);
                const currentImgIdx = activeImageIndexes[room.id] || 0;

                return (
                  <div
                    key={room.id}
                    onClick={() => {
                      if (dragDistanceRef.current < 6) {
                        if (!isFront) {
                          rotateToRoomIndex(i);
                        }
                      }
                    }}
                    style={{
                      width: `${radii.cardWidth}px`,
                      maxHeight: '460px',
                      transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity,
                      filter: `blur(${blur}px)`,
                      zIndex,
                      transition: isDragging ? 'none' : 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.42s ease',
                    }}
                    className={`absolute pointer-events-auto rounded-lg overflow-hidden bg-white border shadow-xl flex flex-col justify-between transition-shadow duration-300 ${
                      isFront
                        ? 'border-[#A77D4B] shadow-[0_16px_40px_rgba(41,36,31,0.20)] ring-1 ring-[#A77D4B]/40'
                        : 'border-[#E7DED0] hover:border-[#A77D4B]/60 cursor-pointer'
                    }`}
                  >
                    <div>
                      {/* Image Showcase (Controlled Height) */}
                      <div className="relative h-40 sm:h-44 overflow-hidden select-none bg-[#E7DED0]">
                        <img
                          src={room.images[currentImgIdx]}
                          alt={room.name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          draggable={false}
                        />

                        {/* Top Category Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2 py-0.5 rounded bg-[#F7F4EE]/95 backdrop-blur-sm text-[9px] uppercase tracking-[0.2em] font-medium text-[#29241F] border border-[#E7DED0]">
                            {room.category}
                          </span>
                        </div>

                        {/* Carousel Controls (Active on Front Card) */}
                        {isFront && room.images.length > 1 && (
                          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                            <button
                              onClick={(e) => handlePrevImage(room.id, room.images.length, e)}
                              className="p-1 rounded bg-white/90 text-[#29241F] pointer-events-auto border border-[#E7DED0] hover:bg-white shadow"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleNextImage(room.id, room.images.length, e)}
                              className="p-1 rounded bg-white/90 text-[#29241F] pointer-events-auto border border-[#E7DED0] hover:bg-white shadow"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        {/* Dot Indicators */}
                        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 pointer-events-none">
                          {room.images.map((_, dotIdx) => (
                            <div
                              key={dotIdx}
                              className={`h-1 rounded-full transition-all ${
                                dotIdx === currentImgIdx
                                  ? 'w-4 bg-white'
                                  : 'w-1 bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2.5">
                        <div className="flex items-center justify-between text-[10px] text-[#777066] uppercase font-mono tracking-wider">
                          <span>{room.sizeSqFt} SQ FT</span>
                          <span>{room.floor.split('(')[0]}</span>
                          <span>MAX {room.capacity.maxGuests} RESIDENTS</span>
                        </div>

                        <div className="space-y-0.5">
                          <h3 className="text-lg font-normal text-[#29241F] font-serif-luxury leading-tight truncate">
                            {room.name}
                          </h3>
                          <p className="text-xs text-[#777066] font-light leading-snug truncate">
                            {room.tagline}
                          </p>
                        </div>

                        {/* Signature Highlights (Max 2 badges for clean height) */}
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {room.highlights.slice(0, 2).map((hl, hlIdx) => (
                            <span
                              key={hlIdx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono text-[#777066] bg-[#F7F4EE] border border-[#E7DED0] truncate max-w-[140px]"
                            >
                              {hl}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions (Protected with clear bottom margin) */}
                    <div className="p-4 pt-0 space-y-2.5">
                      <div className="flex items-baseline justify-between pt-2 border-t border-[#E7DED0]">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#777066]">
                          Rate from
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="inline-flex items-baseline">
                            <span className="rupee-symbol text-base font-sans font-medium text-[#29241F] mr-0.5">₹</span>
                            <span className="text-2xl font-normal font-serif-luxury text-[#29241F]">
                              {formatINRNumber(room.pricePerNight)}
                            </span>
                          </span>
                          <span className="text-xs text-[#777066]">/ night</span>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRoomFor3D(room);
                          }}
                          className="btn-outline-bronze text-center py-2 px-2 text-[11px] flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>3D Tour</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRoomForBooking(room);
                          }}
                          className="btn-primary-espresso flex items-center justify-center gap-1 py-2 px-2 text-[11px]"
                        >
                          <span>Reserve</span>
                          <ArrowRight className="w-3 h-3 text-[#A77D4B]" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Direct Residence Stepper Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {filteredRooms.map((room, idx) => (
              <button
                key={room.id}
                onClick={() => rotateToRoomIndex(idx)}
                className={`py-1.5 px-3 rounded text-[11px] font-mono transition-all border flex items-center gap-1.5 ${
                  idx === activeFrontIndex
                    ? 'bg-[#29241F] text-[#F7F4EE] border-[#29241F] font-semibold shadow-sm'
                    : 'bg-white text-[#777066] border-[#E7DED0] hover:border-[#29241F] hover:text-[#29241F]'
                }`}
              >
                <span className="text-[10px] text-[#A77D4B]">0{idx + 1}</span>
                <span>{room.name.replace('The Benchmark ', '').replace('The ', '')}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* EDITORIAL GRID VIEW (Alternative) */
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
                        <div
                          key={i}
                          className={`h-1 rounded-full transition-all ${
                            i === currentImgIdx
                              ? 'w-6 bg-white'
                              : 'w-1.5 bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-[10px] text-[#777066] uppercase font-mono tracking-wider">
                      <span>{room.sizeSqFt} SQ FT</span>
                      <span>{room.floor}</span>
                      <span>UP TO {room.capacity.maxGuests} GUESTS</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-2xl font-normal text-[#29241F] font-serif-luxury">
                        {room.name}
                      </h3>
                      <p className="text-xs text-[#777066] font-light leading-relaxed">
                        {room.tagline}
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {room.highlights.map((hl, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded text-[11px] font-mono text-[#777066] bg-[#F7F4EE] border border-[#E7DED0]"
                        >
                          {hl}
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
                      <span className="inline-flex items-baseline">
                        <span className="rupee-symbol text-base font-sans font-medium text-[#29241F] mr-0.5">₹</span>
                        <span className="text-2xl font-normal font-serif-luxury text-[#29241F]">
                          {formatINRNumber(room.pricePerNight)}
                        </span>
                      </span>
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
      )}
    </section>
  );
};
