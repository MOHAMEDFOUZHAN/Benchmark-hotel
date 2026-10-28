import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useHotel } from '../context/HotelContext';
import { Room, RoomCategory } from '../types/hotel';
import { formatINRNumber } from '../utils/formatters';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  RotateCw,
  Eye,
  Grid,
  Heart,
  MoveHorizontal
} from 'lucide-react';

export const RoomsShowcase: React.FC = () => {
  const { rooms, setSelectedRoomFor3D, setSelectedRoomForBooking } = useHotel();
  const [activeCategory, setActiveCategory] = useState<RoomCategory>('All');
  const [activeImageIndexes, setActiveImageIndexes] = useState<{ [roomId: string]: number }>({});
  const [viewMode, setViewMode] = useState<'3d_orbit' | 'grid'>('3d_orbit');
  const [wishlist, setWishlist] = useState<{ [roomId: string]: boolean }>({});
  const [activeFrontIndex, setActiveFrontIndex] = useState<number>(0);

  // Orbit Refs
  const viewportRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Tween | null>(null);

  // Dragging & Momentum Physics Refs
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const lastDragXRef = useRef<number>(0);
  const lastDragTimeRef = useRef<number>(0);
  const dragProgressOffsetRef = useRef<number>(0);
  const spinVelocityRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);
  const momentumRafRef = useRef<number | null>(null);

  // Filtered rooms
  const filteredRooms = rooms.filter(room => {
    if (activeCategory === 'All') return true;
    return room.category === activeCategory;
  });

  const totalItems = filteredRooms.length;

  // Toggle favorite / wishlist
  const toggleWish = (roomId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => ({
      ...prev,
      [roomId]: !prev[roomId]
    }));
  };

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

  // ==========================================
  // GSAP 3D PRODUCT ORBIT CAROUSEL ENGINE
  // ==========================================
  useEffect(() => {
    if (viewMode !== '3d_orbit' || !wrapperRef.current || !viewportRef.current || totalItems === 0) {
      return;
    }

    const container = viewportRef.current;
    const wrapper = wrapperRef.current;
    const items = Array.from(wrapper.children) as HTMLElement[];
    const duration = 40; // duration in seconds for full 360 circle

    let radius = 440;

    const updateRadius = () => {
      const isMobile = window.innerWidth < 768;
      radius = isMobile ? Math.min(window.innerWidth * 0.40, 220) : 440;
      const itemWidth = isMobile ? 220 : 290;

      gsap.set(items, {
        position: 'absolute',
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        width: itemWidth,
      });
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);

    // Exact renderOrbit function from reference HTML
    const renderOrbit = (progress: number) => {
      const angleOffset = progress * Math.PI * 2;

      let closestToFrontDist = Infinity;
      let frontIdx = 0;

      items.forEach((item, index) => {
        const angle = angleOffset + (index / totalItems) * Math.PI * 2;

        // Trigonometrical coordinates
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const y = Math.cos(angle) * 20; // 3D tilt height effect

        // Scale and opacity normalized from Z-depth
        const normalizedZ = (z + radius) / (2 * radius); // ranges from 0 to 1
        const scale = 0.6 + normalizedZ * 0.4;
        const opacity = 0.4 + normalizedZ * 0.6;
        const blur = (1 - normalizedZ) * 4; // blur background items

        // Find which item is closest to the front (z = radius, angle = 0 mod 2pi)
        const normalizedAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const distFromFront = Math.min(normalizedAngle, Math.PI * 2 - normalizedAngle);
        if (distFromFront < closestToFrontDist) {
          closestToFrontDist = distFromFront;
          frontIdx = index;
        }

        // Set CSS variables via GSAP (highly optimized)
        gsap.set(item, {
          x,
          y,
          scale,
          opacity,
          zIndex: Math.round(normalizedZ * 100),
          filter: `blur(${blur}px)`,
          transformPerspective: 1200,
          rotationY: -Math.sin(angle) * 25, // dynamic card angle facing the viewer
        });
      });

      setActiveFrontIndex(frontIdx);
    };

    // Core dynamic GSAP rotating animation logic
    const tl = gsap.to({}, {
      duration,
      repeat: -1,
      ease: 'none',
      onUpdate: function () {
        if (isDraggingRef.current) return;
        const progress = this.progress();
        renderOrbit(progress + dragProgressOffsetRef.current);
      },
    });

    tlRef.current = tl;

    // Initial positioning
    renderOrbit(dragProgressOffsetRef.current);

    // Pause rotation on Hover
    const onMouseEnter = () => {
      if (!isDraggingRef.current) tl.pause();
    };
    const onMouseLeave = () => {
      if (!isDraggingRef.current) tl.play();
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    // Apply Momentum Deceleration with Friction 0.94
    const applyMomentum = () => {
      if (isDraggingRef.current) return;

      spinVelocityRef.current *= 0.94; // friction
      dragProgressOffsetRef.current += spinVelocityRef.current * 0.015;
      renderOrbit(tl.progress() + dragProgressOffsetRef.current);

      if (Math.abs(spinVelocityRef.current) > 0.01) {
        momentumRafRef.current = requestAnimationFrame(applyMomentum);
      } else {
        tl.play();
      }
    };

    // --- Manual Mouse Dragging / Spinning ---
    const onMouseDown = (e: MouseEvent) => {
      // Don't drag if clicking buttons or links
      if ((e.target as HTMLElement).closest('button, a, input')) return;

      if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      lastDragXRef.current = e.clientX;
      lastDragTimeRef.current = Date.now();
      dragDistanceRef.current = 0;
      tl.pause();
      container.style.cursor = 'grabbing';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - lastDragXRef.current;
      dragDistanceRef.current += Math.abs(deltaX);
      const screenPercentage = deltaX / window.innerWidth;

      dragProgressOffsetRef.current += screenPercentage * 0.5;
      renderOrbit(tl.progress() + dragProgressOffsetRef.current);

      const now = Date.now();
      const timeDelta = now - lastDragTimeRef.current;
      if (timeDelta > 0) {
        spinVelocityRef.current = deltaX / timeDelta;
      }

      lastDragXRef.current = e.clientX;
      lastDragTimeRef.current = now;
    };

    const onMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      container.style.cursor = 'grab';

      if (Math.abs(spinVelocityRef.current) > 0.05) {
        applyMomentum();
      } else {
        tl.play();
      }
    };

    // --- Touch handlers for mobile devices ---
    const onTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('button, a, input')) return;
      if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
      isDraggingRef.current = true;
      startXRef.current = e.touches[0].clientX;
      lastDragXRef.current = startXRef.current;
      lastDragTimeRef.current = Date.now();
      dragDistanceRef.current = 0;
      tl.pause();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const touchX = e.touches[0].clientX;
      const deltaX = touchX - lastDragXRef.current;
      dragDistanceRef.current += Math.abs(deltaX);
      const screenPercentage = deltaX / window.innerWidth;

      dragProgressOffsetRef.current += screenPercentage * 0.5;
      renderOrbit(tl.progress() + dragProgressOffsetRef.current);

      const now = Date.now();
      const timeDelta = now - lastDragTimeRef.current;
      if (timeDelta > 0) {
        spinVelocityRef.current = deltaX / timeDelta;
      }

      lastDragXRef.current = touchX;
      lastDragTimeRef.current = now;
    };

    const onTouchEnd = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      if (Math.abs(spinVelocityRef.current) > 0.05) {
        applyMomentum();
      } else {
        tl.play();
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      tl.kill();
      if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
      window.removeEventListener('resize', updateRadius);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [viewMode, totalItems, activeCategory]);

  // Spin to a specific residence index
  const spinToIndex = (targetIndex: number) => {
    if (!tlRef.current || totalItems === 0) return;
    const tl = tlRef.current;
    tl.pause();

    const currentProgress = tl.progress() + dragProgressOffsetRef.current;
    const targetProgress = -targetIndex / totalItems;
    
    // Find shortest wrap-around delta
    let delta = (targetProgress - currentProgress) % 1;
    if (delta > 0.5) delta -= 1;
    if (delta < -0.5) delta += 1;

    const startOffset = dragProgressOffsetRef.current;
    const targetOffset = startOffset + delta;

    gsap.to({ val: 0 }, {
      val: 1,
      duration: 0.8,
      ease: 'power3.out',
      onUpdate: function () {
        const factor = this.progress();
        dragProgressOffsetRef.current = startOffset + delta * factor;
        // trigger render update
        const evt = new CustomEvent('orbit-spin-update');
        window.dispatchEvent(evt);
      },
      onComplete: () => {
        dragProgressOffsetRef.current = targetOffset;
        tl.play();
      }
    });
  };

  const handleStepOrbit = (direction: 'next' | 'prev') => {
    const nextIdx = direction === 'next'
      ? (activeFrontIndex + 1) % totalItems
      : (activeFrontIndex - 1 + totalItems) % totalItems;
    spinToIndex(nextIdx);
  };

  const activeFrontRoom = filteredRooms[activeFrontIndex] || filteredRooms[0];

  const categories: { label: string; value: RoomCategory; count: number }[] = [
    { label: 'All Collections', value: 'All', count: rooms.length },
    { label: 'Royal Penthouses', value: 'Penthouse', count: rooms.filter(r => r.category === 'Penthouse').length },
    { label: 'Panoramic Suites', value: 'Suite', count: rooms.filter(r => r.category === 'Suite').length },
    { label: 'Sanctuary Villas', value: 'Villa', count: rooms.filter(r => r.category === 'Villa').length },
    { label: 'Deluxe Rooms', value: 'Deluxe', count: rooms.filter(r => r.category === 'Deluxe').length },
  ];

  return (
    <section id="suites" className="py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-10 bg-[#F7F4EE]">
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
                  dragProgressOffsetRef.current = 0;
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
                  0{activeFrontIndex + 1} / 0{totalItems}
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
                  <span>Drag horizontally to spin 3D orbit</span>
                </div>

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

          {/* ==========================================================
              CAROUSEL ORBIT CONTAINER (overflow-visible: ZERO CLIPPING)
             ========================================================== */}
          <div
            ref={viewportRef}
            id="orbit-viewport"
            className="relative w-full h-[580px] md:h-[760px] flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing orbit-container select-none"
          >
            {/* Large Luxury Branding Watermark in Absolute Background */}
            <div className="absolute z-0 text-center pointer-events-none opacity-15 md:opacity-20 select-none">
              <h3 className="text-6xl sm:text-8xl md:text-[14rem] font-extrabold uppercase tracking-[0.25em] leading-none font-serif bg-clip-text text-transparent bg-gradient-to-b from-[#A77D4B] to-[#29241F] drop-shadow-[0_8px_16px_rgba(167,125,75,0.12)]">
                BENCHMARK
              </h3>
              <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.35em] text-[#777066] mt-1">
                CHARING CROSS • THE NILGIRIS
              </p>
            </div>

            {/* Ambient Ground Pedestal Ring */}
            <div
              className="absolute left-1/2 bottom-8 -translate-x-1/2 pointer-events-none rounded-full border border-[#A77D4B]/25 shadow-[0_0_80px_rgba(167,125,75,0.12)] w-[700px] h-[340px]"
              style={{ transform: 'rotateX(74deg)' }}
            >
              <div className="absolute inset-4 rounded-full border border-dashed border-[#A77D4B]/20 animate-spin" style={{ animationDuration: '70s' }} />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#A77D4B] shadow-[0_0_14px_#A77D4B] animate-pulse" />
            </div>

            {/* Rotating Items Wrapper */}
            <div ref={wrapperRef} id="orbit-wrapper" className="relative w-full h-full">
              {filteredRooms.map((room, index) => {
                const currentImgIdx = activeImageIndexes[room.id] || 0;
                const isLiked = !!wishlist[room.id];

                return (
                  <div
                    key={room.id}
                    className="orbit-item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px]"
                  >
                    <div className="bg-white rounded-[2.2rem] p-3 md:p-4 border border-[#29241F]/10 shadow-lg hover:shadow-2xl transition-all duration-500">
                      {/* Product Image Area with Rounded Squircle */}
                      <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-gradient-to-tr from-[#A77D4B]/10 to-[#E7DED0]/20 flex items-center justify-center">
                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => toggleWish(room.id, e)}
                          className={`absolute top-3 left-3 p-2 border border-black/5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm z-30 ${
                            isLiked
                              ? 'bg-[#A77D4B] text-white'
                              : 'bg-white/90 text-[#29241F] hover:text-[#A77D4B]'
                          }`}
                          title="Save to favorites"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                        </button>

                        {/* Top Category Badge */}
                        <div className="absolute top-3 right-3 z-20">
                          <span className="px-2.5 py-1 rounded-full bg-[#29241F]/80 backdrop-blur-md text-[9px] uppercase tracking-widest font-mono text-[#F7F4EE]">
                            {room.category}
                          </span>
                        </div>

                        {/* High-Resolution Room Image */}
                        <img
                          src={room.images[currentImgIdx]}
                          alt={room.name}
                          className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                          draggable={false}
                        />

                        {/* Carousel Prev/Next Overlay Buttons */}
                        {room.images.length > 1 && (
                          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => handlePrevImage(room.id, room.images.length, e)}
                              className="p-1 rounded bg-white/90 text-[#29241F] pointer-events-auto border border-[#E7DED0] hover:bg-white shadow"
                            >
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => handleNextImage(room.id, room.images.length, e)}
                              className="p-1 rounded bg-white/90 text-[#29241F] pointer-events-auto border border-[#E7DED0] hover:bg-white shadow"
                            >
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}

                        {/* Dot Indicators */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 pointer-events-none">
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

                      {/* Card Content */}
                      <div className="p-3 md:p-4 bg-gradient-to-b from-transparent to-[#A77D4B]/5 rounded-b-[2rem] space-y-2.5">
                        <div className="flex items-center justify-between text-[9px] font-mono text-[#777066] uppercase tracking-wider">
                          <span className="font-bold text-[#A77D4B]">AVAILABLE</span>
                          <span>{room.sizeSqFt} SQ FT</span>
                          <span>{room.floor.split('(')[0]}</span>
                        </div>

                        <h3 className="font-bold text-base md:text-lg text-[#29241F] leading-snug font-serif-luxury truncate">
                          {room.name}
                        </h3>

                        {/* Key Highlights */}
                        <div className="flex flex-wrap gap-1">
                          {room.highlights.slice(0, 2).map((hl, hlIdx) => (
                            <span
                              key={hlIdx}
                              className="px-2 py-0.5 rounded text-[9px] font-mono text-[#777066] bg-[#F7F4EE] border border-[#E7DED0] truncate max-w-[125px]"
                            >
                              {hl}
                            </span>
                          ))}
                        </div>

                        {/* Price & Action Row */}
                        <div className="pt-2 border-t border-[#E7DED0]/80 flex items-center justify-between gap-2">
                          <div className="flex flex-col">
                            <span className="text-[8px] uppercase tracking-widest text-[#777066] font-semibold">
                              RATE FROM
                            </span>
                            <div className="flex items-baseline">
                              <span className="rupee-symbol text-xs font-sans font-medium text-[#29241F] mr-0.5">₹</span>
                              <span className="text-lg md:text-xl font-bold font-serif-luxury text-[#29241F]">
                                {formatINRNumber(room.pricePerNight)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRoomFor3D(room);
                              }}
                              className="p-2 md:px-2.5 md:py-2 rounded-xl border border-[#A77D4B]/40 text-[#A77D4B] hover:bg-[#A77D4B] hover:text-white transition-all text-[11px] font-medium flex items-center gap-1"
                              title="Explore 3D Tour"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">3D</span>
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRoomForBooking(room);
                              }}
                              className="bg-[#29241F] text-white px-3 py-2 rounded-xl shadow-md hover:bg-[#A77D4B] active:scale-95 transition-all text-[11px] font-medium uppercase tracking-wider flex items-center gap-1"
                            >
                              <span>Reserve</span>
                              <ArrowRight className="w-3 h-3 text-[#A77D4B]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instruction Help Text */}
          <div className="text-center text-xs uppercase tracking-widest text-[#777066]/70 font-semibold max-w-md mx-auto">
            Hover to pause rotation. Grab and drag horizontally to spin in 3D!
          </div>

          {/* Bottom Direct Residence Stepper Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {filteredRooms.map((room, idx) => (
              <button
                key={room.id}
                onClick={() => spinToIndex(idx)}
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
