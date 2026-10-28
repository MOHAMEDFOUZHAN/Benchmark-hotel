import React, { useState, useEffect } from 'react';
import { useHotel } from '../context/HotelContext';
import {
  Menu,
  X,
  Key,
  SlidersHorizontal
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentView, setCurrentView, setIsLookupModalOpen, setSelectedRoomForBooking, rooms } = useHotel();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView === 'admin') {
      setCurrentView('guest');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#E7DED0] py-4 shadow-[0_2px_15px_rgba(41,36,31,0.04)]'
          : 'bg-[#F7F4EE]/80 backdrop-blur-sm border-b border-[#E7DED0]/60 py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Editorial Brand Name */}
        <div
          onClick={() => {
            setCurrentView('guest');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer group select-none"
        >
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-normal tracking-[0.22em] uppercase text-[#29241F] font-serif-luxury leading-none">
              BENCHMARK
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#777066] font-sans mt-1">
              CHARING CROSS • OOTY
            </span>
          </div>
        </div>

        {/* Desktop Editorial Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.18em] font-medium text-[#29241F]">
          <button
            onClick={() => scrollToSection('tower-explorer')}
            className="hover:text-[#A77D4B] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#A77D4B] after:transition-all"
          >
            Tower Elevation
          </button>
          <button
            onClick={() => scrollToSection('suites')}
            className="hover:text-[#A77D4B] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#A77D4B] after:transition-all"
          >
            Suites & Villas
          </button>
          <button
            onClick={() => scrollToSection('curator')}
            className="hover:text-[#A77D4B] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#A77D4B] after:transition-all text-[#A77D4B] font-semibold"
          >
            Stay Curator
          </button>
          <button
            onClick={() => scrollToSection('dining-wellness')}
            className="hover:text-[#A77D4B] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#A77D4B] after:transition-all"
          >
            Dining & Wellness
          </button>
          <button
            onClick={() => scrollToSection('location')}
            className="hover:text-[#A77D4B] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#A77D4B] after:transition-all"
          >
            Location
          </button>
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Guest Stay / Keycard Lookup */}
          <button
            onClick={() => setIsLookupModalOpen(true)}
            className="text-[11px] uppercase tracking-[0.16em] font-medium text-[#777066] hover:text-[#29241F] transition-colors flex items-center gap-1.5 py-2 px-3"
          >
            <Key className="w-3.5 h-3.5 text-[#A77D4B]" />
            <span>My Stay</span>
          </button>

          {/* Admin Operations Switcher */}
          <button
            onClick={() => setCurrentView(currentView === 'admin' ? 'guest' : 'admin')}
            className={`py-2 px-3 rounded text-[10px] uppercase font-mono tracking-wider transition-all flex items-center gap-1.5 border ${
              currentView === 'admin'
                ? 'bg-[#A77D4B] text-white border-[#A77D4B]'
                : 'bg-transparent text-[#777066] border-[#E7DED0] hover:border-[#29241F] hover:text-[#29241F]'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>{currentView === 'admin' ? 'Exit Ops' : 'Admin'}</span>
          </button>

          {/* Reserve CTA */}
          {currentView === 'guest' && (
            <button
              onClick={() => {
                const featured = rooms.find(r => r.isFeatured) || rooms[0];
                setSelectedRoomForBooking(featured);
              }}
              className="btn-primary-espresso"
            >
              Reserve
            </button>
          )}
        </div>

        {/* Mobile Toggle & Quick Actions */}
        <div className="flex sm:hidden items-center gap-2">
          {currentView === 'guest' && (
            <button
              onClick={() => {
                const featured = rooms.find(r => r.isFeatured) || rooms[0];
                setSelectedRoomForBooking(featured);
              }}
              className="py-1.5 px-3 rounded bg-[#29241F] text-white text-[10px] font-semibold uppercase tracking-wider shadow-sm active:scale-95"
            >
              Reserve
            </button>
          )}

          <button
            onClick={() => setIsLookupModalOpen(true)}
            aria-label="My Reservation"
            className="p-2 text-[#29241F] hover:text-[#A77D4B] transition-colors"
          >
            <Key className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-[#29241F] hover:text-[#A77D4B] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#F7F4EE] border-b border-[#E7DED0] p-6 space-y-5 animate-fadeIn shadow-lg">
          <nav className="flex flex-col gap-3 text-xs uppercase tracking-[0.18em] font-medium text-[#29241F]">
            <button
              onClick={() => scrollToSection('tower-explorer')}
              className="text-left py-2.5 border-b border-[#E7DED0] flex items-center justify-between"
            >
              <span>Tower Elevation</span>
              <span className="text-[10px] font-mono text-[#A77D4B]">50 Fl</span>
            </button>
            <button
              onClick={() => scrollToSection('suites')}
              className="text-left py-2.5 border-b border-[#E7DED0] flex items-center justify-between"
            >
              <span>Suites & Villas</span>
              <span className="text-[10px] font-mono text-[#A77D4B]">3D Orbit</span>
            </button>
            <button
              onClick={() => scrollToSection('curator')}
              className="text-left py-2.5 border-b border-[#E7DED0] flex items-center justify-between font-semibold text-[#A77D4B]"
            >
              <span>Stay Curator</span>
              <span className="text-[10px] font-mono text-[#A77D4B]">Custom</span>
            </button>
            <button
              onClick={() => scrollToSection('dining-wellness')}
              className="text-left py-2.5 border-b border-[#E7DED0]"
            >
              Dining & Wellness
            </button>
            <button
              onClick={() => scrollToSection('location')}
              className="text-left py-2.5 border-b border-[#E7DED0]"
            >
              Location & Contact
            </button>
            <button
              onClick={() => scrollToSection('privileges')}
              className="text-left py-2.5 border-b border-[#E7DED0]"
            >
              Privileges
            </button>
          </nav>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsLookupModalOpen(true);
              }}
              className="w-full btn-outline-espresso text-center py-2.5"
            >
              My Reservation / Keycard
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrentView(currentView === 'admin' ? 'guest' : 'admin');
              }}
              className="w-full text-center text-xs font-mono text-[#777066] py-2 hover:text-[#29241F]"
            >
              {currentView === 'admin' ? '← Switch to Guest Site' : 'Hotel Admin Portal →'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
